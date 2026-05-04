# AI Power DC Map

Interactive map and timeline tracking AI data centers worldwide, with filtering by company category and project status.

## Tech stack

- HTML/CSS/JavaScript (vanilla)
- Leaflet for map rendering
- Static hosting compatible with GitHub Pages

## Quick start

1. Open public/index.html in browser for local preview.
2. For deploy, use the shared workflow from Common.

## Files

- public/index.html: main UI layout.
- src/components: reusable UI pieces.
- src/pages: page-specific modules.
- src/services: API and data fetch logic.
- src/models: data types and interfaces.
- src/utils: helper functions.
- src/hooks: custom hooks and helper patterns.
- datacenters: datasets for planned, construction, and online sites.

## Recent fixes

- Theme now defaults correctly (`light`/`dark`) and persists in local storage.
- Map tiles now switch correctly between light and dark basemaps.
- Server path handling now blocks traversal attempts and ignores query strings when resolving files.

## Migration notes

- See MIGRATION_FLYTT_2026-04-20.md for the structure migration log.
- See MIGRATION_CHECKLIST.md for reusable migration steps.
- See UI_BUTTON_PROPOSALS.md for suggested new buttons/actions.
