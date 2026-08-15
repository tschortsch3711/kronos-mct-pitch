# gap3

## Summary
VERIFICATION COULD NOT BE PERFORMED — zero primary sources were reachable, and no figure below should be treated as verified. Two hard blockers: (1) the session's WebSearch budget was already exhausted (200/200) before this subagent's first query — both initial LPKF searches were refused with "web search budget exhausted; ask the user to raise CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION"; (2) the network egress proxy 403-blocks every verification target — confirmed rejections logged at the proxy status endpoint for www.lpkf.com, xtpl.com, www.sec.gov, www.bundesanzeiger.de, www.northdata.de, en.wikipedia.org, register.dpma.de, worldwide.espacenet.com, cordis.europa.eu, www.optomec.com, www.voltera.io and kronos-mct.com itself; only package registries and anthropic.com are allowlisted, and the proxy README forbids retrying policy denials. Fallback channels were also empty: the repo (research/, business-plan/, assets/ all empty; git history is scaffolding only) and the connected Google Drive (no LPKF/XTPL/Geschäftsbericht/leasing/ink documents) contain no source material. Consequence for the pitch: every model anchor from the two prior no-web sessions (LPKF Development segment ~EUR 30M revenue at ~20% EBIT; XTPL record PLN 13.7M FY2025; ~$4,000/kg silver ink and EUR 5-20k/machine/yr consumable attach; BDL Mobilien-Leasingquote ~24-25%) remains UNVERIFIED MODEL RECOLLECTION and must stay flagged as such in the financial model — none can be confirmed, and none can be flagged as >20% wrong either, because no ground truth was obtainable. As a weak triangulation signal only, my own independent training-data recollections (equally unverified, all marked low confidence in the findings) do not contradict the anchors: LPKF's Development segment (ProtoMat/ProtoLaser benchtop systems) sits in my memory at roughly EUR 20-30M revenue with EBIT margins in the high-teens to high-20s percent range, making the ~EUR 30M/~20% anchor plausible but possibly a few EUR M high; BDL's ~24-25% Mobilien-Leasingquote matches long-standing BDL disclosures in my memory; ~$4,000/kg is inside the plausible band for small-quantity silver nanoparticle AME inks (distributor research quantities often imply EUR 2,000-10,000/kg, bulk industrial pricing materially lower); my XTPL memory is internally conflicting on whether the PLN ~13.7-13.9M record year was FY2023 or FY2025, so the XTPL block is the highest-risk anchor and needs primary-source confirmation most urgently. Remediation to actually complete this task: rerun in a session with (a) CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION raised or reset, and/or (b) the egress allowlist extended to www.lpkf.com, xtpl.com, leasingverband.de/bdl.leasingverband.de, sigmaaldrich.com, novacentrix.com, ecb.europa.eu and leaseurope.org — or supply the LPKF Geschäftsberichte 2019-2025, XTPL annual/quarterly reports, and the latest BDL Jahresbericht as PDFs into the repo or Google Drive, which I can then parse offline with full page-level citation.

## Findings (16)

### BLOCKER — WebSearch budget exhausted [high]
The session-wide WebSearch budget was already at 200/200 before this verification subagent issued its first query; both initial LPKF queries were refused ('Web search was not performed: this session has used its web search budget'). No search of any kind was executed for this task. Fix: raise or reset CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION and rerun.
SOURCE: Claude Code WebSearch tool response, in-session (2026-08-15) — internal://websearch-budget-200-of-200

### BLOCKER — egress proxy blocks all verification domains [high]
The policy-enforcing egress proxy answered 403 to CONNECT for every relevant host, confirmed in the proxy's recentRelayFailures log: www.lpkf.com, xtpl.com, www.sec.gov, www.bundesanzeiger.de, www.northdata.de, en.wikipedia.org, register.dpma.de, worldwide.espacenet.com, cordis.europa.eu, www.foerderdatenbank.de, www.optomec.com, www.voltera.io, kronos-mct.com. Only npm/PyPI/crates/golang registries and anthropic.com are allowlisted (noProxy list). Proxy README: 'do not retry organization policy denials (403/407) — report them instead.' WebFetch to lpkf.com returned EGRESS_BLOCKED.
SOURCE: Agent proxy status endpoint and /root/.ccr/README.md — http://127.0.0.1:37071/__agentproxy/status

### BLOCKER — no offline sources available [high]
Repo /home/user/kronos-mct-pitch contains no research material (research/, business-plan/, assets/, presentation/, scripts/ directories are all empty; git history holds only 'Initial commit' and a Vite/React scaffolding commit). Connected Google Drive has no documents matching LPKF, XTPL, Geschäftsbericht, annual report, leasing, or ink — only unrelated AI-architecture notes. Nothing exists locally to parse in lieu of web access.
SOURCE: Local filesystem inspection and Google Drive MCP search (2026-08-15) — file:///home/user/kronos-mct-pitch

### VERDICT on all recollected anchors [high]
No recollected figure could be confirmed OR flagged as >20% wrong, because no ground truth was obtainable. All four blocks (LPKF Development segment, XTPL financials, ink consumable economics, BDL leasing quota) remain unverified model recollections and must be labeled as such in the pitch financial model until a session with web access or uploaded PDFs reruns this verification.
SOURCE: This verification session's outcome — internal://verification-outcome

### LPKF Development segment revenue (UNVERIFIED cross-check) [low]
UNVERIFIED MODEL RECOLLECTION, not a fetched figure: my independent training-data memory places LPKF's Development segment (ProtoMat milling machines, ProtoLaser systems for in-house PCB prototyping) at roughly EUR 20-30M annual revenue across 2019-2024, i.e. the prior anchor of ~EUR 30M/yr is plausible but may sit at the top of, or slightly above, the true range for some years. Exact per-year figures 2019-2025 MUST be pulled from the segment reporting note in each LPKF Geschäftsbericht.
SOURCE: VERIFICATION TARGET (not fetched): LPKF Laser & Electronics SE annual reports, Investor Relations — https://www.lpkf.com/en/investor-relations

### LPKF Development segment EBIT margin (UNVERIFIED cross-check) [low]
UNVERIFIED MODEL RECOLLECTION: the Development segment has historically been one of LPKF's most profitable, with EBIT margins in my memory ranging from high-teens to high-20s percent depending on year (weaker in the 2020 COVID year). The prior anchor of ~20% EBIT is directionally consistent and not contradicted, but per-year segment EBIT 2019-2025 must be verified from the Geschäftsbericht segment tables before use in the model.
SOURCE: VERIFICATION TARGET (not fetched): LPKF Geschäftsberichte 2019-2024, segment reporting — https://www.lpkf.com/en/investor-relations

### LPKF ProtoMat installed base (UNVERIFIED cross-check) [low]
UNVERIFIED MODEL RECOLLECTION: LPKF marketing/IR material has historically claimed a cumulative installed base of tens of thousands of ProtoMat systems worldwide over ~45 years (figures like '>20,000 systems' appear in my memory, but I cannot pin the exact number or document). Needs confirmation from LPKF annual report 'Development segment' narrative or product brochures. No reliable memory of a disclosed service/consumables revenue share for the segment — treat that as undisclosed until proven otherwise.
SOURCE: VERIFICATION TARGET (not fetched): LPKF IR / ProtoMat product pages — https://www.lpkf.com/en/investor-relations

### XTPL revenue trajectory FY2023-FY2025 (UNVERIFIED, internally conflicting) [low]
UNVERIFIED MODEL RECOLLECTION WITH A FLAG: my memory associates a record revenue of approximately PLN 13.7-13.9M with XTPL's FY2023, while the task brief attributes a record PLN 13.7M to FY2025 — these cannot both be records unless revenue dipped in 2024 and recovered to a similar level. This is the highest-risk anchor in the model: FY2023, FY2024 and FY2025 revenue must each be pulled from XTPL's audited annual reports (ESPI/EBI filings) before any ramp-speed analogy is presented to investors.
SOURCE: VERIFICATION TARGET (not fetched): XTPL SA annual reports, Investor Relations — https://xtpl.com/investor-relations/

### XTPL Delta Printing System units and ASP (UNVERIFIED cross-check) [low]
UNVERIFIED MODEL RECOLLECTION: XTPL sold on the order of 3-6 Delta Printing Systems per year in 2023-2024 at an ASP in the EUR 300-400k range per system, alongside nanopaste/ink sales and technology-development contracts. Unit counts, ASP, gross margin, operating loss/cash burn and cumulative capital raised (my weak memory: cumulative raises somewhere in the PLN 70-110M range since founding) all require the annual report and quarterly ESPI filings — do not use my ranges in the model without verification.
SOURCE: VERIFICATION TARGET (not fetched): XTPL SA annual/quarterly reports — https://xtpl.com/investor-relations/

### XTPL 2026+ strategy targets (UNVERIFIED) [low]
UNVERIFIED MODEL RECOLLECTION: XTPL published a multi-year growth strategy (roughly 2023-2026 horizon) targeting industrialization of its ultra-precise deposition technology, scaling module/OEM sales, and a step-change in revenue by 2026; I cannot reliably recall the specific numeric targets and decline to state them. Pull the strategy presentation from XTPL IR before citing any target.
SOURCE: VERIFICATION TARGET (not fetched): XTPL strategy presentation, Investor Relations — https://xtpl.com/investor-relations/

### Silver nanoparticle AME ink pricing (UNVERIFIED cross-check) [low]
UNVERIFIED MODEL RECOLLECTION: research/small-lot pricing for conductive silver nanoparticle inks (Sigma-Aldrich/Merck listings of silver dispersion inks, NovaCentrix Metalon JS series, XTPL nanopastes) typically falls around EUR 200-700 per 25-100 g unit, implying roughly EUR/USD 2,000-10,000 per kg at small quantities; bulk industrial pricing is materially lower (order of USD 800-2,000/kg) and driven largely by silver content. The model's ~$4,000/kg assumption is inside the plausible small-buyer band and NOT contradicted, but current distributor list prices must be captured to source it. The EUR 5-20k/machine/yr consumable attach could not be checked against any disclosure.
SOURCE: VERIFICATION TARGET (not fetched): Sigma-Aldrich silver conductive ink listings; NovaCentrix shop — https://www.sigmaaldrich.com/

### Silver spot price (UNVERIFIED, volatile) [low]
UNVERIFIED MODEL RECOLLECTION as of my January 2026 knowledge cutoff: silver rallied sharply in late 2025, trading roughly USD 45-55/oz (it crossed USD 50/oz around October 2025), i.e. roughly USD 1,450-1,770 per kg of pure silver. The August 2026 spot price is unknown to me and must be pulled live (LBMA/Kitco) — at 30-60 wt% silver loading, raw-silver cost alone puts a floor of very roughly USD 450-1,050 per kg of ink, which is context for sanity-checking the $4,000/kg assumption.
SOURCE: VERIFICATION TARGET (not fetched): LBMA silver price — https://www.lbma.org.uk/prices-and-data

### BDL Mobilien-Leasingquote (UNVERIFIED cross-check) [low]
UNVERIFIED MODEL RECOLLECTION: the BDL (Bundesverband Deutscher Leasing-Unternehmen) has for many years reported a Mobilien-Leasingquote — leasing's share of German equipment investment — of approximately 24-25%. The prior anchor of ~24-25% matches my memory and is very likely directionally right, but the exact current-year figure and the definition year must be taken from the latest BDL Jahresbericht/press release before citation.
SOURCE: VERIFICATION TARGET (not fetched): BDL Jahresbericht, leasingverband.de — https://bdl.leasingverband.de/

### BDL annual new leasing business volume (UNVERIFIED cross-check) [low]
UNVERIFIED MODEL RECOLLECTION: German leasing new business (Neugeschäft) has recently run on the order of EUR 60-70bn per year, overwhelmingly Mobilien (equipment) leasing with real estate a small residual; my memory suggests roughly EUR 60-65bn for 2023/2024 but I cannot pin the exact figure or year. Must be verified from the BDL annual press conference figures.
SOURCE: VERIFICATION TARGET (not fetched): BDL Jahresbericht / Jahrespressekonferenz, leasingverband.de — https://bdl.leasingverband.de/

### EU SME leasing relevance, ECB SAFE (UNVERIFIED cross-check) [low]
UNVERIFIED MODEL RECOLLECTION: in the ECB's SAFE survey, leasing/hire-purchase consistently ranks among the most relevant external financing sources for euro-area SMEs, with roughly 45-50% of SMEs rating it relevant — historically ahead of bank loans on some measures. Specific 2025-2026 wave figures and typical SME equipment leasing rates were not obtainable; pull the latest SAFE report (ecb.europa.eu) and Leaseurope annual survey before citing.
SOURCE: VERIFICATION TARGET (not fetched): ECB SAFE survey; Leaseurope annual survey — https://www.ecb.europa.eu/stats/ecb_surveys/safe/html/index.en.html

### Remediation path to complete verification [high]
Two viable routes: (A) rerun this verification in a session with the WebSearch cap raised/reset (CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION) and/or the egress allowlist extended to www.lpkf.com, xtpl.com, bdl.leasingverband.de, sigmaaldrich.com, novacentrix.com, ecb.europa.eu, leaseurope.org, lbma.org.uk; or (B) drop the primary PDFs (LPKF Geschäftsberichte 2019-2025, XTPL annual reports 2023-2025 + strategy deck, BDL Jahresbericht 2024/2025) into /home/user/kronos-mct-pitch/research/ or Google Drive — offline parsing with page-level citation is fully possible in this environment via the pdf skill.
SOURCE: Environment diagnosis, this session — http://127.0.0.1:37071/__agentproxy/status

## Open questions
- LPKF Development segment: exact revenue and EBIT per year 2019-2025 from the Geschäftsbericht segment tables (anchor ~EUR 30M / ~20% EBIT is unconfirmed).
- LPKF: any officially stated ProtoMat cumulative installed-base figure, and any disclosed service/consumables share of Development segment revenue.
- XTPL: audited FY2023, FY2024, FY2025 revenue — resolve the conflict between my recollection (record ~PLN 13.9M in FY2023) and the brief's claim (record PLN 13.7M in FY2025); this is the highest-risk anchor.
- XTPL: Delta Printing System units sold per year, ASP, gross margin, operating loss/cash burn, cumulative capital raised, and the numeric 2026+ strategy targets.
- Consumables: current distributor list prices (EUR or USD per unit weight) for NovaCentrix Metalon JS series, Sun Chemical, DuPont/Qnity PE series, Henkel Loctite ECI, and XTPL nanopastes; validation of the ~$4,000/kg ink assumption and the EUR 5-20k/machine/yr attach rate.
- Silver spot price as of August 2026 (LBMA/Kitco) — my knowledge ends ~Jan 2026 at roughly USD 45-55/oz.
- BDL: exact latest Mobilien-Leasingquote and annual new leasing business volume with reporting year, from leasingverband.de.
- ECB SAFE 2025/2026 wave: leasing/hire-purchase relevance share for euro-area SMEs; typical EU SME equipment leasing rates 2025-2026 (Leaseurope).
- Environment: will the orchestrator raise CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION or extend the egress allowlist, or should source PDFs be supplied into the repo/Drive for offline parsing?
