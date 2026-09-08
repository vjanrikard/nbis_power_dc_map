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

## 2026-08-25 — Goldman Sachs — Maintains — $328 (▲42 vs prev $286) — Buy

**Analyst:** Alexander Duval. **Source:** [TipRanks – Nebius Stock (NBIS) Jumps as Goldman Sets Street-High $328 Price Target on Strong Demand](https://www.tipranks.com/news/nebius-stock-nbis-jumps-as-goldman-sets-street-high-328-price-target-on-strong-demand) · scan 2026-09-09. *(ca. — sources cite Aug 24–25, 2026; exact date unverified.)*

Duval lifted his target 15% to a new Wall Street high, citing robust AI-infrastructure demand after Q2 2026 revenue climbed 454% YoY to $582.3M. Buy rating reaffirmed.

## 2026-08-18 — DA Davidson — Raises — $250 (▲75 vs prev $175) — Neutral

**Analyst:** Gil Luria. **Source:** [24/7 Wall St. – DA Davidson Reverses Course on Nebius Target Cut in Just 1 Week](https://247wallst.com/investing/2026/08/18/da-davidson-reverses-course-on-nebius-target-cut-in-just-1-week-what-is-going-on/) · scan 2026-09-09.

One week after slashing the target on Vineland construction-delay fears, Luria restored $250 after the Vineland data center received permit approval, which he said "removes a significant risk" and unblocks roughly a third of Nebius's 2026 connected-power goal.

## 2026-08-14 — Citigroup — Maintains — $324 (▲46 vs prev $278) — Buy

**Analyst:** n/a. **Source:** [GuruFocus – NBIS Maintained by Citigroup, Price Target Raised to $324](https://www.gurufocus.com/news/9035450/nbis-maintained-by-citigroup-price-target-raised-to-324) · scan 2026-09-09.

Citi raises target again just nine days after trimming it, alongside the broader Q2-earnings target-hike wave (Baird, B of A same week). Buy rating maintained.

## 2026-08-13 — Baird — Raises — $340 (▲90 vs prev $250) — Outperform

**Analyst:** n/a. **Source:** [MarketBeat – Robert W. Baird Forecasts Strong Price Appreciation for Nebius Group (NBIS)](https://www.marketbeat.com/instant-alerts/robert-w-baird-forecasts-strong-price-appreciation-for-nebius-group-nasdaqnbis-stock-2026-08-13/) · scan 2026-09-09. *(ca. — some wire pickups date this Aug 17; MarketBeat alert timestamp used.)*

Baird lifts its target 36% same-day as B of A's Q2-earnings reaction, keeping Outperform.

## 2026-08-13 — B of A Securities — Maintains — $310 (▲30 vs prev $280) — Buy

**Analyst:** Tal Liani. **Source:** [CNBC – Nebius has tripled in 2026, but it can rise more, Bank of America says](https://www.cnbc.com/2026/08/13/nebius-has-tripled-in-2026-but-it-can-rise-more-bank-of-america-says.html) · scan 2026-09-09.

Q2 2026 beat (revenue $582.3M vs $569.9M consensus) plus the 800MW–1GW connected-power plan by year-end drove the hike. Buy maintained.

## 2026-08-11 — DA Davidson — Lowers — $175 (▼75 vs prev $250) — Neutral

**Analyst:** Gil Luria. **Source:** [Yahoo Finance – DA Davidson cuts Nebius target 30% as Vineland delays threaten 2026 guidance](https://finance.yahoo.com/markets/stocks/articles/da-davidson-cuts-nebius-target-153630956.html) · scan 2026-09-09.

A site visit and local public hearing led Luria to conclude the Vineland facility might not finish in 2026, threatening the execution edge versus peer neoclouds. Neutral rating kept. (Reversed one week later — see 2026-08-18 entry.)

## 2026-08-05 — Compass Point — Raises — $300 (▲40 vs prev $260) — Buy

**Analyst:** n/a. **Source:** [Yahoo Finance – Compass Point Raises Price Target on Nebius Group (NBIS) Following Strong AI Cloud Growth](https://finance.yahoo.com/markets/stocks/articles/compass-point-raises-price-target-093745745.html) · scan 2026-09-09. *(ca. — exact date unverified, tied to Q2 2026 earnings reaction.)*

Cited AI cloud run-rate revenue rising to $3.0B from $1.9B QoQ. Buy maintained. Note: an interim $150→$260 step (~May 2026, post-Q1) surfaced in this scan but is not independently sourced — flagged below for operator review.

## 2026-08-05 — Citigroup — Maintains — $278 (▼9 vs prev $287) — Buy

**Analyst:** n/a. **Source:** [GuruFocus – NBIS Maintained by Citigroup, Price Target Lowered to $278](https://www.gurufocus.com/news/9007527/nbis-maintained-by-citigroup-price-target-lowered-to-278) · scan 2026-09-09.

Citi trims its target heading into Q2 earnings while staying "constructive" on neoclouds, saying the recent selloff created a more attractive entry point. Buy kept.

## 2026-08-04 — Piper Sandler — Initiates — $224 (new) — Neutral

**Analyst:** James Fish. **Source:** [StreetInsider – Piper Sandler Starts Nebius Group (NBIS) at Neutral](https://www.streetinsider.com/AI/Piper+Sandler+Starts+Nebius+Group+(NBIS)+at+Neutral/26857826.html) · scan 2026-09-09.

New coverage initiated at Neutral, $224 target. Fish favors the public neocloud sector overall but prefers CoreWeave over Nebius given execution risk tied to the then-upcoming Aug 5 Vineland hearing. **New firm — not yet in `analysts.json` ratings[] — flagged for operator review.**

## 2026-07-20 — Northland Securities — Raises — $410 (▲162 vs prev $248) — Outperform

**Analyst:** Nehal Chokshi. **Source:** [Investing.com – Nebius Group stock price target raised to $410 by Northland on market share outlook](https://www.investing.com/news/analyst-ratings/nebius-group-stock-price-target-raised-to-410-by-northland-on-market-share-outlook-93CH-4801318) · scan 2026-09-09. *(ca. — exact date unverified, sourced from article metadata.)*

DCF-based target assumes ~14% share of an $800B AIaaS market (~$29/share attributed to non-core AIaaS businesses). Currently the highest live target on the Street. Outperform maintained.

## 2026-07-21 — Baird — Initiates — $250 (new) — Outperform

**Analyst:** n/a. **Source:** [Investing.com – Baird initiates Nebius with Outperform on AI inference positioning](https://www.investing.com/news/analyst-ratings/baird-initiates-nebius-stock-with-outperform-on-ai-inference-positioning-93CH-4804780) · manual entry 2026-07-24.

Baird initiates NBIS at Outperform, $250 PT (~15% upside vs then-price $216.92). Four-pillar bull thesis: full-stack inference positioning, diversifying customer base, highest sector growth, veteran Yandex-carve-out management. Same day, Baird also initiated CoreWeave Outperform — signals broader neocloud conviction.

## 2026-07-13 — Northland Securities — Reiterates — $248 (no change) — Buy

**Analyst:** Nehal Chokshi. **Source:** [moomoo wire pickup](https://www.moomoo.com/community/feed/nebius-nbis-us-northland-securities-analyst-nehal-chokshi-maintains-nebius-116751825829894) · scan 2026-07-14. *Exact event date unverified — post-selloff reiteration, ca. 2026-07-10/13.*

Chokshi defends NBIS after the Meta Compute selloff: Nebius is building a reliable business around higher-margin AI-native customers, and the Meta deal (~300 MW) is backed by an investment-grade customer.

## 2026-05-14 — Northland Securities — Raises — $248 (▲33 vs prev $215) — Outperform

**Analyst:** Nehal Chokshi. **Source:** [Bitget wire pickup, dated 2026-05-14](https://www.bitget.com/news/detail/12560605412113) · scan 2026-07-14.

Target raised $215 → $248 following the Q1 2026 update (revenue +684% to $399M, ARR $1.9B) — strong neocloud demand and better-than-expected profitability. Note: analysts.json still carries Northland at $211 (Nov 2025); the interim $211 → $215 step is not yet sourced.

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
