nebius.alpha.v1.1

# Nebius Alpha — Analyst Skill

This skill gives Claude deep, pre-loaded context on Nebius Group (NBIS) so it can
act as a well-prepared analyst. Always read this skill before answering any NBIS
question. It covers company fundamentals, the GW capacity map, critical risks, the
TradingView Pine Script, and the Alpha portal roadmap.

---

## 1a. Company snapshot (April 2026)

**Nebius Group N.V.** — Amsterdam HQ. NASDAQ: NBIS.
Spun out from Yandex in 2024 after Russia sanctions. CEO: Arkady Volozh.
Business: Full-stack AI infrastructure — GPU clusters, cloud platform, managed AI services.
Also owns: Avride (autonomous vehicles), TripleTen (edtech), stakes in Toloka and ClickHouse.

### Strategy pillars
- **Greenfield only** — builds and owns its own data centers. ~20% lower TCO than market average.
- **Power-first** — secures power rights years ahead of deployment. Power access is the moat.
- **Hyperscaler validation** — Microsoft ($17.4B, NJ) and Meta ($27B over 5 years, Vera Rubin platform) outsource GPU capacity to Nebius. 
    This is extraordinary — Azure cannot build fast enough on its own.
- **Operating leverage** — high fixed / low marginal cost. EBITDA went from negative → 24% in Q4 2025 → 40% target 2026.

## 1b. Company detailed (April 2026)

Nebius er et AI-skyselskap som leverer en enhetlig plattform som dekker hele AI-reisen
– fra data- og modelltrening, finjustering til produksjonskjøring og distribusjon.
Nebius leverer fullstack-infrastruktur, inkludert storskala GPU-klynger, skytjenester og utviklerverktøy.

Nebius er notert på Nasdaq (NBIS) og har hovedkontor i Amsterdam. Selskapet eier TripleTen,
en edtech-plattform fokusert på omskolering av individer til teknologikarrierer. Avride, som utvikler
autonom kjøreteknologi. Nebius har eierandeler i Toloka, som er en datapartner for generativ AI-utvikling. 
Nebius eier 28% i Clickhouse, et åpen kildekode-kolonneorientert DBMS (kolonnedatabasehåndteringssystem)
for å generere analytiske rapporter ved hjelp av SQL-spørringer i sanntid. I 2026 kjøpte Nebius Tavily.
Avtalen bringer Tavilys agentiske søketeknologi inn i Nebius' enhetlige AI-skyplattform,
som lar utviklere bygge og kjøre autonome agenter uten å administrere flere leverandører.

Nebius er grunnlagt rundt dyp intern teknologisk ekspertise, og har en sterk ingeniørkultur forankret i å designe 
og drifte storskala plattformer som kjører pålitelig på global skala. 

Forgjengeren til Nebius var det russiske teknologiselskapet Yandex (russiske Google) som ble grunnlagt i 1997 av Arkady Volozh.
Yandex er den største søkemotoren i Russland og en av de største i verden. I februar 2022 ble verdipapirer suspendert 
fra handel på NASDAQ på grunn av internasjonale sanksjoner under den russiske invasjonen av Ukraina. I juli 2024 solgte Yandex N.V. 
alle sine russiske eiendeler til et konsortium av russiske investorer, og beholdt flere virksomheter som opererte utenfor Russland.
Denne omstruktureringen førte til opprettelsen av Nebius Group, med fokus på infrastruktur for kunstig intelligens, med omtrent over 
1000 tidligere Yandex-ansatte. Yandex N.V. endret navn til Nebius Group N.V. med Arkady Volozh som administrerende direktør. 
I oktober 2024 gjenopptok Nebius handelen på NASDAQ.


### Key financials (Q4 2025)

| Metric                     | Value   | Period    |
|----------------------------|--------------|------|
| Connected capacity         | ~170 MW             | End of 2025      |
| Connected target           | 800 MW – 1 GW       | Dec 2026         |
| Contracted power           | 2.5 GW              | 2026 target      |
| Total secured power        | 3+ GW               | Pipeline         |
| Revenue guidance           | $500–550M           | FY 2025          |
| ARR target                 | $900M–$1.1B         | Q4 2025 run rate |
| ARR target                 | $7–9B               | Q4 2026 run rate |
| CapEx (2025)               | ~$5B                | Raised from $2B  |
| CapEx (total buildout)     | $16–20B             | Full plan        |
| Cash + committed financing | $8.3B (covers ~60%) | Q4 2025          |
| Net loss | $518M           | FY 2025             |
| EBITDA margin              | 24% → 40% target    | Q4 2025 → 2026   |
| Market cap (ref.)          | ~$25B               | Early 2026       |

---

## 2. GW capacity map — all known sites

> **Critical distinction:**
> - **Contracted** = secured land + power rights. Upper bound of what *can* be built.
> - **Connected** = physically wired and ready for GPUs. Generates revenue.
> - **Active** = GPUs deployed and billing customers.

| Location  ------   | Country   | Capacity | Status                                         | Risk |
|--------------------|-----------|----------|-------------------------------------------------------|
| Mäntsälä           | 🇫🇮 Finland | ~50 MW   | ✅ Operational (flagship EU site, owns land)  | Low  |
| Lappeenranta (new) | 🇫🇮 Finland | 310 MW   | Planned, deliveries from 2027                  | Low  |
| London (Ark DC)    | 🇬🇧 UK     | ~30 MW   | ✅ Operational, B300 GPUs, presold             | Low |
| Modi'in            | 🇮🇱 Israel  | ~22 MW   | B200 GPUs, operational Q3 2025 | Geopolitical   |
| IBeit Shemesh      | 🇮🇱 Israel  | Large scale | Under construction                           | Geopolitical |
| Masmiyya           | 🇮🇱 Israel  | 22 MW → 64 MW | Q3 2026 delivery, 240 MW substation        | Geopolitical |
| Paris (Equinix)    | 🇫🇷 France  | Leased   | ✅ Operational                                 | Low |
| Béthune (new)      | 🇫🇷 France  | 240 MW     Under development                               | Medium |
| Vineland, NJ       | 🇺🇸 USA    | 300 MW    | ⚠️ PERMIT BLOCKED (since Feb 2025)             | 🔴 CRITICAL |
| Kansas City, MO    | 🇺🇸 USA    | 40 MW     | ✅ Operational (former KC Star building)       | Low |
| Independence, MO (new) | 🇺🇸 USA | 1 GW campus | Construction starting 2026, 400 acres       | Medium |
| Birmingham, AL     | 🇺🇸 USA     | TBD      | Announced 2026, "AI Factory" branding          | Low |
| Keflavik           | 🇮🇸 Iceland | Leased   | ✅ Operational (Verne DC)                      | Low |

**EMEA total contracted: 750+ MW**

---

## 3. Critical risks — ranked by severity

### 🔴 RISK 1: NJ Vineland — Existential near-term risk

This is the single most important thing to track on every earnings call and news update.

**Situation:** The building is physically complete. It cannot operate. A critical state
environmental permit has been on hold since **February 2025** under New Jersey's
**Environmental Justice Law**.

**Root cause:** Nebius installed ~30 on-site gas engines to bypass PJM grid queue
(the grid interconnection queue is months long in the Northeast). The gas combustion +
noise triggered NJ EJ Law review. The site is near residential areas and an elementary
school.

**Stakes:** The Microsoft deal ($17.4B, 5-year GPU infrastructure supply contract)
is anchored at this Vineland facility. If this site cannot operate, Microsoft
revenue recognition is delayed.

**Community dynamics:** NJ B.U.R.N. (NJ Build Up Resistance Now), Climate Revolution NJ,
and NAACP mobilized. New Brunswick voted unanimously against a separate Nebius DC in
Feb 2026. Monroe Township discussed full ban. Pemberton Township enacted a full ban.

**Competitive lesson:** IREN (competitor) chose rural Texas sites in 2022 — ERCOT grid,
no community opposition, no EJ Law. Nebius chose proximity to Microsoft (NY/NJ metro
latency) and paid the regulatory price.

**Q1 2026 report — three possible outcomes:**
1. ✅ Permit resolved → Strong rally. Microsoft revenue activates.
2. ⏳ Still pending → Uncertainty. Market prices in delay.
3. ❌ Withdrawn / relocated → Selloff. New timeline for Microsoft delivery.

### 🟠 RISK 2: National US data center opposition movement

In Q2 2025 alone, an estimated **$98B in data center projects** were blocked or delayed
nationwide — more than all prior quarters since 2023 combined. The opposition is now
organized, coalition-based (climate + racial justice + local residents), and spreading.

### 🟡 RISK 3: Missouri Independence — power gap until Oct 2027

Blue Valley Power Plant (private, on-campus generation) won't be ready until
**October 2027**. Bridge agreements with IPL and Evergy ($5.6M, Oklahoma wind) cover
early-phase buildings. Revenue can start before the power plant is complete — but the
window is vulnerable.

### 🟡 RISK 4: Valuation / execution risk

At ~$25B market cap on $530M trailing revenue → ~47x trailing sales. Deeply unprofitable
($518M net loss FY 2025). If buildout slips even one quarter, multiples compress fast.
**$16–20B capex** against $3–3.4B guided 2026 revenue = spending ~$5–6 for every $1 earned.

---

## 4. Q1 2026 report — what to watch

Always frame Nebius earnings analysis around these three questions:

1. **NJ Vineland status** — resolved, still blocked, or abandoned?
2. **MW connected** — are they tracking toward 800 MW–1 GW by Dec 2026?
3. **ARR trajectory** — on track for $7–9B run rate by Q4 2026?

Secondary metrics: EBITDA margin progression, CapEx vs guidance, GPU mix (B200/B300/GB300),
new site announcements, contract updates (Meta delivery timeline, Microsoft milestones).

---

## 5. Pine Script — NBIS Alpha Dashboard

A complete TradingView Pine Script v5 indicator is saved at:
`/mnt/user-data/outputs/NBIS_Alpha_Dashboard.pine`

### Indicators included and why

| Indicator                 | Group                  | NBIS-specific rationale                                        |
|---------------------------|------------------------|----------------------------------------------------------------|
| Awesome Oscillator (5,34) | Momentum               | From user's TradingView screen. Medium-term momentum baseline. |
| Momentum (10)             | Momentum               | Pure price acceleration. Fast signal for high-beta moves.      |
| MACD (12,26,9)            | Momentum               | Trend + momentum combined. Cross-signals for entry/exit timing. |
| ADX (14)                  | Trend strength         | ADX < 20 = don't trade momentum on NBIS. Critical filter. |
| RSI (14)                  | Overbought/oversold    | Used as MACD signal validator — no buy if RSI > 80. |
| Stochastic %K (14,3,3)    | Overbought/oversold    | From user's screen. Triggers only on zone crossings, not just presence. |
| Williams %R (14)          | Overbought/oversold    | From user's screen. Fast extreme-zone signal. |
| EMA 21 / 50 / 200         | Trend structure        | Bull stack = all three below price. EMA 200 = the critical line. |
| VWAP                      | Price/value            | Above VWAP = institutional buying pressure. Resets daily. |
| ATR% (14)                 | Risk management        | NBIS moves 3–6% per day. ATR > 4% = reduce position size. |
| Volume spike              | Institutional activity | High vol + green = accumulation. High vol + red = distribution. |

**Scoring system:** 0–8 bull/bear score. 6+ = strong consensus. Shown in dashboard panel.

**9 built-in alerts:** MACD cross up/down, Stochastic OS/OB, volume accumulation/distribution,
strong bull (6+), strong bear (6+), high volatility (ATR > 4%).

**To activate alerts:** Right-click indicator on chart → "Add alert on NBIS Alpha Dashboard"

---

## 6. Alpha portal — architecture and roadmap

**Power Map (completed):** https://vjanrikard.github.io/ai_power_dc_map/
GitHub: https://github.com/vjanrikard

### Portal sections planned

1. **Power Map** — embedded iframe of completed map
2. **Analyst dashboard** — Buy/Sell/Hold ratings table:
   `Company | Analyst | Target Price | Recommendation | Key message | Date`
   Currently known: avg target ~$169, range $112–$291. Sentiment: Moderate Buy.
3. **Technical dashboard** — RSI / Stoch / ATR / Momentum live status
4. **Market microstructure** — Short interest %, hedge fund ownership %, overbought/oversold
5. **Capacity tracker** — MW connected vs target, updated after each earnings
6. **News feed** — filtered for NBIS, NJ permitting, AI infrastructure
7. **Bilingual** — Norwegian 🇳🇴 and English 🇬🇧 versions, synced

### Data sources to integrate
- TradingView widget (chart embed)
- Short interest: Finviz / Ortex / S3 Partners
- Hedge fund ownership: 13F filings (WhaleWisdom, whalewisdom.com)
- Analyst ratings: TipRanks, Seeking Alpha
- News: MT Newswires (already connected MCP)

---

## 7. Analyst consensus (last known)

| Firm / Source     | Rating      | Target | Notes                      |
|-------------------|--------------|-------|----------------------------|
| Consensus avg     | Moderate Buy | ~$169 | Per early 2026             |
| Most bullish      | Buy          | $291  | ~3x from $112              |
| Most conservative | Hold/Sell    | ~$112 | Valuation concern          |
| Zacks (Jan 2026)  | Sell (#4)    |  —    | Overvalued (Value Score F) |
| Zacks (Aug 2025 ) | Hold (#3)    |  —    | Earlier, more cautious     |

Valuation note: NBIS trades at ~47x trailing sales, ~7–8x 2026 guided revenue.
Deeply unprofitable. Multiple compresses fast if buildout slips.

---

## 8. Key resources

| Resource | URL                                                                       |
|-------------------------|------------------------------------------------------------|
| Power Map (user's)      | https://vjanrikard.github.io/ai_power_dc_map/ |
| Nebius official         | https://nebius.com |
| Nebius on Nasdaq        | https://www.nasdaq.com/market-activity/stocks/nbis |
| Northwise NBIS analysis | https://northwiseproject.com/nbis-stock-data-center-analysis/ |
| NJ opposition tracker   | https://pinelandsalliance.org/datacenters/ |
| Data Center Dynamics    | https://www.datacenterdynamics.com (search: Nebius) |
| TradingView NBIS        | https://www.tradingview.com/symbols/NASDAQ-NBIS/ |

---

## 9. Workflow guidance for Alpha

When the user mentions **Q1/Q2/Q3/Q4 report day:**
1. Search for latest news on Nebius earnings + NJ Vineland permit status
2. Cross-reference MW connected vs capacity targets
3. Update analyst dashboard section of portal
4. Flag any guidance changes vs prior quarter

When the user asks to **update the portal:**
1. Check what section (analyst ratings / technical / capacity / news)
2. Use MT Newswires MCP for latest news if available
3. Use Fiscal.ai MCP for financial data if available
4. Build/update the relevant HTML component

When the user asks for **technical analysis:**
1. Use prefererred Pine Script, analyse indicators in Section 5, report what indicators show.
2. Use TradingView widget data if available
3. Always mention ATR% for NBIS — it is a high-volatility stock

When the user asks about **risks:**
1. Always lead with Vineland NJ (Section 3, Risk 1)
2. Contextualize with national US opposition movement data ($98B blocked in Q2 2025)
3. Discuss Missouri power gap timing
4. Frame everything relative to the Microsoft and Meta contract execution

---

## 10. Investment thesis summary (for context)

**Bull case:** Meta + Microsoft validation is extraordinary. Every MW comes online presold.
EBITDA leverage is real — 24% in Q4 2025, targeting 40% in 2026 on $3B+ revenue.
Power secured (3+ GW contracted) is a moat competitors cannot replicate quickly.
2-3 year horizon: execution on buildout → stock re-rates dramatically higher.

**Bear case:** $25B market cap on $530M trailing revenue = 47x sales. $518M net loss.
$16–20B capex plan requires additional equity/debt raises. NJ Vineland is a live crisis
touching the largest single contract. Any slip in the buildout pushes revenue recognition
and compresses the multiple fast. Valuation leaves zero margin for error.

**User's position:** Long-term holder. Focus on fundamentals and capacity execution.
TradingView used for technical timing around entries/exits.

### 11. Datasenter alle lokasjoner

location: "Independence, Missouri, USA", region: "north-america", 
powerMW: 1200, powerGW: 1.2, gpuModel: "NVIDIA GB200/GB300", 
status: "construction", onlineDate: "2028-01", 
statusLabel: "Under Construction (Planned Online: 2028-01)", 
description: "Nebius's largest US AI factory. City Council approved Mar 2026. 
Up to 1.2 GW capacity across 400 acres, 10+ buildings. $6.6B investment. 
New 250 MW power plant expanding to 1,100 MW by 2029. 
Construction started summer 2026, completion expected 2028."

location: "Kansas City, Missouri, USA", region: "north-america",
powerMW: 40, powerGW: 0.04, gpuModel: "NVIDIA Blackwell",
status: "operational", onlineDate: "2025-01", 
statusLabel: "Online Date: 2025-01",
description: "US gateway facility. 5 MW live (Q1 2025), expanding to 40 MW. 
Anchor tenant at Patmos AI Campus. Supports enterprise inference workloads."

location: "Vineland, New Jersey, USA", region: "north-america", investment: "$1.8B", 
powerMW: 300, powerGW: 0.3, gpuModel: "NVIDIA Blackwell", status: "operational", 
onlineDate: "2025-06", statusLabel: "Online Date: 2025-06",
description: "First major US AI data center. ~2.6M sqft. Built by DataOne 
with Nebius-designed infrastructure. Behind-the-meter islanded microgrid. 
300-400 MW capacity. $17B Microsoft contract. 3+ data rooms operational. 
Liquid-cooled, 100+ kW/rack.",
source: "https://re-nj.com/coreweave-begins-1-8-billion-data-center-project-in-
kenilworth-landing-first-award-under-new-eda-tax-credit-program/",
partner: "DataOne, Microsoft"

location: "Birmingham, Alabama, USA", region: "north-america",
powerMW: 300, powerGW: 0.3, gpuModel: "NVIDIA Blackwell",
status: "planned", onlineDate: "2027-01", statusLabel: "Planned Capacity Date: 2027-01",
description: "Southeast US anchor site. Phased development toward ~300 MW total campus 
capacity on 80-acre site in Oxmoor area. Brownfield-to-AI-factory conversion. 
Permitting underway."
  
location: "Minneapolis, Minnesota, USA",reregion: "northamerica",investment: "$1B+",
powerMW: 100, powerGW: 0.1, gpuModel: "NVIDIA GPU", status: "planned", 
onlineDate: "2027-01", statusLabel: "Planned Capacity Date: 2027-01",
description: "Planned US expansion site in Minneapolis area. 
Part of Nebius's goal to reach 16 global data center locations by end of 2026.",
source: "https://www.crn.com/news/cloud/2026/google-unveils-two-new-us-data-centers
-as-185-billion-commitment-gets-underway"

location: "Oklahoma, USA", region: "north-america", powerMW: 100, powerGW: 0.1, 
gpuModel: "NVIDIA GPU", status: "planned", onlineDate: "2027-01", 
statusLabel: "Planned Capacity Date: 2027-01",
description: "Planned US expansion site. Part of Nebius's strategy to establish 
16 global data center locations by end of 2026."

location: "Mäntsälä, Finland", region: "europe"
powerMW: 75, powerGW: 0.075, gpuModel: "NVIDIA H100/H200/Blackwell",
status: "operational", onlineDate: "2014-01", statusLabel: "Online Date: 2014-01",
description: "Nebius's flagship European data center since 2014. Tripled to 75 MW capacity. 
Hosts ISEG supercomputer (16th on Top500). Exports heat to local district heating. 
Up to 60,000 GPUs. Part of Meta contract. 100% renewable energy."
  
location: "Lappeenranta, Finland", region: "europe",
powerMW: 310, powerGW: 0.31, gpuModel: "NVIDIA GPU", status: "construction",
onlineDate: "2027-01", statusLabel: "Under Construction (Planned Online: 2027-01)",
description: "Nebius's largest facility outside the US. 310 MW AI data center campus. 
$10B+ estimated value. Built by Polarnode. Covers ~10% of Nebius's contracted capacity. 
One of Europe's largest AI-dedicated facilities. Phased delivery from 2027."

location: "Béthune, Pas-de-Calais, France", region: "europe",  
powerMW: 240, powerGW: 0.24, gpuModel: "NVIDIA Blackwell", status: "construction",
onlineDate: "2026-12", statusLabel: "Under Construction (Planned Online: 2026-12)",
description: "One of Europe's largest AI factories. 240 MW on former Bridgestone tyre plant site. 
26,000 sqm. Phase 1 late summer 2026, ~120 MW by end 2026, full 240 MW by end 2027. 
132-142 kW/rack, Blackwell NVL72 optimized. Colocation with Azur Datacenter."
    
location: "Saint-Denis, Paris, France", region: "europe", investment: "$20.7B",
powerMW: 10, powerGW: 0.01, gpuModel: "NVIDIA H200", status: "operational", 
onlineDate: "2024-11", statusLabel: "Online Date: 2024-11",
description: "Colocation at Equinix PA10 campus in Saint-Denis. 
First European site with NVIDIA H200 Tensor Core GPUs. First facility equipped solely 
with Nebius-designed servers.",
source: "https://www.sentisight.ai/european-countries-with-most-data-centers/"

location: "Longcross Park, Surrey, UK", region: "europe", powerMW: 16, powerGW: 0.016,
gpuModel: "NVIDIA Blackwell Ultra", status: "operational", onlineDate: "2025-11",
statusLabel: "Online Date: 2025-11",
description: "Nebius's first UK data center at Ark Data Centres' Longcross Park. 
3 data halls, 126 racks, 16 MW. 11 PB storage. NVIDIA Blackwell Ultra GPUs. 
Advanced liquid cooling, low-latency InfiniBand Q-X800 networking."
partner: "Ark Data Centres"

location: "Keflavik, Iceland", region: "europe", powerMW: 10, powerGW: 0.01,
gpuModel: "NVIDIA GPU", status: "operational", onlineDate: "2025-06",
statusLabel: "Online Date: 2025-06",
description: "Colocation with Verne in Keflavik. 10 MW compute cluster. 
100% renewable hydroelectric and geothermal energy. 
Natural cooling advantages in subarctic climate.", partner: "Verne"

location: "Modi'in, Israel", region: "middle-east", powerMW: 8, powerGW: 0.008,
gpuModel: "NVIDIA B200", status: "operational", onlineDate: "2025-09",
statusLabel: "Online Date: 2025-09",
description: "8 MW colocation at Mega Or/Mega DC facility. 
Deployed 4,000 NVIDIA GPUs. Hosts part of Israel's national supercomputer via Israel 
Innovation Authority. Expanding with 80 MW across Masmiyya (22 MW) and Beit Shemesh (58 MW).",
partner: "Mega Or/Mega DC"

location: "Masmiyya & Beit Shemesh, Israel", region: "middle-east",
powerMW: 80, powerGW: 0.08, gpuModel: "NVIDIA GPU", status: "construction",
onlineDate: "2026-09", statusLabel: "Under Construction (Planned Online: 2026-09)",
description: "Major 80 MW expansion across two Mega Or sites: 
22 MW in Masmiyya, 58 MW in Beit Shemesh. $880M investment. 
5-year lease. Expandable to 64 MW (Masmiyya) and 222 MW (Beit Shemesh). 
Delivery Q3 2026 through Q1 2027.", partner: "Mega Or/Mega DC"





