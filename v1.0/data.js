// ═══════════════════════════════════════════════════
// Nebius Power DC Map — Data v1.0
// Updated: 2026-07-14
// 20 sites, sorted by MW descending (largest first)
// Regions: Americas / Europe / Middle East / APAC
// Each site: id, name, lat, lng, status, mw, region, chips,
//            partner, delivery, online, note, desc, risk, riskReason, sources
// ═══════════════════════════════════════════════════

const STATUS_CONFIG = {
  online:       { label: 'Online',             color: '#22c55e' },
  construction: { label: 'Under Construction', color: '#f59e0b' },
  planned:      { label: 'Planned',            color: '#60a5fa' }
};

const RISK_CONFIG = {
  CRITICAL: { label: 'CRITICAL', color: '#ef4444' },
  HIGH:     { label: 'HIGH',     color: '#f97316' },
  MEDIUM:   { label: 'MED',      color: '#facc15' },
  LOW:      { label: 'LOW',      color: '#22c55e' }
};

const REGION_CONFIG = {
  'all':         { label: 'Global' },
  'Americas':    { label: 'Americas' },
  'Europe':      { label: 'Europe' },
  'Middle East': { label: 'Middle East' },
  'APAC':        { label: 'Asia Pacific' }
};

// Sites sorted by MW descending. id is preserved (not renumbered).
const SITES = [
  { id: 2, name: "Independence, MO", lat: 39.0911, lng: -94.4155,
    status: "construction", mw: 1200, region: "Americas",
    chips: ["NVIDIA GB200", "GB300"], partner: "Independence Power Partners (IPP)",
    delivery: "2028-Q1", online: "2028 (Phase 1)",
    note: "Eastgate 398-acre; 250 MW Oct 2027 → 1.1 GW Dec 2029; city moratorium Jul 2026 (existing build unaffected)",
    desc: "Largest US AI factory. Council approval Mar 3 2026, groundbreaking May 12 2026. 398-acre Eastgate Commerce Center, 10 buildings. IPP power plant: 250 MW Oct 2027 → 1.1 GW Dec 2029. Jul 7 2026: City Council voted 7-0 for a 6-month moratorium on NEW data center approvals — Nebius construction continues unaffected, but zoning reclassification (>2.5 MW = special use permit) is under review.",
    risk: "HIGH",
    riskReason: "Largest single CapEx commitment ($10.6B/yr 2028-2030); greenfield IPP power plant scaling 250 MW → 1.1 GW from scratch by 2029. Rising local opposition: Jul 2026 city moratorium on new DC approvals, Independence Guard Alliance threatening legal action — Vineland-style community-risk pattern.",
    sources: [
      "https://nebius.com/newsroom/nebius-secures-approval-for-its-first-gigawatt-scale-ai-factory",
      "https://www.datacenterdynamics.com/en/news/nebius-plans-800mw-data-center-campus-in-kansas-city-missouri/",
      "https://www.kctv5.com/2026/07/08/independence-hits-pause-data-centers-nebius-construction-moves-forward/"
    ]
  },
  { id: 20, name: "Pennsylvania, USA", lat: 40.2732, lng: -76.8867,
    status: "planned", mw: 1200, region: "Americas",
    chips: ["TBD"], partner: "TBD (Meta/Microsoft named as customers/financing)",
    delivery: "2027-EOY (lights-up)", online: "End 2027: 250-350 MW",
    note: "Announced May 13-14 2026; 2nd US GW-campus; +300 MW/yr to 1.2 GW; site undisclosed",
    desc: "Second US gigawatt-scale campus. Up to 1.2 GW secured power and land, announced May 13-14 2026. Lights-up end of 2027 with 250-350 MW, then ~300 MW added per year up to 1.2 GW. Exact site/county not yet disclosed. Note: Bloom Energy SOFC deal (May 21 2026, up to 328 MW behind-the-meter at an undisclosed US site) may be linked to this or another US site.",
    risk: "MEDIUM",
    riskReason: "Early-stage: site, power source and investment not disclosed. Part of raised $20-25B 2026 CapEx plan.",
    sources: [
      "https://www.datacenterdynamics.com/en/news/nebius-plans-second-us-gigawatt-scale-data-center-campus-in-pennsylvania/",
      "https://www.theaiconsultingnetwork.com/blog/nebius-pennsylvania-1-2gw-ai-data-center-cre-investors-2026"
    ]
  },
  { id: 8, name: "Lappeenranta, Finland", lat: 61.0587, lng: 28.1887,
    status: "construction", mw: 310, region: "Europe",
    chips: ["NVIDIA Blackwell", "Vera Rubin NVL72"], partner: "Polarnode",
    delivery: "2027", online: "2027 (Phase 1)",
    note: "€8.5B; announced Mar 31 2026; 700 construction jobs",
    desc: "Largest facility outside US. 310 MW AI campus in Pajarila. Construction started Mar 31 2026. €8.5B / $10B investment. Largest single industrial project in Finland history.",
    risk: "LOW",
    riskReason: "On-track per Mar 2026 announcement; strong Finnish industrial track record; staged delivery from 2027.",
    sources: ["https://nebius.com/newsroom/nebius-to-construct-310-mw-ai-factory-in-finland"]
  },
  { id: 1, name: "Vineland, NJ", lat: 39.4864, lng: -75.0260,
    status: "construction", mw: 300, region: "Americas",
    chips: ["NVIDIA Blackwell", "B200"], partner: "DataOne / Microsoft",
    delivery: "2026-11", online: "Nov 2026 (full)",
    note: "$17.4B MSFT anchor; phased 100 MW; Nov 2026 target",
    desc: "First major US AI data center. ~2.6M sqft. Built by DataOne with Nebius-designed infrastructure. Phased in 100 MW modules. PILOT ordinance approved Jan 27 2026. $17.4B Microsoft contract anchor through 2031.",
    risk: "CRITICAL",
    riskReason: "Single-customer anchor concentration ($17.4B MSFT through 2031); residual NJ EJ Law community-opposition exposure.",
    sources: [
      "https://northwiseproject.com/nbis-stock-vineland-nj-data-center/",
      "https://www.reddit.com/r/NBIS_Stock/comments/1l7yvvo/nj_datacenter_update/",
      "https://www.aiwire.net/2025/03/05/nebius-accelerates-ai-cloud-growth-with-us-and-european-expansion/"
    ]
  },
  { id: 4, name: "Birmingham, AL (BHM01)", lat: 33.5186, lng: -86.8104,
    status: "construction", mw: 300, region: "Americas",
    chips: ["NVIDIA Blackwell"], partner: "Hoar Construction",
    delivery: "2027-2028", online: "Phase 1: Spring 2027",
    note: "Construction underway; substation variance approved; SELC lawsuit pending",
    desc: "80 acres at 201 Milan Parkway. GC: Hoar Construction. Phase 1 ~100 MW spring 2027, Phase 2 ~200 MW fall 2028. Substation variance approved after April 2026 delay. SELC/Humane Society lawsuits filed — same EJ playbook as Vineland.",
    risk: "HIGH",
    riskReason: "Active litigation (SELC + Humane Society). Environmental Justice exposure mirrors Vineland NJ. Substation approved but legal challenges could delay Phase 1.",
    sources: [
      "https://yellowhammernews.com/permit-filed-for-multibillion-dollar-75-acre-data-center-in-birmingham/",
      "https://www.wbrc.com/2026/04/19/birmingham-residents-rally-against-proposed-ai-factory/"
    ]
  },
  { id: 9, name: "Béthune, France", lat: 50.5306, lng: 2.6388,
    status: "construction", mw: 240, region: "Europe",
    chips: ["NVIDIA Blackwell", "Vera Rubin"], partner: "Azur Datacenter",
    delivery: "2026-Q3", online: "Late summer 2026 (Phase 1: 60 MW)",
    note: "Phase 1 = 60 MW late summer 2026; ~120 MW EOY 2026; 240 MW EOY 2027",
    desc: "240 MW on former Bridgestone tyre plant. 26,000 sqm. Phase 1 (60 MW) targeted late summer 2026 — France's first AI-dedicated facility. ~120 MW energized EOY 2026, full 240 MW EOY 2027.",
    risk: "LOW",
    riskReason: "Phase 1 on schedule; established Azur partnership; brownfield lowers permitting risk.",
    sources: ["https://www.datacenterdynamics.com/en/news/nebius-plans-240mw-data-center-in-b%C3%A9thune-france/"]
  },
  { id: 5, name: "Minneapolis, MN", lat: 44.9778, lng: -93.2650,
    status: "online", mw: 100, region: "Americas",
    chips: ["NVIDIA Blackwell"], partner: "Cloud Capital / Arcapita JV",
    delivery: "2026-01", online: "Jan 2026",
    note: "21 MW stabilized; adaptive reuse, anchor tenant",
    desc: "Adaptive reuse strategy. 21 MW stabilized acquired Jan 2026 by Cloud Capital/Arcapita JV; Nebius is anchor tenant.",
    risk: "LOW",
    riskReason: "Anchor tenant via JV (no Nebius capital at risk); 21 MW stabilized via adaptive reuse.",
    sources: ["https://northwiseproject.com/nbis-minneapolis-minnesota/"]
  },
  { id: 6, name: "Oklahoma", lat: 35.4676, lng: -97.5164,
    status: "planned", mw: 100, region: "Americas",
    chips: ["NVIDIA GPU"], partner: "TBD",
    delivery: "2027", online: "2027",
    note: "Part of 16-DC by 2026 expansion strategy",
    desc: "Planned US expansion site. Part of Nebius's strategy to establish 16 global data center locations by end of 2026.",
    risk: "LOW",
    riskReason: "Planned but not yet committed; small (100 MW) within 16-DC strategy. Site partner TBD.",
    sources: []
  },
  { id: 7, name: "Mäntsälä, Finland", lat: 60.6333, lng: 25.3167,
    status: "online", mw: 75, region: "Europe",
    chips: ["NVIDIA GB300 NVL72", "H100", "H200"], partner: "Self (owns land)",
    delivery: "2014-01", online: "2014 (expanded 2025)",
    note: "Flagship EU site; tripled to 75 MW; ISEG supercomputer",
    desc: "Flagship European DC since 2014. Tripled to 75 MW. Hosts ISEG supercomputer (16th on Top500). Up to 60,000 GPUs. 100% renewable energy.",
    risk: "LOW",
    riskReason: "Operational since 2014, owned land, 100% renewable. Flagship EU reference site.",
    sources: [
      "https://nebius.com/hardware",
      "https://group.nebius.com/newsroom/nebius-to-triple-capacity-at-finland-data-center-to-75-mw",
      "https://www.piller.com/major-expansion-of-high-performance-data-center-in-southern-finland/"
    ]
  },
  { id: 16, name: "Beit Shemesh, Israel", lat: 31.7456, lng: 34.9885,
    status: "construction", mw: 58, region: "Middle East",
    chips: ["NVIDIA GPU"], partner: "Mega Or / Mega DC",
    delivery: "2026-Q3 → 2027-Q1", online: "Q3 2026 → Q1 2027",
    note: "Part of $880M deal; expandable to 222 MW",
    desc: "58 MW delivery in stages from Q3 2026 through Q1 2027. Expandable to 222 MW. Part of $880M Mega Or deal.",
    risk: "MEDIUM",
    riskReason: "Geopolitical exposure + phased Q3 2026 → Q1 2027 delivery; expandable to 222 MW.",
    sources: ["https://www.datacenterdynamics.com/en/news/nebius-signs-80mw-data-center-lease-with-mega-or-in-israel/"]
  },
  { id: 3, name: "Kansas City, MO", lat: 39.0997, lng: -94.5786,
    status: "online", mw: 40, region: "Americas",
    chips: ["NVIDIA Blackwell", "H200"], partner: "Patmos AI Campus",
    delivery: "2025-01", online: "Q1 2025",
    note: "5 MW live Q1 2025; expansion to 40 MW late 2026",
    desc: "US gateway facility at Patmos AI Campus (former KC Star). 5 MW live Q1 2025; contracted expansion to 40 MW late 2026.",
    risk: "LOW",
    riskReason: "Operational since Q1 2025; small footprint; established Patmos partnership.",
    sources: [
      "https://www.businesswire.com/news/home/20241119926895/en/Patmos-Announces-Nebius-as-First-Tenant-in-New-Kansas-City-Data-Center",
      "https://finance.yahoo.com/news/nebius-announces-300-mw-data-120018907.html"
    ]
  },
  { id: 15, name: "Masmiyya, Israel", lat: 31.7308, lng: 34.7644,
    status: "construction", mw: 22, region: "Middle East",
    chips: ["NVIDIA GPU"], partner: "Mega Or / Mega DC",
    delivery: "2026-09", online: "Sep 2026",
    note: "Part of $880M deal; expandable to 64 MW",
    desc: "22 MW delivery Q3 2026. Expandable to 64 MW. 5-year lease. Part of $880M Mega Or deal.",
    risk: "MEDIUM",
    riskReason: "Geopolitical exposure + construction risk; part of $880M Mega Or deal; Q3 2026 delivery.",
    sources: ["https://www.datacenterdynamics.com/en/news/nebius-signs-80mw-data-center-lease-with-mega-or-in-israel/"]
  },
  { id: 11, name: "Longcross Park, UK", lat: 51.3920, lng: -0.5520,
    status: "online", mw: 16, region: "Europe",
    chips: ["NVIDIA B300 (Blackwell Ultra)"], partner: "Ark Data Centres",
    delivery: "2025-11", online: "Nov 2025",
    note: "4,000 Blackwell Ultra GPUs; phase 2 = 3,000 B300s",
    desc: "First UK DC at Ark Longcross Park. 3 data halls, 126 racks, 16 MW. Phase 1: 4,000 Blackwell Ultra. Phase 2: 3,000 B300s.",
    risk: "LOW",
    riskReason: "Operational since Nov 2025; small (16 MW); Ark established UK colo partner.",
    sources: [
      "https://group.nebius.com/newsroom/nebius-launches-in-uk-expands-britains-ai-infrastructure-with-nvidia-blackwell-ultra",
      "https://www.ark-d-c.com/insights/ark-data-centres-collaborates-with-nebius"
    ]
  },
  { id: 10, name: "Saint-Denis (Paris), France", lat: 48.9362, lng: 2.3574,
    status: "online", mw: 10, region: "Europe",
    chips: ["NVIDIA H200"], partner: "Equinix PA10",
    delivery: "2024-11", online: "Nov 2024",
    note: "First H200 site in Europe; Nebius-designed servers",
    desc: "Colocation at Equinix PA10 campus. First European site with NVIDIA H200 GPUs. First facility with only Nebius-designed servers.",
    risk: "LOW",
    riskReason: "Operational colocation at Equinix PA10; small footprint.",
    sources: [
      "https://group.nebius.com/newsroom/nebius-group-n-v-announces-fourth-quarter-and-full-year-2024-financial-results",
      "https://www.sentisight.ai/european-countries-with-most-data-centers/"
    ]
  },
  { id: 12, name: "Keflavik, Iceland", lat: 63.9850, lng: -22.6056,
    status: "online", mw: 10, region: "Europe",
    chips: ["NVIDIA Blackwell"], partner: "Verne (100% renewable)",
    delivery: "2025-06", online: "Jun 2025",
    note: "100% renewable hydro/geothermal; subarctic cooling",
    desc: "Colocation with Verne. 10 MW compute cluster. 100% renewable hydro/geothermal. Natural cooling in subarctic climate.",
    risk: "LOW",
    riskReason: "Operational; small (10 MW); 100% renewable; Verne established Nordic colo partner.",
    sources: [
      "https://nebius.com/blog/posts/300-mw-new-jersey-and-iceland-regions",
      "https://www.datacenter-forum.com/datacenter-forum/nebius-announces-new-colocation-in-iceland"
    ]
  },
  { id: 13, name: "Madrid (Getafe), Spain", lat: 40.3058, lng: -3.7327,
    status: "construction", mw: 18, region: "Europe",
    chips: ["TBD"], partner: "Merlin Properties",
    delivery: "2026", online: "2026 (estimated)",
    note: "18 MW colo lease signed ~Jul 3 2026; part of 68 MW Getafe campus (2 buildings, 20+48 MW); PUE 1.15",
    desc: "18 MW colocation lease with Merlin Properties at the Getafe campus near Madrid — Nebius's first Spain site and 5th European country. Part of a larger 68 MW two-building campus (20 MW + 48 MW), PUE 1.15. Confirms earlier job-listing evidence. Note: an earlier, separate GW-scale Nebius plan for Andalusia (Navalmoral de la Mata, Cáceres) was abandoned Feb 2026 due to lack of guaranteed power — unrelated to this Getafe lease.",
    risk: "LOW",
    riskReason: "Colocation lease (not owned build) — lower capital/permitting risk. Early-stage but now contractually confirmed rather than job-listing inference.",
    sources: [
      "https://www.datacenterdynamics.com/en/news/nebius-signs-18mw-lease-with-merlin-properties-at-spain-data-center-report/",
      "https://bruno.digital/news/nebius-grabs-18mw-in-madrid-and-europe-s-ai-compute-race-opens-a-spanish-front"
    ]
  },
  { id: 18, name: "East London, UK", lat: 51.5424, lng: 0.0055,
    status: "planned", mw: 10, region: "Europe",
    chips: ["TBD"], partner: "Colocation TBD",
    delivery: "2026", online: "2026 (estimated)",
    note: "Announced Q1 2026; partner + capacity TBD",
    desc: "Planned colocation in East London. Announced Q1 2026 as part of Nebius's expansion to 16 global data center locations. Partner and final capacity not yet disclosed.",
    risk: "LOW",
    riskReason: "Early-stage; no committed CapEx disclosed; part of broader 16-DC expansion strategy.",
    sources: []
  },
  { id: 19, name: "Amsterdam, Netherlands", lat: 52.3676, lng: 4.9041,
    status: "planned", mw: 10, region: "Europe",
    chips: ["TBD"], partner: "Colocation TBD",
    delivery: "2026", online: "2026 (estimated)",
    note: "Announced Q1 2026; Nebius HQ city; partner + capacity TBD",
    desc: "Planned colocation in Amsterdam — Nebius Group headquarters city. Announced Q1 2026. Part of 16-DC global expansion. Partner and capacity not yet disclosed.",
    risk: "LOW",
    riskReason: "Early-stage; no committed CapEx; HQ proximity may accelerate setup.",
    sources: []
  },
  { id: 17, name: "Singapore", lat: 1.3521, lng: 103.8198,
    status: "planned", mw: 10, region: "APAC",
    chips: ["TBD"], partner: "TBD",
    delivery: "2026", online: "2026 (regional launch)",
    note: "First APAC site; new GM based here Mar 2026; MW TBD",
    desc: "First APAC site — announced Mar 2026 as Nebius's regional hub for SE Asia. New GM based here, overseeing Singapore, Japan, South Korea, India.",
    risk: "LOW",
    riskReason: "Strategic regional expansion; no committed CapEx disclosed yet; small expected initial footprint.",
    sources: [
      "https://nebius.com/newsroom/nebius-expands-into-asia-pacific-region-to-support-rapid-global-growth",
      "https://www.crnasia.com/news/2025/artificial-intelligence/nebius-eyes-singapore-as-hub-for-expansion"
    ]
  },
  { id: 14, name: "Modi'in, Israel", lat: 31.8928, lng: 35.0107,
    status: "online", mw: 8, region: "Middle East",
    chips: ["NVIDIA B200"], partner: "Mega Or / Mega DC",
    delivery: "2025-09", online: "Sep 2025",
    note: "4,000 NVIDIA GPUs; hosts national supercomputer",
    desc: "8 MW colocation at Mega Or facility. Deployed 4,000 NVIDIA GPUs. Hosts part of Israel's national supercomputer via Israel Innovation Authority.",
    risk: "MEDIUM",
    riskReason: "Geopolitical exposure (Israel); small (8 MW) but politically sensitive — hosts national supercomputer.",
    sources: [
      "https://www.jpost.com/business-and-innovation/article-871239",
      "https://www.datacenterdynamics.com/en/news/nebius-to-build-and-operate-140m-israeli-national-supercomputer/"
    ]
  }
];

const EVENTS = [
  { date: "Nov 2024", label: "Paris GPU cluster live", color: "#22c55e", pos: "top",
    title: "Paris (Saint-Denis) Goes Live", desc: "First European AI cloud capacity at Equinix PA10. First H200 site in Europe.", tags: ["Paris", "H200"] },
  { date: "Jan 2025", label: "NBIS relists on NASDAQ", color: "#a78bfa", pos: "bot",
    title: "Nebius Resumes NASDAQ Trading", desc: "After splitting from Yandex, NBIS resumes NASDAQ trading. Start of AI infrastructure ramp.", tags: ["NBIS"] },
  { date: "Q1 2025", label: "KC + Iceland live", color: "#22c55e", pos: "top",
    title: "Kansas City & Keflavik Online", desc: "Kansas City (5 MW) and Keflavik Iceland go live. Iceland on 100% renewable.", tags: ["KC", "Iceland"] },
  { date: "Mar 5, 2025", label: "300 MW NJ announced", color: "#f59e0b", pos: "bot",
    title: "New Jersey 300 MW Announced", desc: "Vineland NJ 300 MW facility. 100 MW installed by end-2025.", tags: ["NJ"] },
  { date: "Mid 2025", label: "Mäntsälä tripled to 75 MW", color: "#22c55e", pos: "top",
    title: "Finland Flagship Tripled", desc: "Mäntsälä Finland tripled to 75 MW. Hosts ISEG supercomputer (#16 on Top500).", tags: ["Finland"] },
  { date: "Q3 2025", label: "UK + Israel launch", color: "#22c55e", pos: "bot",
    title: "UK + Israel Sites Live", desc: "UK Longcross with B300 Blackwell Ultra. Israel Modi'in with B200s. Both presold.", tags: ["UK", "Israel"] },
  { date: "Nov 2025", label: "Microsoft $19.4B", color: "#a78bfa", pos: "top",
    title: "Microsoft Deal — Up to $19.4B", desc: "Landmark deal with Microsoft for GPU compute from NJ.", tags: ["Microsoft"] },
  { date: "Q4 2025", label: "170 MW / ARR $1.25B", color: "#00d4ff", pos: "bot",
    title: "End of 2025: 170 MW Online", desc: "170 MW connected, $1.25B ARR. Revenue $529.8M (+479% YoY).", tags: ["Earnings"] },
  { date: "Feb 2026", label: "Tavily + Birmingham", color: "#f59e0b", pos: "top",
    title: "Tavily Acquisition + Birmingham DC", desc: "Acquires Tavily for ~$400M. Announces Birmingham AL AI factory.", tags: ["Tavily"] },
  { date: "Mar 11, 2026", label: "NVIDIA $2B investment", color: "#a78bfa", pos: "bot",
    title: "NVIDIA Invests $2 Billion", desc: "NVIDIA $2B strategic investment. Previously $700M in Dec 2024.", tags: ["NVIDIA"] },
  { date: "Mar 16, 2026", label: "Meta $27B (5-yr)", color: "#22c55e", pos: "top",
    title: "Meta Deal — Up to $27B (5-Year)", desc: "5-year, up to $27B with Meta. Vera Rubin. Delivery early 2027.", tags: ["Meta"] },
  { date: "Mar 31, 2026", label: "Lappeenranta 310 MW", color: "#f59e0b", pos: "bot",
    title: "Lappeenranta 310 MW Factory", desc: "310 MW AI factory in Finland. €8.5B / $10B. First capacity 2027.", tags: ["Finland"] },
  { date: "Apr 2026", label: "APAC + Singapore", color: "#00d4ff", pos: "top",
    title: "Nebius Expands into Asia-Pacific", desc: "APAC expansion. New GM in Singapore for Singapore/Japan/Korea/India.", tags: ["APAC"] },
  { date: "Apr 29, 2026", label: "Q1 2026: >2 GW contracted", color: "#a78bfa", pos: "bot",
    title: "Q1 2026 Earnings — >2 GW Contracted", desc: ">2 GW contracted. Guidance raised to >3 GW. $4B convertible raised.", tags: ["Earnings"] },
  { date: "May 13, 2026", label: "Pennsylvania 1.2 GW", color: "#f59e0b", pos: "top",
    title: "2nd US Gigawatt Campus — Pennsylvania", desc: "Up to 1.2 GW power + land secured in Pennsylvania. Lights-up end 2027 with 250-350 MW, then ~300 MW/yr to 1.2 GW. Site undisclosed. CapEx 2026 raised to $20-25B.", tags: ["Pennsylvania", "Expansion"] },
  { date: "May 21, 2026", label: "Bloom Energy 328 MW SOFC", color: "#00d4ff", pos: "bot",
    title: "Bloom Energy Fuel Cell Deal", desc: "Up to 328 MW Solid Oxide Fuel Cells (behind-the-meter, near-zero pollutants) at an undisclosed US site — operational in 2026. Fuel-agnostic (gas/biogas/hydrogen), 800V DC-aligned. Answers the gas-engine criticism from Vineland.", tags: ["Power", "Bloom"] },
  { date: "2026 Target", label: ">3 GW / 800 MW live", color: "#22c55e", pos: "top",
    title: "2026 Target", desc: "Targets >3 GW contracted, 800 MW–1 GW connected. 16+ DCs. Revenue $3–$3.4B.", tags: ["Target"] },
  { date: "Jun 22, 2026", label: "Nasdaq-100 inclusion", color: "#22c55e", pos: "bot",
    title: "Nebius Joins Nasdaq-100", desc: "NBIS added to Nasdaq-100 alongside Astera Labs, CoreWeave, Rocket Lab, Teradyne. Stock +19.5% in June on inclusion + revenue growth. Also: AI Cloud v3.6 launched, Physical AI Living Lab (UK/EU) opened for robotics startups.", tags: ["Index", "Product"] },
  { date: "Jul 1, 2026", label: "Meta Compute threat", color: "#ef4444", pos: "top",
    title: "Meta Building Own Cloud Business", desc: "Bloomberg: Meta building 'Meta Compute' to sell surplus GPU capacity — turns Nebius's #2 anchor customer ($27B deal) into a potential competitor. NBIS fell 15–26% in the days after; down ~30% from its early-July peak. SemiAnalysis argues the fear is overblown (Meta's own buildout should still grow Nebius volume).", tags: ["Risk", "Meta"] },
  { date: "Jul 3, 2026", label: "Madrid, Spain — 18 MW", color: "#00d4ff", pos: "bot",
    title: "Nebius Enters Spain (Getafe, Madrid)", desc: "18 MW colocation lease with Merlin Properties, part of a 68 MW two-building Getafe campus. 5th European country. Separate GW-scale Andalusia plan was abandoned Feb 2026 (no guaranteed power).", tags: ["Spain", "Expansion"] },
  { date: "Jul 7, 2026", label: "Independence moratorium", color: "#ef4444", pos: "top",
    title: "Independence MO: 6-Month DC Moratorium", desc: "City Council voted 7-0 to pause NEW data center approvals for 6 months. Nebius's existing 1.2 GW build continues unaffected, but zoning reclassification (>2.5 MW = special use permit) is under review and Independence Guard Alliance threatens legal action.", tags: ["Risk", "Missouri"] },
  { date: "2027 Target", label: "Lappeenranta + IPP 250 MW", color: "#f59e0b", pos: "bot",
    title: "2027: Lappeenranta P1 + IPP 250 MW", desc: "Lappeenranta Phase 1 live. IPP 250 MW phase by Oct 2027. Béthune ramps to full 240 MW EOY 2027.", tags: ["Target", "2027"] },
  { date: "2028 Target", label: "Independence MO P1", color: "#a78bfa", pos: "top",
    title: "2028: Independence MO Phase 1", desc: "1.2 GW Independence MO Phase 1 online. CapEx ramps to >$10.6B annually 2028-2030.", tags: ["Target", "2028"] },
  { date: "2029 Target", label: "IPP scales to 1.1 GW", color: "#00d4ff", pos: "bot",
    title: "2029: IPP Power Plant 1.1 GW", desc: "IPP scales 250 MW (Oct 2027) to 1.1 GW by Dec 2029.", tags: ["Target", "2029"] },
  { date: "2030 Target", label: "Independence full op", color: "#22c55e", pos: "top",
    title: "2030: Independence Fully Operational", desc: "Independence MO 1.2 GW fully operational. End of $10.6B/yr CapEx ramp.", tags: ["Target", "2030"] }
];

const LAST_UPDATE = "2026-07-14";

const NEBIUS_EARNINGS_Q1_2026 = {
  contractedPowerGW: 3.5,
  contractedGuidanceGW: 4.0,
  connectedTargetEnd2026: "800 MW – 1 GW",
  connectedTargetEnd2026Note: "guided Q1 2026, reaffirmed as of Jul 2026",
  contractedQ1Note: "raised from 2.0 GW (Q1 print) to >3.5 GW as of Jul 2026; 2026 guidance raised to >=4 GW",
  revenueGuidance2026: "$3.0 – $3.4B",
  capExPlan2026: "$20 – $25B",
  capExPlan2026Note: "raised from $16-20B as of Jul 2026",
  convertibleDebtRaised: "$4B",
  ebitdaMarginTarget: "40%",
  msftContractValue: "$17.4B",
  msftContractDuration: "Through 2031",
  metaContractValue: "$27B / 5 years",
  metaContractNote: "Jul 1 2026: Meta reported building own 'Meta Compute' cloud business — turns this anchor customer into a potential competitor. See EVENTS.",
  q2_2026EarningsDate: "2026-07-28/29 (not yet released)",
  marketCapJul2026: "~$55B (peaked ~$61B Jul 1, before Meta Compute selloff)",
  analystConsensusJul2026: "Buy, 12 analysts, 79% buy, avg target ~$232-237 (range $129-$291), source TipRanks 2026-07-08"
};
