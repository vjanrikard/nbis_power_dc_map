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

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- ═══ SEED BLOCK — initial state ported from nbis_analysts_ratings.py ═══ -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

## 2026-03-16 — DA Davidson — Maintains — $200 (▲50 vs prev $150) — Buy

**Analyst:** Alex Platt. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target raised by $50 to $200. Coverage maintained at Buy.

## 2026-03-16 — BWS Financial — Maintains — $200 (▲70 vs prev $130) — Buy

**Analyst:** Hamed Khorsand. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target raised by $70 to $200 — sharpest single-step bump in the seed set. Coverage maintained at Buy.

## 2026-02-17 — BWS Financial — Maintains — $130 (no change vs prev $130) — Buy

**Analyst:** Hamed Khorsand. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Reiteration. No target change.

## 2025-11-13 — BWS Financial — Maintains — $130 (no change vs prev $130) — Buy

**Analyst:** Hamed Khorsand. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Reiteration. No target change.

## 2025-11-12 — Northland Capital Markets — Maintains — $211 (▲5 vs prev $206) — Outperform

**Analyst:** Nehal Chokshi. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target nudged up by $5 to $211. The most bullish street target in the seed set.

## 2025-11-12 — DA Davidson — Maintains — $150 (no change vs prev $150) — Buy

**Analyst:** Alex Platt. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Reiteration. No target change.

## 2025-09-17 — Goldman Sachs — Maintains — $120 (no change vs prev $120) — Buy

**Analyst:** Alexander Duval. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Reiteration. The most conservative street target in the seed set.

## 2025-09-10 — DA Davidson — Maintains — $125 (▲50 vs prev $75) — Buy

**Analyst:** Alex Platt. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target raised by $50 to $125 — first material bump in the seed set after initial coverage.

## 2025-09-09 — BWS Financial — Maintains — $130 (▲40 vs prev $90) — Buy

**Analyst:** Hamed Khorsand. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Target raised by $40 to $130 — sharpest BWS bump prior to the March 2026 reiteration.

## 2025-09-09 — DA Davidson — Maintains — $75 (no change vs prev $75) — Buy

**Analyst:** Alex Platt. **Source:** Perplexity Finance snapshot 2026-04-25 (ported from `nbis_analysts_ratings.py`).

Earliest entry in the seed set. Initial coverage baseline at $75.

---

## Notes on the seed block

- All 10 entries above are **transcribed from the Python CLI** (`nbis_analysts_ratings.py`, snapshot dated 2026-04-25).
- Each entry has the same source attribution because they share a single snapshot — they were not individually verified against external sources.
- Going forward, scan-generated entries will cite their original wire/source URL.
- The seed block stays at the bottom of the file as a permanent record of the starting state. Do not edit or remove it.
