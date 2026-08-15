# bizmodel

## Summary
CRITICAL CAVEAT: This session had zero live web access — the shared WebSearch budget was already exhausted (200/200) before the first query, WebFetch returns EGRESS_BLOCKED, and direct curl is refused by the egress proxy (CONNECT 403). All findings below therefore come from model training knowledge (cutoff January 2026), NOT from sources verified in this session. Source URLs given are canonical locations where each fact can be verified; every number must be re-checked before it enters the financial model. Confidence ratings reflect this.

Key synthesis for the model: (1) Revenue mix — AME/AM machine makers earn 40-60% of lifetime revenue from the machine and the rest from consumables, service and software. Industry rule of thumb for service contracts is 10-15% of machine list price per year; consumable attach for a 25-100k EUR electronics printer is realistically 5-20k EUR/machine/year (silver nanoparticle inks run roughly 1,000-10,000 USD/kg vs. silver spot near 1,000 USD/kg; specialty R&D-scale inks far higher). Machine software subscriptions cluster at 1-5k EUR/yr/machine (Eiger, Digital Factory tiers), with enterprise MES (Oqton) at 10k+ per site. (2) Gross margins — healthy AM hardware comps report 43-50% (Stratasys non-GAAP ~48-49%, Markforged ~48%, Nano Dimension ~43-47%); Desktop Metal (near-zero GM) and Nano Dimension's 100M+ USD annual losses are the cautionary benchmarks; German machine builders (LPKF, Trumpf) show that even at scale EBIT margins are 5-12%, though LPKF's ProtoMat-like Development segment historically earned ~20% EBIT. (3) Cost structure — 3-5x BOM-to-price and 40-60% COGS are standard; CE (self-declared, with EMC/LVD lab testing) typically 20-80k EUR per model, UL/NRTL 30-100k USD. (4) Channels — 20-35% distributor discounts are standard for lab/industrial equipment; sales cycles 6-18 months. (5) XTPL SA (WSE: XTP) is the best small-AME-maker comp: ~PLN 13-14M (~EUR 3.2M) 2023 revenue, single-digit Delta Printing System unit sales per year at an ASP in the low hundreds of thousands EUR, still loss-making, ~PLN 70M+ cumulative funding — proof that AME machine ramp is slow. (6) Funding — comparable startups reached serial production on roughly 5-20M EUR total (Scrona ~$10M Series A, Quantica ~EUR 14M, XTPL ~EUR 15-18M); Nano Dimension raised ~$1.5B and still lost money, showing capital does not buy AME demand. (7) German/EU grants (EXIST, ZIM up to ~EUR 550k eligible cost/project, EIC Accelerator EUR 2.5M grant + up to EUR 10-15M equity, BayTOU/Bayern Kapital) can realistically cover 1-4M EUR of the plan. (8) Financing — EU SME equipment leasing at ~5-9% effective rates over 3-5 years; Carbon's $40-50k/yr printer subscription is the canonical machine-as-a-service precedent. All 9 requested areas are covered in the findings; open questions list the highest-priority verification items.

## Findings (32)

### 1. Consumables — silver ink pricing [low]
Silver nanoparticle inkjet inks (DuPont/Qnity PE-series, Henkel Loctite ECI, Novacentrix, Sun Chemical, PV Nanocell) are quote-based; typical market pricing is roughly USD 1,000-10,000 per kg depending on loading and volume, versus silver spot of ~USD 900-1,100/kg (~USD 28-35/oz in 2024-25). Screen-printable silver pastes (60-90% Ag) run ~USD 800-2,000/kg; R&D-scale specialty nano-inks can reach USD 5-30 per gram. UNVERIFIED THIS SESSION - from model knowledge.
SOURCE: Henkel printed electronics (Loctite ECI inks) product pages; DuPont/Qnity electronic inks — https://www.henkel-adhesives.com/us/en/industries/electronics/printed-electronics.html

### 1. Consumables — attach rate benchmark [low]
For desktop PCB/AME printers, published cartridge pricing gives a floor: Voltera V-One conductive ink cartridges retail ~USD 99-149 each (sold via Digi-Key/Mouser), implying a light-use lab spends USD 1-3k/yr; industrial AME systems (Nano Dimension DragonFly, materials AgCite silver ink + dielectric) are commonly estimated at USD 20-50k consumables per active machine per year. A 10-20% consumables-to-installed-base revenue ratio is a defensible modeling assumption for a 25-100k EUR machine. Estimate, unverified this session.
SOURCE: Voltera store / Digi-Key Voltera listings — https://www.voltera.io/store

### 1. Service contract pricing [medium]
Standard industry practice for lab/industrial capital equipment is annual service/maintenance contracts priced at 10-15% of the machine list price per year (8-12% for basic coverage, up to 15-18% full coverage incl. parts and preventive maintenance visits). This is a widely used rule of thumb in analytical-instrument and AM benchmarking, appropriate as the base assumption. From model knowledge, rule of thumb.
SOURCE: Common industry benchmark (e.g., discussed in AM industry analyses, AMPOWER Report) — https://ampower.eu/reports/

### 1. Software subscriptions for machines [low]
Benchmarks: Markforged Eiger has a free tier plus paid Eiger Premium/Eiger Fleet (quote-based, commonly estimated ~USD 1-3k per year per seat/printer); UltiMaker Digital Factory paid tiers ~USD 300-1,200/yr; Formlabs PreForm and Dashboard are free with paid Pro Service Plans attached to hardware; Oqton (MES for AM, acquired by 3D Systems for USD 180M in Sept 2021 — acquisition price is solid) is enterprise quote-based, order of USD 10-50k/yr per site. Reasonable model assumption: EUR 1-5k/machine/yr software attach. Pricing estimates unverified.
SOURCE: Markforged Eiger; Oqton; 3D Systems press release on Oqton acquisition — https://oqton.com

### 2. Gross margin — Stratasys [medium]
Stratasys FY2023: revenue ~USD 626M, GAAP gross margin ~44%, non-GAAP gross margin ~48-49%; FY2024 revenue ~USD 570-575M with non-GAAP GM holding ~48-49%. Revenue mix roughly: systems + consumables ~68-70%, services ~30-32%; consumables are the highest-margin product line. From model knowledge — verify in 20-F/annual report.
SOURCE: Stratasys Investor Relations — annual reports/20-F — https://investors.stratasys.com

### 2. Gross margin — 3D Systems [medium]
3D Systems FY2023: revenue ~USD 488M, gross margin ~40%; FY2024 revenue declined to ~USD 440M with GM ~37-40%. Demonstrates that diversified AM incumbents sit at 37-44% GAAP GM. From model knowledge — verify in 10-K.
SOURCE: 3D Systems Investor Relations — 10-K filings — https://investor.3dsystems.com

### 2. Gross margin — Markforged [medium]
Markforged FY2023: revenue ~USD 93.8M, gross margin ~47-48%; FY2022 revenue ~USD 101M at ~47%. Acquired by Nano Dimension for ~USD 115M in cash (USD 5.00/share), deal closed April 2025 — i.e., a hardware company with ~USD 90M revenue and ~48% GM cleared at ~1.2x revenue. Strong benchmark for both GM and exit-multiple realism. Verify in 10-K/merger docs.
SOURCE: Markforged Investor Relations / SEC filings; Nano Dimension merger announcement — https://investors.markforged.com

### 2. Gross margin — Desktop Metal (cautionary) [medium]
Desktop Metal FY2023: revenue ~USD 190M with GAAP gross margin near zero to low single digits (heavy inventory write-downs; non-GAAP low-20s at best); persistent losses led to sale to Nano Dimension (announced 2024, closed April 2025) at a fraction of its USD 2.5B SPAC valuation. Cautionary case: scaling hardware revenue without unit economics destroys value. Verify in 10-K.
SOURCE: Desktop Metal SEC filings / IR — https://ir.desktopmetal.com

### 2. Gross margin — Nano Dimension [medium]
Nano Dimension FY2023: revenue ~USD 56M, gross margin ~43-45% GAAP (~47-48% adjusted); FY2024 revenue roughly flat (~USD 58M). GM is respectable but operating losses exceeded USD 100M/yr (2022 net loss ~USD 227M incl. impairments/DeepCube writedowns; 2023 net loss ~USD 130M+). Verify in 20-F on EDGAR.
SOURCE: Nano Dimension 20-F filings, SEC EDGAR — https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=nano+dimension&type=20-F

### 2. Margin reference — LPKF (closest German comp) [low]
LPKF Laser & Electronics SE (ETR: LPK) FY2023: group revenue ~EUR 131M, EBIT margin mid-single-digit (~5-7%); FY2024 slightly lower revenue. Crucial detail: LPKF reports four segments and its 'Development' segment (ProtoMat benchtop PCB prototyping machines — the closest product analog to a benchtop electronics printer) is historically its most profitable, ~EUR 20-25M revenue with EBIT margins around 15-25%. Materials-cost ratio of the group ~30-35% of revenue implies production gross margins near 60%+. MUST verify segment figures in the LPKF Geschäftsbericht (annual report segment note).
SOURCE: LPKF Annual Report (Geschäftsbericht) — segment reporting — https://www.lpkf.com/en/investor-relations

### 2. Margin reference — Trumpf and DMG Mori (industrial scale) [low]
Trumpf FY2022/23: revenue ~EUR 5.4B, EBIT margin ~11%; FY2023/24: revenue ~EUR 5.2B with EBIT margin compressing to ~6-7% in the machine-tool downturn. DMG Mori operates at ~8-10% operating margin in good years. Use as ceiling for mature machine-builder EBIT margins in the long-run model. From model knowledge — verify in annual reports.
SOURCE: TRUMPF Annual Report — https://www.trumpf.com/en_INT/company/trumpf-group/annual-report/

### 2. Formlabs (private, estimate) [medium]
Formlabs raised USD 150M Series E led by SoftBank in 2021 at a USD 2.0B valuation (solid fact); revenue is not disclosed but widely estimated above USD 100M/yr with consumables (resin at ~USD 99-249/L) as a major recurring stream; Form 4 printer priced ~USD 4,499 (Form 4B ~USD 6,299). Business-model takeaway: low-priced machine + high-frequency consumable is viable at benchtop scale. Pricing/revenue estimates unverified.
SOURCE: Formlabs press/newsroom; Formlabs store — https://formlabs.com

### 3. BOM-to-price and COGS benchmarks [medium]
Standard hardware pricing heuristics: list price = 3-5x BOM for low-volume industrial/lab equipment (implying 20-33% material cost of price); all-in COGS (materials + assembly labor + warranty + install) for machine builders typically lands at 40-60% of revenue, i.e., 40-60% GM, consistent with the reported comps above (Stratasys/Markforged ~48%, 3D Systems ~40%). Recommended model assumption: COGS 55-60% at launch, improving to 45-50% at scale. Rule of thumb from model knowledge.
SOURCE: Common hardware industry heuristic (e.g., Bolt VC hardware guides, AM industry reports) — https://ampower.eu/reports/

### 3. CE marking / certification costs [low]
CE for an industrial benchtop machine (Machinery Directive 2006/42/EC, LVD, EMC, possibly RoHS/REACH documentation) is largely self-declared but requires accredited lab testing: typical external cost EUR 10-50k per machine model (EMC chamber testing EUR 5-15k, safety review EUR 5-20k, documentation/technical file support the rest); with laser components (laser class certification, IEC 60825) add EUR 10-30k. UL/CSA NRTL listing for US market entry: USD 30-100k plus factory audits ~USD 5-10k/yr. Budget EUR 50-150k total for CE+UL across one platform. Estimates from model knowledge.
SOURCE: EU Machinery Directive guidance; TÜV/UL service descriptions — https://single-market-economy.ec.europa.eu/sectors/mechanical-engineering/machinery_en

### 3. R&D budget to serial production — comparable startups [low]
Comparable AME/inkjet machine startups reached commercial systems on total funding of roughly EUR/USD 5-20M: Scrona AG (Zurich, EHD multinozzle printing) raised ~USD 9.6M Series A in 2022 (plus earlier seed); Quantica (Berlin, high-viscosity inkjet) raised on the order of EUR 10-15M cumulative; XTPL reached serial Delta Printing System production on ~PLN 70M+ (~EUR 15-18M) cumulative public-market funding; Voltera and BotFactory built desktop-class products on much less (single-digit USD millions, partly crowdfunded — Voltera V-One Kickstarter ~USD 500k in 2015). Model implication: EUR 8-15M to serial production of a 25-100k EUR-class machine is the defensible mid-case. Funding amounts unverified this session — verify via Crunchbase/company press pages.
SOURCE: Scrona AG news; Quantica press; XTPL investor relations — https://scrona.com

### 4. Distributor margins for lab/industrial equipment [medium]
Standard channel economics: distributors/resellers of lab and industrial equipment receive 20-35% discount off list price (3D-printing channel typically 30-40% on hardware, 15-25% on consumables and service resale); master distributors covering a region may get 35-40%. Direct sales keep the margin but carry a fully-loaded sales-engineer cost of EUR 120-180k/yr each closing perhaps 10-25 machines/yr in this ASP class. Rule-of-thumb benchmark from model knowledge.
SOURCE: Industry channel benchmark (AM reseller programs, e.g., Stratasys/Formlabs partner programs) — https://formlabs.com/partners/

### 4. AME distribution examples [low]
AME machines sell largely through specialized channels: Voltera sells V-One via Digi-Key, Mouser and regional resellers; Nano Dimension historically used regional distributors/reps (incl. in Japan/Korea) plus direct; Sicnova (Spain) is an example of a regional AM distributor carrying industrial printers; BotFactory sells direct plus resellers. 'APES Inc.' could not be verified in this session — treat as unconfirmed. For the model: assume 40-60% of unit volume through channel at ~30% discount once international expansion starts.
SOURCE: Voltera resellers page; Sicnova (grupo Sicnova) site — https://www.voltera.io

### 4. CAC for B2B capex equipment [medium]
B2B capital-equipment sales cycles run 6-18 months (evaluation, sample parts, budget cycle). Fully-loaded CAC commonly lands at 10-20% of ASP for direct sales (trade-show lead gen: a LOPEC/productronica/Formnext booth costs EUR 20-60k incl. staff and demo units). Comp S&M expense ratios: Stratasys/3D Systems spend ~20-25% of revenue on sales & marketing. Model assumption: CAC EUR 5-15k per machine sold at 25-100k EUR ASP. Rule of thumb from model knowledge.
SOURCE: Public comps' income statements (S&M expense lines); trade show rate cards — https://investors.stratasys.com

### 5. XTPL SA — best public small-AME comp [low]
XTPL SA (Warsaw Stock Exchange: XTP; Wroclaw, Poland) commercializes Ultra-Precise Dispensing for microscale printed electronics. FY2023 revenue ~PLN 13-14M (~EUR 3.0-3.3M), growing ~25-30% y/y from PLN ~10.8M in 2022; still net-loss-making with burn covered by equity issues. Delta Printing System (launched 2023): sold in single-digit unit counts per year (approx. 3-6/yr in 2023-2024) at an ASP estimated in the EUR 200-350k range; revenue also includes nanoinks and technology-development deals (e.g., with Nano Dimension for pick-up of UPD printheads). Strategy to 2026 targeted an order-of-magnitude revenue scale-up (announced target around PLN 100M by 2026 — verify, likely missed/revised). ALL FIGURES from model knowledge — XTPL publishes full Polish+English quarterly/annual reports; verify at source before use.
SOURCE: XTPL SA investor relations — annual/quarterly reports (WSE: XTP) — https://xtpl.com/investor-relations/

### 5. XTPL — business-model structure [medium]
XTPL's reported revenue mix has three legs: (1) Delta Printing System device sales, (2) proprietary conductive nanopastes/inks (recurring), (3) industrial technology-development projects with OEMs (semiconductor/display makers, mostly Asia). This three-leg structure (machine + materials + NRE/development deals) is the directly applicable template for a small AME machine maker's revenue model. Qualitative — from XTPL's own reporting; verify shares in annual report.
SOURCE: XTPL SA annual report / strategy presentations — https://xtpl.com/investor-relations/

### 6. Nano Dimension — cautionary benchmark [medium]
Nano Dimension raised ~USD 1.5B in 2020-21 ATM offerings (cash peak >USD 1.3B), yet FY2023 revenue was only ~USD 56M (much from acquired Essemtec, GIS, Admatec etc., not organic DragonFly AME sales; DragonFly IV unit sales estimated at only dozens per year, system price USD 250-700k). Net losses: ~USD 227M (2022), >USD 130M (2023). Aftermath: proxy war with Murchinson, CEO ousted 2024, then acquired Desktop Metal and Markforged (closed April 2025) to buy revenue. Lesson for the model: AME machine demand is niche today — do not model hockey-stick unit adoption; and operating-expense discipline matters more than gross margin. Verify numbers in 20-F.
SOURCE: Nano Dimension 20-F / press releases, SEC EDGAR — https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=nano+dimension

### 7. Funding to serial production — round-size norms [low]
Typical European deep-tech hardware path to serial production of an industrial machine: pre-seed/seed EUR 1-3M (prototype), Series A EUR 5-15M (pilot customers to serial production), Series B EUR 15-40M (scale-up). Examples in/near AME: Scrona ~USD 9.6M Series A (2022); Quantica ~EUR 10-15M cumulative by 2023; XTPL ~EUR 15-18M cumulative via WSE listings; Elephantech (Japan, pure-additive PCB) raised several billion yen cumulative (~USD 30M+) but that funds a factory-operator model, not machine sales. A EUR 8-15M raise to reach serial production is consistent with these comps. Amounts unverified — verify via company press releases/Crunchbase.
SOURCE: Company press pages (Scrona, Quantica, XTPL, Elephantech) — https://www.elephantech.co.jp/en/

### 8. EIC Accelerator [high]
EIC Accelerator (Horizon Europe): blended finance of up to EUR 2.5M grant (TRL 5/6→8) plus equity investment from the EIC Fund — standard up to EUR 10M, raised to up to EUR 15M for strategic technologies under the 2025+ work programmes; single-company applications, ~5% success rate, grant covers 70% of eligible project costs. Highly relevant for an AME machine startup (fits 'advanced manufacturing' strategic area). Verify current work programme terms at source.
SOURCE: European Innovation Council — EIC Accelerator — https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en

### 8. EXIST (Germany) [medium]
EXIST-Gründerstipendium: 12-month founder stipends (EUR 1,000-3,000/month per founder depending on qualification) + up to ~EUR 30k materials (teams) + EUR 5k coaching — pre-founding stage. EXIST-Forschungstransfer: Phase I funds a research team (up to 4 positions, typically 18-36 months, total value up to ~EUR 1M incl. up to EUR 250k equipment/materials); Phase II adds up to EUR 180k after incorporation. Both administered by BMWK, applications via a university. Details from model knowledge — verify current terms at exist.de.
SOURCE: EXIST — BMWK Gründerförderung — https://www.exist.de

### 8. ZIM (Germany) [medium]
ZIM (Zentrales Innovationsprogramm Mittelstand, BMWK): R&D grants for SMEs — eligible project costs up to EUR 550k per company per project (single or cooperation projects), funding rates ~25-45% depending on company size/location (+10-15pp for cooperation), continuous submission, no thematic restriction. A machine-development project can realistically pull EUR 150-250k grant. Verify current Richtlinie at zim.de.
SOURCE: ZIM — Zentrales Innovationsprogramm Mittelstand — https://www.zim.de

### 8. Bavarian instruments [low]
Bayern Kapital (state VC arm, Landshut) co-invests from seed to growth (Innovationsfonds, Wachstumsfonds Bayern with several hundred million EUR under management) — always alongside private lead investors, typically matching up to several million EUR. BayTOU (Bayerisches Programm zur Förderung technologieorientierter Unternehmensgründungen) gives grants to young Bavarian tech companies for development projects (order of EUR 100-250k range); Bavaria also offers Innovationsgutscheine (small vouchers, tens of thousands EUR). Program parameters from model knowledge — verify at bayernkapital.de and StMWi pages.
SOURCE: Bayern Kapital; StMWi Förderprogramme (BayTOU) — https://bayernkapital.de

### 9. Equipment leasing rates for SMEs (EU) [medium]
EU SME equipment-finance conditions (2024-25 rate environment): effective leasing/hire-purchase rates ~5-9% p.a. for machinery, terms 36-60 months, often 10-20% residual value; a EUR 100k machine on a 60-month full-payout lease runs roughly EUR 1,900-2,100/month (~1.9-2.1% monthly factor). Vendors typically partner with leasing houses (e.g., GRENKE, Deutsche Leasing, DLL, Siemens Financial Services) rather than carrying credit risk. Rates from model knowledge of the 2024-25 environment — verify with Leaseurope/ECB SME lending data.
SOURCE: Leaseurope statistics; ECB SME financing survey (SAFE) — https://www.leaseurope.org

### 9. Machine-as-a-service precedents in AM [medium]
Carbon Inc. is the canonical printer-subscription model: M1/M2 printers offered only by subscription at ~USD 40-50k/yr (3-year minimum, includes software, updates, service) — validating full-service annual pricing at ~30-40% of an equivalent sale price. Stratasys, Markforged and Formlabs all offer leasing/rental via financing partners (e.g., Ascentium/TFG-type lessors) rather than on own balance sheet; some vendors offer pay-per-part or 'success plans'. For the model: a MaaS tier at 35-45k EUR/yr for a 100k EUR machine (or 10-15k EUR/yr for a 30k machine) mirrors Carbon's ratio. Carbon pricing widely reported 2016-2019; verify current terms.
SOURCE: Carbon 3D subscription model (company site/press coverage) — https://www.carbon3d.com

### Revenue-mix synthesis for the model [medium]
Recommended modeling assumptions synthesized from all comps: Year-1 revenue mix ~80-85% machines / 10% consumables / 5-10% service+software, shifting by Year 5 (installed base ~100-300 units) to ~55-60% machines / 20-25% consumables+materials / 15-20% service+software. Recurring revenue per installed machine per year: EUR 6-18k total (consumables EUR 4-12k, service EUR 2.5-10k at 10%+ of ASP, software EUR 1-3k). Blended long-run GM: machines 45-50%, consumables 55-70%, service ~50%, software 80%+, blending to ~50-55%. This is an analyst synthesis (my construction), not a sourced fact.
SOURCE: Synthesis of comps above (Stratasys/Markforged/Formlabs/XTPL patterns) — https://investors.stratasys.com

### Elephantech (materials-side comp) [low]
Elephantech (Tokyo) does pure-additive inkjet PCB manufacturing (silver nano-ink + copper plating) but as a foundry/factory model, not machine sales — it monetizes the process, not equipment. Raised cumulative funding on the order of USD 30-50M+ (incl. rounds with Sumitomo, Mitsui Chemicals partnerships). Relevant as evidence that AME economics can favor selling output or materials over selling machines. Funding figure low confidence — verify.
SOURCE: Elephantech corporate news — https://www.elephantech.co.jp/en/

### Optomec / nScrypt (established AME machine ASPs) [low]
Established direct-write/AME equipment makers price well above the 25-100k EUR band: Optomec Aerosol Jet systems ~USD 200k-1M+, nScrypt microdispensing systems similar; Optomec has shipped ~600+ systems lifetime and raised tens of millions USD over ~20 years — evidence that the AME equipment market supports only tens-of-units-per-year vendors historically, and that a 25-100k EUR price point is a differentiated (down-market) position closer to Voltera NOVA (~USD 50-100k est.) and BotFactory SV2 (~USD 4-17k). ASPs/unit counts from model knowledge, unverified.
SOURCE: Optomec company page / press — https://optomec.com

### Cost structure — OPEX shape of small machine makers [medium]
Comp OPEX ratios at small scale: Nano Dimension and Desktop Metal ran OPEX >100% of revenue for years; XTPL similarly spends more than its revenue on R&D+G&A (net loss despite ~60%+ product GM). Healthy steady-state target from LPKF/Trumpf: R&D ~8-12% of revenue, S&M ~15-25%, G&A ~8-12%, EBIT 5-15%. A credible 5-year model should show OPEX starting at 150-250% of revenue and crossing below 45-50% only after ~EUR 15-25M revenue. Analyst synthesis of comp financials, unverified this session.
SOURCE: Comps' financial statements (LPKF AR, Nano Dimension 20-F, XTPL AR) — https://www.lpkf.com/en/investor-relations

## Open questions
- CRITICAL: No live web access was available this session (search budget exhausted, egress blocked) — every figure above is from model training knowledge (cutoff Jan 2026) and must be verified against primary sources before entering the financial model.
- XTPL SA exact FY2023/FY2024 revenue, Delta Printing System unit sales, ASP, cash burn and 2026 strategy targets — pull from xtpl.com/investor-relations (English annual reports available; WSE ticker XTP).
- LPKF Development segment (ProtoMat) revenue and EBIT margin by year — pull segment note from LPKF Geschäftsbericht 2023/2024.
- Current conductive silver ink list prices (DuPont/Qnity PE-series, Henkel ECI, Novacentrix JS-series, XTPL nanopastes) — request quotes or find distributor listings; silver spot price as of the modeling date.
- Markforged Eiger Premium / Fleet and Oqton actual subscription price points (quote-based — may need reseller quotes).
- Nano Dimension FY2024/FY2025 results post-Desktop Metal/Markforged consolidation (changes the comp set materially).
- Verify funding histories: Scrona, Quantica, Voltera, BotFactory (Crunchbase/Dealroom) and whether 'APES Inc.' exists as an AME distributor — I could not confirm it.
- Current EIC Accelerator 2026 work programme terms (grant cap, equity cap for strategic tech), ZIM funding rates after latest Richtlinie revision, and BayTOU current maximums.
- Actual EU SME leasing rates as of Q3 2026 (ECB SAFE survey / Leaseurope) — my 5-9% range reflects the 2024-25 environment.
- Carbon's current subscription pricing (their model has evolved since 2019) and any AME-specific MaaS offerings launched since early 2026.
