# Flyttelog for prosjektstruktur

Dato: 2026-04-20
Prosjekt: nebius_power_dc_map
Mål: Tilpasse prosjektet til felles struktur for delbare applikasjoner.

## Hva som ble flyttet

1. Rotfilen index.html ble flyttet til public/index.html.
2. Rotfilen readme.txt ble flyttet til docs/readme-legacy.txt.
3. Placeholder-fil public/favicon.ico ble opprettet for standard webstruktur.
4. Standard mapper ble verifisert/opprettet:
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

## Endringer i praksis

Før:
- index.html i rot
- readme.txt i rot

Etter:
- public/index.html
- docs/readme-legacy.txt
- public/favicon.ico

## Hvorfor flytten ble gjort

- Gjøre strukturen lik på tvers av prosjekter.
- Skille statiske filer (public) fra kildekode (src).
- Samle dokumentasjon i docs.
- Klargjøre datagrunnlag i datacenters for AI-datasenterinnhold.

## Status etter flytt

- Flytten er gjennomført og verifisert.
- index.html og readme.txt finnes ikke lenger i rot.
- Prosjektet følger nå ønsket mappeoppsett.

## Videre anbefaling

1. Oppdater eventuelle lenker eller scripts som tidligere refererte til index.html i rot.
2. Legg eventuelle datacenter-filer i datacenters.
3. Legg forretningslogikk i src/services og rene hjelpefunksjoner i src/utils.
