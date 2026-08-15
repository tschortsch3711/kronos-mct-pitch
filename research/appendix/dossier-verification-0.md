# gap0

## Summary
VERIFICATION BLOCKED THIS SESSION: the session's WebSearch budget was exhausted (200/200) before this subagent started, and the egress proxy denied every attempted fetch (voltera.io, web.archive.org, sam.gov, usaspending.gov, nsf.gov, ted.europa.eu all returned EGRESS_BLOCKED/403). No local research files existed. Consequently NO new procurement records, archived shop pages, or tender awards could be pulled. Everything below is confidence-graded price intelligence from training knowledge (cutoff Jan 2026) plus task-provided facts; every number must be re-verified before it is quoted to investors. LANDSCAPE AS BEST KNOWN: The desktop floor is real: Voltera V-One ~$4.5-7k, nano3Dprint A2200 ~$3.5k, BotFactory SV2 base ~$10k with SV2 Pro full configurations reaching roughly $20-30k; BotFactory's 2026 shipping status could not be confirmed and the company has been quiet, SBIR-dependent, since ~2023-24. The EUR 25k-100k band is NOT literally vacant, but everything in it is planar (2-2.5-axis): Voltera NOVA (list gated behind quote; ~US$46-50k sighting is consistent with my recall of a ~$50k price point), Fujifilm Dimatix DMP-2850 materials inkjet (~$50-60k, the workhorse university buy in this band, not on the target list), SonoPlot Microplotter (~$25-50k) and MicroFab jetlab (~$60-100k) lab dispensers (also not on the list), nano3Dprint's larger D4200 (weak recall ~$50k), and the subtractive substitute LPKF ProtoMat (~EUR 30-60k). Every true 3D/5-axis or conformal AME system is quote-only and transacts far above the band: Neotech AMT 15X series (est. EUR 150-250k despite 'low-cost' marketing; Neotech is headquartered in Nürnberg, the same city as KRONOS), Notion Systems n.jet lab (est. EUR 150-300k), SUSS PiXDRO LP50 (est. EUR 150-250k new; SUSS exited inkjet, line reportedly transferred to Notion Systems), Ceradrop/MGI F-Serie (est. EUR 250-500k), IDS NanoJet (est. $100-175k), nScrypt 3Dn (roughly $250k-$1M+), Optomec Aerosol Jet HD2/Flex/5X (~$200-500k; NSF MRI awards for such systems sit in that range), and Nano Dimension DragonFly (historical transactions ~$250-350k; the entire DragonFly business sold to Inspira Technologies in April 2026 for just $2M upfront + $10.5M earnout — a distress-level price signaling near-zero unit economics for planar AME, not a pricing list signal). NO PUBLIC PRICE EVIDENCE of any kind is recalled for: Neotech PJ 15X, Notion n.jet lab, Ceradrop F-Serie, IDS NanoJet Desktop, Optomec HD2/Flex, nScrypt 3Dn, DragonFly IV current list — all strictly quote-only. VERDICT (provisional, unverified): The EUR 25k-100k band is genuinely vacant for 5-AXIS/CONFORMAL additive electronics — no known multi-axis AME machine sells below roughly EUR 150k — but it is NOT vacant for additive electronics generally: real buyers near the band paid ~US$50k for planar direct-write/inkjet tools (NOVA, Dimatix class), while real buyers of 5-axis capability paid EUR 200k-500k. KRONOS's claim survives only if narrowed to '5-axis AME under EUR 100k'; the demand-side caution is that Nano Dimension's fire-sale exit suggests the mid-market for AME machines has so far been thin, and hometown rival Neotech already owns the 'low-cost 5-axis' positioning at a higher price point.

## Findings (24)

### Research environment constraint (critical caveat) [high]
All external verification failed this session: WebSearch budget exhausted (200/200 consumed by parent session before spawn); WebFetch and curl returned EGRESS_BLOCKED/403 policy denials for voltera.io, web.archive.org, sam.gov, api.usaspending.gov, nsf.gov, ted.europa.eu; project research directories empty. All price findings below are training-knowledge (cutoff Jan 2026) or task-provided, and none were live-verified.
SOURCE: Session agent-proxy status output (local) — http://127.0.0.1:37071/__agentproxy/status

### Voltera NOVA list price [medium]
Quote-gated on voltera.io (no permanent public list price). Training-knowledge recall puts the price point at roughly US$50,000, consistent with the ~$46-50k figure the task reports was sighted once (likely a promotional/quoted price). Voltera has publicly positioned NOVA as costing a fraction of aerosol-jet systems (~$200k+). This places NOVA squarely inside the EUR 25-100k band, but it is a planar (flatbed XY) direct-write printer, not 5-axis.
SOURCE: Voltera - NOVA product page (quote-only; price unverified this session) — https://www.voltera.io/nova

### Voltera V-One desktop anchor price [high]
V-One desktop PCB printer publicly listed at approximately US$4,499 base, with full kits/bundles up to ~US$6,500-7,000. This is the widely cited 'desktop ~$5k' anchor below the band in the KRONOS thesis.
SOURCE: Voltera - V-One product page — https://www.voltera.io/v-one

### BotFactory SV2 base price [medium]
SV2 desktop PCB printer historically publicly priced around US$9,999-12,000 for the base (conductive ink printing) configuration. List price, not a transaction record. Unverified this session; botfactory.co archive snapshots should be checked.
SOURCE: BotFactory - SV2 PCB printer page (unverified this session) — https://www.botfactory.co/

### BotFactory SV2 Pro / full configuration price [low]
Full SV2 configurations (solder-paste extruder, pick-and-place head, 'Pro' tier) recalled at roughly US$20,000-30,000 list. This sits at the lower edge of the EUR 25-100k band. Exact tier pricing not confidently recalled; needs archive.org verification of botfactory.co shop pages.
SOURCE: BotFactory - SV2 configurations (unverified this session) — https://www.botfactory.co/

### BotFactory shipping status in 2026 [low]
Could not be verified. As of training cutoff the company (Long Island City, NY) still existed but had gone commercially quiet, with revenue heavily dependent on US Air Force/AFWERX SBIR contracts (BotFactory Inc. SBIR awards are visible on USAspending). Whether it still ships SV2 units in 2026 is unknown; treat as at-risk/possibly dormant.
SOURCE: USAspending.gov recipient search - BotFactory Inc. (not run this session) — https://www.usaspending.gov/search

### Neotech AMT PJ 15X price [low]
No public list or transaction price is recalled anywhere (strictly quote-only). 'Low-cost' in Neotech marketing is relative to its 45X platforms (est. EUR 400k+); trade-press and industry chatter place 15X-series systems at roughly EUR 150,000-250,000. If accurate, the 'low-cost 5-axis' incumbent still sits 1.5-2.5x above the top of KRONOS's band.
SOURCE: Neotech AMT - 15X series product pages (quote-only; estimate unverified) — https://neotech-amt.com/

### Neotech AMT location conflict with thesis [high]
Neotech AMT GmbH is headquartered in Nürnberg — the same city as KRONOS Mechatronics. The nearest 5-axis AME incumbent is literally local, which matters for talent, IP provenance, and investor diligence on the 'vacant band' narrative.
SOURCE: Neotech AMT - contact/company page — https://neotech-amt.com/

### Notion Systems n.jet lab price [low]
No public price exists (quote-only). Entry R&D inkjet platform; comparable lab inkjet systems transact around EUR 150,000-300,000. No tender award specifically naming n.jet lab is recalled. Above the KRONOS band.
SOURCE: Notion Systems - n.jet lab (quote-only; estimate unverified) — https://www.notion-systems.com/

### SUSS MicroTec PiXDRO LP50 price and product status [low]
New-system pricing historically around EUR 150,000-250,000 depending on printhead options (common university cleanroom purchase, frequently seen in EU tenders); used/refurbished units listed around US$50,000-90,000. Important status note: SUSS MicroTec exited the inkjet printing equipment business (~2021-22) and the PiXDRO line was reportedly taken over by Notion Systems — so LP50 may no longer be a SUSS product at all. Both price and transfer need verification.
SOURCE: SUSS MicroTec (former PiXDRO line; unverified this session) — https://www.suss.com/

### Ceradrop / MGI CeraPrinter F-Serie price [low]
No public list price (quote-only). Research-grade inkjet/aerosol platform bought mainly by French/EU academic labs via tenders; recalled transaction band roughly EUR 250,000-500,000. Specific TED award notices could not be pulled this session. Well above the KRONOS band.
SOURCE: Ceradrop (MGI Group) - CeraPrinter F-Serie (quote-only; estimate unverified) — https://www.ceradrop.com/

### IDS NanoJet / NanoJet Desktop price [low]
Integrated Deposition Solutions (Albuquerque, NM; Optomec-lineage founders) markets NanoJet aerosol-jet systems as the lower-cost alternative to Optomec. No public price recalled anywhere; estimated ~US$100,000-175,000 for full systems, with a desktop variant possibly approaching but probably not entering the sub-$100k band. IDS has US DoD SBIR history. Strictly quote-only; no transaction record recalled.
SOURCE: Integrated Deposition Solutions - NanoJet (quote-only; estimate unverified) — https://idsnm.com/

### nano3Dprint entry models [medium]
A2200 3D multi-material electronics printer publicly listed around US$3,499-4,999 and B3300 dual-dispenser around US$11,999-12,999 (vendor and US reseller listings). Both below the KRONOS band; planar gantry machines.
SOURCE: nano3Dprint - products (unverified this session) — https://www.nano3dprint.com/

### nano3Dprint D4200 (possible in-band machine) [low]
The larger D4200 large-area electronics printer is weakly recalled at roughly US$50,000-60,000 list, which would place it inside the EUR 25-100k band (planar, not 5-axis). Low-confidence recall; verify against nano3dprint.com and reseller archives.
SOURCE: nano3Dprint - D4200 (estimate, unverified) — https://www.nano3dprint.com/

### nScrypt 3Dn series price band [medium]
Quote-only; no public list price. nScrypt 'Factory in a Tool' 3Dn systems (3Dn-300/500/Tabletop) transact at roughly US$250,000 to over US$1M depending on axes/heads; extensive US DoD/NIH contract history exists on USAspending/SAM.gov (not retrievable this session). Far above the KRONOS band; the 3Dn-Tabletop is the cheapest entry and still recalled well above US$150k.
SOURCE: nScrypt - 3Dn series (quote-only; band estimate unverified) — https://www.nscrypt.com/

### Optomec Aerosol Jet HD2 / Flex / 5X price band [medium]
Quote-only; no public list. Recalled transaction/list band US$200,000-500,000 (AJ 200/300 series toward the lower end; AJ HD2 and AJ 5X toward the upper). NSF MRI award abstracts for Aerosol Jet acquisitions (searchable at nsf.gov/awardsearch, keyword 'Aerosol Jet') state instrument costs in this range; specific award IDs could not be pulled this session. Far above the KRONOS band.
SOURCE: Optomec - Aerosol Jet printers (quote-only); NSF Award Search for MRI abstracts — https://optomec.com/printed-electronics/aerosol-jet-printers/

### Nano Dimension DragonFly historical transaction prices [low]
DragonFly 2020 Pro era (2017-2019) transactions to universities/defense recalled at roughly US$250,000-350,000 per system; DragonFly LDM / IV list understood to be higher (US$350k+), strictly quote-only, with very low unit volumes (Nano Dimension's AME hardware revenue was marginal relative to its acquisitions). No current (2025-26) list price exists publicly.
SOURCE: Nano Dimension - DragonFly IV (quote-only; historical recall unverified) — https://www.nano-di.com/

### Inspira Technologies acquisition of DragonFly business (pricing signal) [medium]
Task-provided fact (post-cutoff): Inspira Technologies bought Nano Dimension's DragonFly AME business in April 2026 for US$2M upfront plus US$10.5M earnout. The distress-level consideration (~$12.5M max for the entire product line, IP, and installed base) is a strong negative signal on planar-AME unit economics and demand at the $300k+ price point; no new Inspira price list for DragonFly IV is known to have been published as of Aug 2026.
SOURCE: Inspira Technologies investor relations (task-provided fact; announcement not fetchable this session) — https://inspira-technologies.com/

### In-band machine NOT on the target list: Fujifilm Dimatix DMP-2850 [medium]
The Dimatix Materials Printer DMP-2850 (drop-on-demand materials inkjet, the standard university printed-electronics lab tool, successor to DMP-2831) is recalled at roughly US$50,000-60,000 — squarely inside the EUR 25-100k band. Hundreds of installed units worldwide. Planar (XY) only. Any 'vacant band' claim must address this machine.
SOURCE: Fujifilm Dimatix - DMP-2850 (price recall unverified this session) — https://www.fujifilm.com/us/en/business/inkjet-solutions

### In-band candidates NOT on the target list: SonoPlot and MicroFab [low]
SonoPlot Microplotter (ultrasonic fluid dispenser used for printed-electronics R&D) recalled at ~US$25,000-50,000; MicroFab jetlab series (research inkjet stations) recalled at ~US$60,000-100,000. Both planar lab dispensers inside or bordering the band. Low-confidence recalls needing verification.
SOURCE: SonoPlot - Microplotter / MicroFab - jetlab (estimates unverified) — https://www.sonoplot.com/

### Functional substitute in-band: LPKF ProtoMat (subtractive) [medium]
LPKF ProtoMat S-series rapid-PCB-prototyping mills (subtractive, not additive) are recalled at roughly EUR 25,000-60,000, with ProtoLaser systems above EUR 100k. They compete for the same 'in-house rapid PCB prototyping' budget that KRONOS targets, so the band is contested by substitutes even where additive machines are absent.
SOURCE: LPKF - ProtoMat rapid PCB prototyping (price recall unverified) — https://www.lpkf.com/

### Machines with NO public price evidence anywhere (quote-only) [high]
For these target machines, no list price, archived shop price, or specific public transaction record is recalled at all: Neotech AMT PJ 15X, Notion Systems n.jet lab, Ceradrop/MGI CeraPrinter F-Serie, IDS NanoJet Desktop, nScrypt 3Dn series, Optomec Aerosol Jet HD2/Flex, Nano Dimension DragonFly IV (current). Only secondary-source band estimates exist. Procurement-record searches (SAM.gov, USAspending, TED, sole-source PDFs, NSF MRI) were prescribed but could not be executed this session.
SOURCE: Synthesis across vendor pages (all quote-only) — https://neotech-amt.com/

### Verdict input: no 5-axis AME machine below ~EUR 150k [medium]
Across all recalled vendors, the cheapest true multi-axis (4/5-axis, conformal) AME systems — Neotech 15X, nScrypt 3Dn-Tabletop, Optomec AJ with 5-axis option — all sit at an estimated EUR/USD 150,000+ and typically 200,000-500,000. Nothing multi-axis is known in EUR 25-100k. The band is vacant specifically for 5-axis conformal AME, while planar materials printers (NOVA ~$50k, Dimatix ~$50-60k, SV2 Pro ~$25k) do populate it.
SOURCE: Cross-vendor synthesis (training knowledge, unverified) — https://optomec.com/

### Demand-side caveat for the KRONOS thesis [medium]
The two companies that most aggressively pursued sub-industrial AME pricing — BotFactory (possibly dormant, SBIR-dependent) and Nano Dimension (DragonFly divested for ~$2M upfront in Apr 2026) — both failed to build a self-sustaining machine business, and Voltera pivoted NOVA toward materials R&D rather than PCB production. A vacant price band may reflect thin demand as much as an open opportunity; real-buyer evidence near the band is dominated by university/defense research budgets, not industrial prototyping lines.
SOURCE: Synthesis: BotFactory, Nano Dimension/Inspira, Voltera trajectories — https://www.voltera.io/nova

## Open questions
- Exact regular (non-promotional) Voltera NOVA list price: verify via web.archive.org snapshots of voltera.io/nova and voltera.io shop/checkout pages (2022-2026) and any university sole-source/quote PDFs ('single source' 'Voltera NOVA' filetype:pdf).
- BotFactory operating/shipping status in 2026 and final SV2/SV2 Pro tier prices: check botfactory.co live and archived shop pages, NY state business registry status, and last USAspending/SBIR activity dates for BotFactory Inc.
- Actual transaction prices for Optomec Aerosol Jet systems: run SAM.gov and USAspending keyword searches ('Optomec', 'Aerosol Jet'), and NSF MRI award abstracts (nsf.gov/awardsearch keyword 'aerosol jet') which state instrument cost; also university sole-source justification PDFs.
- Actual transaction prices for nScrypt 3Dn: USAspending recipient search 'nScrypt Inc' (numerous DoD awards expected) to separate machine purchases from R&D contracts.
- EU tender awards for PiXDRO LP50, Ceradrop F-Serie, Notion n.jet, Neotech systems: TED (ted.europa.eu) award-notice search under CPV 42000000/38000000 keywords 'inkjet', 'PiXDRO', 'Ceradrop', 'Neotech'; DFG Grossgeraete decisions and German e-procurement (bund.de, DTVP) for Neotech 15X buys.
- Confirm whether the PiXDRO product line transferred from SUSS MicroTec to Notion Systems and whether LP50 is still sold new; obtain a recent LP50 quote or used-market listing.
- Neotech AMT PJ 15X real price: any archived distributor page (Japan/Korea resellers often publish JPY/KRW prices) or a university tender naming the 15X.
- IDS NanoJet Desktop price: DoD SBIR phase-III or university P.O. records; contact-based quote.
- nano3Dprint D4200 current list price (weak ~$50-60k recall) via nano3dprint.com or MatterHackers-style reseller archives.
- Whether Inspira Technologies has published any new DragonFly IV pricing, service pricing, or go-to-market since the April 2026 acquisition ($2M + $10.5M earnout — verify exact terms in the Inspira press release / SEC filing).
- Fujifilm Dimatix DMP-2850 current list price (~$50-60k recall) via university recharge-rate pages or procurement records — it is the most important in-band incumbent missing from the KRONOS competitive set.
- Whether any other in-band additive-electronics entrants have appeared 2024-2026 (e.g., Hummink P1, XTPL Delta Printing System, Scrona, Quantica, J.A.M.E.S ecosystem partners) with public pricing below EUR 100k.
