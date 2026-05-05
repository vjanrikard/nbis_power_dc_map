# Monitor — Nebius Power DC Map (v1.0)

Health check for the published map. Triggers an alarm when the
application stops updating or when the public URL is down.

---

## What it checks

| Check         | Trigger condition                                                                                                | Default threshold      |
|---------------|------------------------------------------------------------------------------------------------------------------|------------------------|
| STALE_DATA    | Last commit on **v1.0/data.js** is older than **STALE_DAYS**                                                     | 2 days                 |
| PAGES_DOWN    | The Pages URL returns non-200, **or** the body is missing the **Nebius Power DC Map** marker                     | HTTP 200 + marker      |

Pages URL: <https://vjanrikard.github.io/nbis_power_dc_map/v1.0/>

Both checks must pass for the overall status to be **OK**. Any failure → **ALARM**.

---

## How to run

### Locally

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map\v1.0\monitor
python monitor_check.py
```

Exit codes:

- **0** — OK (both checks pass)
- **1** — ALARM (one or more checks failed)
- **2** — ERROR (the check itself could not run)

### From a Cowork scheduled task

A task definition lives in **scheduled_task.md**. After GitHub Pages is live and
the URL is verified, register it once:

```
op — register nbis-power-dc-map-daily-check
```

This creates a Cowork scheduled task that runs every morning at **07:30 local
time** (25 minutes after the data scan), invokes Alpha with the prompt in
**scheduled_task.md**, and posts the alarm to the channels listed below.

---

## Alarm channels

When **monitor_check.py** exits non-zero, Alpha:

1. **Cowork chat** — posts an NBIS UPDATE briefing using the standard template
   from CLAUDE.md, with Headline, Why it matters, Evidence (the JSON payload),
   and Possible impact filled in.
2. **Email** — sends a summary to **vjanrikard@gmail.com** via the Gmail MCP,
   subject: **NBIS Map ALARM — STALE_DATA / PAGES_DOWN**.

If both checks pass, no message is sent (silent on green) — keeping the inbox
quiet.

---

## Configuration

All knobs are environment variables. Defaults are set in **monitor_check.py**.

| Variable        | Default                                                              | Purpose                                                |
|-----------------|----------------------------------------------------------------------|--------------------------------------------------------|
| NBIS_REPO       | vjanrikard/nbis_power_dc_map                                         | GitHub repo                                            |
| NBIS_BRANCH     | main                                                                 | Branch to inspect                                      |
| NBIS_DATA_PATH  | v1.0/data.js                                                         | File whose commit age is checked                       |
| NBIS_PAGES_URL  | https://vjanrikard.github.io/nbis_power_dc_map/v1.0/                 | Pages URL to probe                                     |
| STALE_DAYS      | 2                                                                    | Maximum allowed age of last data.js commit             |
| GITHUB_TOKEN    | (unset)                                                              | Optional — raises GitHub API rate limit 60 → 5000/h    |

---

## Output format (JSON)

```json
{
  "timestamp_utc": "2026-05-04T05:30:12Z",
  "overall_status": "OK",
  "pages_url": "https://vjanrikard.github.io/nbis_power_dc_map/v1.0/",
  "repo": "vjanrikard/nbis_power_dc_map",
  "branch": "main",
  "data_path": "v1.0/data.js",
  "stale_days_threshold": 2,
  "checks": [
    {
      "name": "STALE_DATA",
      "ok": true,
      "detail": "Last commit to v1.0/data.js: 2026-05-03T14:02:55Z (0.6d ago, threshold 2d)",
      "measured_value": "0.6d",
      "threshold": "2d"
    },
    {
      "name": "PAGES_DOWN",
      "ok": true,
      "detail": "HTTP 200 + map marker present (12407 bytes)",
      "measured_value": "200",
      "threshold": "200"
    }
  ]
}
```

---

## Activation checklist

Run these only **after** the Pages URL returns HTTP 200 in a browser.

- [ ] Verify the URL loads in a browser (KPI cards visible, map markers populated, timeline visible).
- [ ] Run **python monitor_check.py** once locally — confirm exit code 0.
- [ ] (Optional) Set **GITHUB_TOKEN** env var to avoid hitting the 60 req/h public API limit.
- [ ] Issue **op — register nbis-power-dc-map-daily-check** to Alpha to create the scheduled task.
- [ ] Wait one cycle (next 07:30) and confirm the silent-on-green behavior.
- [ ] Test alarm path: temporarily set **STALE_DAYS=0** and re-run — confirm chat + email arrive.

---

## File layout

```
v1.0/
├── monitor/
│   ├── monitor_check.py     ← the actual check (Python 3.8+, stdlib only)
│   ├── README.md            ← this file
│   └── scheduled_task.md    ← Alpha prompt for the daily Cowork task
├── index.html
├── data.js
├── style.css
├── DOCS.md
├── ARCHITECTURE.svg
└── NEBIUS_POWER_DC_MAP_LOG.md
```
