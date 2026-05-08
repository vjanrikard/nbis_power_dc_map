# Scheduled task — `nbis-power-dc-map-daily-scan`

Cowork scheduled task spec. Activate **after** the v1.0 repo is pushed and the
operator has confirmed the source list in **sources.md** is current.

---

## Task metadata

| Field          | Value                                                                      |
|----------------|----------------------------------------------------------------------------|
| Name           | nbis-power-dc-map-daily-scan                                               |
| Schedule       | Daily at **07:05 local time** (25 minutes before the monitor health check) |
| Owner          | Alpha (RikardV)                                                            |
| Activation     | `op — register nbis-power-dc-map-daily-scan`                               |
| Deactivation   | `op — pause nbis-power-dc-map-daily-scan`                                  |
| Manual trigger | `op — run nbis-power-dc-map-daily-scan now`                                |

---

## Task prompt (what Alpha runs every morning)

> Run the daily Nebius Power DC Map news scan.
>
> ### Step 1 — Discover candidate news
>
> Issue `web_search` queries from the **Fallback** section of `v1.0/scan/sources.md`, restricted to the last **24 hours**. 
> In addition, for each Nebius site listed in `v1.0/data.js` (`SITES`), run one targeted query of the form `"Nebius" "<site city>"`.
>
> Collect the top 5 hits per query. Deduplicate by URL.
>
> ### Step 2 — Filter for material content
>
> Drop any hit whose body does **not** contain at least one of the following material-change keywords:
>
> - **Capacity:** MW, megawatt, gigawatt, GW, capacity, expansion
> - **Status:** operational, online, energized, ground-breaking, broke ground, completed, delivered, delayed, slipped
> - **Permit / regulatory:** permit, zoning, variance, NJDEP, EJ Law, environmental review, vote, approved, denied
> - **Partner / contract:** signed, deal, contract, partnership, anchor, lease, $XB, $X.XB
> - **Opposition / community:** protest, opposition, residents, community, lawsuit, blocked
> - **Earnings / financing:** earnings, guidance, ARR, EBITDA, convertible, debt, equity, raised, issuance
> - **New site:** announced, plans to build, breaks ground, construction starts
>
> Drop any hit that does not name **Nebius** (or **NBIS**) in the title or
> first 200 characters of the body — sector context is fine to read but does
> not warrant a log entry on its own.
>
> ### Step 3 — Compose log entries
>
> For each remaining hit, draft one entry in the canonical format:
>
> ```
> ## YYYY-MM-DD — short headline
>
> **Site** — what changed in 1–2 sentences. ([Source title](URL))
> ```
>
> Use today's date in `YYYY-MM-DD`. Keep the headline under 80 characters.
> The 1–2 sentences must answer: *what changed* and *why it matters*.
>
> ### Step 4 — Prepend to the log
>
> Open `C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map\v1.0\NEBIUS_POWER_DC_MAP_LOG.md`
> and prepend the new entries **above** the existing top section. Do not touch
> the manual seed block at the bottom. Do not modify `data.js`.
>
> If a new entry implies a site-object change (e.g. status flip, MW change,
> new lat/lng for a brand-new site) → add a follow-up to TASKS.md asking the
> operator to update the matching object in `v1.0/data.js`.
>
> ### Step 5 — Commit and push
>
> If at least one new entry was prepended:
>
> ```bash
> cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map
> git add v1.0/NEBIUS_POWER_DC_MAP_LOG.md
> git commit -m "Daily scan YYYY-MM-DD: <N> new entries"
> git push
> ```
>
> Replace `<N>` with the count and `YYYY-MM-DD` with today's date. Do not
> stage other files. If the commit or push fails, log the error and post a
> chat note — do not retry silently.
>
> ### Step 6 — Chat summary
>
> Post one of two messages in chat:
>
> - **Hits found:** Use the NBIS UPDATE template:
>
>   ```
>   NBIS DAILY SCAN — <YYYY-MM-DD>
>   ─────────────────────────────────────
>   Headline       : <N> new material entries appended to map log
>   Why it matters : <one-line summary of the most important entry>
>   Evidence       : <bullet list, one line per entry: site — headline>
>   Possible impact: <bull / bear / neutral overall>
>   Follow-ups     : <task IDs created in TASKS.md, if any>
>   ```
>
> - **No hits:** Single line — `NBIS DAILY SCAN <YYYY-MM-DD>: no material changes today.`
>
> ### Step 7 — Defensive notes
>
> - Never modify `data.js` autonomously (operator approval rule from CLAUDE.md).
> - Never delete or rewrite existing log entries — append-only above existing.
> - If a `web_search` call returns 0 results across all queries, post:
>   `NBIS DAILY SCAN <YYYY-MM-DD>: search returned 0 results — investigate.`
>   This usually means the search backend is down, not that the world stopped.
> - On any unhandled error, abort, post a one-line chat error, and add a TASKS
>   entry: `Investigate nbis-power-dc-map-daily-scan failure on <date>`.

---

## Why these defaults

- **07:05 local** is before market open in Europe and well before the US session,
  so any overnight wire stories make it into the morning brief.
- **24-hour search window** is the smallest window that survives a missed run
  without losing coverage. If the task is paused for >1 day, run it manually
  with a wider window first.
- **Strict filter + earnings (Tier 3 in scope)** matches the operator's choice
  in setup — keeps log focused on construction events plus financing/guidance
  shifts that move the thesis.
- **Auto-commit + push** keeps the public map's log in sync without
  daily operator intervention; the monitor task verifies this 25 minutes later.
- **Never touch data.js** preserves the audit trail — every site-object change
  must be approved by the operator with explicit `op` activation.

---

## Test plan (before relying on it)

1. Run manually first: `op — run nbis-power-dc-map-daily-scan now`.
2. Verify new entries (if any) are in `NEBIUS_POWER_DC_MAP_LOG.md` and look
   well-formed.
3. Verify the commit landed: `git log --oneline -3`.
4. Verify the push succeeded: `gh repo view --web` and check the log file.
5. Wait 25 minutes and verify the monitor task is silent (because data.js
   may not have changed — only the log did; this is fine).
6. Activate the schedule: `op — register nbis-power-dc-map-daily-scan`.

---

## Coordination with `nbis_construction_monitor`

The sister project's scan (`nebius-construction-daily-scan`) and this scan share
sources, filter policy, and run order. To avoid duplicated chat noise on quiet
days, you may:

- Stagger the schedules: construction-monitor at **07:05**, power-dc-map at
  **07:10** (5 min later) so the chat summary tells you which view changed.
- Or run them in series from a parent task and post a single combined briefing.

Either is fine. The default in this spec is **07:05 in parallel** for
simplicity; coordinate later if it gets noisy.

---

## Tuning later

- If too many false positives, add a "must mention Nebius in headline" rule.
- If too many missed events, broaden the keyword list in Step 2 or add new
  domains to **sources.md**.
- If commits become noisy, batch entries weekly instead of daily — change
  schedule to `Mon 07:05` and widen the search window to 7 days.
