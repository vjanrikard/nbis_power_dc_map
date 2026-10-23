# Changelog

## 2026-10-23

- **NBIS_Technicals_Update** (Windows scheduled task): the daily report step now runs `technicals_daily.js NBIS` from `C:\GitHub\vjanrikard\workspace\reports\nbis-technicals-daily-update\` (was `portfolio-ikz\reports-daily`, where the script no longer lives, so the 2026-10-22 report failed). The `update_technicals.js --push` portal step is unchanged.
- **technicals_daily.js** (local script outside this repo; backup `technicals_daily.js.bak-2026-10-23`): output directory changed from `<script dir>\nbis-technicals-daily-update\` to `C:\GitHub\vjanrikard\workspace\reports\rikardv\` (no nested folder). `nbis-technicals-latest.json` is now written there too.
- Regenerated the 2026-10-22 report with `--briefing` (exit 0): `reports\rikardv\nbis-technicals-daily-update-22-10-2026.{md,html,pdf}`. Approved by Chief of Staff on behalf of RikardV.
- **alpha/data/analysts.json**: corrected the Piper Sandler 2026-10-21 entry (Lowers to $185) that the ratings importer had written with empty fields. Set rating "Neutral", analyst "James Fish", prevTarget 224 (from the 2026-08-04 initiation). The note now starts with "45 ratings from 18 firms." Approved by Chief of Staff on behalf of RikardV.
- **NBIS_Ratings_Importer** (`nbis_ratings_importer.py` v2.1, local script outside this repo, run by the `--write-portal` scheduled task):
  - Rows with an empty rating or analyst are no longer written to analysts.json. They are skipped, flagged in `import_log.txt` and `uncertain_log.txt`, and left for manual review.
  - A missing prevTarget is looked up from the most recent earlier analysts.json row for the same firm.
  - When rows are added, the leading "N ratings from M firms." in the note is recomputed.
  - Tested with `--dry-run`: no write and no new rows; the helpers were unit-checked (Piper Sandler prevTarget lookup = 224).
