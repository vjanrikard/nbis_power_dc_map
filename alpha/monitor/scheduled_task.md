# Scheduled task — `nbis-analyst-ratings-daily-check`

Cowork scheduled task spec. Activate **after** GitHub Pages is live.

---

## Task metadata

| Field        | Value |
|--------------|-------|
| Name         | `nbis-analyst-ratings-daily-check` |
| Schedule     | Daily at **07:35 local time** (25 minutes after `nbis-analyst-ratings-daily-scan`) |
| Owner        | Alpha (RikardV) |
| Activation   | `op — register nbis-analyst-ratings-daily-check` |
| Deactivation | `op — pause nbis-analyst-ratings-daily-check` |

---

## Task prompt (what Alpha runs every morning)

> Run the Alpha Portal analyst-data health check.
>
> 1. Execute the local script at
>    `C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map\alpha\monitor\monitor_check.py`
>    via `python monitor_check.py`. Capture stdout (JSON report) and the exit code.
>
> 2. **If exit code is 0** → do nothing. Stay silent. (Goal: no inbox noise on green.)
>
> 3. **If exit code is 1 (ALARM)** → do both of the following:
>
>    a. Post an `NBIS UPDATE` briefing in chat using the template from `CLAUDE.md`:
>
>    ```
>    NBIS ALPHA ALARM — <YYYY-MM-DD HH:MM>
>    ─────────────────────────────────────
>    Headline       : <STALE_DATA | PAGES_DOWN | both> on Alpha Portal
>    Why it matters : The Alpha Portal is the analytical view of NBIS sentiment.
>                     A stale or down portal means RikardV is flying blind into
>                     intra-day NBIS news with one of the two views down.
>    Evidence       : <one-line per failed check from the JSON `detail` field>
>    Pages URL      : https://vjanrikard.github.io/nbis_power_dc_map/alpha/
>    Possible impact: <bull / bear / neutral> — usually neutral (operational issue,
>                     not a thesis change).
>    Suggested fix  : <STALE_DATA → run analyst scan manually | PAGES_DOWN → check
>                     gh-pages build status, redeploy if needed>
>    ```
>
>    b. Send an email via the Gmail MCP to `vjanrikard@gmail.com`:
>       - Subject: `NBIS Alpha ALARM — <STALE_DATA|PAGES_DOWN|BOTH>`
>       - Body: the exact JSON payload from stdout, plus a one-line plain-English
>         summary at the top.
>
> 4. **If exit code is 2 (ERROR)** → post a short chat note: "NBIS Alpha monitor
>    itself failed: <error>". Do not send email (avoid noisy retries on transient
>    network problems). Add a follow-up todo: `Investigate nbis-analyst-ratings-monitor failure`.

---

## Why these defaults

- **07:35 local** runs *after* the 07:10 analyst scan, so a fresh log entry has
  time to be committed before staleness is judged.
- **Silent on green** keeps the alert channel meaningful — if you get a chat
  ping about NBIS Alpha, it's because something actually needs attention.
- **Both chat AND email on alarm** because Cowork chat may not be open when
  the alarm fires; email is a fallback.
- **STALE_DAYS=7** balances false positives (analyst-quiet weeks) against true
  detection (scan job genuinely broken). For DC events 2 days is right; for
  analyst events 7 days is right.

---

## Coordination with `nbis-power-dc-map-daily-check` (sister task)

The DC-monitor runs at 07:30 (5 minutes earlier) and uses the same alarm
template. Both can run in parallel — they query different files and the
same Pages root, so there's no contention.

If you want a single combined alarm to your inbox instead of two separate
ones, wrap both in a parent task that consolidates the JSON payloads. The
default spec keeps them independent so a failure in one project does not
mask a failure in the other.

---

## Test plan (before relying on it)

1. Activate the task with `op — register nbis-analyst-ratings-daily-check`.
2. Wait one cycle. Confirm the next morning is silent (assuming green).
3. Force an alarm: temporarily run `STALE_DAYS=0 python monitor_check.py`
   locally — confirm it exits 1 and the JSON shows `STALE_DATA: false`.
4. Trigger the task manually: `op — run nbis-analyst-ratings-daily-check now`.
5. Confirm both the chat briefing and the email arrive within ~1 minute.
6. Restore `STALE_DAYS=7` and verify silence the next morning.

---

## Tuning later

- If false-positive rate is too high, raise `STALE_DAYS` to 10 or 14 (analyst
  flow is bursty around earnings).
- If you want to be paged on weekends too, no change needed — the task runs daily.
- If you want quiet hours (e.g. weekends), edit the schedule to weekdays only:
  `30 7 * * 1-5` instead of `30 7 * * *`.
