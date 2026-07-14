/* ═══════════════════════════════════════════════════════════════════
   nbis_data.js — NBIS Technical Charts Suite v1.1
   ─────────────────────────────────────────────────────────────────
   DETTE ER FILEN DU REDIGERER, RikardV. Chart-motoren
   (NBIS_Technical_Charts_v1.1.html) trenger du aldri å røre.

   • anchors  = ankerpunkter [dato, kurs] som den rekonstruerte
                prisbanen trekkes gjennom. Legg til nye punkter når
                noe skjer (f.eks. etter Q2-rapporten). Datoer må være
                ukedager, i stigende rekkefølge.
   • events   = milepæler som vises som nummererte merker på chartet.
   • pinned   = kjente ekstremer som festes eksakt (ATH, 52u-lav).
   • settings = seed, periode, volatilitet og siste slutt-kurs.

   Filen må ligge i samme mappe som HTML-filen.
   ═══════════════════════════════════════════════════════════════════ */

window.NBIS_DATA = {

  meta: {
    symbol:   'NBIS',
    name:     'Nebius Group N.V.',
    exchange: 'NASDAQ',
    version:  '1.1'
  },

  settings: {
    seed:        1337,          // samme seed = samme rekonstruerte chart
    start:       '2024-10-21',  // relisting på Nasdaq
    end:         '2026-07-14',  // siste dag i rekonstruksjonen (oppdater!)
    finalClose:  210.51,        // slutt-kurs på siste dag (Yahoo 13.07.26)
    volDefault:  0.035,         // daglig volatilitet før volLateFrom
    volLate:     0.045,         // daglig volatilitet etter volLateFrom
    volLateFrom: '2025-09-01',
    volJump:     0.06,          // ekstra volatilitet i jumpWindow
    jumpWindow:  ['2025-09-05', '2025-09-16']  // Microsoft-hoppet
  },

  /* Ankerpunkter: [ 'ÅÅÅÅ-MM-DD', kurs ] */
  anchors: [
    ['2024-10-21',  21   ],  // relisting
    ['2024-12-02',  28.5 ],  // $700M-emisjon (bl.a. NVIDIA)
    ['2025-02-10',  38   ],  // topp før Vineland-blokkeringen
    ['2025-04-07',  33.5 ],
    ['2025-06-16',  33.1 ],  // bunn (52u-lav 32.88 festes i pinned)
    ['2025-09-05',  64   ],  // dagen før Microsoft-avtalen
    ['2025-09-08',  98   ],  // Microsoft $17.4B
    ['2025-11-10', 132   ],
    ['2025-12-15', 112   ],  // korreksjon
    ['2026-02-20', 142   ],  // Q4 2025-rapport
    ['2026-03-05', 158   ],  // NVIDIA $2B
    ['2026-03-20', 172   ],  // Meta-avtalen
    ['2026-04-15', 149   ],  // pullback / NJ-usikkerhet
    ['2026-05-12', 195   ],  // ATH-uken (197.89 festes i pinned)
    ['2026-06-10', 158   ],
    ['2026-06-25', 185   ],  // sommerrally
    ['2026-07-14', 210.5 ]   // i dag (reell kurs, Yahoo)
  ],

  /* Kjente ekstremer som festes eksakt på gitt dato */
  pinned: [
    { date: '2026-07-13', field: 'h', value: 219    },  // 52u-høy (Yahoo, juli 2026)
    { date: '2026-05-12', field: 'h', value: 197.89 },  // mai-toppen
    { date: '2025-06-16', field: 'l', value: 32.88  }   // 52u-lav (per mai 2026)
  ],

  /* Milepæler — vises som nummererte merker + i event-listen */
  events: [
    { d: '2024-10-21', t: 'Relisting på Nasdaq etter Yandex-splitten' },
    { d: '2025-02-10', t: 'NJ Vineland: miljøtillatelse blokkert (EJ Law)' },
    { d: '2025-09-08', t: 'Microsoft-avtale $17.4B (Vineland-kapasitet)' },
    { d: '2026-02-20', t: 'Q4 2025-rapport: EBITDA-margin 24 %' },
    { d: '2026-03-05', t: 'NVIDIA investerer $2B i Nebius' },
    { d: '2026-03-20', t: 'Meta-avtale: dedikerte GPU-klynger ($27B/5 år)' },
    { d: '2026-05-06', t: 'Kjøper Eigen AI — Token Factory styrkes' },
    { d: '2026-05-12', t: 'Ny topp $197.89 · AI Cloud 3.5 lansert' },
    { d: '2026-05-20', t: '$4.3B konvertibelt obligasjonslån lukket' }
  ]
};
