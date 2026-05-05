# Nebius Power DC Map — v1.0

**Technical documentation** · Last updated: 2026-05-04 · Owner: RikardV / Alpha

> Sister project to `nbis_construction_monitor`. Same data domain (Nebius (NBIS)
> data center sites — status, MW, partners, delivery dates), different lens:
> this view is a **world map** powered by Leaflet + a horizontal milestone
> timeline. Refreshed by the same daily Cowork scheduled scan.

---

## 1. What this is

A **static, single-page interactive map** (plain HTML + JS, no backend) that
visualizes Nebius's full global data center portfolio on an OpenStreetMap basemap
with size-coded MW circles, status filtering, search, and a horizontal event
timeline at the bottom. The data source is a hand-maintained JavaScript file
(`data.js`) plus a daily Claude-driven scheduled scan that appends new events
to `NEBIUS_POWER_DC_MAP_LOG.md`.

| Component | File | Role |
|---|---|---|
| Map UI | `index.html` | The page itself — header KPIs, status filter chips, regional sidebar, Leaflet map, milestone timeline |
| Dataset | `data.js` | 14 Nebius sites (lat/lng, MW, status, partner, GPU chips) + 13 timeline events + Q1 2026 earnings |
| Stylesheet | `style.css` | Dark navy / teal theme, badges, custom Leaflet popups |
| Change log | `NEBIUS_POWER_DC_MAP_LOG.md` | Daily log of material changes |
| Architecture diagram | `ARCHITECTURE.svg` | Visual data flow: scan → log → data.js → map |
| This file | `DOCS.md` | Technical documentation |

**Dependencies (loaded from CDN):**

- Leaflet 1.9.4 — map + markers + popups
- OpenStreetMap tiles — free basemap (dark filter applied via CSS)

No build step. No `npm install`. Just open `index.html`.

---

## 2. How to start the application

### Locally (quick)

Double-click `index.html` and the page opens in your default browser. All data
lives in `data.js` and loads immediately.

```powershell
# From PowerShell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map\v1.0
start index.html
```

### Locally (with a dev server, recommended while editing)

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map\v1.0
npx serve .
# → http://localhost:3000
```

### Published (GitHub Pages)

Once Pages is enabled (see §6), the map is reachable at the public URL
listed below.

---

## 3. Map URL

| Environment | URL |
|---|---|
| **Local** | `file:///C:/GitHub/vjanrikard/Finance/Datacenter/nbis_power_dc_map/v1.0/index.html` |
| **GitHub Pages** (after publish) | `https://vjanrikard.github.io/nbis_power_dc_map/v1.0/` |
| **Notion page** (after publish) | Generated when the Notion page is created — paste it into Alpha's `Resources` table in `CLAUDE.md` |

> If you put the v1.0 directory in a **dedicated** repository named
> `nbis_power_dc_map`, the Pages URL is exactly as above. If you ship it
> as part of the `Finance` monorepo instead, the URL becomes
> `https://vjanrikard.github.io/Finance/Datacenter/nbis_power_dc_map/v1.0/`.

---

## 4. How the application fetches updates

There are **three update layers** — identical to nbis_construction_monitor:

### Layer A — Daily scheduled scan (`nbis-power-dc-map-daily-scan`)

Runs **07:05 local time** via the Cowork scheduled-task runner. The scan:

1. Queries Nebius-related news through MT Newswires (MCP) → falls back to `web_search`.
2. Filters for **material changes only**: new site, MW capacity change, status change, partner change, delivery-date shift, permit decision, opposition vote.
3. Prepends one entry to `NEBIUS_POWER_DC_MAP_LOG.md` in the format:

   ```
   ## YYYY-MM-DD — short headline
   **Site** — what changed in 1–2 sentences. ([Source title](URL))
   ```

4. If a change affects a specific site (new MW, new status, new lat/lng for a new site), the scan opens a follow-up task asking the operator to update the corresponding object in `data.js`.

> The scan does **not** mutate `data.js` autonomously — that requires explicit
> operator approval, mirroring the policy in `CLAUDE.md`.

### Layer B — Manual dataset refresh

When a site object needs to change (e.g. Vineland status flips from
`construction` to `online`), the operator edits the field directly in
`data.js`, bumps `LAST_UPDATE`, and commits.

### Layer C — Quarterly earnings sync

After every Nebius quarterly release (Q1, Q2, Q3, Q4) the
`Quarterly_Report_Checklist` workflow is triggered. It validates the seven
checkpoints from `CLAUDE.md` against the report and updates:

- The `NEBIUS_EARNINGS_Q*_2026` object in `data.js`
- The KPI cards at the top of `index.html` (contracted GW, online MW, target MW)

---

## 5. What information gets updated

### Per site (in `data.js` → `SITES`)

| Field | Type | Example | When it changes |
|---|---|---|---|
| `status` | enum | `construction` → `online` | When a facility goes live |
| `mw` | number | 300 | On contract expansion or capacity change |
| `lat` / `lng` | number | 39.486 / -75.025 | If a site relocates (rare); set when a new site is added |
| `partner` | string | `DataOne` | On new partner deals |
| `chips` | array | `["NVIDIA Blackwell", "B200"]` | On hardware upgrade |
| `online` | string | `Summer 2025 (Phase 1)` | When delivery date slips/shifts |
| `desc` | string | Free text | On material updates |
| `source` | URL | DCD / Nebius newsroom link | New primary source |
| `region` | enum | `North America` / `EMEA` | Set once per site |

### Globally (in `data.js` → `NEBIUS_EARNINGS_*`)

Refreshed **quarterly** after earnings.

### Timeline (in `data.js` → `EVENTS`)

Append-only list of `{ date, label, title, desc, color, pos, tags }`. Each
material event from `NEBIUS_POWER_DC_MAP_LOG.md` is promoted here once
confirmed.

### Change log (`NEBIUS_POWER_DC_MAP_LOG.md`)

Append-only Markdown file. The daily scan prepends new entries at the **top**;
manual seed entries remain at the bottom.

---

## 6. Publishing to GitHub Pages

Prerequisites: `git` and `gh` (GitHub CLI) installed and authenticated.

```powershell
# 1) Go to the repo root
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map

# 2) Stage and commit
git add .
git commit -m "v1.0: Nebius Power DC Map — initial public release"
git push

# 3) Enable GitHub Pages (main branch, root) — once
gh api -X POST /repos/vjanrikard/nbis_power_dc_map/pages \
  -f "source[branch]=main" -f "source[path]=/"

# 4) Check status (can take 1–2 minutes)
gh api /repos/vjanrikard/nbis_power_dc_map/pages
```

After this the map lives at:

> **https://vjanrikard.github.io/nbis_power_dc_map/v1.0/**

For subsequent updates:

```powershell
cd C:\GitHub\vjanrikard\Finance\Datacenter\nbis_power_dc_map
git add v1.0/data.js v1.0/NEBIUS_POWER_DC_MAP_LOG.md
git commit -m "Daily scan: <short description>"
git push
# Pages re-deploys automatically within ~30 seconds
```

---

## 7. Publishing to Notion

Two options:

### Option A — Embed the map inside a Notion page (recommended)

1. Create a new Notion page: `Nebius Power DC Map`.
2. Paste `/embed` → URL: `https://vjanrikard.github.io/nbis_power_dc_map/v1.0/`.
3. Set block height to ~900 px (the map needs vertical space).
4. Below the embed, link to `NEBIUS_POWER_DC_MAP_LOG.md` and `DOCS.md`.
5. Click **Share → Publish to web**, copy the URL, and paste it into Alpha's
   `Resources` table in `C:\Users\vevan\.claude\CLAUDE.md`.

### Option B — Notion MCP automation

If the Notion MCP is authenticated, Alpha can generate a structured page directly:

```
op — publish nbis_power_dc_map to Notion
```

---

## 8. Maintenance rules (from `CLAUDE.md`)

- Activate: `op` → "Roger that." · Deactivate: `stop` → "Alpha standing down."
- Never commit changes to `data.js` autonomously — every edit needs explicit `op` approval.
- All published content and code is in English; chat with the operator is in Norwegian.
- Tool priority: MT Newswires first, `web_search` as fallback.

---

## 9. Roadmap

Sections planned for v1.1+:

1. Cluster markers when zoomed out (currently can overlap in dense regions).
2. MW heatmap layer (toggle between markers and heatmap).
3. Region polygon overlays (NA / EMEA / Middle East shaded).
4. Detail-pane drawer on click (today shows popup; richer drawer would let
   in-page links to log entries).
5. Bilingual UI: Norwegian + English.

---

## 9b. Daily news scan — automated log appends

The daily scan task `nbis-power-dc-map-daily-scan` runs at **07:05 local time**
and is fully described in [`scan/README.md`](scan/README.md) +
[`scan/scheduled_task.md`](scan/scheduled_task.md). Curated sources live in
[`scan/sources.md`](scan/sources.md) (7 tiers).

**Behaviour summary:**

- Searches sources for Nebius mentions in the last 24 hours.
- Filters hits to material changes only (capacity, status, permit, partner, opposition, earnings, new site).
- Prepends entries to `NEBIUS_POWER_DC_MAP_LOG.md` and commits/pushes to GitHub.
- Posts a daily NBIS UPDATE briefing in chat, or a single "no changes" line on quiet days.
- **Never modifies `data.js`** — site-object changes are flagged as follow-up tasks.

**Activation** (after Pages is live):

```
op — register nbis-power-dc-map-daily-scan
```

Manual trigger any time: `op — run nbis-power-dc-map-daily-scan now`.

---

## 10. Monitoring

A health check runs daily and raises an alarm when the application stops
updating or the public URL goes down. Full spec lives in
[`monitor/README.md`](monitor/README.md) and
[`monitor/scheduled_task.md`](monitor/scheduled_task.md).

| What is checked | How | Alarm threshold |
|---|---|---|
| `data.js` is being updated | GitHub commits API on `v1.0/data.js` | older than 2 days |
| Pages URL is reachable | HTTP GET on the published URL + body marker check | non-200 or marker missing |

**Alarm channels (only on red):**

- Cowork chat — `NBIS UPDATE`-style briefing from Alpha
- Email — `vjanrikard@gmail.com` (Gmail MCP), subject `NBIS Map ALARM — …`

**Schedule:** Daily 07:30 local time (25 minutes after the data scan), via the
Cowork scheduled task `nbis-power-dc-map-daily-check`.

**Activation:** wait until the GitHub Pages URL returns HTTP 200 in a browser,
then run:

```
op — register nbis-power-dc-map-daily-check
```

Manual run any time: `python monitor/monitor_check.py` (exit 0=OK, 1=ALARM, 2=ERROR).

---

## 11. Change history

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-05-04 | First public release. Documentation, GitHub Pages-ready layout, Notion publishing guide, daily health-check monitor. Mirrors `nbis_construction_monitor` v1.0 structure (map view instead of dashboard). |
| dataset v1.0 | 2026-05-04 | 14 sites + 13 timeline events extracted from `public/index.html` into `data.js`. |

---

*Questions? Activate Alpha with `op` and ask.*
