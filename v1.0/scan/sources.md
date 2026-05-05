# Sources — `nbis-power-dc-map-daily-scan`

Curated source list for the daily Nebius (NBIS) news scan that powers the
**Nebius Power DC Map** view. Identical in content to the source list used by
`nbis_construction_monitor` — both projects watch the same data domain
(Nebius data center sites: status, MW, partners, delivery dates, opposition).

> Update policy: append-only. When a new credible source surfaces in a scan
> result, add it here in the matching tier and commit. Do not remove tiers —
> they drive the scan's query strategy.

---

## Tier 1 — Primary (Nebius official)

Highest signal. Direct disclosures, contract announcements, capacity updates.

- https://nebius.com/newsroom
- https://nebius.com/blog
- https://nebius.com/hardware

---

## Tier 2 — Industry trade press (data center construction)

Daily-cadence trade outlets covering AI / hyperscale construction, MW capacity,
permits, partner deals.

- https://www.datacenterdynamics.com
- https://www.datacenterknowledge.com
- https://www.equipmentworld.com
- https://www.crn.com

---

## Tier 3 — Wire & financial press

Earnings, contracts, financing, regulatory filings, analyst notes.

- https://www.reuters.com
- https://www.cnbc.com
- https://fortune.com
- https://finance.yahoo.com
- https://seekingalpha.com
- https://www.foreignpolicyjournal.com

---

## Tier 4 — Anchor partners (for contract / co-location signal)

Track these for joint announcements that pull Nebius into the headline.

- https://blogs.microsoft.com/on-the-issues
- https://news.microsoft.com/source
- https://datacenters.atmeta.com

---

## Tier 5 — Sector context (competitor / hyperscaler)

Signal for hyperscaler capex shifts that move NBIS narrative. Not material on
their own, but flag when Nebius is named in the body.

- https://openai.com
- https://www.aboutamazon.com
- https://investors.coreweave.com
- https://vantage-dc.com
- https://introl.com
- https://www.avaiodigital.com

---

## Tier 6 — Analyst & research

Periodic research notes, market sizing, sector commentary.

- https://www.abiresearch.com
- https://mei.edu
- https://www.sentisight.ai

---

## Tier 7 — Regional press (per Nebius site location)

Local outlets that break permit / community / opposition stories before national press picks up. Indexed by site location for targeted queries.

| Site                          | Region              | Local outlets                                                                                              |
|-------------------------------|---------------------|------------------------------------------------------------------------------------------------------------|
| Vineland, NJ                  | South Jersey        | https://re-nj.com · https://northwiseproject.com                                                            |
| Independence, MO              | Kansas City metro   | https://northwiseproject.com                                                                                |
| Kansas City, MO               | Kansas City metro   | https://northwiseproject.com · https://www.businesswire.com                                                 |
| Birmingham, AL                | Alabama             | https://yellowhammernews.com                                                                                |
| Minneapolis, MN               | Twin Cities         | https://northwiseproject.com                                                                                |
| Mäntsälä, FI / Lappeenranta   | Finland             | https://nebius.com/blog                                                                                     |
| Béthune, FR / Saint-Denis     | France              | https://www.datacenterdynamics.com                                                                          |
| Longcross Park, UK            | Surrey              | https://www.ark-d-c.com                                                                                     |
| Keflavik, IS                  | Iceland             | https://nebius.com/blog                                                                                     |
| Modi'in / Masmiyya / Beit Sh. | Israel              | https://www.jpost.com                                                                                       |

---

## Fallback — generic web search

When tier 1–7 yields no fresh hits, fall back to `web_search` with these standing
queries (date-filtered to last 24 hours):

- `"Nebius" OR "NBIS" data center`
- `"Nebius" megawatt OR MW`
- `"Nebius" partnership OR contract`
- `"Nebius" permit OR zoning OR variance`
- `"Nebius" opposition OR protest OR community`
- `"Nebius" earnings OR guidance OR ARR`
- `"Nebius" Vineland OR Independence OR Birmingham OR Lappeenranta OR Béthune`

---

## Sources NOT in this list (and why)

- **MT Newswires** — not currently authenticated for this operator. Skip until access is granted; would slot in as Tier 1 if added.
- **Bloomberg / WSJ / FT** — paywalled, scan cannot reliably read body. Add only if a paid feed is wired in.
- **Twitter / X** — high noise, low recall on construction events. Out of scope for this scan.

---

## Maintenance

- After each material event, check whether the source URL belongs to a domain
  already in this list. If not, add it under the right tier in the same commit
  that appends to `NEBIUS_POWER_DC_MAP_LOG.md`.
- Quarterly: prune Tier 5 / Tier 6 entries that have produced zero hits in the
  last 90 days.
- Keep this list in sync with `nbis_construction_monitor/v1.0/scan/sources.md`
  — the two scans should look at the same world.
