# Nebius Power DC Map — Change Log

Living change log for material updates to the Nebius (NBIS) data center map. Daily scheduled task `nbis-power-dc-map-daily-scan` (07:05 local) appends critical changes here. Manual seed entries below.

---

## 2026-07-10 — Madrid Spania bekreftet, CapEx/kontraktert strøm oppdatert, Meta Compute-risiko lagt til

**Madrid (Getafe), Spain (status: planned → construction)** — 18 MW colocation-leieavtale med Merlin Properties bekreftet (~3. juli 2026), del av 68 MW to-bygnings Getafe-campus (20+48 MW), PUE 1,15. Erstatter tidligere "TBD"-oppføring basert på stillingsannonser. Note lagt til om at det separate GW-skala Andalusia-forslaget ble skrinlagt februar 2026 (manglende strømgaranti — ikke samme prosjekt). ([DCD](https://www.datacenterdynamics.com/en/news/nebius-signs-18mw-lease-with-merlin-properties-at-spain-data-center-report/))

**Kontraktert strøm** — Oppdatert fra 2,0 GW (Q1-print) til >3,5 GW (juli 2026), 2026-mål hevet til ≥4 GW.

**CapEx 2026** — Hevet fra $16–20B til $20–25B.

**Ny risiko: Meta Compute** — Bloomberg rapporterte 1. juli 2026 at Meta bygger egen cloud-virksomhet for å selge overskudds-GPU-kapasitet, og går fra å være Nebius' nest største ankerkunde ($27B-avtale) til potensiell konkurrent. NBIS falt 15–26% i dagene etter, ned ~30% fra toppen (~$61B markedsverdi 1. juli → ~$55B). Lagt til som ny EVENT, ikke som egen risk-node på et fysisk anlegg siden det er en konsern-/kunderisiko, ikke stedsspesifikk.

**Andre juni/juli-hendelser lagt til i EVENTS** — Nasdaq-100-inklusjon (22. juni), AI Cloud v3.6, Physical AI Living Lab (UK/EU).

**Ikke oppdatert i denne runden** — Q2 2026-resultater er ikke sluppet ennå (ventet 28.–29. juli 2026); Vineland NJ-status og Missouri-detaljer var allerede rimelig oppdatert fra tidligere logg-poster og er ikke endret nå. Analytiker-snitt-mål oppdatert kun i Alpha Portal (analysts.json), ikke i data.js.

---

## 2026-05-09 — data.js oppdatert: Birmingham construction + East London + Amsterdam lagt til

**Birmingham AL (status: planned → construction)** — Substation variance godkjent etter protest-forsinkelse i april 2026. GC Hoar Construction, 80 acres på 201 Milan Parkway. Phase 1 ~100 MW mål vår 2027, Phase 2 ~200 MW mål høst 2028. SELC (Southern Environmental Law Center) og Humane Society søksmål innlevert — samme Environmental Justice-opplegg som Vineland. Risk oppgradert til HIGH. Risikoprofil: aktiv rettslig prosess kan forsinke Phase 1.

**East London, UK (ny: planned)** — Kunngjort Q1 2026 som del av Nebius' 16-DC globalplan. Partner og kapasitet ikke annonsert. Koordinater registrert, 10 MW placeholder i påvente av offisiell kunngjøring.

**Amsterdam, Netherlands (ny: planned)** — Kunngjort Q1 2026. Nebius Groups HQ-by. Colocation-partner og kapasitet ikke offentliggjort. 10 MW placeholder registrert.

---

## 2026-05-08 — Independence MO — Construction underway, bridge power secured

**Independence MO (construction)** — Site work underway on ~400-acre Eastgate Commerce Center campus (Q2 2026 start). Bridge power secured ahead of Blue Valley reopening: NextEra Energy contract Jun 2026–May 2027, Evergy contract Jun–Nov 2027. Blue Valley Phase 1: 250 MW (15 gas turbines) by Oct 2027, Phase 2: up to 1.1 GW by Dec 2029. Tax package: 98% real property + 90% personal property abatement 20 years, sales tax exemption on construction materials, $651M PILOT over 20 years (~$30M/yr). ~1,200 construction jobs (IBEW Local 124), 130 permanent. ([DCD](https://www.datacenterdynamics.com/en/news/150bn-in-industrial-development-revenue-bonds-tax-breaks-approved-for-800mw-nebius-data-center-in-missouri/))

---

## 2026-05-06 — Vineland NJ — Bergen gas engines blocked, DataOne pursuing alternate power

**Vineland NJ (power permit)** — NJDEP completed facility-wide air dispersion and health risk modeling; overall risks deemed negligible under regulatory standards, but one contaminant flagged for long-term cancer risk. Bergen natural gas engines not approved. DataOne attorney filed NJDEP delay request citing pursuit of alternate power source that is "more strategically aligned." ~125 MW reportedly active via interim linear generation. Microsoft Q2 tranche reportedly fulfilled from alternate Nebius capacity, not Vineland. Nov 2026 full delivery target at risk. ([Seeking Alpha comments, May 5–6 2026](https://seekingalpha.com/article/4898811-nebius-q1-one-number-may-settle-the-capex-funding-debate))

---

## 2026-05-04 — Initial release of nbis_power_dc_map v1.0

**Q1 2026 earnings (Apr 29 2026)** — Contracted power >2 GW (Feb), 2026 guidance raised to >3 GW contracted. Connected target unchanged at 800 MW–1 GW by end 2026. Revenue guidance $3.0–3.4B. $4B convertible debt raised; $16–20B 2026 CapEx fully funded. ([Foreign Policy Journal coverage](https://www.foreignpolicyjournal.com/2026/04/30/nebius-group-nasdaq-nbis-stock-price-rises-4-2-amid-q1-earnings-and-ai-infrastructure-momentum/))

**Independence MO** — Council approval Mar 3 2026. 1.2 GW gigawatt-scale campus. IPP power plant at retired Blue Valley site: 250 MW phase by Oct 2027 → 1.1 GW by Dec 2029. ([Nebius newsroom](https://nebius.com/newsroom/nebius-secures-approval-for-its-first-gigawatt-scale-ai-factory))

**Lappeenranta FI (Polarnode 310 MW)** — Announced and construction started Mar 31 2026 in Pajarila district. €8.5B / $10B investment. First phase live 2027. ([Nebius newsroom](https://nebius.com/newsroom/nebius-to-construct-310-mw-ai-factory-in-finland))

**Béthune FR (Azur Datacenter 240 MW)** — Phase 1 operational July 2026. 120 MW by end 2026, 240 MW by end 2027. Former Bridgestone tyre plant. NVIDIA Blackwell. ([DCD](https://www.datacenterdynamics.com/en/news/nebius-plans-240mw-data-center-in-b%C3%A9thune-france/))

**Israel (Mega Or expansion)** — Masmiyya 50 MW under construction. Modi'in 80 MW planned. Beit Shemesh 25 MW already live since Q3 2025. ([DCD](https://www.datacenterdynamics.com/en/news/nebius-signs-80mw-data-center-lease-with-mega-or-in-israel/))

**UK Longcross (Ark)** — 30 MW operational from Q3 2025 with NVIDIA B300 (Blackwell Ultra) — among first B300 deployments in Europe. ([Ark](https://www.ark-d-c.com/insights/ark-data-centres-collaborates-with-nebius))

**Birmingham AL (planned)** — Announced February 2026. 200 MW. Part of Nebius's expansion to 16 data centers by end of 2026. ([Yellowhammer](https://yellowhammernews.com/permit-filed-for-multibillion-dollar-75-acre-data-center-in-birmingham/))

**Minneapolis MN (planned)** — 150 MW. Part of broader US expansion plan targeting multiple new facilities in H1 2026. ([Northwise](https://northwiseproject.com/nbis-minneapolis-minnesota/))

**Kansas City Patmos** — 5 MW live Q1 2025; expanding to 40 MW. NVIDIA H200 + B200 + Blackwell at Patmos AI Campus. ([BusinessWire](https://www.businesswire.com/news/home/20241119926895/en/Patmos-Announces-Nebius-as-First-Tenant-in-New-Kansas-City-Data-Center))

**Mäntsälä FI** — Legacy Yandex-era flagship now expanded to 75 MW. Houses Europe's first operational NVIDIA GB300 NVL72 deployment. ([Nebius hardware](https://nebius.com/hardware))

---

## Format for future entries

```
## YYYY-MM-DD — short headline

**Site** — what changed in 1–2 sentences. ([Source title](URL))
```

Daily scan appends new entries above the manual seed. Critical-only filter: new site, MW change, status change, partner change, delivery date shift, permit decision, opposition vote, earnings.
