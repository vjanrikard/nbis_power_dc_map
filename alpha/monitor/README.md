# Monitor — Alpha Portal Analyst Ratings

Health check for the published Alpha Portal. Triggers an alarm when the
analyst-ratings data stops updating or when the public URL is down.

---

## What it checks

| Check         | Trigger condition                                                                                                                         | Default threshold |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------|-------------------|
| STALE_DATA    | The freshest of `alpha/data/analysts.json` and `alpha/ANALYST_RATINGS_LOG.md` is older than **STALE_DAYS**                                 | 7 days            |
| PAGES_DOWN    | The Pages URL returns non-200, **or** the body is missing the **Alpha Portal** marker                                                      | HTTP 200 + marker |

Pages URL: <https://vjanrikard.github.io/nbis_power_dc_map/alpha/>

Both checks must pass for the overall status to be **OK**. Any failure → **ALARM**.

> **Why STALE_DAYS=7 (vs 2 for the map)?** Analyst ratings are slower than
> construction news. A 2-day window would alarm on every quiet weekend.
> 7 days catches genuine scan failures without false-positive noise.

---

## How to run

### Locally

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map\alpha\monitor
python monitor_check.py
```

Exit codes:

- **0** — OK (both checks pass)
- **1** — ALARM (one or more checks failed)
- **2** — ERROR (the check itself could not run)

### From a Cowork scheduled task

A task definition lives in **scheduled_task.md**. After GitHub Pages is live
and the URL is verified, register it once:

```
op — register nbis-analyst-ratings-daily-check
```

This creates a Cowork scheduled task that runs every morning at **07:35 local
time** (25 minutes after the analyst-ratings scan), invokes Alpha with the
prompt in **scheduled_task.md**, and posts the alarm to the channels listed below.

---

## Alarm channels

When **monitor_check.py** exits non-zero, Alpha:

1. **Cowork chat** — posts an NBIS UPDATE briefing using the standard template
   from CLAUDE.md, with Headline, Why it matters, Evidence (the JSON payload),
   and Possible impact filled in.
2. **Email** — sends a summary to **vjanrikard@gmail.com** via the Gmail MCP,
   subject: **NBIS Alpha ALARM — STALE_DATA / PAGES_DOWN**.

If both checks pass, no message is sent (silent on green) — keeping the inbox
quiet.

---

## Configuration

All knobs are environment variables. Defaults are set in **monitor_check.py**.

| Variable        | Default                                                              | Purpose                                              |
|-----------------|----------------------------------------------------------------------|------------------------------------------------------|
| NBIS_REPO       | vjanrikard/nbis_power_dc_map                                         | GitHub repo                                          |
| NBIS_BRANCH     | main                                                                 | Branch to inspect                                    |
| NBIS_DATA_PATH  | alpha/data/analysts.json                                             | JSON file whose commit age is checked                |
| NBIS_LOG_PATH   | alpha/ANALYST_RATINGS_LOG.md                                         | Log file whose commit age is checked                 |
| NBIS_PAGES_URL  | https://vjanrikard.github.io/nbis_power_dc_map/alpha/                | Pages URL to probe                                   |
| STALE_DAYS      | 7                                                                    | Maximum allowed age of the freshest committed file   |
| GITHUB_TOKEN    | (unset)                                                              | Optional — raises GitHub API rate limit 60 → 5000/h  |

---

## Output format (JSON)

```json
{
  "timestamp_utc": "2026-05-06T05:35:12Z",
  "overall_status": "OK",
  "pages_url": "https://vjanrikard.github.io/nbis_power_dc_map/alpha/",
  "repo": "vjanrikard/nbis_power_dc_map",
  "branch": "main",
  "data_path": "alpha/data/analysts.json",
  "log_path": "alpha/ANALYST_RATINGS_LOG.md",
  "stale_days_threshold": 7,
  "checks": [
    {
      "name": "STALE_DATA",
      "ok": true,
      "detail": "Freshest: ANALYST_RATINGS_LOG.md 0.4d ago (threshold 7d). All: analysts.json 1.1d ago, ANALYST_RATINGS_LOG.md 0.4d ago",
      "measured_value": "0.4d",
      "threshold": "7d"
    },
    {
      "name": "PAGES_DOWN",
      "ok": true,
      "detail": "HTTP 200 + portal marker present (24569 bytes)",
      "measured_value": "200",
      "threshold": "200"
    }
  ]
}
```

---

## Activation checklist

Run these only **after** the Pages URL returns HTTP 200 in a browser.

- [ ] Verify the URL loads in a browser (Section 2 shows market data, consensus, and 10 ratings).
- [ ] Run **python monitor_check.py** once locally — confirm exit code 0.
- [ ] (Optional) Set **GITHUB_TOKEN** env var to avoid hitting the 60 req/h public API limit.
- [ ] Issue **op — register nbis-analyst-ratings-daily-check** to Alpha to create the scheduled task.
- [ ] Wait one cycle (next 07:35) and confirm the silent-on-green behavior.
- [ ] Test the alarm path: temporarily set **STALE_DAYS=0** and re-run — confirm chat + email arrive.

---

## File layout

```
alpha/
├── monitor/
│   ├── monitor_check.py     ← the actual check (Python 3.8+, stdlib only)
│   ├── README.md            ← this file
│   └── scheduled_task.md    ← Alpha prompt for the daily Cowork task
├── scan/                    ← sister task — adds new entries
├── index.html
├── style.css
├── data/
│   ├── analysts.json
│   ├── technicals.json
│   └── i18n.json
├── DOCS.md
├── ARCHITECTURE.svg
├── README.md
└── ANALYST_RATINGS_LOG.md
```
