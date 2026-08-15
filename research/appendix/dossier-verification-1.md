# gap1

## Summary
CRITICAL CONTEXT: This verification pass ran after the session's 200-query WebSearch budget was fully exhausted and with the egress proxy hard-blocking ALL external HTTPS (403 on CONNECT to kronos-mct.com, register.dpma.de, bundesanzeiger.de, northdata.de, insolvenzbekanntmachungen.de, foerderdatenbank.de, cordis.europa.eu, LinkedIn, Wikipedia, etc.). The only working channels were the GitHub API (via MCP), git clones of public repos, DNS resolution, npm/pypi registries, and the user's Google Drive (searched; contains nothing on KRONOS/Neotech). Within those limits, genuinely new, hard evidence was found on GitHub. VERIFIED: KRONOS operates a GitHub org "Kronos-Mechatronics" with two public repos proving (a) sustained engineering activity from 2025-10-06 through 2026-06-17; (b) a previously undocumented software product, "Aion-5X" — a Rhino-based CAM package with a public C++ SDK, plugin API and developer portal (documentation.kronos-mct.com, DNS-live); (c) Helios machine hardware versions 1.0 and 1.1 with concrete specs (round Ø100 mm bed, 150 mm Z, 0.4 mm nozzle, PLA/PETG FDM profiles, B&R-controller G-code dialect, multi-tool TOOLID syntax, described as "Kronos 5X machines"); (d) a shared print profile "HE_HY_BuR_V4.10.0+" whose HE/HY prefix is consistent with Helios/Hyperion; and (e) two named engineers beyond the known trio — Florens Wasserfall (florens.wasserfall@kronos-mct.com, GitHub "platsch", whose 2013-2021 public repo history shows 13 years of 3D-printed-electronics work: a Slic3r "electronics" fork, OctoPNP camera pick-and-place, conductive-material configs, and a 5-axis G-code postprocessor) and David Gessner (david.gessner@kronos-mct.com). Publishing customer-facing PrusaSlicer profiles with per-machine setup instructions and machine-version updates is an indirect but real signal that machines exist in the field; however, NOT ONE sale, installation, customer name, distributor announcement, price, funding event, patent transfer, Bundesanzeiger financial, insolvency-cause statement, or headcount figure could be verified — every registry and trade-press source was unreachable. Neotech background items from model memory (founded ~2011 Nürnberg under Dr. Martin Hedges; 15X/45X 5-axis AME platforms; 2024 insolvency covered by VoxelMatters) are flagged low-confidence and unverified. POST-MORTEM ASSESSMENT (reasoned, not document-verified): the evidence available leans toward Neotech's failure being primarily a market-demand problem with company-specific amplifiers, not a purely idiosyncratic collapse. The AME capital-equipment niche has repeatedly underperformed its forecasts — even heavily capitalized Nano Dimension could not build a sustainable DragonFly machine business, and Optomec/nScrypt stayed niche — so a small, likely thinly capitalized Nürnberg GmbH selling six-figure 5-axis systems into a market of research labs faced structurally thin, lumpy demand; a 2024 insolvency amid the German hardware funding drought fits undercapitalization meeting a shallow market. KRONOS's observable strategy — smaller-format Helios, standard FDM materials, free PrusaSlicer toolchain, an open SDK, iterative 1.0→1.1 hardware — plausibly lowers the entry price and lock-in that gated lab-scale adoption, which fixes part of the problem (capex barrier) but cannot by itself fix application-side demand. Treat "lower price fixes it" as unproven: no KRONOS sale could be verified, and the demand-risk question remains the central diligence item requiring the blocked sources (Bundesanzeiger figures, insolvency file IN 771/24, DPMA/Espacenet assignments, LinkedIn/trade-press traction).

## Findings (21)

### Company digital presence (VERIFIED) [high]
KRONOS operates a GitHub organization 'Kronos-Mechatronics' (org id 236348705) with exactly two public repositories; earliest public activity 2025-10-06, latest 2026-06-17. Confirms active engineering operations roughly 12-20 months after the late-2024 founding.
SOURCE: GitHub organization Kronos-Mechatronics — https://github.com/Kronos-Mechatronics

### Product: Aion-5X CAM software (VERIFIED) [high]
KRONOS ships a proprietary CAM/toolpath product named 'Aion-5X' built on Rhino (McNeel Rhinoceros), with a public C++ SDK (Aion-5X-SDK), a plugin architecture ('Cam extension plugin'), and a sample plugin repo created 2026-05-28 and actively developed through 2026-06-17. This is a material product-strategy fact absent from the task brief: an open developer ecosystem around the machines.
SOURCE: GitHub: Kronos-Mechatronics/aion-5x-plugin-sample (README and commit history) — https://github.com/Kronos-Mechatronics/aion-5x-plugin-sample

### Product: developer documentation portal (VERIFIED existence) [high]
The Aion-5X README links a developer guide and API documentation at documentation.kronos-mct.com (/aion/api/cam-plugin and /aion/latest/api/first-plugin/); the subdomain DNS-resolves (hosted 2a01:239::, Strato/IONOS range) as of 2026-08-15. Content could not be fetched (egress blocked).
SOURCE: Aion-5X plugin sample README, documentation links — https://documentation.kronos-mct.com/aion/api/cam-plugin

### Product: Helios machine versions 1.0 and 1.1 (VERIFIED) [high]
Repo prusa-slicer-profile contains printer profiles Helios1.0.ini and Helios1.1.ini; a 2025-11-14 commit by david.gessner@kronos-mct.com says 'Updated machine versions - Updated material profiles - Updated print profile (mainly speeds)'. Confirms the Helios relaunch is real, shipping-grade enough to need slicer profiles, and already hardware-iterated (1.0 -> 1.1) by Nov 2025.
SOURCE: GitHub: Kronos-Mechatronics/prusa-slicer-profile, commit 8c1df9d (2025-11-14) — https://github.com/Kronos-Mechatronics/prusa-slicer-profile/commit/8c1df9d4fc4f08c2fed5eb256a702b6c677b33c8

### Helios technical specs from official profiles (VERIFIED) [high]
Helios 1.0/1.1 profile: circular build plate radius 50 mm (Ø100 mm), max print height 150 mm, 0.4 mm nozzle, PLA and PETG 1.75 mm filament profiles (240C PETG / standard PLA temps). G-code is post-processed into a B&R-automation dialect (M104/M109 -> SET_TEMPERATURE[], T0 -> TOOLID[1], T1 -> TOOLID[3], E -> QE=), indicating B&R industrial motion control and a multi-tool changer (tool IDs 1/3, BEDID 33). Postprocessor docstring: 'Postprocessor to run Slicer generated GCode on Kronos 5X machines' — confirming 5-axis positioning of the product line. Small polymer-FDM build volume supports a lab-scale, lower-cost positioning vs. large production AME platforms.
SOURCE: prusa-slicer-profile: printer/Helios1.0.ini, printer/Helios1.1.ini, postprocessor.py (cloned 2026-08-15) — https://github.com/Kronos-Mechatronics/prusa-slicer-profile

### Hyperion referenced in shared profile (PARTIALLY VERIFIED) [medium]
The only print profile is named 'HE_HY_BuR_V4.10.0+.ini' (print_settings_id 'HEXXX'). The HE_HY prefix is consistent with a profile shared by HElios and HYperion machines on B&R ('BuR') control, software version V4.10.0+. Interpretation, not an explicit 'Hyperion' string; no separate Hyperion machine profile is public.
SOURCE: prusa-slicer-profile: print/HE_HY_BuR_V4.10.0+.ini — https://github.com/Kronos-Mechatronics/prusa-slicer-profile

### Commercial traction (PARTIALLY VERIFIED, indirect only) [medium]
No sale, installation, customer, distributor (APES/NTV USA), productronica 2025 or LOPEC 2026 reference could be verified — all trade press and LinkedIn blocked. Indirect field-deployment signals: the public slicer-profile repo is written for external users ('Important settings (must be configured for every machine!)', Windows-shortcut instructions for non-developers), machine versions were bumped 1.0 -> 1.1, and material/speed profiles were tuned in Nov 2025 — behavior consistent with at least a small installed/demo base, but zero named customers.
SOURCE: prusa-slicer-profile README (user-facing setup instructions) — https://github.com/Kronos-Mechatronics/prusa-slicer-profile/blob/main/README.md

### Team: Florens Wasserfall at KRONOS (VERIFIED) [high]
Florens Wasserfall (GitHub 'platsch', user id 4190756) commits with corporate email florens.wasserfall@kronos-mct.com from 2026-05-28 through 2026-06-17 (17 commits) and with personal email wasserfall@kalanka.de in Oct 2025 — a previously unlisted senior software engineer (CAM/Aion-5X author) beyond Dickerboom/Ahlers/Werner.
SOURCE: GitHub commit search author-email:florens.wasserfall@kronos-mct.com (17 commits) — https://github.com/Kronos-Mechatronics/aion-5x-plugin-sample/commits/main

### Team: Wasserfall's 13-year AME pedigree (VERIFIED via repos) [high]
platsch's public repos document long 3D-printed-electronics specialization: Slic3r fork with default branch 'electronics' (since 2013), OctoPNP 'OctoPrint plugin for camera based pick 'n place control' (2015, 39 stars), Slic3r-Electronics-Config 'printing with conductive materials and automatic placing of SMD-components' (2016), multiaxis-gcode-postprocessor 'rotation values for additional 4th and/or 5th axis' (2021). Strong technical-credibility datapoint for KRONOS's software moat. (His commonly cited University of Hamburg TAMS research background is model memory, unverified this session.)
SOURCE: GitHub user platsch — repository list — https://github.com/platsch

### Team: David Gessner at KRONOS (VERIFIED) [high]
David Gessner (GitHub 'daveschoki', user id 109179173) commits as david.gessner@kronos-mct.com (2025-11-14) and authored the Oct 2025 profile setup commits — an application/process-engineering role (machine versions, material profiles, print speeds). Second previously unlisted employee; with Dickerboom, Ahlers, Werner, Wasserfall this puts a verifiable floor of ~5-6 people on the team.
SOURCE: GitHub commit 8c1df9d, prusa-slicer-profile — https://github.com/Kronos-Mechatronics/prusa-slicer-profile/commit/8c1df9d4fc4f08c2fed5eb256a702b6c677b33c8

### Team: Dickerboom / Ahlers / Werner / Hedges on GitHub (NOT FINDABLE) [high]
GitHub user search returns zero accounts for 'Dickerboom' and zero for 'Martin Hedges'; no commits under author-name 'Martin Hedges' anywhere on GitHub; no Neotech-referencing commits in the KRONOS org. Dickerboom's pre-KRONOS career, current headcount, and any Hedges-KRONOS relationship could not be verified through any reachable channel (LinkedIn blocked).
SOURCE: GitHub user search 'Dickerboom' / 'Martin Hedges' (0 results, 2026-08-15) — https://github.com/search?q=Dickerboom&type=users

### Corporate web infrastructure (PARTIALLY VERIFIED) [medium]
kronos-mct.com and www.kronos-mct.com DNS-resolve (IPv6 2001:8d8:1800:8003::1, IONOS hosting) as of 2026-08-15 — site live but content unfetchable this session. neotech-amt.com also still resolves (2001:8d8:100f:f000::200, IONOS), suggesting the Neotech domain is retained (by KRONOS, the administrator, or a registrar hold); www.neotech-amt.com does not resolve.
SOURCE: DNS resolution via sandbox resolver, 2026-08-15 — https://kronos-mct.com

### IP / patent transfer (NOT FINDABLE this session) [high]
register.dpma.de, worldwide.espacenet.com and the EPO European Patent Register were all blocked by the egress proxy (CONNECT 403), and the WebSearch budget was exhausted before this subtask ran. No statement can be made about which Neotech AMT patents (incl. the 45X mass-production platform patent) lapsed or transferred, or about assignee changes 2024-2026. This remains a mandatory follow-up requiring direct DPMA/Espacenet access.
SOURCE: DPMA Register (unreachable from this session) — https://register.dpma.de

### Funding / grants (NOT FINDABLE this session) [high]
foerderdatenbank.de, CORDIS/EU Funding & Tenders, Bayern Innovativ/Bayern Kapital, Startbase, Dealroom, Crunchbase and North Data were all unreachable (egress blocked). No KRONOS grant, equity round, or PIC-linked EU project could be confirmed or excluded. Note: no EU-project or funding acknowledgment appears anywhere in KRONOS's public GitHub content (weak negative signal only).
SOURCE: Förderdatenbank des Bundes (unreachable from this session) — https://www.foerderdatenbank.de

### Neotech AMT financials (NOT FINDABLE this session) [medium]
Bundesanzeiger/unternehmensregister.de and North Data were unreachable, so equity, total assets and headcount 2019-2023 could not be pulled. Caveat for the parent agent: as a likely Kleinst-/kleine Kapitalgesellschaft, Neotech AMT would have filed only abridged balance sheets without a P&L, so published filings will yield equity/assets but NOT revenue; revenue must be estimated from machine prices x units and headcount (general German HGB §§ 326-327 disclosure rule — high confidence; its application to Neotech specifically — unverified).
SOURCE: Bundesanzeiger publication platform (unreachable from this session) — https://www.bundesanzeiger.de

### Neotech insolvency details (NOT FINDABLE this session) [high]
insolvenzbekanntmachungen.de was unreachable; the case reference (Amtsgericht Nürnberg IN 771/24, administrator Dr. Harald Schwartz, filed July/Sept 2024) given in the task brief could not be independently confirmed, and no stated cause of insolvency, creditor information, or asset-deal terms could be retrieved. The trade-press post-mortems (VoxelMatters, 3Druck.com, TCT) were also unreachable.
SOURCE: Insolvenzbekanntmachungen portal (unreachable from this session) — https://neue.insolvenzbekanntmachungen.de

### Neotech AMT background (model memory, UNVERIFIED) [low]
From training knowledge only (no session verification possible): Neotech AMT GmbH, Nürnberg, founded ~2011 and led by Dr. Martin Hedges, was among the earliest dedicated AME/3D-printed-electronics machine builders, selling 5-axis platforms (15X-series research systems; 45X-series 'all-in-one' production platform introduced ~2019) combining dispensing/aerosol-jet/inkjet printing, with academic and industrial customers largely in research settings, and was a regular presence at LOPEC and productronica. Treat every element as requiring re-verification; do not cite numbers from this item.
SOURCE: VoxelMatters (trade publication covering Neotech AMT; specific articles unreachable this session) — https://www.voxelmatters.com

### AME market demand context (model memory, UNVERIFIED) [low]
From training knowledge: the AME capital-equipment market has consistently underperformed forecasts — Nano Dimension's DragonFly printed-electronics system sold poorly despite ~$1B+ war chest (company pivoted to acquisitions), Optomec's Aerosol Jet and nScrypt remained niche, and J.A.M.E.S. GmbH (Hensoldt-backed AME community) was created precisely because organic demand was weak. This industry-wide pattern is the key exogenous factor for the Neotech post-mortem. Numbers here are directional memory, not verified figures.
SOURCE: Industry context from model training data (verify via VoxelMatters/company filings) — https://www.voxelmatters.com/category/electronics/

### KRONOS strategy signal: open, low-cost toolchain (VERIFIED behavior, interpreted) [medium]
KRONOS's verifiable choices — free open-source PrusaSlicer as the polymer slicing front-end, standard 1.75 mm PLA/PETG filaments, a public SDK inviting third-party CAM plugins, small Ø100 mm build volume — are consistent with the pitched lower-price, lab-accessible repositioning of Neotech's technology, reducing both capex and software lock-in versus the closed high-end AME platforms of the 2015-2024 generation.
SOURCE: Kronos-Mechatronics public repositories (both) — https://github.com/Kronos-Mechatronics

### Channels searched with zero results (VERIFIED negative) [high]
User's Google Drive contains no KRONOS/Neotech due-diligence material (fullText search for 'Neotech'/'Kronos' returned empty). npm and PyPI registries contain no kronos-mct or neotech packages. GitHub-wide code search for 'neotech-amt' returns only stale domain lists (neotech-amt.com, neotech-amt.org in 2010s web-domain dumps), confirming the old company had negligible open-source footprint.
SOURCE: GitHub code search 'neotech-amt' (2 junk hits) — https://github.com/search?q=%22neotech-amt%22&type=code

### Session tooling constraint (meta, VERIFIED) [high]
WebSearch returned 'session has used its web search budget (200 of 200)' on every query attempt at 2026-08-15 ~07:05 UTC, and the egress proxy logged CONNECT 403 for kronos-mct.com, sec.gov, xtpl.com, lpkf.com and every tested research domain. All NOT-FINDABLE verdicts above reflect channel unavailability, not confirmed absence of the facts.
SOURCE: Agent proxy status endpoint (recentRelayFailures log) — https://github.com/Kronos-Mechatronics

## Open questions
- Did any Helios/Hyperion unit actually sell since the 2024 relaunch? Check VoxelMatters/TCT/3Druck productronica-2025 and LOPEC-2026 coverage, KRONOS/Dickerboom/APES LinkedIn posts, and APES (Advanced Printed Electronic Solutions) / NTV USA distributor announcements once web access is restored.
- Patent chain of title: query register.dpma.de and Espacenet for applicant 'Neotech AMT' / 'Neotech Services MTP' (inventor Martin Hedges); list per-patent legal status 2024-2026 — lapsed for non-payment, transferred to KRONOS Mechatronics GmbH, or retained by the insolvency estate. The 45X mass-production platform patent is the single most valuable item to trace.
- Funding: search foerderdatenbank.de, CORDIS (KRONOS holds a PIC — check the Funding & Tenders participant register), Bayern Kapital/Bayern Innovativ press, North Data HRB 43784 (share capital, shareholder list) for any grant or equity event.
- Team: LinkedIn company page headcount and job ads; Jörg Dickerboom's full career (was he at Neotech AMT, or from an unrelated machinery background?); whether Dr. Martin Hedges consults for, sold IP to, or is estranged from KRONOS; roles of Daniel Ahlers and Stefan Werner; confirm Florens Wasserfall's Universität Hamburg (TAMS) PhD background and whether he was at Neotech AMT between ~2019 and 2024.
- Neotech post-mortem hard data: Bundesanzeiger balance sheets 2019-2023 (equity trajectory, signs of over-indebtedness), the IN 771/24 insolvency notices (opening date, Masseunzulänglichkeit?), administrator Dr. Harald Schwartz's public statements, pre-insolvency headcount (~15-25?), cumulative installed base (order of 50-100 systems over 13 years?) and typical system prices — none of which could be verified this session; all cumulative-installed-base and revenue figures must NOT be quoted from memory.
- Was the KRONOS asset deal an administrator-led uebertragende Sanierung, and did it include the Neotech brand, service contracts and spare-parts obligations for the legacy installed base (a potential recurring-revenue asset)?
- Does the Hyperion exist as shipping hardware, or only as a roadmap sibling of Helios? (Public evidence is limited to the 'HE_HY' profile prefix.)
- Rerun this entire verification with a fresh WebSearch budget or unblocked egress — every NOT FINDABLE verdict is a channel failure, not a confirmed negative.
