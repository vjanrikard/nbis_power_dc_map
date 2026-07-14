# Scan — Alpha Portal Analyst Ratings

Daily analyst-ratings scan for Nebius (NBIS). Searches curated sources,
filters for material rating changes, prepends entries to the analyst log,
and commits/pushes to GitHub. Runs as a Cowork scheduled task driven by
Alpha.

> Sister task to `monitor/`. The scan **adds** new ratings; the monitor
> **verifies** that the scan keeps adding ratings.

> This is the **analyst** view of NBIS sentiment. Its sibling scan
> `nbis_power_dc_map/v1.0/scan/` covers data center construction events.
> Both scans run from the same morning batch but write to different logs.

---

## What it does

1. Searches the sources in **sources.md** for NBIS analyst-rating mentions in the last 24 hours.
2. Filters hits to material changes only (action verbs, rating tags, target moves, initiations).
3. Prepends one Markdown entry per material hit to `alpha/ANALYST_RATINGS_LOG.md`.
4. Commits and pushes to GitHub if any entries were added.
5. Posts a daily NBIS ANALYST SCAN briefing to chat (or a single "no changes" line on quiet days).

It does **not** modify `alpha/data/analysts.json`. Structural changes (a new
firm starts coverage, a firm drops, a rating contradicts existing data) are
flagged as follow-up tasks for the operator to review and apply manually.

---

## Files in this folder

| File                  | Role                                                                  |
|-----------------------|-----------------------------------------------------------------------|
| README.md             | This file — operator overview                                         |
| scheduled_task.md     | The Alpha prompt the scheduled task runs (full step-by-step spec)     |
| sources.md            | Curated source list, grouped into 5 tiers + standing fallback queries |
| update_technicals.js  | **Tab 2 + 3 updater** — computes all Pine-equivalent indicators (RSI, Stoch, W%R, MACD, AO, MOM, ADX, EMA21/50/200, ATR%, session VWAP, vol spike, bull/bear score) from Yahoo Finance and rewrites `data/technicals.json` + the `marketData` block in `data/analysts.json`. Run from repo root: `node alpha/scan/update_technicals.js` (add `--push` to commit, push and trigger a Pages build). Recommended: daily after US close, e.g. 22:15 local. Remember to bump `SHARES_OUTSTANDING` in the script after dilution events. |

---

## How to trigger

### As scheduled task (after activation)

Runs automatically every morning at **07:10 local time**. No operator action needed.

### Ad-hoc (any time, before or after activation)

```
op — run nbis-analyst-ratings-daily-scan now
```

Useful for:

- Testing changes to `sources.md` or the prompt itself
- Catching up after a paused period (manually widen the search window)
- Re-running after a known rating event hits the wires

### Pause / resume

```
op — pause nbis-analyst-ratings-daily-scan
op — resume nbis-analyst-ratings-daily-scan
```

---

## Activation checklist

Run these in order. Activate **after** the Alpha Portal is live so the
`git push` flow keeps the analyst log fresh.

- [x] Verify the repo is pushed and the Alpha Portal renders Section 2. *(2026-07-14)*
- [x] Open **sources.md** and confirm tier-1 and tier-2 URLs are reachable. *(2026-07-14 — Benzinga/Bitget/moomoo used in first run; tipranks/stockanalysis/blockonomi returned 403/404 to automated fetch, fine via search)*
- [x] Run once ad-hoc: `op — run nbis-analyst-ratings-daily-scan now`. *(2026-07-14 — found 2 Northland events)*
- [x] Inspect new entries in `alpha/ANALYST_RATINGS_LOG.md` for quality. *(2026-07-14)*
- [x] Verify the commit landed: `git log --oneline -3`. *(6780e6c "Analyst scan 2026-07-14: 2 new ratings")*
- [x] Verify Pages re-deployed by reloading the Alpha Portal. *(2026-07-14)*
- [x] Activate the schedule: `op — register nbis-analyst-ratings-daily-scan`. *(2026-07-14 — registered as Claude scheduled task, daily 07:10)*
- [ ] Next morning: confirm the daily chat briefing arrives.

> Note (2026-07-14): the spec's TASKS.md follow-up mechanism is not set up —
> structural `analysts.json` changes are flagged in the chat briefing instead.

---

## Filter policy

Hits are kept only when **both** of these hold:

1. The body contains at least one keyword from the rating-change keyword list (see **scheduled_task.md** §Step 2).
2. The title or first 200 characters mention **Nebius** or **NBIS**.

Sector context (peer ratings, hyperscaler analyst notes) is read for awareness
but not logged. This keeps `ANALYST_RATINGS_LOG.md` focused.

---

## Commit policy

| What gets committed     | When                                                  |
|-------------------------|-------------------------------------------------------|
| `ANALYST_RATINGS_LOG.md` | At least one new material entry was prepended       |
| `sources.md`            | A new credible source was added during the same scan |
| `analysts.json`         | **Never** by this task — operator approval required  |

Commit message format: `Analyst scan YYYY-MM-DD: <N> new ratings`.

If the commit or push fails, the scan posts a chat error and stops — it does
not retry silently. This avoids drift between the local log and the published
Alpha Portal.

---

## How to tune later

- **Too many false positives:** add a "must mention 'price target' OR rating verb in headline" rule, or remove a low-signal source from **sources.md**.
- **Missed events:** add new keywords to the filter, or add new sources to the matching tier in **sources.md**.
- **Too noisy commit history:** switch to weekly digest by changing the schedule to `Mon 07:10` and widening the search window to 7 days.
- **Pre-market run for European trade desks:** add a second schedule at `04:10 local`; label briefings as early vs. main run.

---

## Related

- **monitor/** — Daily health check. Verifies the scan keeps adding entries. If the scan stops, the monitor alarms within `STALE_DAYS` (default: 7).
- **DOCS.md §Scan & Monitor** — Architecture overview.
- **CLAUDE.md** — Operator policies (autonomy limits, NBIS briefing template, tool priorities).
- **nbis_power_dc_map/v1.0/scan/** — Sister scan for DC construction events. Runs at 07:05 (5 min before this one).
