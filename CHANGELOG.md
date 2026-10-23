# Changelog

## 2026-10-23

- **alpha/data/analysts.json**: corrected the Piper Sandler 2026-10-21 entry (Lowers to $185) that the ratings importer had written with empty fields. Set rating "Neutral", analyst "James Fish", prevTarget 224 (from the 2026-08-04 initiation). The note now starts with "45 ratings from 18 firms." Approved by Chief of Staff on behalf of RikardV.
- **NBIS_Ratings_Importer** (`nbis_ratings_importer.py` v2.1, local script outside this repo, run by the `--write-portal` scheduled task):
  - Rows with an empty rating or analyst are no longer written to analysts.json. They are skipped, flagged in `import_log.txt` and `uncertain_log.txt`, and left for manual review.
  - A missing prevTarget is looked up from the most recent earlier analysts.json row for the same firm.
  - When rows are added, the leading "N ratings from M firms." in the note is recomputed.
  - Tested with `--dry-run`: no write and no new rows; the helpers were unit-checked (Piper Sandler prevTarget lookup = 224).
