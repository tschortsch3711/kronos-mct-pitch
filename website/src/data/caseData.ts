/** Zahlenkanon — identisch mit business-plan/financial-model.xlsx und research/assumptions.md */

export const YEARS = [2027, 2028, 2029, 2030, 2031] as const

export type ScenarioKey = 'conservative' | 'base' | 'upside'

export interface Scenario {
  name: string
  tagline: string
  color: string
  unitsPerYear: number[]
  unitsCum: number
  /** M€ */
  revenue: number[]
  /** M€ */
  ebitda: number[]
  breakEven: string
  fundingNeed: string
  moicYr7: string
  irrYr7: string
  verdict: string
}

export const SCENARIOS: Record<ScenarioKey, Scenario> = {
  conservative: {
    name: 'Conservative',
    tagline: 'No band expansion — today’s demand only',
    color: 'var(--red)',
    unitsPerYear: [8, 20, 35, 50, 65],
    unitsCum: 178,
    revenue: [0.65, 1.44, 2.51, 3.64, 4.9],
    ebitda: [-2.02, -1.79, -1.62, -1.27, -0.85],
    breakEven: 'none',
    fundingNeed: '€13.1M',
    moicYr7: '0.3x',
    irrYr7: '−18%',
    verdict: 'Not investable. This is the documented no-go scenario the stage gates protect against.',
  },
  base: {
    name: 'Base',
    tagline: 'Band expands 5–7x — calibrated on Formlabs & LPKF',
    color: 'var(--copper)',
    unitsPerYear: [12, 35, 75, 130, 200],
    unitsCum: 452,
    revenue: [0.96, 2.66, 5.78, 10.14, 15.97],
    ebitda: [-2.02, -1.94, -1.82, -0.84, 1.05],
    breakEven: '2031',
    fundingNeed: '€13.2M',
    moicYr7: '2.25x',
    irrYr7: '+14%',
    verdict: 'A solid LPKF-class Mittelstand business — below the venture threshold on its own.',
  },
  upside: {
    name: 'Upside',
    tagline: 'Market creation: defense pull, IME, attach economy',
    color: 'var(--green)',
    unitsPerYear: [18, 55, 120, 220, 330],
    unitsCum: 743,
    revenue: [1.42, 4.32, 9.71, 18.25, 29.07],
    ebitda: [-0.95, -0.35, -0.58, 2.38, 6.82],
    breakEven: '2030',
    fundingNeed: '€7.0M',
    moicYr7: '11.4x',
    irrYr7: '+48%',
    verdict: 'Venture-grade. ~25–30% probability of this path carries the deal’s expected value.',
  },
}

/** Preisband-Landkarte (k€/k$) */
export const PRICE_MAP = [
  { name: 'Voltera V-One', price: 5, axis: 'planar', tier: 'desktop' },
  { name: 'BotFactory SV2', price: 10, axis: 'planar', tier: 'desktop' },
  { name: 'Voltera NOVA', price: 46, axis: 'planar', tier: 'band' },
  { name: 'Fujifilm Dimatix', price: 55, axis: 'planar', tier: 'band' },
  { name: 'LPKF ProtoMat', price: 35, axis: 'subtractive', tier: 'band' },
  { name: 'Optomec AJ HD', price: 140, axis: 'planar', tier: 'industrial' },
  { name: 'XTPL Delta', price: 195, axis: 'planar', tier: 'industrial' },
  { name: 'Neotech 15X-class', price: 200, axis: '5-axis', tier: 'industrial' },
  { name: 'Optomec production', price: 333, axis: '5-axis', tier: 'industrial' },
  { name: 'DragonFly IV', price: 400, axis: 'planar', tier: 'industrial' },
]

export const SEGMENTS = [
  { name: 'Corporate R&D — medtech SMEs', count: 1900, wave: 2 },
  { name: 'Corporate R&D — electronics OEMs', count: 1800, wave: 2 },
  { name: 'University research labs', count: 1450, wave: 1 },
  { name: 'Education — HAW & colleges', count: 1350, wave: 3 },
  { name: 'Automotive suppliers (IME)', count: 1100, wave: 2 },
  { name: 'Aerospace & defense R&D', count: 900, wave: 3 },
  { name: 'Research institutes / RTOs', count: 700, wave: 1 },
  { name: 'EMS & PCB services', count: 700, wave: 3 },
  { name: 'FabLabs & hardware startups', count: 650, wave: 3 },
]

export const TIERS = [
  {
    name: 'EOS ONE', price: '€35k', role: 'Teach & enter',
    specs: ['3+2-axis indexed', '1 toolhead + UV + FFF', '±25 µm', 'Aion-5X Lite'],
    for: 'HAW · colleges · top fab labs',
  },
  {
    name: 'EOS FIVE', price: '€65k', role: 'The beachhead product', hot: true,
    specs: ['5-axis simultaneous', 'Piezo-jet + dispensing', '±15 µm · AI vision QC', 'Aion-5X Pro + ink kit'],
    for: 'Research groups · corporate R&D',
  },
  {
    name: 'EOS MAX', price: '€95k', role: 'Qualify & produce',
    specs: ['5-axis + toolchanger', 'SMD placement · plasma', '±10 µm · closed loop', 'Traceability package'],
    for: 'Defense labs · pilot production',
  },
]

export const GATES = [
  { id: 'G0', months: 'M1–3', name: 'Discovery', kill: '40 interviews · ≥30% budget-backed intent' },
  { id: 'G1', months: 'M3–6', name: 'Demand test', kill: '≥10 LOIs, 3 with deposit intent' },
  { id: 'G2', months: 'M4–9', name: 'Cost & IP', kill: 'BOM ≤€26k · patent title cleared' },
  { id: 'G3', months: 'M9–15', name: 'Design partners', kill: '5 paid pilots · ≥4 accept' },
  { id: 'G4', months: 'M15–22', name: 'Pilot fleet', kill: '≥30 pre-orders · failures <5%/q' },
  { id: 'G5', months: 'M22–27', name: 'Series release', kill: 'unit cost on plan · delivery >90%' },
]
