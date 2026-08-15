# Company & Technology Analysis: KRONOS Mechatronics GmbH

> Evidenzstufen (A–D) gemäß `assumptions.md`. Quellen-URLs in `sources.md` und `appendix/dossier-company.md`.

## 1. Unternehmensprofil

| | |
|---|---|
| **Firma** | KRONOS Mechatronics GmbH („Kronos-MCT") |
| **Sitz** | Fürther Straße 246c, 90429 Nürnberg (nkubator-Gründerzentrum „Auf AEG") |
| **Register** | HRB 43784, Amtsgericht Nürnberg; gegründet Ende 2024 (A) |
| **Stammkapital** | 50.000 € nach Erhöhung um 20.000 € (Beschluss 19.12.2024) (A) |
| **Geschäftsführung** | Jörg Dickerboom (Gründer/CEO, alleinvertretungsberechtigt seit 22.11.2024); zwei Gesellschafter (A) |
| **Zweck** | Vermarktung, Entwicklung und Herstellung von Maschinen und Software für gedruckte Elektronik (additive Fertigung) sowie Dienstleistungen für mechatronische Produkte (A) |
| **Claim** | „Printing the future in every dimension" |
| **Team (verifizierbarer Boden)** | ≥ 5–6 Personen: Dickerboom (CEO), Daniel Ahlers (Software, Uni-Hamburg-Forschung zu nonplanarem Slicing/5-Achs-Kalibrierung/CNN-Inspektion), Stefan Werner (FAU), Florens Wasserfall (CAM/Aion-5X; 13 Jahre öffentliche 3D-PE-Software-Historie), David Gessner (Applikation/Prozess) (A via Register, LinkedIn, GitHub-Commits) |
| **Finanzierung** | Keine VC-Runde auffindbar; EU-PIC registriert, keine bewilligten Projekte verifiziert (A/B) |

### Die entscheidende Herkunftsgeschichte: der Neotech-Phoenix

KRONOS ist kein gewöhnliches Start-up, sondern die **Wiedergeburt des Pioniers der 5-Achs-3D-gedruckten Elektronik**:

- **Neotech AMT GmbH** (Nürnberg, gegründet 2011 von Dr. Martin Hedges) entwickelte die Technologie ab 2009, installierte **2010 das weltweit erste 5-Achs-System für 3D-gedruckte Elektronik**, baute die patentierte 45X-Massenproduktionsplattform (2012) und lieferte 2013 die erste kommerzielle Serienanlage. Referenz: Massenproduktion gedruckter 3D-Antennen mit „Millionen Teilen pro Jahr" (Mobiltelefone). (A)
- Produktlinie: PJ 15X (Desktop-Prototyping), 15XSA (+SMD-Bestückung), 45X G4 (Massenproduktion), LBS 45XE (photonisches Sintern). Preisanker: 15X BT „ab $215.000 / €200.000". (A)
- **Insolvenz 2024**: vorläufige Verwaltung 02.07.2024, Eröffnung 01.09.2024 (AG Nürnberg, IN 771/24). (A)
- **KRONOS übernahm 2024 die Assets** und relaunchte Helios und Hyperion in überarbeiteter Form; der US-Kanal (APES, seit 2022 Neotech-Partner) wurde nahtlos fortgeführt. (A)

**Bedeutung für den Investment Case:** KRONOS startet mit ~15 Jahren Technologievorsprung zu Distressed-Asset-Kosten — aber der direkte Vorgänger ist **an genau diesem Markt mit einem 200-k€+-Preismodell gescheitert**. Beides gehört in jede ehrliche Bewertung: Die Technologie ist bewiesen, das bisherige Geschäftsmodell nicht.

### Traktion seit Relaunch (Stand 08/2026)

| Signal | Datum | Evidenz |
|---|---|---|
| APES-Partnerschaft Nordamerika (Vertrieb Helios/Hyperion, Adoption Aion-5X) | 04/2025 (RAPID+TCT) | A |
| Aufnahme nkubator Nürnberg | ~03/2025 | A |
| productronica-2025-Aussteller | 11/2025 | A |
| **LOPEC 2026 Start-up Award „Best Business Potential"** | 02/2026 | A |
| IME-Positionierung (Automotive) neben TactoTek u.a. | 05/2026 | A |
| GitHub: aktive Engineering-Aktivität, Helios 1.0 → 1.1 Hardware-Iteration, öffentliches Aion-5X-SDK | 10/2025–06/2026 | A |
| US-Distributor NTV USA | laufend | A |
| **Verifizierte Verkäufe/Installationen seit Relaunch** | **keine auffindbar** | D — zentraler Diligence-Punkt |

## 2. Technologie-Analyse

### 2.1 Der Stack

**Prozessmodule (modular kombinierbar):** Piezo-Jetting, Inkjet, Aerosol-Deposition, Mikrodispensing, FFF (Polymer-Strukturdruck), Wire Encapsulation; Nachbearbeitung: Plasmareinigung, UV-Härtung, CNC-Fräsen; SMD-Pick-and-Place-Integration. (A)

**Maschinenbasis:** 5-Achs-Kinematik mit Linearmotoren und -encodern, **±5 µm Genauigkeit** bei Verfahrgeschwindigkeiten bis <1 m/s; B&R-Industriesteuerung (aus GitHub-Profilen verifiziert: G-Code-Dialekt mit `SET_TEMPERATURE[]`, `TOOLID[]`, Multi-Tool-Verwaltung). Helios: kompakter Bauraum (verifiziert aus Slicer-Profilen: runde Platte Ø 100 mm, Z 150 mm — Konfigurationsabhängig). (A)

**Software — der eigentliche Burggraben:**
- **Aion-5X** CAD/CAM: 5-Achs-simultane und 3+2-indexierte Bahnplanung, Kollisionssimulation, ISO-G-Code-Postprozessoren; **öffentliches C++-SDK mit Plugin-Architektur** (dokumentiert auf documentation.kronos-mct.com) — auch für Fremdmaschinen lizenzierbar (APES nutzt es für seine Matrix6D-Plattform). (A)
- KI-gestützte Bildverarbeitung für Kalibrierung und Qualitätskontrolle; Forschungsbasis des Teams (CNN-basierte In-situ-Inspektion gedruckter Elektronik, nonplanares Slicing — Publikationshistorie Ahlers/Wasserfall). (A)
- Pragmatische Toolchain: PrusaSlicer-Profile für den Polymeranteil (offen, kostenlos) statt proprietärer Gesamt-Suite. (A)

**Materialien:** Nanopartikel-Silbertinten bis hochviskose Pasten (breites Viskositätsfenster durch Multi-Prozess-Ansatz); Substrate von Folien bis 3D-Spritzgussteilen. (A)

### 2.2 Was ist der technologische Kern — und was muss eine Low-Cost-Maschine zwingend behalten?

Der differenzierende Kern ist **nicht** ein einzelner Druckprozess (Dispenser, Inkjet-Köpfe und UV-Quellen sind zukaufbar), sondern die **Systemintegration**:

1. **5-Achs-Bahnplanung + Kalibrierung auf 3D-Oberflächen** (Aion-5X + Kamerakalibrierung) — das können weltweit nur eine Handvoll Anbieter; **muss vollständig erhalten bleiben.**
2. **Multi-Material-/Multi-Prozess-Koordination in einem Arbeitsraum** (Leiterbahn + Dielektrikum + Struktur + Bestückung) — **im Kern erhalten**, aber auf 2 Werkzeugplätze reduzierbar.
3. **Präzision dort, wo Elektronik sie braucht** (Wiederholgenauigkeit der Deposition, Registrierung zwischen Lagen) — **erhalten**, aber ±5 µm ist für viele Ziel-Use-Cases überspezifiziert; ±15–25 µm genügt für Leiterbahnen ≥100–200 µm (Sensorik, Antennen, Heizstrukturen, Prototypen). Das ist der größte einzelne Kostenhebel.
4. **Vision-basierte QC** — erhalten als Software-Feature (Kamera ist billig, Algorithmik existiert).

### 2.3 Kostentreiber heutiger Maschinen und Reduktionshebel

Heutige AME-Systeme der 200–400-k€-Klasse tragen typischerweise folgende Kostenblöcke (C — Branchenanalyse, plausibilisiert an Specs der 15X/45X-Klasse):

| Kostentreiber heute | Low-Cost-Hebel | Wirkung |
|---|---|---|
| Granit-/Polymerbeton-Maschinenbett, große Portale | Kompakter Stahl-/Mineralgussrahmen, kleiner Arbeitsraum (~Ø100–200 mm statt 300+) | Struktur & Logistikkosten −50–70 % |
| Linearmotoren + Glasmaßstäbe auf allen Achsen (±5 µm dynamisch) | Servo-Kugelgewinde/Schrittmotoren mit Encodern auf Nebenachsen; Präzision nur in der Deposition-Ebene; Software-Kompensation (vorhandene Kalibrier-IP!) | Antriebskosten −40–60 % bei ±15–25 µm |
| 4–6 Werkzeugstationen inkl. automatischem Wechsler | 1–2 feste Werkzeugplätze (Eos One/Five), Wechsler nur im Top-Modell | Mechatronik −30–50 % |
| Voll-SMT-Bestückkopf mit Feeder-Bank | Vision-geführte manuelle/halbautomatische Bestückung; Feeder als Option | −20–40 k€ |
| Industrielle Einhausung, Reinraum-Optionen, Abluft | Laborgerät-Klasse (Tischgerät/kleiner Standfuß), Standard-Filtereinheit | −15–30 k€ |
| Photonisches Sintern (LBS) | UV-LED + IR-Modul; photonisch nur als Option/Upgrade | −30–60 k€ |
| Kundenspezifische Projektintegration (NRE in jedem Verkauf) | **Produktisierung**: 3 feste Konfigurationen, Optionsliste, Self-Service-Installation (Video + Remote-Onboarding) | Vertriebs-/Applikationskosten pro Einheit −60 %+ |
| Proprietäre Gesamt-Software-Suite | Aion-5X Lite als Abo; offene Slicer für Strukturdruck (bereits Praxis) | Entwicklungskosten geteilt mit Bestandsprodukten |
| Materialvielfalt (jede Tinte qualifiziert) | Kuratiertes Startportfolio: 1 Silbertinte, 1 Dielektrikum, 2 Polymere; Rest „experimental mode" | Applikations-/Supportkosten −50 % |

**Vorsichtige Gesamtaussage (B/C):** Ein BOM von ~24 k€ für eine 5-Achs-Konfiguration (Eos Five, Ziel-ASP 65 k€) erscheint erreichbar, weil (a) die teuerste Komponente — die Software — bereits existiert und grenzkostenfrei skaliert, (b) B&R-Steuerung + kompakte 5-Achs-Kinematik in Laborgeräteklasse heute deutlich günstiger beschaffbar sind als 2015, und (c) KRONOS die Neotech-Konstruktionshistorie besitzt und Fehlentwicklungen vermeiden kann. **Diese BOM-These ist Arbeitshypothese (D) und Gate 3 des Validierungsplans.**

### 2.4 Eintrittsbarrieren

- **Software/Algorithmik:** 5-Achs-CAM für Deposition + Kalibrierung + Inspektion = mehrjähriger Vorsprung; öffentlich dokumentierte Forschungstiefe des Teams. (A)
- **Prozess-Know-how:** Tinten-Substrat-Prozess-Fenster (Viskositäten, Sinterprofile) aus 15 Jahren Neotech-Anwendungsprojekten. (B)
- **Patente:** 45X-Massenproduktionsplattform war patentiert; **Chain of Title nach Insolvenz ungeklärt (D) — Muss-Prüfpunkt der Due Diligence.**
- **Referenz-Ökosystem:** FAPS/FAU-Cluster Nürnberg, OE-A/LOPEC-Sichtbarkeit, US-Kanal. (A)

## 3. Positionierung heute und strategische Lücke

KRONOS verkauft heute (wie Neotech zuvor) **High-End-Projektmaschinen in ein enges Forschungs- und Industrienischen-Segment** (200–400 k€-Klasse, quote-only, applikationsintensiv). Genau dieses Modell hat Neotech nicht getragen: ~45–50 Systeme in ~20 Jahren (📚-Schätzung), Insolvenz 2024. Gleichzeitig belegen LPKF (ProtoMat: „Tausende" installierte Systeme; Development-Segment 26,2 M€ Umsatz 2024) und Voltera (>5.000 Einheiten), dass **Elektronik-Prototyping-Maschinen im Band 5–100 k€ in Stückzahlen kaufbar sind** — und Nano Dimensions Exit (04/2026) hat das obere AME-Segment führungslos gemacht.

Die strategische Frage dieses Projekts ist daher präzise: **Kann KRONOS seine bewiesene 5-Achs-Technologie in ein produktisiertes 25–100-k€-Gerät übersetzen und damit das Preisband besetzen, in dem Beschaffung leicht ist und der Wettbewerb fehlt — ohne am dünnen Ist-Markt zu scheitern wie die Vorgänger?**

→ Beantwortet in `market-analysis.md`, `customer-segments.md` und `../business-plan/investment-thesis.md`.
