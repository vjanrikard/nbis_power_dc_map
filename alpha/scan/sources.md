# Sources — `nbis-analyst-ratings-daily-scan`

Curated source list for the daily NBIS analyst-ratings scan that powers the
**Alpha Portal — Analyst Consensus** view. Focused on broker price targets,
rating changes, and analyst commentary (not company news — that's covered by
`nbis_power_dc_map/v1.0/scan/sources.md`).

> Update policy: append-only. When a new credible analyst-data source surfaces
> in a scan result, add it here in the matching tier and commit. Do not remove
> tiers — they drive the scan's query strategy.

---

## Tier 1 — Aggregator dashboards

Highest signal. Consolidate ratings from many analysts in one place — primary
hits go here first.

- https://www.tipranks.com/stocks/nbis/forecast
- https://www.marketbeat.com/stocks/NASDAQ/NBIS/forecast/
- https://stockanalysis.com/stocks/nbis/forecast/
- https://www.benzinga.com/quote/NBIS/analyst-ratings
- https://www.marketscreener.com/quote/stock/NEBIUS-GROUP-8037501/consensus/
- https://public.com/stocks/nbis/forecast-price-target
- https://www.investing.com/equities/yandex-nv-consensus-estimates

---

## Tier 2 — Bank / broker research notes (the firms covering NBIS)

Direct sources for the firms in `analysts.json`. When a new note drops, the
firm's own research portal or a wire pickup is the highest-signal mention.

- https://www.gs.com/insights (Goldman Sachs)
- https://www.dadavidson.com/Research-Insights (DA Davidson)
- https://www.bwsfinancial.com/research (BWS Financial)
- https://www.northlandcapitalmarkets.com/research (Northland Capital Markets)
- https://www.zacks.com/stock/research/NBIS/all-recommendations

---

## Tier 3 — Wire & financial press (rating-change pickups)

Daily news flow. Pick up upgrade/downgrade headlines, target changes, and
initiation announcements.

- https://www.reuters.com
- https://www.cnbc.com
- https://finance.yahoo.com/quote/NBIS
- https://seekingalpha.com/symbol/NBIS
- https://www.streetinsider.com
- https://www.thefly.com
- https://www.thestreet.com

---

## Tier 4 — Earnings / call transcripts (timing context)

Around earnings dates the rating churn spikes. Use these to find quotes that
explain why a target moved.

- https://seekingalpha.com/symbol/NBIS/earnings
- https://www.fool.com/quote/nasdaq/nbis
- https://nebius.com/investor-relations

---

## Tier 5 — Sector context (peer ratings)

Analyst behavior on competitors (CRWV, IREN, hyperscaler reporting partners)
sometimes signals an NBIS revision is coming. Out of scope for direct logging
but useful for query expansion.

- https://www.tipranks.com/stocks/crwv/forecast
- https://www.tipranks.com/stocks/iren/forecast

---

## Fallback — generic web search

When tier 1–4 yields no fresh hits, fall back to `web_search` with these
standing queries (date-filtered to the last 24 hours):

- `"Nebius" OR "NBIS" analyst rating`
- `"Nebius" OR "NBIS" price target`
- `"Nebius" OR "NBIS" upgrade OR downgrade`
- `"Nebius" OR "NBIS" initiation OR initiated coverage`
- `"Nebius" OR "NBIS" "Buy" OR "Hold" OR "Sell" rating`
- `"Goldman Sachs" OR "DA Davidson" OR "BWS Financial" OR "Northland Capital" Nebius`
- `"Nebius" Outperform OR Underperform OR Overweight OR Underweight`

---

## Sources NOT in this list (and why)

- **Bloomberg / WSJ / FT** — paywalled, scan cannot reliably read body. Add only if a paid feed is wired in.
- **Twitter / X** — analyst alpha frequently leaks here, but signal quality is too low and attribution is hard. Out of scope.
- **TipRanks Premium API** — out of scope until a paid key is wired in. Free dashboard pages cover most rating updates.

---

## Maintenance

- After each material rating event, check whether the source URL belongs to a
  domain already in this list. If not, add it under the right tier in the same
  commit that appends to `ANALYST_RATINGS_LOG.md`.
- Quarterly: prune Tier 5 entries that have produced zero hits in the last 90 days.
- When a new firm starts covering NBIS, add their research portal under Tier 2.
- Keep `analysts.json` in sync — when a new firm lands in `ANALYST_RATINGS_LOG.md`,
  ensure their next rating shows up in `ratings[]` so the consensus updates.
