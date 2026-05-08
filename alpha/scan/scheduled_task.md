# Scheduled task — `nbis-analyst-ratings-daily-scan`

Cowork scheduled task spec. Activate **after** the Alpha Portal is live and
the operator has confirmed `sources.md` is current.

---

## Task metadata

| Field          | Value                                                                                                    |
|----------------|----------------------------------------------------------------------------------------------------------|
| Name           | nbis-analyst-ratings-daily-scan                                                                          |
| Schedule       | Daily at **07:10 local time** (5 minutes after the power-DC scan, 20 before the analyst-ratings monitor) |
| Owner          | Alpha (RikardV)                                                                                          |
| Activation     | `op — register nbis-analyst-ratings-daily-scan`                                                          |
| Deactivation   | `op — pause nbis-analyst-ratings-daily-scan`                                                             |
| Manual trigger | `op — run nbis-analyst-ratings-daily-scan now`                                                           |

---

## Task prompt (what Alpha runs every morning)

> Run the daily NBIS analyst-ratings scan.
>
> ### Step 1 — Discover candidate ratings
>
> Issue `web_search` queries from the **Fallback** section of
> `alpha/scan/sources.md`, restricted to the last **24 hours**. In addition,
> for each firm currently listed in `alpha/data/analysts.json` (`ratings[].firm`),
> run one targeted query of the form `"<firm>" "Nebius" OR "NBIS"`.
>
> Collect the top 5 hits per query. Deduplicate by URL.
>
> ### Step 2 — Filter for material content
>
> Drop any hit whose body does **not** contain at least one of the following
> rating-change keywords:
>
> - **Action:** maintains, reiterates, raises, lowers, upgrades, downgrades, initiates, initiation, drops coverage
> - **Rating:** Buy, Sell, Hold, Outperform, Underperform, Overweight, Underweight, Neutral, Strong Buy, Strong Sell
> - **Target:** price target, PT, target price, raises target, lowers target, $XXX target
> - **Coverage:** initiation, initiates coverage, starts coverage, resumes coverage
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
> ## YYYY-MM-DD — Firm — Action — $TARGET (▲/▼ vs prev) — Rating
>
> **Analyst:** Name. **Source:** [Title](URL).
>
> Brief 1–2 sentence quote or summary explaining the move.
> ```
>
> Use the rating-event date in `YYYY-MM-DD`. Keep the headline under 100 characters.
> The summary must answer: *what changed* and *why* (analyst's reasoning).
>
> ### Step 4 — Prepend to the log
>
> Open `C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map\alpha\ANALYST_RATINGS_LOG.md`
> and prepend the new entries **above** the existing top section. Do not touch
> the manual seed block at the bottom. Do not modify `analysts.json`
> autonomously.
>
> If a new entry implies a structural change to `analysts.json` (a firm starts
> coverage, a firm drops coverage, or a rating contradicts the existing
> `ratings[]` array) → add a follow-up to TASKS.md asking the operator to
> review and apply the change manually.
>
> ### Step 5 — Commit and push
>
> If at least one new entry was prepended:
>
> ```bash
> cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map
> git add alpha/ANALYST_RATINGS_LOG.md
> git commit -m "Analyst scan YYYY-MM-DD: <N> new ratings"
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
>   NBIS ANALYST SCAN — <YYYY-MM-DD>
>   ─────────────────────────────────────
>   Headline       : <N> new analyst ratings appended to log
>   Why it matters : <one-line summary of the most material rating change>
>   Evidence       : <bullet list, one line per entry: firm — action — $target>
>   Possible impact: <bull / bear / neutral overall>
>   Follow-ups     : <task IDs created in TASKS.md, if any>
>   ```
>
> - **No hits:** Single line — `NBIS ANALYST SCAN <YYYY-MM-DD>: no new ratings today.`
>
> ### Step 7 — Defensive notes
>
> - **Never** modify `analysts.json` autonomously (operator-approval rule from CLAUDE.md).
> - **Never** delete or rewrite existing log entries — append-only above existing.
> - If a `web_search` call returns 0 results across all queries, post:
>   `NBIS ANALYST SCAN <YYYY-MM-DD>: search returned 0 results — investigate.`
> - On any unhandled error, abort, post a one-line chat error, and add a TASKS
>   entry: `Investigate nbis-analyst-ratings-daily-scan failure on <date>`.
> - Each ANALYST_RATINGS_LOG entry must include a verifiable source URL.
>   No source = drop the entry. (Per the "only verifiable numbers" rule.)

---

## Why these defaults

- **07:10 local** runs 5 minutes after the power-DC scan (07:05) so the two
  briefings don't collide and you can read them in sequence.
- **24-hour search window** is the smallest window that survives a missed run
  without losing coverage. If the task is paused for >1 day, run it manually
  with a wider window first.
- **Analyst-only scope** keeps the log focused. Macro / construction events go
  to the other scan; thesis-shifting analyst commentary lands here.
- **Auto-commit + push** keeps the public Alpha Portal in sync without daily
  operator intervention; the monitor task verifies this 25 minutes later.
- **Never touch analysts.json** preserves the audit trail — every consensus
  number must be traceable to a logged event approved by the operator.

---

## Test plan (before relying on it)

1. Run manually first: `op — run nbis-analyst-ratings-daily-scan now`.
2. Verify new entries (if any) are in `ANALYST_RATINGS_LOG.md` and look well-formed.
3. Verify the commit landed: `git log --oneline -3`.
4. Verify the push succeeded: load https://vjanrikard.github.io/nbis_power_dc_map/alpha/ and check the news/log feed.
5. Wait 25 minutes and verify the monitor task is silent (because `analysts.json`
   may not have changed — only the log did; this is fine).
6. Activate the schedule: `op — register nbis-analyst-ratings-daily-scan`.

---

## Coordination with other scans

- `nbis-power-dc-map-daily-scan` (07:05) — DC construction events.
- `nbis-analyst-ratings-daily-scan` (07:10) — this one.
- `nbis-power-dc-map-daily-check` (07:30) — DC monitor.
- `nbis-analyst-ratings-daily-check` (07:35) — analyst monitor.

The two scans use different sources and emit independent briefings, so they
can run in parallel without contention. If you want a single combined morning
briefing, wrap them in a parent task that consolidates the two summaries.

---

## Tuning later

- If too many false positives, add a "must mention 'price target' OR rating verb in headline" rule.
- If too many missed events, broaden the keyword list in Step 2 or add new domains to **sources.md**.
- If commits become noisy, batch entries weekly instead of daily — change schedule to `Mon 07:10` and widen the search window to 7 days.
- When a new firm starts coverage, add them to Tier 2 of **sources.md** and the targeted-query loop in Step 1 picks them up automatically.
