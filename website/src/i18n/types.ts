/** Typisiertes Content-Modell — beide Sprachen implementieren exakt dieselbe Struktur. */

export interface TierContent {
  name: string
  price: string
  role: string
  hot?: boolean
  specs: string[]
  audience: string
}

export interface StatContent {
  value: string
  label: string
}

export interface Content {
  langName: string
  meta: { title: string; description: string }
  nav: {
    story: string
    technology: string
    financials: string
    research: string
    decision: string
    langSwitch: string
  }
  preloader: { line: string }
  hero: {
    tag: string
    titleA: string
    titleB: string
    titleC: string
    tagline: string
    sub: string
    ctaPrimary: string
    ctaScroll: string
    marquee: string[]
  }
  problem: {
    kicker: string
    title: string
    lede: string
    stats: StatContent[]
    casualtiesTag: string
    casualties: { name: string; text: string }[]
    diagnosisLabel: string
    diagnosis: string
  }
  technology: {
    kicker: string
    title: string
    lede: string
    timeline: { year: string; text: string; hot?: boolean; green?: boolean }[]
    stack: { name: string; detail: string }[]
    honestLabel: string
    honest: string
    pageLink: string
  }
  machine: {
    kicker: string
    title: string
    captions: string[]
    labels: { base: [string, string]; table: [string, string]; heads: [string, string]; part: [string, string] }
    tiers: TierContent[]
    fence: string
    stepLabel: string
  }
  market: {
    kicker: string
    title: string
    lede: string
    gapLabel: string
    eosMarker: string
    legend: [string, string, string]
    cards: { title: string; text: string; warn?: boolean }[]
  }
  customers: {
    kicker: string
    title: string
    lede: string
    waves: [string, string, string]
    segments: { name: string; count: number; wave: 1 | 2 | 3 }[]
    beachheadTag: string
    beachheadText: string
    jtbd: string[]
  }
  model: {
    kicker: string
    title: string
    lede: string
    streams: { name: string; share: number; note: string }[]
    cards: { title: string; text: string }[]
  }
  financials: {
    kicker: string
    title: string
    lede: string
    tabAria: string
    chartHint: string
    rows: [string, string, string, string, string, string, string]
    sensitivity: string
    pageLink: string
    scenarios: {
      conservative: { name: string; tagline: string; verdict: string }
      base: { name: string; tagline: string; verdict: string }
      upside: { name: string; tagline: string; verdict: string }
    }
  }
  validation: {
    kicker: string
    title: string
    lede: string
    gates: { id: string; months: string; name: string; kill: string }[]
    tranches: { title: string; text: string; hot?: boolean }[]
    note: string
  }
  decision: {
    kicker: string
    title: string
    betTag: string
    bet: string
    conditions: { label: string; text: string; tone: 'go' | 'stop' | 'warn' }[]
    skepticTag: string
    skeptics: string[]
    skepticClose: string
    recoTag: string
    reco: string
    recoSub: string
  }
  footer: { line1: string; line2: string; sources: string }
  pages: {
    technology: {
      title: string
      lede: string
      sections: { heading: string; body: string[] }[]
      costTableTitle: string
      costTable: { driver: string; lever: string; effect: string }[]
    }
    financials: {
      title: string
      lede: string
      canonTitle: string
      canonNote: string
      tableHead: string[]
      sensTitle: string
      sensNote: string
      sensRows: { driver: string; effect: string }[]
      returnsTitle: string
      returnsNote: string
    }
    research: {
      title: string
      lede: string
      statCards: StatContent[]
      methodTitle: string
      method: string[]
      gradeTitle: string
      grades: { grade: string; text: string }[]
      gapsTitle: string
      gaps: string[]
      repoNote: string
      repoCta: string
    }
  }
}

export type Lang = 'en' | 'de'
