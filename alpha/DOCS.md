# Alpha Portal — Detailed Documentation

Companion to `README.md`. This file goes deeper on architecture, data flow,
operator playbook, and tuning. For a quick start, see `README.md`.

---

## 1. Architecture overview

The Alpha Portal is a single-page application served from GitHub Pages. It
combines static HTML/CSS/JS with three categories of data sources:

1. **Local JSON files** (`data/*.json`) — operator-curated, manually reviewed.
2. **Live computed** — `Section 5 (Capacity)` reads `../v1.0/data.js` at page load and aggregates by status/region.
3. **Embedded iframes** — `Section 1 (Power Map)` and `Section 4 (Macro)` embed sibling pages.

See `ARCHITECTURE.svg` for the data-flow diagram.

---

## 2. Sections in detail

### Section 1 — Power Map

Iframe of `../v1.0/`. Provides geographic context for every analytical section
that follows. No JS, no data fetch — the iframe handles its own loading.

### Section 2 — Analyst Consensus

The most data-rich section. Three blocks:

1. **Market data row** (price / 52w range / market cap / volume) with explicit `as of` stamp from `analysts.json.marketData.asOf`.
2. **Consensus row** (rating / avg target / high / low) — computed at runtime using the **"latest per firm"** rule: only the most recent rating per firm counts toward the aggregate. This matches the Python CLI's logic exactly.
3. **Ratings table** with all 10 ratings, sortable by clicking column headers, with visual upside bars and target-change arrows (▲/▼).

Sort state lives in JS (`AN_SORT = { key, dir }`) and is preserved while the
language toggle flips. Default sort: date desc.

### Section 3 — Technical Dashboard

Reads `data/technicals.json`. Shows score cards (bull/bear/verdict) and an
indicator grid. Designed to host a TradingView widget embed once the operator
chooses one. Currently null-padded for any indicator not retrieved by the
last refresh — per the "verifiable numbers" rule.

### Section 4 — FED Macro Terminal

Iframe of `https://vjanrikard.github.io/fed_macro_terminal/`. Live FRED feed
(rates, inflation, labor, credit spreads). Heading rendered in green to match
the terminal's live-indicator color.

### Section 5 — Capacity Tracker

Reads `../v1.0/data.js` (loaded via `<script src>` tag) and computes:

- Total sites
- MW per status (Online / Construction / Planned)
- MW per region (Americas / Europe / Middle East / APAC)

No persistence — every page load re-runs the computation. So the capacity
view stays in sync with the map automatically.

### Section 6 — News Feed

Fetches `../v1.0/NEBIUS_POWER_DC_MAP_LOG.md` over HTTP, parses Markdown
headings (`## YYYY-MM-DD — title`) into entries, and renders the most
recent 25. Daily DC scan (07:05) keeps this fresh.

### Section 7 — Investment Thesis

Static markup: bull case, bear case, quarterly checklist, top-4 critical
risks. Updated manually after each earnings call. The checklist questions
come straight from `CLAUDE.md` §Kvartals_rapport_sjekkliste.

---

## 3. Data files

| File                  | Owner            | Update flow                                             |
|-----------------------|------------------|---------------------------------------------------------|
| `data/analysts.json`  | Operator (manual)| Edited after a logged rating event clears review        |
| `data/technicals.json`| Operator (manual)| Edited after Pine Script export or web check           |
| `data/i18n.json`      | Operator (manual)| Edited when adding new UI strings                       |
| `ANALYST_RATINGS_LOG.md`| Scan (auto)    | Append-only by `nbis-analyst-ratings-daily-scan`        |

The split between `analysts.json` (curated) and `ANALYST_RATINGS_LOG.md`
(append-only auto-log) is deliberate. The scan never writes to `analysts.json`
directly — every consensus number must be traceable to a logged event the
operator approved.

---

## 4. Scan & Monitor

Two paired scheduled tasks:

| Task                                  | Cron       | Role                                                            |
|---------------------------------------|------------|-----------------------------------------------------------------|
| `nbis-analyst-ratings-daily-scan`     | `10 7 * * *` | Searches sources, prepends material entries to `ANALYST_RATINGS_LOG.md`, commits/pushes |
| `nbis-analyst-ratings-daily-check`    | `35 7 * * *` | Runs `monitor_check.py`. Alarms via chat + email if STALE_DATA or PAGES_DOWN |

Each has a sister task for the DC map (same pattern, different files):

| DC task                            | Cron       |
|------------------------------------|------------|
| `nbis-power-dc-map-daily-scan`     | `5 7 * * *`  |
| `nbis-power-dc-map-daily-check`    | `30 7 * * *` |

So the morning sequence is: 07:05 DC scan → 07:10 analyst scan → 07:30 DC
check → 07:35 analyst check. All four are silent on green.

See `scan/README.md` and `monitor/README.md` for operational detail.

---

## 5. Bilingual handling

Default language is **English**. UI strings flow through `data/i18n.json`
which has both `en` (default) and `no` blocks with the same keys. The
language toggle in the header sets `data-lang` on `<html>` and re-runs
the i18n applier:

```js
function applyLang(lang) {
  CURRENT_LANG = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
}
```

Static text in the HTML is the English fallback. If a translation is missing
in the JSON, the English text remains.

**Rule:** all file content is English. Norwegian only appears via the
`data-i18n` toggle path or in chat with the operator.

---

## 6. Visual / styling tokens

The portal mirrors the v1.0 map exactly:

| Token         | Value     | Used for                              |
|---------------|-----------|---------------------------------------|
| `--bg`        | `#0a0e1a` | page background                       |
| `--surface`   | `#111827` | cards / nav                           |
| `--surface2`  | `#1a2235` | alternating rows / inputs             |
| `--border`    | `#1e3a5f` | dividers                              |
| `--teal`      | `#00d4ff` | primary accent (logo, links, headings)|
| `--green`     | `#22c55e` | bullish / online / FED MACRO TERMINAL |
| `--amber`     | `#f59e0b` | construction / market data as-of      |
| `--blue`      | `#60a5fa` | planned                               |
| `--red`       | `#ef4444` | bearish / down                        |

Cross-nav between v1.0 and alpha uses the `.cross-nav-btn` class — same in
both pages so users feel one app.

---

## 7. Source: Python CLI

The original analyst-ratings data ships from a Python CLI at
`C:\GitHub\vjanrikard\Finance\Nebius\nbis_analyst_ratings\nbis_analysts_ratings.py`.
The CLI's `RATINGS` array seeded `data/analysts.json`. Verification:

| Metric                  | Python CLI | Alpha Portal | Match |
|-------------------------|-----------|---------------|-------|
| Ratings rows            | 10        | 10            | ✅     |
| Firms (latest per firm) | 4         | 4             | ✅     |
| Avg target              | $182.75   | $182.75       | ✅     |
| High target             | $211      | $211          | ✅     |
| Low target              | $120      | $120          | ✅     |
| Upside avg              | +24.2%    | +24.2%        | ✅     |

The CLI remains the source of truth for the snapshot dated 2026-04-25.
Going forward, daily scans append to `ANALYST_RATINGS_LOG.md` and the
operator flips changes into `analysts.json` after review.

---

## 8. Operator policies (from CLAUDE.md)

These cross-cutting rules govern Alpha's behavior on this project:

1. **Activate with `op`, deactivate with `stop`.** Reply "Roger that." / "Alpha standing down."
2. **Reply in Norwegian in chat.** All file content stays in English.
3. **Never autonomously edit `analysts.json` or `data.js`.** Operator must approve.
4. **Only verifiable numbers.** `null` over a guess. Every value has a source URL or note.
5. **Append-only logs.** Never delete or rewrite past entries — prepend new ones above.
6. **Silent on green.** Monitors only chat/email when something is actually wrong.
7. **Stagger schedules.** DC tasks at 07:05/07:30, analyst tasks at 07:10/07:35.

---

## 9. Roadmap

Items pulled from CLAUDE.md §Alpha Portal — roadmap, with current status:

| Section | Status | Next action |
|---------|--------|-------------|
| 1. Power Map | ✅ Live | — |
| 2. Analyst Consensus | ✅ Live (seeded from CLI) | Wire daily scan auto-update |
| 3. Technical | 🟡 Stub structure | TradingView embed + Pine Script export pipe |
| 4. Macro | ✅ Live (iframe) | — |
| 5. Capacity | ✅ Live (computed) | — |
| 6. News | ✅ Live (parses log) | — |
| 7. Thesis | ✅ Live (static) | Auto-refresh quarterly checklist after each earnings |
| Bilingual | ✅ Live | Add NO copy for any new UI strings |

---

## 10. Troubleshooting

| Symptom                                         | Likely cause                                  | Fix                                                  |
|-------------------------------------------------|-----------------------------------------------|------------------------------------------------------|
| Section 5 shows zeros for MW                    | `../v1.0/data.js` blocked by CORS/path        | Verify the iframe / script path is relative; redeploy |
| Section 6 stays empty                           | `NEBIUS_POWER_DC_MAP_LOG.md` not yet committed| Run DC scan manually: `op — run nbis-power-dc-map-daily-scan now` |
| Sortable columns don't sort                     | JS error in `wireSortHandlers()`              | Open browser DevTools console; check for stale cache |
| Macro tab is blank / shows error                | Fed Macro Terminal Pages is down               | Open `vjanrikard.github.io/fed_macro_terminal` directly to verify |
| Monitor alarms STALE_DATA but log is fresh      | GitHub API rate-limited (60 req/h public)      | Set `GITHUB_TOKEN` env var in the scheduled task     |
| Monitor alarms PAGES_DOWN but page loads in browser | Pages CDN not yet refreshed                | Hard-refresh; if persistent check `actions/pages` deploy log |

---

## 11. Related documentation

- `README.md` — quick start
- `ARCHITECTURE.svg` — visual data-flow diagram
- `ANALYST_RATINGS_LOG.md` — append-only ratings log
- `scan/README.md`, `scan/scheduled_task.md`, `scan/sources.md` — scan operator docs
- `monitor/README.md`, `monitor/scheduled_task.md` — monitor operator docs
- Project root `README.md` — landing page
- Project root `.claude/CLAUDE.md` — operator policies
- `v1.0/DOCS.md` — sister doc for the map view
