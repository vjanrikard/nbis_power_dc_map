// ═══════════════════════════════════════════════════
// Nebius Power DC Map — Data v1.0
// Restructured: 2026-05-04 (mirrors nbis_construction_monitor v1.0/data.js)
// Template:
//   id, name, lat, lng, status, mw, region, chips,
//   partner, desc, online, risk, source
// Plus EVENTS timeline used by the timeline panel.
// ═══════════════════════════════════════════════════

const STATUS_CONFIG = {
  online:       { label: 'Online',             color: '#22c55e' },
  construction: { label: 'Under Construction', color: '#f59e0b' },
  planned:      { label: 'Planned',            color: '#60a5fa' }
};

const REGION_CONFIG = {
  'all':           { label: 'Global' },
  'North America': { label: 'North America' },
  'EMEA':          { label: 'Europe / Middle East / Africa' }
};

const SITES = [
  // ─── EMEA ─────────────────────────────────────────
  {
    id: 1, name: "Mäntsälä, Finland", lat: 60.634, lng: 25.513,
    status: "online", mw: 75, region: "EMEA",
    chips: ["NVIDIA GB300 NVL72", "H200"], partner: "Own facility",
    desc: "Nebius's legacy data center from the Yandex era, now expanded to 75 MW. Houses Europe's first operational NVIDIA GB300 NVL72 deployment. Heat recovery system avoids ~4,000 tonnes CO₂e/year for local district heating.",
    online: "Q1 2025 (expanded)",
    source: "https://nebius.com/hardware"
  },
  {
    id: 2, name: "Kansas City, MO (Colo)", lat: 39.099, lng: -94.578,
    status: "online", mw: 40, region: "North America",
    chips: ["H200", "B200", "Blackwell"], partner: "Patmos AI Campus",
    desc: "Nebius's US entry point. The historic Kansas City Star printing press repurposed as an AI data center. Initial 5 MW went live Q1 2025; expanding to 40 MW. Hosts both Hopper and Blackwell GPUs for enterprise customers.",
    online: "Q1 2025",
    source: "https://www.businesswire.com/news/home/20241119926895/en/Patmos-Announces-Nebius-as-First-Tenant-in-New-Kansas-City-Data-Center"
  },
  {
    id: 3, name: "Keflavik, Iceland", lat: 63.985, lng: -22.556,
    status: "online", mw: 10, region: "EMEA",
    chips: ["NVIDIA Blackwell"], partner: "Verne (100% renewable)",
    desc: "Colocation in Keflavik running 100% on Iceland's renewable hydroelectric and geothermal energy. A 10 MW compute cluster. Reflects Nebius's green energy commitment.",
    online: "Q1 2025",
    source: "https://nebius.com/blog/posts/300-mw-new-jersey-and-iceland-regions"
  },
  {
    id: 4, name: "Paris, France (Equinix)", lat: 48.924, lng: 2.362,
    status: "online", mw: 10, region: "EMEA",
    chips: ["NVIDIA H200"], partner: "Equinix PA10",
    desc: "Colocation at Equinix's PA10 campus in Saint-Denis. Among the first in the world to adopt NVIDIA H200 GPUs. Nebius's original European cloud presence.",
    online: "Pre-2025",
    source: "https://www.sentisight.ai/european-countries-with-most-data-centers/"
  },
  {
    id: 5, name: "Vineland, New Jersey", lat: 39.486, lng: -75.025,
    status: "construction", mw: 300, region: "North America",
    chips: ["NVIDIA Blackwell", "B200"], partner: "DataOne",
    desc: "Nebius's first major owned US data center, built to its own design. Phased to 300 MW total. First capacity expected summer 2025. Anchors Nebius's Microsoft $19.4B GPU compute deal.",
    online: "Summer 2025 (Phase 1)",
    source: "https://northwiseproject.com/nbis-stock-vineland-nj-data-center/"
  },
  {
    id: 6, name: "Longcross, Surrey, UK", lat: 51.373, lng: -0.554,
    status: "online", mw: 30, region: "EMEA",
    chips: ["NVIDIA B300 (Blackwell Ultra)"], partner: "Ark Data Centres",
    desc: "Purpose-built AI workload facility at Ark's Longcross Park campus. Launched Q3 2025 with NVIDIA B300 GPUs — one of the first B300 deployments in Europe. Capacity presold ahead of opening. NHS England among customers.",
    online: "Q3 2025",
    source: "https://www.ark-d-c.com/insights/ark-data-centres-collaborates-with-nebius"
  },
  {
    id: 7, name: "Beit Shemesh, Israel", lat: 31.738, lng: 34.987,
    status: "online", mw: 25, region: "EMEA",
    chips: ["NVIDIA B200"], partner: "Own + Israeli Gov't Innovation Authority",
    desc: "Part of Nebius's $140M national AI supercomputer project for Israel, co-funded by the Israeli government. Launched Q3 2025. Presold capacity.",
    online: "Q3 2025",
    source: "https://www.jpost.com/business-and-innovation/article-871239"
  },
  {
    id: 8, name: "Masmiyya, Israel", lat: 31.85, lng: 34.77,
    status: "construction", mw: 50, region: "EMEA",
    chips: ["NVIDIA Blackwell"], partner: "Own facility",
    desc: "Second Israeli site under construction, part of the expanded national AI infrastructure commitment.",
    online: "2026",
    source: "https://www.datacenterdynamics.com/en/news/nebius-signs-80mw-data-center-lease-with-mega-or-in-israel/"
  },
  {
    id: 9, name: "Independence, Missouri", lat: 39.091, lng: -94.414,
    status: "planned", mw: 1200, region: "North America",
    chips: ["NVIDIA Blackwell", "Vera Rubin"], partner: "Own — 400 acres",
    desc: "Nebius's headline gigawatt-scale campus. 1.2 GW on 400 acres outside Kansas City. Approval secured early 2026. Power delivery starts H2 2026. If fully built, will rival many cities in power consumption. Meta & Microsoft contracts anchor demand.",
    online: "H2 2026 (Phase 1)",
    source: "https://nebius.com/newsroom/nebius-secures-approval-for-its-first-gigawatt-scale-ai-factory"
  },
  {
    id: 10, name: "Béthune (Lille), France", lat: 50.529, lng: 2.643,
    status: "construction", mw: 240, region: "EMEA",
    chips: ["NVIDIA Blackwell", "Vera Rubin"], partner: "Own facility",
    desc: "240 MW AI factory near Lille, one of the largest data centers in France. First phase expected late summer 2026. Will be ~26,000 sqm. Part of Nebius's 750 MW+ EMEA contracted power.",
    online: "Late Summer 2026",
    source: "https://www.datacenterdynamics.com/en/news/nebius-plans-240mw-data-center-in-b%C3%A9thune-france/"
  },
  {
    id: 11, name: "Lappeenranta, Finland", lat: 61.058, lng: 28.187,
    status: "planned", mw: 310, region: "EMEA",
    chips: ["NVIDIA Blackwell", "Vera Rubin NVL72"], partner: "Own facility",
    desc: "Announced March 31, 2026. 310 MW AI factory — one of Europe's largest when complete. Liquid cooled with heat recovery for local district heating. First capacity available to customers in 2027.",
    online: "2027",
    source: "https://nebius.com/newsroom/nebius-to-construct-310-mw-ai-factory-in-finland"
  },
  {
    id: 12, name: "Birmingham, Alabama", lat: 33.520, lng: -86.802,
    status: "planned", mw: 200, region: "North America",
    chips: ["NVIDIA Blackwell"], partner: "Own facility",
    desc: "Announced February 2026. Part of Nebius's US expansion to 16 data centers by end of 2026. Aims to boost Alabama's AI and tech sector.",
    online: "2026",
    source: "https://yellowhammernews.com/permit-filed-for-multibillion-dollar-75-acre-data-center-in-birmingham/"
  },
  {
    id: 13, name: "Minneapolis, MN", lat: 44.977, lng: -93.265,
    status: "planned", mw: 150, region: "North America",
    chips: ["NVIDIA Blackwell"], partner: "TBD",
    desc: "Part of Nebius's broader US expansion plan targeting multiple new facilities in H1 2026.",
    online: "2026",
    source: "https://northwiseproject.com/nbis-minneapolis-minnesota/"
  },
  {
    id: 14, name: "Modi'in, Israel", lat: 31.894, lng: 35.010,
    status: "planned", mw: 80, region: "EMEA",
    chips: ["NVIDIA Blackwell"], partner: "Own facility",
    desc: "Third Israeli location planned as part of the national AI infrastructure buildout. Part of Nebius's 750+ MW EMEA contracted power.",
    online: "2026",
    source: "https://www.datacenterdynamics.com/en/news/nebius-signs-80mw-data-center-lease-with-mega-or-in-israel/"
  }
];

const EVENTS = [
  { date: "Jan 2025", label: "NBIS relists on NASDAQ", color: "#a78bfa", pos: "top",
    title: "Nebius Resumes NASDAQ Trading", desc: "After splitting from Yandex, Nebius Group (NBIS) resumes trading on NASDAQ in October 2024. January 2025 marks the start of its AI infrastructure ramp. Mäntsälä Finland DC is operational.", tags: ["NBIS", "NASDAQ"] },
  { date: "Q1 2025", label: "Kansas City + Iceland go live", color: "#22c55e", pos: "bot",
    title: "Kansas City & Keflavik Online", desc: "Kansas City colocation (5 MW) activates in Q1 2025, giving Nebius its first US revenue-generating capacity. Keflavik, Iceland colocation also goes fully live on 100% geothermal/hydroelectric power.", tags: ["Kansas City", "Iceland", "NVIDIA H200"] },
  { date: "Mar 5, 2025", label: "300 MW NJ announced", color: "#f59e0b", pos: "top",
    title: "New Jersey 300 MW Data Center Announced", desc: "Nebius announces major US expansion: 300 MW facility in Vineland, NJ built to its own design. Phased development, with first capacity expected summer 2025. Confirms 100 MW installed capacity by end-2025.", tags: ["New Jersey", "300 MW", "DataOne"] },
  { date: "May 2025", label: "$140M Israel supercomputer", color: "#00d4ff", pos: "bot",
    title: "Israel National AI Supercomputer — $140M", desc: "Nebius reveals it will build and operate a $140M national AI supercomputer in Israel, partly funded by the Israeli government's Innovation Authority. Anchors Nebius's EMEA expansion strategy.", tags: ["Israel", "Government", "B200"] },
  { date: "Q3 2025", label: "UK & Israel DCs launch", color: "#22c55e", pos: "top",
    title: "UK (Surrey) + Israel (Beit Shemesh) Go Live", desc: "Nebius launches its UK facility at Ark's Longcross Park with NVIDIA B300 Blackwell Ultra GPUs — among first B300 deployments in Europe. Israel Beit Shemesh also comes online with B200s. Both sold out before opening.", tags: ["UK", "Israel", "B300", "B200", "Presold"] },
  { date: "Nov 2025", label: "Microsoft $19.4B deal", color: "#a78bfa", pos: "bot",
    title: "Microsoft Deal — Up to $19.4 Billion", desc: "Nebius secures a landmark deal with Microsoft to provide GPU compute from its New Jersey facility. Microsoft — owner of Azure — outsourcing AI capacity is a major validation of Nebius's cost and technical edge.", tags: ["Microsoft", "$19.4B", "New Jersey"] },
  { date: "Q4 2025", label: "170 MW online / ARR $1.25B", color: "#00d4ff", pos: "top",
    title: "End of 2025: 170 MW Online, ARR $1.25B", desc: "Nebius closes 2025 with 170 MW of connected capacity and $1.25B annualized recurring revenue — exceeding guidance. Full-year revenue $529.8M, up 479% YoY. EBITDA margin reaches 24% in Q4. Cash: $3.7B.", tags: ["Earnings", "ARR $1.25B", "170 MW"] },
  { date: "Feb 2026", label: "Tavily acquired + Birmingham", color: "#f59e0b", pos: "bot",
    title: "Tavily Acquisition + Birmingham DC", desc: "Nebius acquires agentic AI search company Tavily for ~$400M. Also announces plans for a new AI factory in Birmingham, Alabama, expanding its US footprint.", tags: ["Tavily", "M&A", "Birmingham", "$400M"] },
  { date: "Feb 12, 2026", label: "FY2025 results: $530M rev", color: "#00d4ff", pos: "top",
    title: "FY2025 Results — $530M Revenue (+479%)", desc: "Full-year 2025 revenue of $529.8M, up 479% YoY. Q4 revenue $227.7M. Company guides 2026 revenue of $3–$3.4B and 40% adjusted EBITDA margins. Plans $16–20B in 2026 capex.", tags: ["Earnings", "FY2025", "$530M"] },
  { date: "Mar 11, 2026", label: "NVIDIA invests $2B in Nebius", color: "#a78bfa", pos: "bot",
    title: "NVIDIA Invests $2 Billion in Nebius", desc: "NVIDIA announces a $2 billion strategic investment in Nebius — a profound endorsement of its AI infrastructure capabilities. NVIDIA had previously invested $700M in Dec 2024.", tags: ["NVIDIA", "$2B", "Strategic"] },
  { date: "Mar 16, 2026", label: "Meta $27B deal (5-year)", color: "#22c55e", pos: "top",
    title: "Meta Deal — Up to $27 Billion (5-Year)", desc: "Nebius signs a landmark 5-year, up to $27B commitment with Meta to deploy dedicated AI cloud capacity powered by NVIDIA Vera Rubin. Delivery begins early 2027. Meta — with its own custom silicon — outsourcing to Nebius is a seismic validation.", tags: ["Meta", "$27B", "Vera Rubin", "5-year"] },
  { date: "Mar 31, 2026", label: "Lappeenranta 310 MW (Finland)", color: "#f59e0b", pos: "bot",
    title: "Lappeenranta 310 MW AI Factory — Finland", desc: "Nebius announces construction of a 310 MW AI factory in Lappeenranta, Finland. One of Europe's largest dedicated AI factories when complete. Liquid cooled with district heat recovery. First capacity in 2027.", tags: ["Finland", "310 MW", "Vera Rubin"] },
  { date: "2026 Target", label: ">3 GW contracted / 800MW live", color: "#00d4ff", pos: "top",
    title: "2026 Target: 3+ GW Contracted, 800 MW Live", desc: "Nebius targets >3 GW of contracted power globally by end of 2026, with 800 MW–1 GW of live connected capacity. 16 data centers operating in US and Europe. Revenue target: $3–$3.4B. ARR target: $7–$9B.", tags: ["Target", "3 GW", "800 MW", "$7-9B ARR"] }
];

// Last update timestamp — bump on every commit (manual edit or daily scan).
// Format: "YYYY-MM-DD HH:MM" (24h, local time).
const LAST_UPDATE = "2026-05-04 12:00";

// Q1 2026 earnings highlights (Apr 29 2026) — mirrors construction_monitor
const NEBIUS_EARNINGS_Q1_2026 = {
  contractedPowerGW: 2.0,
  contractedGuidanceGW: 3.0,
  connectedTargetEnd2026: "800 MW – 1 GW",
  revenueGuidance2026: "$3.0 – $3.4B",
  capExPlan2026: "$16 – $20B",
  convertibleDebtRaised: "$4B",
  ebitdaMarginTarget: "40%",
  msftContractValue: "$17.4B",
  msftContractDuration: "Through 2031",
  metaContractValue: "$27B / 5 years"
};
