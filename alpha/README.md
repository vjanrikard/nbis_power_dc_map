# Alpha Portal — NBIS Analyst Hub

Companion view to the **Nebius Power DC Map** (`v1.0/`). Provides analyst
consensus, technical indicators, macro context, capacity rollup, news feed,
and an investment thesis page — all wired to the same daily scan/monitor
pattern as the map.

**Live URL:** https://vjanrikard.github.io/nbis_power_dc_map/alpha/

---

## What's in here

| Section | Source                                          | Update cadence            |
|---------|-------------------------------------------------|---------------------------|
| 1. Power Map        | iframe of `../v1.0/`                | Whatever the map updates  |
| 2. Analyst Consensus| `data/analysts.json` + `ANALYST_RATINGS_LOG.md` | Daily scan at 07:10 local |
| 3. Technical        | `data/technicals.json`              | Manual / Pine Script export |
| 4. FED Macro Terminal| iframe of `vjanrikard.github.io/fed_macro_terminal/` | Live FRED feed |
| 5. Capacity         | live computed from `../v1.0/data.js` | Whenever the map updates  |
| 6. News             | parses `../v1.0/NEBIUS_POWER_DC_MAP_LOG.md` | Daily DC scan at 07:05 |
| 7. Thesis           | static markup + checklist           | Manual review per quarter |

The portal is bilingual — English by default, Norwegian via the 🇳🇴/🇬🇧 toggle
in the header. UI strings are in `data/i18n.json`. All file content (HTML, JS,
JSON, docs) is in English; chat replies between the operator and Alpha stay
in Norwegian.

---

## File layout

```
alpha/
├── README.md                  ← this file
├── DOCS.md                    ← detailed architecture + operator playbook
├── ARCHITECTURE.svg           ← visual data-flow diagram
├── ANALYST_RATINGS_LOG.md     ← append-only rating-change log
├── index.html                 ← single-page portal with 7 tabs
├── style.css                  ← matches v1.0 dark navy / teal tokens
├── data/
│   ├── analysts.json          ← 10 ratings + market data + as-of stamps
│   ├── technicals.json        ← RSI, MACD, ATR snapshot
│   └── i18n.json              ← EN (default) + NO translations
├── monitor/
│   ├── monitor_check.py       ← health check (Python 3.8+, stdlib only)
│   ├── README.md              ← operator overview for the monitor
│   └── scheduled_task.md      ← Alpha prompt for the daily Cowork task
└── scan/
    ├── README.md              ← operator overview for the scan
    ├── sources.md             ← curated analyst-rating source tiers
    └── scheduled_task.md      ← Alpha prompt for the daily Cowork task
```

---

## Quick start

### Open locally

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map
start alpha/index.html
```

Or use VS Code Live Server on the project root and navigate to `/alpha/`.

### Push to GitHub Pages

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map
git add alpha/
git commit -m "alpha: <one-line summary>"
git push
```

GitHub Pages re-deploys within ~30 seconds. Hard-refresh (Ctrl+F5) to see
changes.

### Run a manual scan

```
op — run nbis-analyst-ratings-daily-scan now
```

This invokes the Alpha prompt in `scan/scheduled_task.md` outside of the cron
schedule.

### Run the health check locally

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map\alpha\monitor
python monitor_check.py
```

Exit code 0 = OK, 1 = ALARM, 2 = ERROR. JSON report on stdout.

---

## Daily flow

```
07:05  nbis-power-dc-map-daily-scan     → appends to v1.0/NEBIUS_POWER_DC_MAP_LOG.md
07:10  nbis-analyst-ratings-daily-scan  → appends to alpha/ANALYST_RATINGS_LOG.md
07:30  nbis-power-dc-map-daily-check    → verifies map data + Pages
07:35  nbis-analyst-ratings-daily-check → verifies analyst data + Pages
```

All four tasks are silent on green and alarm via chat + email on alarm.

---

## Data freshness rules

Per the operator's "only verifiable numbers" policy:

- Every value in `data/*.json` must have a traceable source.
- Unknown values stay `null` with a `note` explaining the gap — never filled with plausible guesses.
- Each JSON has a `lastUpdate` and `lastUpdateSource` field.
- Market data carries an explicit `asOf` date — staleness is visible in the UI.
- The scan **never** writes to `analysts.json` directly. Structural changes are queued for operator review.

---

## Cross-links

- **v1.0 map** — `../v1.0/index.html` (the geographic view)
- **DOCS.md** — full architecture, alarm channels, tuning, runbook
- **CLAUDE.md** (project root) — operator policies, NBIS briefing template, tool priorities
- **nbis-analyst-ratings (source script)** — `C:\GitHub\vjanrikard\Finance\Nebius\nbis_analyst_ratings` — the Python CLI that originally produced this data; ported into `data/analysts.json`

---

## Status

**Section 2 (Analyst Consensus):** wired to live data, 10 ratings, 4 firms,
sortable table with upside bars and target-change arrows. Consensus uses
"latest per firm" rule — matches the Python CLI exactly ($182.75 avg, +24.2% upside).

**Sections 3, 7:** populated from manual JSON / static markup. Auto-refresh
via MCP feeds is roadmap for v2.1.

**Sections 1, 4, 5, 6:** live (iframe / computed / parsed) — no manual upkeep needed.

---

## License

Private project. See repository root LICENSE for terms.
