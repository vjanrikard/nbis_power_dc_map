#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   update_technicals.js — Oppdater fane 2 (markedsdata) + fane 3 (teknisk)
   ─────────────────────────────────────────────────────────────────
   Henter NBIS-kurser fra Yahoo Finance og beregner alle indikatorene
   med samme formler som NBIS_Alpha_Dashboard.pine (Wilder-glatting på
   RSI/ADX/ATR, Stoch 14,3,3, AO 5,34, MACD 12,26,9, sesjons-VWAP).

   Skriver:
     alpha/data/technicals.json          (hele filen regenereres)
     alpha/data/analysts.json            (KUN marketData-blokken byttes)

   Bruk (fra repo-roten):
     node alpha/scan/update_technicals.js           # oppdater lokalt
     node alpha/scan/update_technicals.js --push    # + git commit/push og Pages-bygg

   Anbefalt kjøring: daglig etter USA-stengning (f.eks. 22:15 norsk tid).
   ═══════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..');
const TECH_FILE = path.join(REPO, 'alpha', 'data', 'technicals.json');
const ANALYSTS_FILE = path.join(REPO, 'alpha', 'data', 'analysts.json');

// Antall utestående aksjer for market cap-beregning.
// OPPDATER etter utvanning (emisjoner, konvertible, oppkjøp med aksjer).
const SHARES_OUTSTANDING = 258e6;

const r2 = x => Math.round(x * 100) / 100;
const iso = t => new Date(t * 1000).toISOString().slice(0, 10);
const sma = (a, n, i) => { if (i < n - 1 || i >= a.length) return null; let s = 0; for (let j = i - n + 1; j <= i; j++) s += a[j]; return s / n; };
const emaSeries = (src, len) => { const k = 2 / (len + 1); const o = [src[0]]; for (let x = 1; x < src.length; x++) o.push(src[x] * k + o[x - 1] * (1 - k)); return o; };

async function yahoo(params) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/NBIS?${params}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Yahoo HTTP ${r.status} (${params})`);
  const j = await r.json();
  const res = j.chart && j.chart.result && j.chart.result[0];
  if (!res || !res.timestamp) throw new Error(`Yahoo: tomt svar (${params})`);
  return res;
}

async function main() {
  const push = process.argv.includes('--push');

  // ── 1. Daglige barer (2 år) ─────────────────────────────────────
  const daily = await yahoo('range=2y&interval=1d');
  const q = daily.indicators.quote[0], meta = daily.meta;
  const T = [], C = [], H = [], L = [], V = [];
  for (let x = 0; x < daily.timestamp.length; x++) {
    if (q.close[x] == null) continue;
    T.push(daily.timestamp[x]); C.push(q.close[x]); H.push(q.high[x]); L.push(q.low[x]); V.push(q.volume[x] || 0);
  }
  const n = C.length, i = n - 1;
  if (n < 220) throw new Error(`For få barer (${n}) — trenger 220+ for EMA200/ADX`);
  const asOf = iso(T[i]);

  // ── 2. Indikatorer (Pine-ekvivalente) ───────────────────────────
  const ema21 = emaSeries(C, 21)[i], ema50 = emaSeries(C, 50)[i], ema200 = emaSeries(C, 200)[i];

  let g = 0, ls = 0; // RSI14 Wilder
  for (let x = 1; x <= 14; x++) { const ch = C[x] - C[x - 1]; g += Math.max(ch, 0); ls += Math.max(-ch, 0); }
  g /= 14; ls /= 14;
  for (let x = 15; x < n; x++) { const ch = C[x] - C[x - 1]; g = (g * 13 + Math.max(ch, 0)) / 14; ls = (ls * 13 + Math.max(-ch, 0)) / 14; }
  const rsi = 100 - 100 / (1 + (ls === 0 ? 100 : g / ls));

  const rawK = []; // Stoch 14,3,3
  for (let x = 13; x < n; x++) {
    let hh = -1e9, ll = 1e9;
    for (let y = x - 13; y <= x; y++) { hh = Math.max(hh, H[y]); ll = Math.min(ll, L[y]); }
    rawK.push(hh === ll ? 50 : (C[x] - ll) / (hh - ll) * 100);
  }
  const stochK = sma(rawK, 3, rawK.length - 1);
  const stochD = (sma(rawK, 3, rawK.length - 1) + sma(rawK, 3, rawK.length - 2) + sma(rawK, 3, rawK.length - 3)) / 3;

  let hh14 = -1e9, ll14 = 1e9; // Williams %R
  for (let y = n - 14; y < n; y++) { hh14 = Math.max(hh14, H[y]); ll14 = Math.min(ll14, L[y]); }
  const willR = (hh14 - C[i]) / (hh14 - ll14) * -100;

  const e12 = emaSeries(C, 12), e26 = emaSeries(C, 26); // MACD
  const macdSer = e12.map((v, x) => v - e26[x]);
  const macd = macdSer[i], macdSig = emaSeries(macdSer, 9)[i];

  const hl2 = H.map((h, x) => (h + L[x]) / 2); // AO 5,34
  const ao = sma(hl2, 5, i) - sma(hl2, 34, i);
  const mom = C[i] - C[i - 10]; // MOM10

  // ADX14 + ATR14 (Wilder)
  let trS = 0, pdmS = 0, ndmS = 0, atr = null, adx = null; const dxArr = [];
  for (let x = 1; x <= 14; x++) {
    const tr = Math.max(H[x] - L[x], Math.abs(H[x] - C[x - 1]), Math.abs(L[x] - C[x - 1]));
    const up = H[x] - H[x - 1], dn = L[x - 1] - L[x];
    trS += tr; pdmS += (up > dn && up > 0) ? up : 0; ndmS += (dn > up && dn > 0) ? dn : 0;
  }
  atr = trS / 14;
  for (let x = 15; x < n; x++) {
    const tr = Math.max(H[x] - L[x], Math.abs(H[x] - C[x - 1]), Math.abs(L[x] - C[x - 1]));
    const up = H[x] - H[x - 1], dn = L[x - 1] - L[x];
    trS = trS - trS / 14 + tr;
    pdmS = pdmS - pdmS / 14 + ((up > dn && up > 0) ? up : 0);
    ndmS = ndmS - ndmS / 14 + ((dn > up && dn > 0) ? dn : 0);
    atr = atr + (tr - atr) / 14;
    const pdi = 100 * pdmS / trS, ndi = 100 * ndmS / trS;
    const dx = 100 * Math.abs(pdi - ndi) / (pdi + ndi);
    dxArr.push(dx);
    adx = adx === null ? (dxArr.length >= 14 ? sma(dxArr, 14, dxArr.length - 1) : null) : (adx * 13 + dx) / 14;
  }
  const atrPct = atr / C[i] * 100;

  const volAvg20 = sma(V, 20, i);
  const volRatio = V[i] / volAvg20;
  const upDay = C[i] >= C[i - 1];

  // ── 3. Sesjons-VWAP fra 5-min intradag ──────────────────────────
  let vwap = null, vwapSession = null, vwapBars = 0;
  try {
    const intra = await yahoo('range=1d&interval=5m');
    const iq = intra.indicators.quote[0];
    let pv = 0, vv = 0;
    for (let x = 0; x < intra.timestamp.length; x++) {
      if (iq.close[x] == null || !iq.volume[x]) continue;
      pv += (iq.high[x] + iq.low[x] + iq.close[x]) / 3 * iq.volume[x];
      vv += iq.volume[x]; vwapBars++;
    }
    if (vv > 0) { vwap = r2(pv / vv); vwapSession = iso(intra.timestamp[0]); }
  } catch (e) { console.warn('VWAP-henting feilet (fortsetter uten):', e.message); }

  // ── 4. Score 0-8 (speilet, dokumentert i scoreMethod) ───────────
  const bull = [ao > 0, mom > 0, macd > macdSig, C[i] > ema21, ema21 > ema50, C[i] > ema200, rsi > 50 && rsi < 70, volRatio > 1.5 && upDay].filter(Boolean).length;
  const bear = [ao < 0, mom < 0, macd < macdSig, C[i] < ema21, ema21 < ema50, C[i] < ema200, rsi < 50, volRatio > 1.5 && !upDay].filter(Boolean).length;
  const verdict =
    bull >= 6 ? `STRONG BULL ${bull}/8${adx < 20 ? ' — but ADX ' + r2(adx) + ' = weak trend, momentum unreliable' : ''}` :
    bear >= 6 ? `STRONG BEAR ${bear}/8${adx < 20 ? ' — but ADX ' + r2(adx) + ' = weak trend, momentum unreliable' : ''}` :
    `No strong consensus (bull ${bull}/8, bear ${bear}/8)${adx < 20 ? ' — ADX ' + r2(adx) + ' = weak trend' : ''}${atrPct > 4 ? '. ATR ' + r2(atrPct) + '%: reduce size' : ''}`;

  // ── 5. Bygg technicals.json ──────────────────────────────────────
  const chg = C[i] - C[i - 1], chgPct = chg / C[i - 1] * 100;
  const st = (bullC, bearC) => bullC ? 'bull' : bearC ? 'bear' : 'neutral';
  const tech = {
    lastUpdate: new Date().toISOString().slice(0, 10),
    lastUpdateSource: `alpha/scan/update_technicals.js — Yahoo Finance daily OHLCV (${n} bars, close ${asOf}) + 5-min intraday VWAP. Pine-equivalent formulas (Wilder smoothing).`,
    ticker: 'NBIS', exchange: 'NASDAQ',
    price: {
      current: r2(C[i]), dayLow: r2(L[i]), dayHigh: r2(H[i]),
      previousMove: `prev close $${r2(C[i - 1])} (${iso(T[i - 1])}) -> close $${r2(C[i])} (${chgPct >= 0 ? '+' : ''}${r2(chgPct)}%) on ${asOf}`,
      yearHigh: r2(meta.fiftyTwoWeekHigh ?? Math.max(...H.slice(-252))),
      yearLow: r2(meta.fiftyTwoWeekLow ?? Math.min(...L.slice(-252))),
      asOf,
      note: 'Auto-generated by update_technicals.js from Yahoo Finance.'
    },
    snapshot: {
      rsi14:     { value: r2(rsi), status: rsi > 70 ? 'bear' : rsi < 30 ? 'bull' : 'neutral', note: rsi > 70 ? 'OVERBOUGHT (>70)' : rsi < 30 ? 'OVERSOLD (<30) — mean-reversion zone' : `Neutral zone (30-70), ${rsi > 50 ? 'above' : 'below'} 50 midline` },
      stoch:     { value: r2(stochK), status: stochK > 80 ? 'bear' : stochK < 20 ? 'bull' : 'neutral', note: `%K ${r2(stochK)} / %D ${r2(stochD)} (14,3,3)${stochK < 20 ? ' — OVERSOLD, watch for cross up' : stochK > 80 ? ' — OVERBOUGHT' : ''}` },
      williamsR: { value: r2(willR), status: willR < -80 ? 'bull' : willR > -20 ? 'bear' : 'neutral', note: willR < -80 ? 'Below -80 = OVERSOLD — mean-reversion buy zone' : willR > -20 ? 'Above -20 = OVERBOUGHT' : 'Neutral mid-range' },
      macd:      { value: r2(macd), status: st(macd > macdSig, macd < macdSig), note: `MACD ${r2(macd)} vs signal ${r2(macdSig)} — ${macd > macdSig ? 'bullish' : 'bearish'} cross active` },
      ao:        { value: r2(ao), status: st(ao > 0, ao < 0), note: `Awesome Oscillator (5,34) ${ao > 0 ? 'positive — medium-term momentum up' : 'negative — medium-term momentum down'}` },
      mom10:     { value: r2(mom), status: st(mom > 0, mom < 0), note: `10-day momentum ${mom >= 0 ? '+' : ''}$${r2(mom)}` },
      adx14:     { value: r2(adx), status: 'neutral', note: adx < 20 ? 'ADX < 20 = weak/no trend — Pine rule: do NOT trade momentum signals now' : adx > 40 ? 'ADX > 40 = very strong trend' : 'Trending (20-40)' },
      ema21:     { value: r2(ema21), status: st(C[i] > ema21, C[i] < ema21), note: `Price ${C[i] > ema21 ? 'ABOVE' : 'BELOW'} EMA21 — short-term trend ${C[i] > ema21 ? 'intact' : 'lost'}` },
      ema50:     { value: r2(ema50), status: st(C[i] > ema50, C[i] < ema50), note: `Price ${C[i] > ema50 ? 'ABOVE' : 'BELOW'} EMA50${C[i] < ema50 ? ' — reevaluation point per swing plan' : ''}` },
      ema200:    { value: r2(ema200), status: st(C[i] > ema200, C[i] < ema200), note: `Price ${r2((C[i] / ema200 - 1) * 100)}% ${C[i] > ema200 ? 'ABOVE — long-term bull regime intact' : 'BELOW — REGIME BREAK'}` },
      vwap:      vwap != null
        ? { value: vwap, status: st(C[i] > vwap, C[i] < vwap), note: `Session VWAP ${vwapSession} from Yahoo 5-min bars (${vwapBars} bars). Close ${C[i] > vwap ? 'ABOVE — buyers in control' : 'BELOW — sellers held control'} into the close. Resets daily.` }
        : { value: null, status: 'neutral', note: 'Intraday fetch failed this run — rerun script or check TradingView.' },
      atrPct:    { value: r2(atrPct), status: atrPct > 4 ? 'bear' : 'neutral', note: atrPct > 8 ? `ATR ${r2(atrPct)}% — EXTREME volatility (>4% = reduce size)` : atrPct > 4 ? `ATR ${r2(atrPct)}% — high volatility, reduce position size` : `ATR ${r2(atrPct)}% — normal range` },
      volSpike:  { value: r2(volRatio), status: volRatio > 1.5 ? (upDay ? 'bull' : 'bear') : 'neutral', note: volRatio > 1.5 ? `Volume ${r2(volRatio)}x 20-day avg on ${upDay ? 'UP day — accumulation' : 'DOWN day — distribution'}` : `Volume ${r2(volRatio)}x 20-day average — no spike` }
    },
    score: { bull, bear, max: 8, verdict },
    scoreMethod: '8 mirrored checks per side: AO sign, MOM10 sign, MACD vs signal, price vs EMA21, EMA21 vs EMA50, price vs EMA200, RSI zone (bull: 50-70 / bear: <50), volume spike direction (>1.5x avg). 6+ = strong consensus, per NBIS_Alpha_Dashboard.pine.',
    alerts: ['MACD cross up', 'MACD cross down', 'Stochastic oversold', 'Stochastic overbought', 'Volume accumulation', 'Volume distribution', 'Strong bull (6+)', 'Strong bear (6+)', 'High volatility (ATR > 4%)'],
    note: 'Auto-generated — run: node alpha/scan/update_technicals.js [--push]. Values may differ from TradingView by decimals (data vendor differences).'
  };
  fs.writeFileSync(TECH_FILE, JSON.stringify(tech, null, 2) + '\n');

  // ── 6. Oppdater KUN marketData i analysts.json ───────────────────
  const an = JSON.parse(fs.readFileSync(ANALYSTS_FILE, 'utf8'));
  an.lastUpdate = tech.lastUpdate;
  an.lastUpdateSource = `Market data auto-updated by update_technicals.js (Yahoo, close ${asOf}). Per-firm ratings unchanged — update those manually after analyst actions.`;
  an.marketData = {
    asOf, currentPrice: r2(C[i]), previousClose: r2(C[i - 1]),
    priceChange: r2(chg), changePct: r2(chgPct),
    dayLow: r2(L[i]), dayHigh: r2(H[i]),
    marketCap: Math.round(C[i] * SHARES_OUTSTANDING),
    volume: V[i], avgDailyVolume: Math.round(volAvg20),
    yearLow: tech.price.yearLow, yearHigh: tech.price.yearHigh,
    currency: 'USD',
    note: `Auto-generated from Yahoo Finance (close ${asOf}). Market cap = price x ${SHARES_OUTSTANDING / 1e6}M shares (SHARES_OUTSTANDING in update_technicals.js — update after dilution).`
  };
  fs.writeFileSync(ANALYSTS_FILE, JSON.stringify(an, null, 2) + '\n');

  // ── 7. Rapport ───────────────────────────────────────────────────
  console.log(`NBIS ${asOf}: close $${r2(C[i])} (${chgPct >= 0 ? '+' : ''}${r2(chgPct)}%)`);
  console.log(`RSI ${r2(rsi)} | Stoch ${r2(stochK)} | W%R ${r2(willR)} | MACD ${r2(macd)}/${r2(macdSig)} | ADX ${r2(adx)} | ATR ${r2(atrPct)}%`);
  console.log(`EMA21/50/200: ${r2(ema21)} / ${r2(ema50)} / ${r2(ema200)} | VWAP ${vwap ?? '—'} | Vol ${r2(volRatio)}x`);
  console.log(`Score: BULL ${bull}/8  BEAR ${bear}/8 — ${verdict}`);
  console.log(`Skrev: ${path.relative(REPO, TECH_FILE)} + marketData i ${path.relative(REPO, ANALYSTS_FILE)}`);

  // ── 8. Valgfri push ──────────────────────────────────────────────
  if (push) {
    const run = cmd => execSync(cmd, { cwd: REPO, stdio: 'inherit' });
    run('git add alpha/data/technicals.json alpha/data/analysts.json');
    try {
      run(`git commit -m "Auto-update technicals + market data (close ${asOf})"`);
      run('git push origin main');
      try { execSync('gh api -X POST repos/vjanrikard/nbis_power_dc_map/pages/builds', { cwd: REPO }); console.log('Pages-bygg trigget.'); }
      catch { console.log('Pages bygger automatisk ved push (gh ikke tilgjengelig for manuell trigger).'); }
    } catch { console.log('Ingenting å committe (uendret data — helg/helligdag?).'); }
  } else {
    console.log('Kjør med --push for å committe og publisere.');
  }
}

main().catch(e => { console.error('FEIL:', e.message); process.exit(1); });
