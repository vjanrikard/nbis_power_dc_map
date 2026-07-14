# Analyst Ratings Log — NBIS

Append-only log of analyst rating events for Nebius Group N.V. (NBIS).
**New entries are prepended above the seed block.** The seed block at the
bottom captures the initial state when the log was created.

Format for new entries:

```
## YYYY-MM-DD — Firm — Action — $TARGET (▲/▼ vs prev) — Rating

**Analyst:** Name. **Source:** [Title](URL).

Brief 1–2 sentence quote or summary explaining the move.
```

The daily scan (`nbis-analyst-ratings-daily-scan`, 07:10 local) prepends new
entries automatically. Manual entries are also welcome — keep the format
consistent so `analysts.json` updates stay easy.

---

<!-- ═══ NEW ENTRIES BELOW THIS LINE — PREPEND ABOVE THE SEED BLOCK ═══ -->

## 2026-06-08 — B of A Securities — Maintains — $280 (▲40 vs prev $240) — Buy

**Analyst:** Tal Liani. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

Target raised to $280 following completion of the Eigen AI acquisition.

## 2026-06-02 — BNP Paribas — Initiates — $255 — Neutral

**Analyst:** n/a. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

New coverage at Neutral despite a $255 target — valuation-driven caution.

## 2026-05-18 — DA Davidson — Assumes — $250 (rating change Buy → Neutral) — Neutral

**Analyst:** n/a (new analyst assumes coverage from Alex Platt). **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

Coverage assumed at Neutral with $250 target — four days after Platt's Buy/$250. Replaces DA Davidson's Buy in the latest-per-firm consensus.

## 2026-05-15 — Citigroup — Maintains — $287 (▲118 vs prev $169) — Buy

**Analyst:** n/a. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

Largest single target hike on record for NBIS (+70%), day after Q1 2026 earnings.

## 2026-05-14 — B of A Securities — Maintains — $240 (▲35 vs prev $205) — Buy

**Analyst:** Tal Liani. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

Q1 2026 earnings reaction (revenue $399M, +684% YoY).

## 2026-05-14 — Morgan Stanley — Maintains — $144 (▲18 vs prev $126) — Equal-Weight

**Analyst:** n/a. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

Target up but stays Equal-Weight — the street's most conservative live target.

## 2026-05-14 — Citizens — Maintains — $270 (▲95 vs prev $175) — Market Outperform

**Analyst:** Greg P. Miller. **Source:** [Benzinga: Analysts increase forecasts following Q1](https://www.benzinga.com/analyst-stock-ratings/price-target/26/05/52565267/nebius-group-analysts-increase-their-forecasts-following-q1-earnings) · backfilled 2026-07-14.

Q1 2026 earnings reaction.

## 2026-05-14 — DA Davidson — Maintains — $250 (▲50 vs prev $200) — Buy

**Analyst:** Alex Platt. **Source:** [Benzinga: Analysts increase forecasts following Q1](https://www.benzinga.com/analyst-stock-ratings/price-target/26/05/52565267/nebius-group-analysts-increase-their-forecasts-following-q1-earnings) · backfilled 2026-07-14.

Q1 2026 earnings reaction. Platt's final action before coverage was assumed (see 05-18).

## 2026-05-11 — B of A Securities — Maintains — $205 (▲30 vs prev $175) — Buy

**Analyst:** Tal Liani. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

Pre-earnings target raise.

## 2026-04-16 — Wolfe Research — Initiates — no target — Peer Perform

**Analyst:** n/a. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

New neutral coverage without a published target.

## 2026-04-09 — Cantor Fitzgerald — Initiates — $129 — Overweight

**Analyst:** n/a. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

New coverage at Overweight.

## 2026-03-24 — B of A Securities — Initiates — $150 — Buy

**Analyst:** Tal Liani. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

BofA initiates a week after the NVIDIA $2B / Meta deal news flow.

## 2026-03-16 — Citigroup — Initiates — $169 — Buy

**Analyst:** n/a. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

New coverage at Buy, same day as the DA Davidson/BWS target hikes.

## 2026-02-18 — Compass Point — Initiates — $150 — Buy

**Analyst:** n/a. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

New coverage at Buy after Q4 2025 earnings.

## 2026-01-15 — Morgan Stanley — Initiates — $126 — Equal-Weight

**Analyst:** n/a. **Source:** [Benzinga NBIS analyst ratings](https://www.benzinga.com/quote/NBIS/analyst-ratings) · backfilled 2026-07-14.

First major-bank initiation of 2026, at Equal-Weight.


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- ═══ SEED BLOCK — initial state ported from nbis_analysts_ratings.py ═══ -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

## 2026-03-16 — DA Davidson — Maintains — $200 (▲50 vs prev $150) — Buy

**Analyst:** Alex Platt. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target raised by $50 to $200. Coverage maintained at Buy.

## 2026-03-16 — BWS Financial — Maintains — $200 (▲70 vs prev $130) — Buy

**Analyst:** Hamed Khorsand. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target raised by $70 to $200 — sharpest single-step bump in the seed set. Coverage maintained at Buy.

## 2026-02-17 — BWS Financial — Maintains — $130 (no change vs prev $130) — Buy

**Analyst:** Hamed Khorsand. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Reiteration. No target change.

## 2025-11-13 — BWS Financial — Maintains — $130 (no change vs prev $130) — Buy

**Analyst:** Hamed Khorsand. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Reiteration. No target change.

## 2025-11-12 — Northland Capital Markets — Maintains — $211 (▲5 vs prev $206) — Outperform

**Analyst:** Nehal Chokshi. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target nudged up by $5 to $211. The most bullish street target in the seed set.

## 2025-11-12 — DA Davidson — Maintains — $150 (no change vs prev $150) — Buy

**Analyst:** Alex Platt. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Reiteration. No target change.

## 2025-09-17 — Goldman Sachs — Maintains — $120 (no change vs prev $120) — Buy

**Analyst:** Alexander Duval. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Reiteration. The most conservative street target in the seed set.

## 2025-09-10 — DA Davidson — Maintains — $125 (▲50 vs prev $75) — Buy

**Analyst:** Alex Platt. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target raised by $50 to $125 — first material bump in the seed set after initial coverage.

## 2025-09-09 — BWS Financial — Maintains — $130 (▲40 vs prev $90) — Buy

**Analyst:** Hamed Khorsand. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target raised by $40 to $130 — sharpest BWS bump prior to the March 2026 reiteration.

## 2025-09-09 — DA Davidson — Maintains — $75 (no change vs prev $75) — Buy

**Analyst:** Alex Platt. **Source:** Snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Earliest entry in the seed set. Initial coverage baseline at $75.

---

## Notes on the seed block

- All 10 entries above are **transcribed from the Python CLI** (`nbis_analysts_ratings.py`, snapshot dated 2026-04-25).
- Each entry has the same source attribution because they share a single snapshot — they were not individually verified against external sources.
- Going forward, scan-generated entries will cite their original wire/source URL.
- The seed block stays at the bottom of the file as a permanent record of the starting state. Do not edit or remove it.
