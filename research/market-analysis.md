# Market Analysis: Additive Manufactured Electronics (AME)

> Evidenzstufen (A–D) gemäß `assumptions.md`; Quellen in `sources.md`.

## 1. Marktdefinition und Abgrenzung

**AME (Additive Manufactured Electronics / 3D-gedruckte Elektronik):** additiver Auftrag funktionaler Materialien (Leiter, Dielektrika, Widerstände, Sensoren) auf oder in 2D-/3D-Substrate, optional kombiniert mit Bauteilbestückung. Relevante Teilmärkte:

1. **AME-Maschinen** (das Investitionsobjekt) — heute ein sehr kleiner Markt (siehe 2.2)
2. **Materialien** (leitfähige Tinten/Pasten, Dielektrika) — der große, wachsende Wertpool
3. **Angrenzend:** In-Mold Electronics (IME), MID/LDS-Antennen, PCB-Prototyping (subtraktiv + Services), Fluid-Dispensing

## 2. Marktgrößen: die zwei Realitäten

### 2.1 Die Analystensicht (Top-down)

| Markt | Größe | CAGR | Quelle (A) |
|---|---|---|---|
| 3D-Elektronik gesamt (partially additive + IME + fully additive) | **~4,3 Mrd. $ bis 2034** | — | IDTechEx (Spezialist) |
| „3D printed electronics" (breiter Scope) | 14,4 Mrd. $ (2025) → 74,6 Mrd. $ (2035) | 17,9 % | SNS Insider — **als Obergrenze behandeln** |
| Printed Electronics (Dachmarkt) | 17–19 Mrd. $ (2024/25) | 15–23 % | MarketsandMarkets, GVR |
| — davon Materialien/Tinten | ~79 % des Umsatzes | — | GVR |
| Leitfähige Tinten | 3,7 Mrd. $ → >6,5 Mrd. $ (2034) | — | IDTechEx |
| In-Mold Electronics | 0,24 Mrd. $ (2025) → ~2 Mrd. $ (2033) | ~28 % | GVR/Straits |
| MID/LDS | 1,9–2,4 Mrd. $ | 13–14 % | GVR/MRFR |
| LDS-Antennen | 0,91 Mrd. $ (2025) → 1,99 Mrd. $ (2030) | 17 % | Mordor |
| Fluid Dispensing Equipment | 8,5 Mrd. $ (2024) | 5,6 % | GVR |

**Interpretation:** Die Milliardenzahlen beschreiben überwiegend **Bauteile und Materialien**, nicht Maschinenumsatz. Der Spezialist (IDTechEx) stuft „fully additive 3D electronics" explizit als das am wenigsten reife Segment ein. Wer dem Investor eine Maschinen-Story mit „74-Mrd.-$-Markt" verkauft, betreibt Etikettenschwindel.

### 2.2 Die Maschinenrealität (Bottom-up, B)

Herleitung aus verifizierten Anbieterdaten (Details `appendix/dossier-verification-2.md`):

| Anbieter | Einheiten/Jahr (Schätzung) | Evidenzanker |
|---|---|---|
| Optomec (Aerosol Jet) | ~15–20 | 350+ AJ-Systeme über ~20 Jahre (A) |
| XTPL (Delta) | ~10–13 | 13 Auslieferungen 2025, 40+ kumuliert (A) |
| nScrypt | ~5–10 | 📚 |
| Nano Dimension (DragonFly, bis Exit) | ~2–5 | 51 Systeme bis 2020, danach Stillstand (A) |
| Ceradrop, Notion (PE-Anteil), Rest | ~10–20 | 📚 |
| **Professioneller AME-Maschinenmarkt** | **~45–70 Einheiten/Jahr ≈ 12–22 M€** | B |
| + Desktop/Band (Voltera NOVA u.a.) | ~50–120 Einheiten/Jahr ≈ 3–6 M€ | B/D |
| **Gesamt AME-Maschinen heute** | **~100–190 Einheiten/Jahr ≈ 15–28 M€/Jahr** | B |

**Das ist die ehrliche Ausgangsbasis: Der heute adressierbare Maschinenmarkt ist klein.** Jede Investment-These muss auf **Markterweiterung** beruhen, nicht auf Verdrängung.

### 2.3 Warum der Markt klein geblieben ist — und was sich ändert

**Bisherige Blocker (A/B):**
- Maschinenpreise 150–500 k€ bei unklarem ROI → nur grant-finanzierte Einzelkäufe (Akademikeranteil der Platzierungen 50–80 %)
- Silbertinten ~2.000–10.000 $/kg (Small-Lot); Silber ~80 % der Tintenkosten (A)
- Standards nur auf Guideline-Niveau (IPC-2291/4921/4591) → Qualifikationshürden für Serienanwendungen (A)
- $2-PCB-Substitute (JLCPCB, 24 h) deckeln den Wert für planare Standard-Boards (A)

**Was sich geändert hat (Why now):**
1. **Der Marktführer ist raus:** Nano Dimension verkaufte das DragonFly-Geschäft 04/2026 für 2 M$ + Earnout — nach ~1,5 Mrd. $ Kapitalaufnahme. Das $300k+-Planar-Modell ist gescheitert; die Kategorie ist führungslos. (A)
2. **Auch die Community-Infrastruktur konsolidiert:** J.A.M.E.S (Hensoldt/Nano-JV) liquidiert 08/2025. (A) — Warnsignal und Chance zugleich.
3. **Defense/Space zieht an:** DoD-AM-Ausgaben 0,3 → 0,8 → ~2,6 Mrd. $ (2023/2024/2030e); NASA flog eine gedruckte Antenne; ESA-Programme; NextFlex +154 M$ AFRL. Gedruckte Antennen/Sensorik sind militärisch validierte Use Cases. (A)
4. **IME erreicht Automotive-Reife** (CAGR ~28 %; KRONOS' LOPEC-Award kam explizit im IME-Kontext). (A)
5. **Beschaffungsschwellen wurden angehoben:** Deutschland erlaubt seit der Vergaberechtsreform 2025 Direktaufträge des Bundes bis 100 k€; DFG-Großgeräteverfahren erst ab 200 k€ (Uni) / 100 k€ (HAW); EU-Tender ab 221 k€. **Ein Gerät ≤100 k€ ist beschaffungstechnisch ein „Kreditkarten-Kauf" im Vergleich zu heutigen Systemen.** (A)
6. **Komponenten-Deflation:** Industrielle Steuerungen, Linearachsen, Vision-Hardware sind seit der 15X-Konstruktionsära massiv günstiger; die Softwarekosten trägt KRONOS bereits. (C)

## 3. Die Preisband-Lücke (Kernbefund)

Vollständige Preislandkarte (Details in `competitors.md`):

```
   3,5–12 k$   Desktop, planar, edu:        Voltera V-One, BotFactory SV2, nano3Dprint A2200
   ~46–60 k$   Band besetzt NUR PLANAR:     Voltera NOVA (46 k$, Dispensing, 3-Achs)
                                            Fujifilm Dimatix DMP-2850 (~50–60 k$ 📚, Inkjet-Lab)
   25–100 k€   >>> 5-ACHS/KONFORM: LEER <<<  ← Zielband KRONOS Eos
  150–250 k€   Industrieller Einstieg:      Neotech/KRONOS 15X-Klasse (~200 k€), Optomec AJ HD (<150 k$), XTPL Delta (170–220 k€)
  250–500 k€+  Produktion/High-End:         Optomec-Produktionssysteme (~333–400 k$), DragonFly IV (~400 k$), nScrypt, Ceradrop
```

**Befund (B):** Im Band 25–100 k€ existiert **kein einziges 5-Achs-/Konform-AME-System** — die Fähigkeit, die 3D-Elektronik (Antennen auf Gehäusen, Sensorik auf Freiformflächen, IME-Vorstufen) definiert. Die planaren Band-Bewohner (NOVA, Dimatix) beweisen zugleich, dass **im Band gekauft wird**.

**Gegenprobe — warum ist die Lücke leer?** Drei Hypothesen, alle im Validierungsplan adressiert:
- (a) *Niemand kann es liefern* (Kostenstruktur der Incumbents, Projekt- statt Produktdenken) → KRONOS-Chance
- (b) *Es gibt keine Nachfrage* (5-Achs nur für Produktionsanwendungen relevant, die 250 k€ zahlen) → No-Go-Risiko, via LOI-Gate testen
- (c) *Die Lücke schließt gerade jemand anderes* → keine Evidenz gefunden (Stand 08/2026); nächste Kandidaten (Hummink, Scrona, Quantica, XTPL) zielen alle auf Sub-Mikron/Display/Semiconductor, nicht auf das Labor-/Prototyping-Band (A)

## 4. Nachfrage-Evidenz im Zielband

| Evidenz | Zahl | Stufe |
|---|---|---|
| Voltera installierte Basis (V-One, ~5 k$) | >5.000 Einheiten, 92 Länder, NASA/MIT/Harvard/Stanford/Oxford | A |
| Voltera NOVA (~46 k$, planar, seit 2023) | geschätzt 40–90 Einheiten/Jahr | D (wichtigster Validierungspunkt) |
| LPKF ProtoMat (subtraktiv, 10–60 k€) | „Tausende" installiert; Development-Segment 26,2 M€ (2024) | A |
| XTPL Delta (170–220 k€) | 40+ Einheiten, 71 % Forschung; 13 allein 2025 | A |
| Universitätsbeschaffung Aerosol Jet (Manchester) | 422 k£ — zeigt Zahlungsbereitschaft für AME-Fähigkeit | A |
| Formlabs-Analogie (10x-Preissenkung professioneller Maschinen) | >130.000 Drucker (04/2024) | A |
| Preiselastizität 3D-Druck-Historie | ~10x Preis ↓ → 50–100x Einheiten, 2–4x Dollar-TAM | C |

**Konservative Übersetzung (B):** Wir modellieren keine 50x-Explosion, sondern eine **Band-Expansion um 5–7x bis 2031** (auf ~550–700 Einheiten/Jahr weltweit über alle Anbieter) — getragen von Beschaffungsfreundlichkeit, Defense-Nachfrage, IME-Reife und erstmals verfügbarer 5-Achs-Fähigkeit im Band. Der Conservative Case verzichtet vollständig auf Markterweiterung.

## 5. Regionale Struktur

- **Europa:** stärkstes Forschungscluster (OE-A 200+ Mitglieder, LOPEC), Nürnberger AME-Herkunft, Vergabevorteile <100 k€; ~22 % des 3D-PE-Marktes (A/B)
- **Nordamerika:** Defense-Pull (DoD, FFRDCs, NextFlex), APES-/NTV-Kanal existiert; UL-Zertifizierung nötig (F9)
- **APAC:** größter PE-Markt (38–47 %), aber vertriebsintensiv; über Distributoren ab Jahr 3+ (ehem. Neotech-Kanäle in Japan/Australien reaktivierbar)

## 6. Substitute und ihre Grenzen

| Substitut | Preis | Deckt ab | Deckt NICHT ab |
|---|---|---|---|
| PCB-Services (JLCPCB/PCBWay) | 2–50 $/Board, 24–72 h | Standard-Rigid-PCBs | 3D/konforme Schaltungen, Sofort-Iteration, IP-sensitive/ITAR-Projekte, neue Materialien |
| LPKF ProtoMat (Fräsen) | 10–60 k€ | 2D-Prototypen inhouse | Additive Multilayer, Freiform, Materialforschung |
| Desktop-Drucker (V-One, SV2) | 4–12 k$ | Einfache 2-Lagen-Demos | Präzision, 3D, Materialvielfalt, Serientauglichkeit |
| Leitfähige Filamente (FDM) | 119 $/100 g | Lehr-Demos | Leitfähigkeit (Faktor 100+ schlechter), Zuverlässigkeit |
| LDS/MID (LPKF-Laser + Galvanik) | Anlagenpark >500 k€ | Antennen-Massenproduktion | Kleinserien/Prototyping ohne Werkzeuge, Multi-Material |

**Positionierung:** Eos konkurriert nicht mit dem 2-$-Board, sondern mit **Wochen an Iterationszeit** und **nicht existierenden 3D-Fähigkeiten**. Der Pitch an das Labor: „Vom CAD zur funktionalen 3D-Schaltung am selben Tag — zum Preis eines Laborofens."

## 7. TAM / SAM / SOM

Bottom-up-Herleitung (Populationstabelle in `assumptions.md` §5, Segmentdetails in `customer-segments.md`):

| Ebene | Definition | Wert | Stufe |
|---|---|---|---|
| **TAM** | ~10.000 Kandidaten-Organisationen weltweit × 1,3 Maschinen × 65 k€ + Lifetime-Attach | **~1,2 Mrd. €** (10-Jahres-Potenzial); annualisiert ~85–120 M€/Jahr | B |
| **SAM** | EU + NA, erreichbare Segmente 2027–2031 (~4.200 Orgs) | **~340 M€** Ausstattungspotenzial; Jahresmarkt 2031: ~35–45 M€ | B |
| **SOM** (Base) | KRONOS kumuliert 5 Jahre: 452 Einheiten + Attach | **~34 M€ kumuliert**; Jahr-5-Umsatz ~15,6 M€ | B/D |

Szenarien-Spreizung und vollständiger Rechenweg: `../business-plan/business-plan.md` und `financial-model.xlsx`.

**Plausibilisierung gegen die Maschinenrealität:** SOM-Jahr-5 (200 Einheiten) entspricht ~30 % eines auf ~650 Einheiten/Jahr gewachsenen Bandes — vergleichbar mit Formlabs' Kategorie-Anteil im Benchtop-SLA, und weniger als LPKFs Position im subtraktiven Prototyping. Der Conservative Case (65 Einheiten Jahr 5) bleibt **innerhalb der heute beobachtbaren Nachfrage** und benötigt keinerlei Markterweiterung.
