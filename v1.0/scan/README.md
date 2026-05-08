# Scan — Nebius Power DC Map (v1.0)

Daily news scan for the Nebius (NBIS) data center portfolio. Searches
curated sources, filters for material changes, prepends entries to the
map change log, and commits/pushes to GitHub. Runs as a Cowork scheduled
task driven by Alpha.

> Sister task to `monitor/`. The scan **adds** new information; the monitor
> **verifies** that the scan keeps adding information.

> This is the **map** view of Nebius's data center portfolio. Its sibling
> project `nbis_construction_monitor` provides the **dashboard** view of the
> same data. Both scans share the same source list (sources.md) and
> filter policy.

---

## What it does

1. Searches the sources in **sources.md** for Nebius mentions in the last 24 hours.
2. Filters hits to material changes only (capacity, status, permit, partner, opposition, earnings, new site).
3. Prepends one Markdown entry per material hit to `v1.0/NEBIUS_POWER_DC_MAP_LOG.md`.
4. Commits and pushes to GitHub if any entries were added.
5. Posts a daily NBIS UPDATE briefing to chat (or a single "no changes" line on quiet days).

It does **not** modify `v1.0/data.js`. Site-object changes (lat/lng for new
sites, MW updates, status flips) are flagged as follow-up tasks for the
operator to review and apply manually.

---

## Files in this folder

| File              | Role                                                                 |
|-------------------|----------------------------------------------------------------------|
| README.md         | This file — operator overview                                        |
| scheduled_task.md | The Alpha prompt the scheduled task runs (full step-by-step spec)    |
| sources.md        | Curated source list, grouped into 7 tiers + per-site regional press  |

---

## How to trigger

### As scheduled task (after activation)

Runs automatically every morning at **07:05 local time**. No operator action needed.

### Ad-hoc (any time, before or after activation)

```
op — run nbis-power-dc-map-daily-scan now
```

This invokes the same prompt outside the schedule. Useful for:
- Testing changes to `sources.md` or the prompt itself
- Running a catch-up scan after a paused period (manually widen the search window)
- Re-running on demand after breaking news

### Pause / resume

```
op — pause nbis-power-dc-map-daily-scan
op — resume nbis-power-dc-map-daily-scan
```

---

## Activation checklist

Run these in order. The scan should be activated **after** GitHub Pages is live
(so the same `git push` flow keeps the map fresh).

- [ ] Verify the repo is pushed and Pages is live (see root **README.md**).
- [ ] Open **sources.md** and confirm all tier-1 and tier-2 URLs are reachable.
- [ ] Run once ad-hoc: `op — run nbis-power-dc-map-daily-scan now`.
- [ ] Inspect the new entries in `NEBIUS_POWER_DC_MAP_LOG.md` for quality.
- [ ] Verify the commit landed: `git log --oneline -3`.
- [ ] Verify Pages re-deployed by reloading the map URL.
- [ ] Activate the schedule: `op — register nbis-power-dc-map-daily-scan`.
- [ ] Next morning: confirm the daily chat briefing arrives.

---

## Filter policy

Hits are kept only when **both** of these hold:

1. The body contains at least one keyword from the material-change keyword list (see **scheduled_task.md** §Step 2).
2. The title or first 200 characters mention **Nebius** or **NBIS**.

Sector context (other hyperscalers, AI infra commentary) is read for awareness
but not logged. This keeps `NEBIUS_POWER_DC_MAP_LOG.md` focused.

---

## Commit policy

| What gets committed | When                                                           |
|------------------------------|-------------------------------------------------------|
| `NEBIUS_POWER_DC_MAP_LOG.md` | At least one new material entry was prepended         |
| `sources.md`                 | A new credible source was added during the same scan  |
| `data.js`                    | **Never** by this task — operator approval required   |

Commit message format: `Daily scan YYYY-MM-DD: <N> new entries`.

If the commit or push fails, the scan posts a chat error and stops — it does
not retry silently. This avoids drift between the local log and the published
map.

---

## How to tune later

- **Too many false positives:** add `"Nebius" must appear in title` rule, or remove a low-signal source from **sources.md**.
- **Missed events:** add new keywords to the filter, or add new sources to the matching tier in **sources.md**.
- **Too noisy commit history:** switch to weekly digest by changing the schedule to `Mon 07:05` and widening the search window to 7 days.
- **Want pre-market run for European news:** add a second schedule at `04:00 local`; adjust the chat briefing to label early vs. main run.

---

## Related

- **monitor/** — Daily health check. Verifies the scan keeps adding entries. If the scan stops, the monitor alarms within 2 days.
- **DOCS.md §10** — Monitoring overview.
- **CLAUDE.md** — Operator policies (autonomy limits, NBIS briefing template, tool priorities).
- **nbis_construction_monitor** — Sister project; shares this same source list and filter policy. The two scans can be run in parallel or back-to-back.
