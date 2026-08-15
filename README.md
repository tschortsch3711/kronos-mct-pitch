# KRONOS Eos — Investment Decision Package

**Investment Case für eine Low-Cost-Maschinenplattform (25.000–100.000 €) von KRONOS Mechatronics** — dem Nürnberger Nachfolger des 5-Achs-AME-Pioniers Neotech AMT (AME = Additive Manufactured Electronics / 3D-gedruckte Elektronik).

Zentrale Frage: *Gibt es einen ausreichend großen, wirtschaftlich attraktiven Markt für eine deutlich günstigere KRONOS-Maschine — und wie entsteht daraus ein skalierbares Geschäft?*

**Leitprinzip: Substanz vor Optimismus.** Das Paket enthält ein quantifiziertes No-Go-Szenario, harte Kill-Kriterien und eine Evidenz-Graduierung (A–D) für jede tragende Zahl.

---

## Die wichtigsten Ergebnisse

1. **Die Preislücke ist real und präzise:** Zwischen ~60 k$ (planare Labortools: Voltera NOVA, Fujifilm Dimatix) und ~150–200 k€ (industrieller Einstieg) existiert weltweit **kein 5-Achs-/Konform-AME-System** — im einzigen Preisband, das unter allen Beschaffungsschwellen liegt (DE-Direktauftrag 100 k€, DFG-Großgeräte 200 k€, EU-Tender 221 k€, NSF MRI 100 k$).
2. **Der heutige AME-Maschinenmarkt ist klein** (~100–190 Einheiten/Jahr ≈ 15–28 M€ weltweit, Bottom-up). Die Kategorie hat sich 2024–2026 selbst bereinigt (Neotech insolvent, Nano Dimension zum Distressed-Preis ausgestiegen, J.A.M.E.S liquidiert). Jede Investment-These ist eine **Marktschaffungs-Wette** — und wird hier auch so behandelt.
3. **Das Band kauft nachweislich Maschinen:** Voltera >5.000 Einheiten, LPKF-ProtoMat-Segment 26,2 M€ Umsatz (2024), Formlabs >130.000 Drucker nach 10x-Preissenkung.
4. **Produktantwort:** modulare Plattform **„KRONOS Eos"** mit drei Konfigurationen — Eos One (35 k€), **Eos Five (65 k€, Beachhead)**, Eos Max (95 k€) — abgeleitet aus existierender Helios-Technik; die teuerste Komponente (Aion-5X-Software) existiert bereits.
5. **Szenarien (formelvalidiertes Modell):** Konservativ = No-Go (kein Break-even, −18 % IRR) · Base = 16,0 M€ Umsatz 2031, Break-even 2031, 13,2 M€ Kapitalbedarf, 2,25x MOIC · Upside = 29,1 M€, 23 % EBITDA, 11,4x MOIC / +48 % IRR.
6. **Empfehlung: Bedingtes GO** — Tranche 1 (2,5 M€) mit Stage-Gates; maximal 2,5 M€ im Risiko vor Serienfreigabe; drei No-Go-Prüfungen vor Closing (IP-Titel, Team-Retention, Altlasten).

## Repository-Struktur

```
├── README.md
├── research/
│   ├── research-report.md        ← Master-Report mit Executive Summary
│   ├── company-analysis.md          Unternehmen, Technologie, Kostenhebel
│   ├── market-analysis.md           Marktgrößen, Preisband-Lücke, TAM/SAM/SOM
│   ├── competitors.md               Wettbewerbslandkarte + Benchmark-Lehren
│   ├── customer-segments.md         10 Segmente, Opportunity-Matrix, Beachhead
│   ├── assumptions.md            ← Single Source of Truth aller Annahmen (Stufen A–D)
│   ├── sources.md                ← Quellenbibliothek (Status je Quelle)
│   └── appendix/                    10 Recherche-Dossiers (301 Findings, Roh-Daten)
├── business-plan/
│   ├── business-plan.md             Produktstrategie, GTM, Finanzplan, Risiken, Validierung
│   ├── investment-thesis.md         Die 10 Investorenfragen + No-Go-Bedingungen
│   └── financial-model.xlsx         5-Jahres-Modell, 3 Szenarien, Sensitivität, Returns
├── presentation/
│   ├── kronos-investor-deck.pptx        20 Slides (EN), vollständig editierbar
│   ├── kronos-investor-deck.pdf         Render zum schnellen Durchblättern (EN)
│   ├── kronos-investor-deck-de.pptx     20 Slides (DE), vollständig editierbar
│   └── kronos-investor-deck-de.pdf      Render (DE)
├── website/                             Interaktive Investor-Website (React/Vite/GSAP, EN/DE)
├── scripts/
│   ├── build_financial_model.py         regeneriert das XLSX
│   ├── build_investor_deck.js           regeneriert das EN-PPTX
│   ├── make_deck_de.py                  erzeugt build_investor_deck_de.js (Übersetzungstabelle)
│   └── build_investor_deck_de.js        regeneriert das DE-PPTX
└── .github/workflows/deploy-pages.yml   GitHub-Pages-Deployment
```

## Zentrale Annahmen (Kurzfassung)

Alle Annahmen mit Evidenzstufe und Herleitung: [`research/assumptions.md`](research/assumptions.md). Die wichtigsten:

| Annahme | Wert | Stufe |
|---|---|---|
| Band-Expansion bis 2031 (Base) | 5–7x auf ~550–700 Einheiten/Jahr | C/D — Gate V1/V2 |
| Blended ASP / Maschinen-COGS | 58→63,5 k€ / 58 %→48 % | B/C — Gate V3 |
| Wiederkehrender Umsatz je Maschine | ~10 k€/Jahr (Material, Service, Software) | C |
| Kapitalbedarf brutto (Base) | 13,2 M€ (Equity ~10–11 M€ + Grants + WC-Linie) | B (Modell) |
| KRONOS-Verkäufe seit Relaunch | nicht verifizierbar → als ~0 angenommen | D — Diligence |
| Patent-Chain-of-Title (Neotech-Assets) | ungeprüft | D — No-Go-Prüfung |

## Verwendete Quellen

301 Findings aus 10 Recherche-Dossiers; jede wesentliche Zahl mit URL in [`research/sources.md`](research/sources.md). Schwerpunkte: Handelsregister/CompanyHouse, KRONOS-GitHub-Repositories (direkt verifiziert), IDTechEx/MarketsandMarkets/GVR, XTPL-Investor-Relations, LPKF-Geschäftsberichte, Vergaberecht (DFG/EU/NSF), OE-A/LOPEC, Presse (VoxelMatters, 3DPrint.com, BusinessWire). Nicht live verifizierbare Branchen-Benchmarks sind als solche markiert (📚).

## Website

**Lokal starten**

```bash
cd website
npm install
npm run dev          # → http://localhost:5173/kronos-mct-pitch/
```

**Bauen & Vorschau**

```bash
npm run build        # → website/dist
npm run preview      # → http://localhost:4173/kronos-mct-pitch/
```

**GitHub Pages Deployment**

Der Workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) baut und deployt `website/` bei jedem Push auf `main` (oder manuell via *workflow_dispatch*). Einmalig aktivieren: **Repo → Settings → Pages → Source: „GitHub Actions"**. Die Seite erscheint unter `https://<owner>.github.io/kronos-mct-pitch/`. (Base-Pfad ist in `website/vite.config.ts` gesetzt.)

**Features:** Lenis-Smooth-Scroll + GSAP ScrollTrigger, Preloader (einmal pro Session), kinetische Split-Typografie, gepinnte Machine-Assembly-Sequenz mit HUD-Zähler, horizontale Konfigurations-Galerie, animierte Preisband-Karte, interaktiver 3-Szenario-Finanzchart, Marquees, Kapitel-Rail. **Sprachen:** EN/DE-Umschalter in der Navigation (persistiert, Auto-Detection per Browser-Sprache). **Unterseiten:** `/technology`, `/financials`, `/research` (SPA-Fallback via `404.html` für GitHub-Pages-Deep-Links). Scroll-Animationen respektieren `prefers-reduced-motion`; die Maschinen-Sequenz ist eine abstrahierte Visualisierung (keine realen CAD-Daten).

## PowerPoint neu generieren

```bash
npm install pptxgenjs react react-dom react-icons sharp   # einmalig, beliebiges Verzeichnis; ggf. NODE_PATH setzen
node scripts/build_investor_deck.js                        # → presentation/kronos-investor-deck.pptx (EN)
python3 scripts/make_deck_de.py                            # erzeugt/aktualisiert das DE-Skript aus der Übersetzungstabelle
node scripts/build_investor_deck_de.js                     # → presentation/kronos-investor-deck-de.pptx (DE)
# PDF-Render (optional):
soffice --headless --convert-to pdf --outdir presentation presentation/kronos-investor-deck.pptx
```

## Finanzmodell aktualisieren

```bash
pip install openpyxl
python3 scripts/build_financial_model.py    # → business-plan/financial-model.xlsx
```

Alle Parameter liegen oben im Skript (`SCEN`-Dictionary) bzw. sind direkt im XLSX editierbar (gelbe Eingabezellen — Formeln rechnen durch). Das Skript druckt zur Kontrolle EBITDA 2031 und Kapitalbedarf je Szenario; die XLSX-Formeln wurden gegen die Python-Referenz neuberechnet und stimmen überein.

---

*Erstellt am 15.08.2026 als unabhängige Analyse (ohne Zugang zu KRONOS-Innenzahlen; das Unternehmen wurde nicht kontaktiert). Produktkonzept „Eos" und alle Planzahlen sind Szenarioarbeit dieser Studie.*
