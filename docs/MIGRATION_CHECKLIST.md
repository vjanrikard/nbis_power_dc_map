# Migration Checklist

Date: 2026-04-20
Use this checklist when moving a project into the shared Common structure.

## Structure

- Verify folders exist:
  - src/components
  - src/pages
  - src/services
  - src/models
  - src/utils
  - src/hooks
  - public
  - assets
  - tests
  - docs
  - config
  - datacenters

## File moves

- Move root index.html to public/index.html.
- Move legacy root text docs into docs/ with clear names.
- Keep only one canonical README in project root.

## Deploy alignment

- Ensure deploy workflow calls the reusable workflow in Common.
- Ensure build step includes public, src, assets, and datacenters when present.

## Validation

- Confirm root no longer contains index.html.
- Confirm docs has migration note and links.
- Run git status and verify only intended moves/creates are present.

## Optional cleanup

- Remove stale folder names with typos (for example assests).
- Add .gitkeep in intentionally empty folders.
- Add a basic favicon in public/favicon.ico.
