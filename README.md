# Nebius Power DC Map

Interactive world map of every Nebius (NBIS) data center site — status, MW,
partners, delivery dates — refreshed daily.

**Live map:** <https://vjanrikard.github.io/nbis_power_dc_map/v1.0/>

> Current release: `v1.0/`. Technical deep-dive in
> [`v1.0/DOCS.md`](v1.0/DOCS.md). Daily health-check spec in
> [`v1.0/monitor/README.md`](v1.0/monitor/README.md).
>
> Sister project: [`nbis_construction_monitor`](https://github.com/vjanrikard/nbis_construction_monitor)
> covers the same data with a dashboard view (KPI cards, charts, sortable
> table). This project is the **map** view.

---

## Repository layout

```
nbis_power_dc_map/
├── README.md                   ← this file (project front page on GitHub)
├── index.html                  ← root redirect → /v1.0/
└── v1.0/
    ├── index.html              ← Leaflet map entry point
    ├── data.js                 ← 14 sites + 13 milestone events + Q1 2026 earnings
    ├── style.css               ← dark navy / teal theme
    ├── DOCS.md                 ← technical documentation
    ├── ARCHITECTURE.svg        ← data-flow diagram
    ├── NEBIUS_POWER_DC_MAP_LOG.md  ← append-only change log
    ├── scan/                   ← daily news scan (adds entries to the log)
    │   ├── scheduled_task.md
    │   ├── sources.md
    │   └── README.md
    └── monitor/                ← daily health check (alarms if scan stops)
        ├── monitor_check.py
        ├── README.md
        └── scheduled_task.md
```

---

## Part 1 — Commit and push to GitHub

### 1.1 First-time repository setup

The repo is **already** on GitHub at
<https://github.com/vjanrikard/nbis_power_dc_map>. Skip this section unless
you are setting up a fresh fork.

For a fresh fork (prerequisites: [`git`](https://git-scm.com/downloads) and
[`gh`](https://cli.github.com/) installed and authenticated):

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map
git init
git branch -M main
git add .
git commit -m "v1.0: initial public release of Nebius Power DC Map"

gh repo create vjanrikard/nbis_power_dc_map `
  --public `
  --source=. `
  --remote=origin `
  --push `
  --description "Interactive world map of every Nebius (NBIS) data center site"
```

### 1.2 Day-to-day commit & push workflow

For every subsequent change (data refresh, log entry, doc update):

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map

# 1. See what has changed
git status

# 2. Stage only the files you intend to publish
git add v1.0/data.js v1.0/NEBIUS_POWER_DC_MAP_LOG.md
# (or stage everything: git add .)

# 3. Commit with a one-line message describing the change
git commit -m "Daily scan 2026-05-04: <short headline>"

# 4. Push to GitHub
git push
```

### 1.3 Suggested commit-message style

| Change type | Example commit message |
|---|---|
| Daily scan result | `Daily scan 2026-05-04: Vineland NJ permit cleared` |
| Site object update | `data.js: Vineland status construction → online` |
| Earnings sync | `Q1 2026 earnings: contracted GW raised to >3 GW` |
| Log entry only | `Log: Birmingham AL substation vote DELAYED` |
| Docs / monitor | `monitor: bump STALE_DAYS threshold to 3` |

Keep messages short, present-tense, one line. The
`NEBIUS_POWER_DC_MAP_LOG.md` carries the long-form narrative.

### 1.4 Useful git commands

```powershell
git log --oneline -10               # last 10 commits
git diff v1.0/data.js               # what changed locally
git restore v1.0/data.js            # discard local edits
git pull                            # pull remote changes (if you edit elsewhere)
gh repo view --web                  # open the repo on github.com
```

---

## Part 2 — Publish v1.0 via GitHub Pages

Pages turns the static files in `v1.0/` into a public website. The map
already loads from CDN-hosted libraries (Leaflet, OpenStreetMap tiles), so
there is no build step.

### 2.1 Enable Pages (one-time)

Run **after** the repo exists on GitHub.

```powershell
# Enable Pages from main branch, root path
gh api -X POST /repos/vjanrikard/nbis_power_dc_map/pages `
  -f "source[branch]=main" `
  -f "source[path]=/"
```

Then check the deployment status (it can take 1–2 minutes the first time):

```powershell
gh api /repos/vjanrikard/nbis_power_dc_map/pages
```

Look for `"status": "built"` in the response.

### 2.2 The map URL

Because Pages serves the repo root, but the map files live in `v1.0/`,
the public URL is:

> **<https://vjanrikard.github.io/nbis_power_dc_map/v1.0/>**

(The root `index.html` also redirects there, so
<https://vjanrikard.github.io/nbis_power_dc_map/> works too.)

Open it in a browser. You should see the map with size-coded MW circles,
the regional sidebar, the filter chips, and the milestone timeline at
the bottom.

### 2.3 Updating the published site

There is **no separate deploy step** — every `git push` to `main` triggers
Pages to rebuild automatically (~30 seconds).

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map
git add v1.0/data.js
git commit -m "Daily scan 2026-05-04: <headline>"
git push
# Wait ~30s → refresh https://vjanrikard.github.io/nbis_power_dc_map/v1.0/
```

You can watch the rebuild here:
<https://github.com/vjanrikard/nbis_power_dc_map/actions>

### 2.4 Verify the deploy

After every push, run the health check to confirm the public map is
serving the new content:

```powershell
python v1.0\monitor\monitor_check.py
```

Exit code `0` means both the staleness and HTTP checks passed. If you see
exit code `1` → see [`v1.0/monitor/README.md`](v1.0/monitor/README.md) for
diagnostics.

### 2.5 Optional — custom domain

To serve the map from your own domain (e.g. `map.rikardv.com`):

1. Add a `CNAME` file at the repo root containing the domain (one line, no scheme).
2. In your DNS provider, create a `CNAME` record pointing
   `map.rikardv.com` → `vjanrikard.github.io`.
3. Re-run `gh api /repos/vjanrikard/nbis_power_dc_map/pages` and
   confirm the `cname` field is populated.

The map URL becomes `https://map.rikardv.com/v1.0/`.

### 2.6 Disabling Pages (if needed)

```powershell
gh api -X DELETE /repos/vjanrikard/nbis_power_dc_map/pages
```

---

## Activate the two daily tasks (after Pages is live)

Once <https://vjanrikard.github.io/nbis_power_dc_map/v1.0/> returns
HTTP 200 in a browser, register both Cowork scheduled tasks with Alpha:

```
op — register nbis-power-dc-map-daily-scan
op — register nbis-power-dc-map-daily-check
```

| Task                              | Time          | Role                                                                 |
|-----------------------------------|---------------|----------------------------------------------------------------------|
| nbis-power-dc-map-daily-scan      | 07:05 local   | Searches sources, prepends material entries to `NEBIUS_POWER_DC_MAP_LOG.md`, commits + pushes. Spec: [`v1.0/scan/scheduled_task.md`](v1.0/scan/scheduled_task.md) |
| nbis-power-dc-map-daily-check     | 07:30 local   | Checks that the scan kept delivering and that the Pages URL is up. Silent on green; chat + email alarm on red. Spec: [`v1.0/monitor/scheduled_task.md`](v1.0/monitor/scheduled_task.md) |

Manual ad-hoc runs (any time):

```
op — run nbis-power-dc-map-daily-scan now
op — run nbis-power-dc-map-daily-check now
```

---

## License & ownership

Public map. Operator: RikardV (`vjanrikard@gmail.com`). All Nebius data
sourced from public filings, the Nebius newsroom, DataCenterDynamics, and
regional press — sources cited in `v1.0/scan/sources.md` and per-site
links inside `v1.0/data.js`.
