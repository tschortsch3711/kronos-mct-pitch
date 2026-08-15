# Zentrale Annahmen (Single Source of Truth)

Dieses Dokument ist die verbindliche Annahmenbasis für alle Deliverables (Research Report, Finanzmodell, Investor Deck, Website). Jede Annahme trägt eine Evidenzstufe:

| Stufe | Bedeutung |
|---|---|
| **A — Verifiziert** | Live-recherchierte Quelle mit URL (siehe `sources.md`) |
| **B — Belegte Schätzung** | Aus verifizierten Datenpunkten abgeleitet, Rechenweg dokumentiert |
| **C — Branchen-Benchmark** | Übliche Industrie-Heuristik, nicht projektspezifisch verifiziert |
| **D — Arbeitshypothese** | Muss vor einem Investment validiert werden (siehe Validation Plan) |

> **Grundprinzip: Substanz vor Optimismus.** Wo Quellenlage und Schätzung kollidieren, gewinnt die konservativere Zahl. Alle D-Annahmen sind explizite Validierungsziele des Stage-Gate-Plans.

---

## 1. Unternehmen KRONOS

| # | Annahme | Wert | Stufe | Quelle/Herleitung |
|---|---|---|---|---|
| U1 | Rechtsform, Sitz | KRONOS Mechatronics GmbH, HRB 43784 Nürnberg, gegründet Ende 2024 | A | Handelsregister via CompanyHouse |
| U2 | Stammkapital | 50.000 € (nach Erhöhung 12/2024) | A | Registerdaten |
| U3 | Technologiebasis | Asset-Übernahme Neotech AMT (5-Achs-AME-Pionier seit 2009, Insolvenz IN 771/24) | A | VoxelMatters, Insolvenzbekanntmachung |
| U4 | Produkte heute | Helios (kompakt, 5-Achs), Hyperion (industriell), Aion-5X CAD/CAM | A | kronos-mct.com, GitHub-Repos, APES-PR |
| U5 | Team (verifizierbarer Boden) | ≥ 5–6 Personen (Dickerboom, Ahlers, Werner, Wasserfall, Gessner) | A | Register, LinkedIn, GitHub-Commits |
| U6 | Heutiger Preispunkt Helios/Hyperion-Klasse | ~200.000–400.000 € (Anker: Neotech 15X BT „ab $215.000/€200.000“) | B | Aniwaa-Listung des Vorgängersystems; KRONOS selbst quote-only |
| U7 | Verkaufte Einheiten seit Relaunch | **Nicht verifizierbar; als 0–niedrig einstelligen anzunehmen** | D | Keine Kundenmeldung auffindbar (Stand 08/2026); indirekte Feldsignale (Slicer-Profile 1.0→1.1) |
| U8 | Patente/IP aus Neotech-Insolvenz | Übergang an KRONOS **unbestätigt** | D | DPMA/Espacenet nicht prüfbar in dieser Session — Top-Diligence-Punkt |
| U9 | Externe Finanzierung | Keine VC-Runde auffindbar; EU-PIC vorhanden | A/B | Tracxn, EU Funding & Tenders Portal |

## 2. Markt (heute beobachtbar)

| # | Annahme | Wert | Stufe | Quelle/Herleitung |
|---|---|---|---|---|
| M1 | Professioneller AME-Maschinenmarkt (Einheiten) | ~45–70 Einheiten/Jahr weltweit | B | Bottom-up: Optomec ~15–20 + XTPL ~10–13 + nScrypt ~5–10 + Ceradrop ~2–4 + Notion ~3–5 + Rest |
| M2 | Professioneller AME-Maschinenmarkt (Umsatz) | ~12–22 M€/Jahr Hardware | B | M1 × blended ASP 200–350 k€ |
| M3 | Gesamtes AME-Band inkl. Desktop | ~100–190 Einheiten/Jahr; 15–28 M€/Jahr | B | M1 + Voltera-NOVA-Schätzung + Kleinanbieter |
| M4 | 3D-Elektronik-Gesamtmarkt (Geräte+Material+Teile) | ~4,3 Mrd. $ bis 2034 (IDTechEx); generalistische Studien 14–90 Mrd. $ gelten als Obergrenzen mit breiterem Scope | A | IDTechEx „3D Electronics/Additive Electronics 2024–2034“ |
| M5 | Printed Electronics (Dach-Markt) | 17–19 Mrd. $ (2024/25), CAGR 15–23 % | A | MarketsandMarkets, Grand View Research |
| M6 | Leitfähige Tinten | ~3,7 Mrd. $ → >6,5 Mrd. $ (2034) | A | IDTechEx Conductive Inks |
| M7 | Preisband-Lücke | Kein 5-Achs-/Konform-AME-System unter ~150 k€; Band 25–100 k€ nur planar besetzt (Voltera NOVA ~46 k$, Fujifilm Dimatix ~50–60 k$) | B | Preisrecherche über alle Anbieter (Dossiers) |
| M8 | Nachfrage-Evidenz im Band | Voltera: >5.000 Einheiten kumuliert (V-One, ~5 k$); NOVA geschätzt 40–90 Einheiten/Jahr | A / D | Voltera-Angaben (A); NOVA-Stückzahl = Triangulation (D — wichtigster Validierungspunkt) |
| M9 | Subtraktiver Anker im Band | LPKF ProtoMat: „Tausende“ installiert; LPKF Development-Segment 26,2 M€ Umsatz (2024), 29,0 M€ (2023) | A | LPKF Geschäftsbericht/Presse 2024 |
| M10 | Marktführer-Exit | Nano Dimension verkauft DragonFly-Geschäft 04/2026 für 2 M$ + 10,5 M$ Earnout an Inspira | A | 3DPrint.com, Techtime |
| M11 | Defense-Treiber | US-DoD-AM-Ausgaben 300 M$ (2023) → 800 M$ (2024) → ~2,6 Mrd. $ (2030e) | A | 3Dnatives/DoD-Berichterstattung |
| M12 | Beschaffungsschwellen | DFG-Großgeräte ab 200 k€ (Uni) / 100 k€ (HAW); EU-Tender ab 221 k€; DE-Direktauftrag (Bund) bis 100 k€ seit Reform 2025; NSF MRI min. 100 k$ | A | DFG, EU-Kommission, Vergaberechtsreform 2025, NSF |
| M13 | Preiselastizität (Analogie) | ~10x Preissenkung → historisch 50–100x Einheiten, aber nur 2–4x Dollar-TAM (3D-Druck-Historie); konservativ nutzen wir 5–7x Band-Expansion bis 2031 | C | Wohlers/CONTEXT-Muster; Formlabs 130.000+ Drucker (A) |

## 3. Produktplattform „KRONOS Eos“ (Konzept dieser Studie)

| # | Annahme | Wert | Stufe | Herleitung |
|---|---|---|---|---|
| P1 | Strategie | **Eine modulare Plattform, drei Konfigurationen** (statt drei Einzelmaschinen) | B | Modularität ist Kern der KRONOS-Architektur; senkt Entwicklungs- & Fertigungskosten |
| P2 | Eos One (Einstieg) | 35 k€ Listenpreis; 3+2-Achs indexiert, 1 Druckkopf (Mikrodispensing) + UV, FFF, Kamera-Kalibrierung, Aion-5X Lite | D | Preispunkt unter HAW-Großgeräteschwelle (100 k€) und im Fakultäts-Startpaket-Rahmen |
| P3 | Eos Five (Beachhead) | 65 k€; 5-Achs simultan, 2 Werkzeugköpfe (Piezo-Jet + Dispens), KI-Vision-QC | D | Einziges 5-Achs-System <100 k€ im Markt (M7) |
| P4 | Eos Max | 95 k€; Werkzeugwechsler (bis 4 Köpfe inkl. Bestückung), Plasma, Kleinserien-tauglich | D | Brücke zu Hyperion; unter allen Tender-Schwellen |
| P5 | Blended ASP | 58 k€ (Jahr 1) → 62 k€ (Jahr 5, Mix-Shift zu Five/Max) | B | Mix-Annahme 25/55/20 % |
| P6 | Ziel-BOM Eos Five | ~24 k€ zum Start → ~19 k€ bei Skalierung | C/D | 3–5x BOM-zu-Preis-Heuristik; muss im Redesign validiert werden |
| P7 | Abgrenzung nach oben (Kannibalisierung) | Bauraum, Durchsatz, Materialfreigaben, Automatisierung bleiben Helios/Hyperion vorbehalten | B | Capability-Fencing analog Formlabs Fuse vs. EOS |

## 4. Unit Economics & Finanzmodell

| # | Annahme | Konservativ | Base | Upside | Stufe | Herleitung |
|---|---|---|---|---|---|---|
| F1 | Einheiten Jahr 1 (2027) | 8 | 12 | 18 | D | Pilot-/Design-Partner-Phase |
| F2 | Einheiten Jahr 5 (2031) | 65 | 200 | 330 | D | Kons. = reine Bestandsnachfrage (M3); Base = Band-Expansion 5–7x (M13); Upside = Marktschaffung (Produktion/IME/Defense) |
| F3 | COGS-Quote Maschinen | 60 % → 52 % | 58 % → 48 % | 56 % → 45 % | C | Comps: Stratasys ~48 % GM, Markforged ~47–50 %, LPKF Materialquote |
| F4 | Verbrauchsmaterial-Attach | 3 k€/Maschine/Jahr | 5 k€ | 8 k€ | C/D | Tinten/Pasten-Preise (NovaCentrix small-lot 250–3.750 $/Einheit); akademische Nutzung niedriger als industrielle |
| F5 | Service-Attach | 40 % der Basis × 10 % v. Listenpreis | 50 % × 11 % | 60 % × 12 % | C | Industriestandard 10–15 % p.a. |
| F6 | Software-Abo (Aion-5X) | 1,2 k€/Jahr, 50 % Attach | 1,8 k€, 60 % | 2,4 k€, 70 % | C/D | Benchmarks Eiger/Digital Factory 0,3–3 k$ |
| F7 | Bruttomarge Verbrauchsmaterial | 55 % | 60 % | 65 % | C | Comps Materialgeschäft 55–75 % |
| F8 | Entwicklungsaufwand bis Serie | 3,8 M€ | 3,2 M€ | 2,8 M€ | B/C | Plattform-Derivat aus existierender Helios-Technik (kein Neuaufbau); Comps: Scrona ~10 M$, Quantica ~14 M€, XTPL ~15–18 M€ — KRONOS startet mit fertiger Kerntechnologie |
| F9 | Zertifizierung | CE 80 k€ + UL/NRTL 70 k€ | dito | dito | C | TÜV/UL-Rahmenwerte |
| F10 | Vertriebskanal | 60 % direkt / 40 % Distributor (30 % Rabatt) ab Jahr 2 | dito | dito | C | APES/NTV-Kanal existiert (A) |
| F11 | CAC direkt | 12 k€/Maschine | 9 k€ | 7 k€ | C | 10–20 % vom ASP; Messe-zentriert (LOPEC/productronica) |
| F12 | Personal (FTE) | J1: 12 → J5: 30 | J1: 14 → J5: 46 | J1: 16 → J5: 58 | B | Vollkosten 95 k€/FTE Ø (Nürnberg) |
| F13 | Kapitalbedarf brutto (max. Cash-Tal +15 % Puffer) | **13,1 M€** (kein Break-even im Modellzeitraum) | **13,2 M€** (Break-even 2031); Deckung: ~10–11 M€ Equity + 0,8 M€ Grants + ~2 M€ WC-Linie | **7,0 M€** (Break-even 2030; inkl. 3,3 M€ Grants) | B | Modellergebnis (validiert per Formel-Neuberechnung); Details im XLSX |
| F14 | Fördermittel-Potenzial | 0,25 M€ (ZIM) | 0,8 M€ (ZIM + Bayern) | 3,3 M€ (inkl. EIC Accelerator 2,5 M€ Grant) | C | Programmkonditionen (A für Konditionen, D für Bewilligung) |
| F15 | Exit-Multiple (Jahr 5+) | 1,0x Umsatz | 2,0x | 3,0x | C | Niche-Hardware-Comps: Markforged-Exit ~1,2x; wachsende Razor-Blade-Geschäfte 2–4x |
| F16 | Leasing-Anteil der Verkäufe | 15 % | 25 % | 35 % | C | BDL-Mobilien-Leasingquote 26,1 % (2024) (A); über Leasingpartner, bilanzneutral |
| F17 | Inflation/Preissteigerung | In realen Preisen gerechnet, keine Indexierung | dito | dito | C | Vereinfachung, konservativ bei ASP |
| F18 | Wechselkurs | 1 € = 1,10 $ (konstant) | dito | dito | C | Vereinfachung |

## 5. TAM / SAM / SOM (Bottom-up-Population)

| Segment | Organisationen weltweit | Quelle/Stufe | Relevanzfaktor | TAM-Population |
|---|---|---|---|---|
| Forschungsaktive EE-/Material-Fachbereiche | ~950–1.000 Unis | A (Research.com: 963) | 1,5 Labore/Uni × 100 % | ~1.450 |
| Forschungsinstitute/RTOs (Fraunhofer 76, global) | ~700 | A/B | 100 % | ~700 |
| Corporate-R&D-Labore Elektronik/Automotive/Medtech/A&D | siehe `customer-segments.md` | A (Verbandszahlen) × Relevanzfilter | 3–15 % je Segment | ~5.400 |
| Defense-/Space-Labs, nationale Labore | 39 FFRDCs + global | A/B | 100 % | ~400 |
| EMS-/PCB-Prototyping-Dienstleister | 2.160 EMS (EU) + 2.500 PCB-Fabs | A | 15 % | ~700 |
| HAW/Colleges/Top-FabLabs | 209 HAW (DE) + global | A/B | Auswahl | ~1.350 |
| **TAM-Population gesamt** | | | | **~10.000 Organisationen** |

- **TAM (10-Jahres-Ausstattungspotenzial):** ~10.000 Orgs × 1,3 Maschinen × 65 k€ ≈ **0,85 Mrd. € Equipment** (+ ~0,35 Mrd. € Lifetime-Attach ≈ 1,2 Mrd. € gesamt). Stufe B.
- **SAM (EU + Nordamerika, erreichbare Segmente, 2027–2031):** ~4.200 Orgs ≈ **340 M€** Equipment-Potenzial; als Jahresmarkt 2031: ~35–45 M€ (impliziert Band-Reife bei 550–700 Einheiten/Jahr — 5–7x heutiges Band, M13). Stufe B.
- **SOM (KRONOS, kumuliert 5 Jahre, Base):** 452 Einheiten ≈ 26 M€ Maschinenumsatz + 8 M€ Attach ≈ **34 M€ kumuliert**; Marktanteil im Band 2031 ~30 %. Stufe B/D.

## 6. Kritische Validierungsannahmen (vor Investment zu prüfen)

1. **V1 (Nachfrage):** ≥ 10 belastbare LOIs mit Budgetbestätigung in 6 Monaten (Beachhead-Segmente). — härtestes Gate
2. **V2 (NOVA-Proxy):** Voltera-NOVA-Absatz real ≥ 40 Einheiten/Jahr (Primärrecherche/Interviews). Liegt er < 30, ist die Band-These geschwächt → Conservative Case als Planungsbasis.
3. **V3 (Kosten):** Redesign-Studie bestätigt BOM ≤ 26 k€ für Eos Five bei Ziel-Spezifikation.
4. **V4 (IP):** Chain of Title der Neotech-Patente (insb. Massenproduktions-Plattform) liegt nachweislich bei KRONOS oder ist lizenziert.
5. **V5 (Team):** Schlüsselpersonen (SW-Stack: Wasserfall, Ahlers) vertraglich gebunden (Vesting/Retention).
6. **V6 (Service):** Servicekosten-Modell < 8 % vom Umsatz durch Remote-Diagnose + modulare Tauschteile (Pilotphase messen).
7. **V7 (Referenz):** ≥ 3 zitierfähige Anwendungs-Referenzen (Paper/Use Case) aus Pilotmaschinen binnen 12 Monaten.

---

*Stand: 15.08.2026. Recherche-Rohdaten mit sämtlichen Quellen-URLs: `research/appendix/`.*
