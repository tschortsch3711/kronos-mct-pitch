# Business Plan: KRONOS Eos — Low-Cost-AME-Plattform (25.000–100.000 €)

> Kennzahlen-Kanon aus `financial-model.xlsx` (formelvalidiert). Evidenzstufen (A–D) und Annahmen: `../research/assumptions.md`.

## 1. Executive Summary

KRONOS Mechatronics (Nürnberg) besitzt die bewiesene Kerntechnologie des Pioniers der 5-Achs-3D-gedruckten Elektronik (Neotech-Assets, Aion-5X-Software, ±5 µm-Plattform) — verkauft sie aber bisher im Projektgeschäft der 200–400-k€-Klasse, an dem der Vorgänger insolvent wurde. Dieses Vorhaben produktisiert die Technologie in eine **modulare Plattform „KRONOS Eos" mit drei Konfigurationen (35 / 65 / 95 k€)** und besetzt damit das nachweislich leere Preisband für 5-Achs-AME unterhalb aller relevanten Beschaffungsschwellen.

- **Beachhead:** Forschungsgruppen & Institute (EU/NA) — kaufkräftig, tender-frei erreichbar, referenzbildend
- **Base Case:** 452 Einheiten kumuliert bis 2031, 16,0 M€ Umsatz, Break-even 2031, Kapitalbedarf brutto 13,2 M€
- **Upside (Marktschaffung):** 743 Einheiten, 29,1 M€ Umsatz, 23 % EBITDA-Marge, IRR ~48 %
- **Konservativ (= No-Go-Szenario):** ohne Band-Expansion bleibt das Geschäft defizitär → deshalb **tranchierte Finanzierung mit Kill-Kriterien**; maximal 2,5 M€ vor Serienfreigabe im Risiko

## 2. Produktstrategie

### 2.1 Plattform statt drei Maschinen

Die Analyse (Kostenstruktur, F&E-Budget, Serviceability) spricht klar für **eine modulare Plattform mit drei Konfigurationen** statt dreier Einzelentwicklungen:

- ein Grundchassis (kompakte 5-Achs-Kinematik, B&R-Steuerung, Kamera-/Vision-Grundausbau)
- Differenzierung über Werkzeugplätze, Achsfreischaltung (3+2 vs. simultan), Module (Plasma, Bestückung) und Software-Tier
- Vorteile: ein Ersatzteilstamm, eine Zertifizierungsbasis (CE/UL je Plattform statt je Modell), Upgrade-Pfad im Feld (Umsatz mit Bestand), F&E-Budget 3,2 M€ statt geschätzt 6–8 M€ für drei Einzelmaschinen (C)

### 2.2 Die drei Konfigurationen

| | **Eos One** | **Eos Five** (Beachhead) | **Eos Max** |
|---|---|---|---|
| **Listenpreis** | 35 k€ | 65 k€ | 95 k€ |
| **Zielgruppe** | HAW, Ausbildung, Top-FabLabs, Einstiegs-Labore | Forschungsgruppen, Institute, Corporate R&D | Defense/Space-Labs, Pilotfertigung, EMS |
| **Kinematik** | 3+2-Achs (indexiert) | **5-Achs simultan** | 5-Achs simultan |
| **Werkzeugplätze** | 1 (Mikrodispensing) + UV + FFF | 2 (Piezo-Jet + Dispensing) + UV + FFF | bis 4 mit Wechsler, inkl. Bestückmodul |
| **Präzision (Deposition)** | ±25 µm | ±15 µm | ±10 µm |
| **QC** | Kamera-Kalibrierung | KI-Vision-Inspektion | Closed-Loop-QC, Traceability-Paket |
| **Bewusst entfernt** (vs. Helios/Hyperion heute) | simultanes 5-Achs, Multi-Kopf, Plasma, Durchsatz | Großbauraum, Wechsler, Plasma (Option), photonisches Sintern | Durchsatz/Autonomie der Hyperion-Klasse, Reinraumoptionen |
| **Haupt-Use-Cases** | Lehre, einfache Sensorik, planare + 3+2-Prototypen | 3D-/Konform-Prototypen, Antennen, Sensorik, Publikationen | Kleinserie, qualifizierte Prototypen, Defense-Dokumentation |
| **Ziel-BOM (Skalierung)** | ~13 k€ | ~19 k€ | ~28 k€ |
| **Bruttomarge (reif)** | ~48 % | ~52 % | ~54 % |
| **Mix-Annahme** | 25 % | 55 % | 20 % |

**Kannibalisierungs-Fence gegenüber Helios/Hyperion (heute 200 k€+):** Bauraum, Durchsatz, Materialfreigaben, Autonomie und Produktionsintegration bleiben der Industrielinie vorbehalten; Eos Max ist bewusst als *Zubringer* (Upsell-Pfad) konstruiert — das Formlabs-Fuse-Muster gegenüber EOS, nicht das MakerBot-Muster.

### 2.3 Software & Ökosystem

- **Aion-5X Lite/Pro/Max** als Abo (1,8 k€/Jahr Ø, Attach 60 % Base) — bestehende Software, neue Tiers
- **offenes SDK** (bereits publiziert!) → Community-Plugins, Uni-Kooperationen, Ersatz des liquidierten J.A.M.E.S-Ökosystems
- **kuratierte Materialkits** (Silbertinte, Dielektrikum, 2 Polymere) mit qualifizierten Prozessprofilen — Einstiegshürde und Supportkosten sinken, Materialumsatz entsteht (5 k€/Maschine/Jahr Base)

## 3. Geschäftsmodell

| Erlösstrom | Mechanik | Base-Anteil 2031 |
|---|---|---|
| Maschinenverkauf | direkt (Beachhead) + 25 % Kanal ab 2028 (APES/NTV, 30 % Rabatt) | 74 % |
| Verbrauchsmaterial | kuratierte Kits, Abo-Option | 11 % |
| Service & Wartung | 11 % v. Liste p.a., 50 % Attach; Remote-Diagnose-first | 5 % |
| Software (Aion-5X) | Abo-Tiers | 3 % |
| Applikationsprojekte/NRE | PoC-Studien, Prozessintegration (heutiges KRONOS-Geschäft) | 7 % |

- **Wiederkehrender Umsatz 2031 (Base): 3,0 M€ = 19 %** des Umsatzes, steigend (Installed-Base-Effekt) — die Margenqualität des Geschäfts entscheidet sich hier (Sensitivität: Attach ±50 % → EBITDA 2031 ±1,5 M€).
- **Leasing/MaaS:** über Partner (GRENKE/DLL-Klasse), bilanzneutral; Referenzrahmen: BDL-Leasingquote 26,1 % (2024, A), Carbon-Subskriptionsmodell (📚). Eos Five ≈ 1,3–1,5 k€/Monat — OPEX-fähig für KMU.
- **Anzahlungslogik:** 30 % bei Bestellung (Maschinenbau-Standard) → Working Capital 12 % des Umsatzzuwachses (Modellannahme).

## 4. Go-to-Market

**Phase A — Beachhead (2027–2028): Forschung EU/NA, direkt**
Community-zentriert statt Vertriebsarmee: LOPEC/productronica/Formnext-Präsenz (Award-Rückenwind!), Applikations-Content, Paper-Referenzprogramm (Rabatt gegen Zitierbarkeit), Demo-Touren über FAPS/Fraunhofer-Netz. Inside Sales + 1–2 Application Engineers. CAC-Ziel 9 k€/Einheit.

**Phase B — Corporate R&D (2028–2029):** Referenz-getriebene Expansion (ZVEI/CLEPA/SPECTARIS-Segmente), Distributoren-Aktivierung (APES/NTV in NA, Ex-Neotech-Kanäle JP/AU), electronica/SMTconnect.

**Phase C — Defense/Ausbildung/Kleinserie (2029–2031):** Eos Max mit Traceability-Paket (US: über APES ins SBIR/NextFlex-Ökosystem), Eos One Curriculum-Bundle, erste Produktionszellen-Cluster als Hyperion-Zubringer.

## 5. Team & Organisation

| Jahr | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 |
|---|---|---|---|---|---|---|
| FTE (Base) | 8 | 13 | 19 | 26 | 32 | 38 |

Aufbau-Schwerpunkte: 2026/27 Produktisierung (Mechanik-Kostenoptimierung, DFM) + 1 Produktmanager; 2028 Serienproduktion (Auftragsfertigung Chassis, Endmontage Nürnberg) + Inside Sales; 2029+ Application Engineering & Channel Management. Kritisch: Retention der Software-Kernmannschaft (V5) und ein erfahrener COO/Head of Production (Neubesetzung).

## 6. Finanzplan (Kurzfassung — Details im XLSX)

### Base Case

| k€ | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 |
|---|---|---|---|---|---|---|
| Einheiten | — | 12 | 35 | 75 | 130 | 200 |
| Umsatz | 0 | 960 | 2.661 | 5.775 | 10.135 | 15.968 |
| Bruttomarge | — | 44 % | 43 % | 46 % | 48 % | 50 % |
| EBITDA | −1.260 | −2.022 | −1.943 | −1.822 | −843 | **+1.051** |
| Kum. Cash Flow | −1.460 | −4.148 | −6.745 | −9.391 | −11.257 | −11.456 |

- **Kapitalbedarf brutto: 13,2 M€** (max. Cash-Tal + 15 % Puffer); Deckung: ~10–11 M€ Equity (tranchiert) + 0,8 M€ Fördermittel + ~2 M€ Working-Capital-Linie ab Auftragsbestand
- **Break-even (EBITDA): 2031**; FCF-Wende 2032
- Kapital-Effizienz-Benchmark: XTPL benötigte ~15–18 M€ für 13 Einheiten/Jahr bei 170–220 k€ ASP (📚/A) — der Eos-Plan erreicht 200 Einheiten/Jahr, weil Kerntechnologie und Software bereits existieren

### Szenarienvergleich

| | Konservativ | Base | Upside |
|---|---|---|---|
| Einheiten kumuliert 2031 | 178 | 452 | 743 |
| Umsatz 2031 | 4,9 M€ | 16,0 M€ | 29,1 M€ |
| EBITDA 2031 | −0,9 M€ | +1,1 M€ | +6,8 M€ (23 %) |
| Break-even | **kein** | 2031 | 2030 |
| Kapitalbedarf brutto | 13,1 M€ | 13,2 M€ | 7,0 M€ |
| EV 2031 (Umsatz-Multiple) | 4,9 M€ (1,0x) | 31,9 M€ (2,0x) | 87,2 M€ (3,0x) |
| MOIC Jahr 5 / Jahr 7 | 0,23x / 0,30x | 1,33x / 2,25x | 6,3x / 11,4x |
| IRR (7 Jahre, tranchiert) | −18 % | +14 % | +48 % |

### Sensitivität (Base, Wirkung auf EBITDA 2031)

Dominante Treiber (Tornado im XLSX): **Stückzahlen** (±30 % → ∓/± ~1,9 M€), **Maschinen-COGS** (±5 pp → ∓/± ~0,7 M€), **Attach-Umsätze** (±50 % → ± ~1,5 M€), ASP (±15 % → ± ~1,9 M€ inkl. Mengeneffekt-frei), CAC (±50 % → ± ~0,6 M€). Der Case bricht bei ASP −15 % nicht zusammen; er stirbt bei ausbleibender Band-Expansion (= Konservativ).

## 7. Finanzierungsstruktur (Vorschlag)

| Tranche | Volumen | Zeitpunkt | Meilenstein davor (Kill-Kriterium) |
|---|---|---|---|
| **T1 „Validate"** | 2,5 M€ | Q4 2026 | — (Startkapital; deckt Gates 0–2) |
| **T2 „Industrialize"** | 4,5 M€ | Q4 2027 | ≥10 LOIs mit Budgetnachweis, BOM ≤26 k€ bestätigt, IP-Titel geklärt |
| **T3 „Scale"** | 4,0–5,0 M€ | Q1 2029 | ≥60 verkaufte Einheiten kumuliert, GM ≥42 %, Servicekosten <8 % Umsatz |
| Ergänzend | 0,8–3,3 M€ | laufend | ZIM/Bayern sicher beantragbar; EIC Accelerator als Upside |

**Maximal im Risiko vor Serienfreigabe: 2,5 M€.** Scheitert Gate 2, bleibt KRONOS ein kleines Projektgeschäft mit Aion-5X-Lizenzoption — geordneter Rückzug statt Totalverlust.

## 8. Risiken & Gegenmaßnahmen

| Risiko | Schwere | Wahrsch. | Gegenmaßnahme |
|---|---|---|---|
| **Nachfrage bleibt Nische** (Konservativ-Pfad) | hoch | mittel | Tranchen + Kill-Kriterien; LOI-Gate vor Industrialisierung; NOVA-Absatz-Verifikation (V2) |
| **BOM-Ziel verfehlt** (kein 5-Achs <100 k€ machbar) | hoch | mittel | Redesign-Studie in T1; Rückfallebene: Eos Five zu 79 k€ (Sensitivität zeigt Tragfähigkeit) |
| **IP-Titel unklar** (Neotech-Patente) | hoch | niedrig–mittel | DPMA/EPO-Prüfung vor T1-Closing; ggf. Nachlizenzierung aus Insolvenzmasse |
| **Key-Person-Risiko** (5–6-Personen-Team, SW-Kern) | hoch | mittel | Vesting/Retention vor Closing (V5); SDK-Dokumentation reduziert Bus-Faktor |
| Kannibalisierung Helios/Hyperion | mittel | mittel | Capability-Fencing (§2.2); Eos Max als Zubringer gemessen an Upsell-Quote |
| Qualität/Marke (v1.0-Feldprobleme) | mittel | mittel | Pilotflotte vor Serienfreigabe (Gate 3); Remote-Diagnose ab Werk; konservative Spezifikation |
| Servicekosten fressen Marge (MakerBot-Muster) | mittel | mittel | Zielgröße <8 % Umsatz; modulare Tauschteile; Preisband bewusst ≥25 k€ |
| Wettbewerbsreaktion Voltera (NOVA + Rotationsachsen) | mittel | mittel | 12–24 Monate Software-Vorsprung nutzen; Tempo (Bambu-Lehre); Patent-/Prozess-IP prüfen |
| China-Entrant im Band | hoch | mittel (3–5 J.) | Ökosystem-Lock-in (Materialkits, SDK, Community), EU/US-Defense-Kanäle, Zertifizierungen |
| Silberpreis/Tintenkosten | niedrig | hoch | Multi-Sourcing, Cu-Tinten-Roadmap beobachten; Materialkosten sind Kundenaufwand, nicht COGS |
| Preiselastizität überschätzt | hoch | mittel | Demand-Test (Gate 1) mit echter Preisliste; Konfigurator-Analytics |
| Supply Chain (B&R, Linearachsen) | niedrig | mittel | Dual-Sourcing-Strategie in DFM-Phase; Standardkomponenten-Politik |

## 9. Validation Plan (Stage-Gate, Kapital-schonend)

| Gate | Zeitraum | Aktivität | Erfolgskriterium (sonst STOP) | Kosten kum. |
|---|---|---|---|---|
| **0 — Discovery** | M1–M3 | 40 strukturierte Interviews (S1/S2/S3), Preis-Sensitivität nach Van-Westendorp | ≥30 % artikulieren budgetgedeckten Bedarf ≤100 k€ | 0,1 M€ |
| **1 — Demand Test** | M3–M6 | Landing Page + Konfigurator, LOPEC/productronica-Leads, LOI-Kampagne | ≥25 qualifizierte Leads, **≥10 LOIs** (davon ≥3 mit Anzahlungsbereitschaft) | 0,3 M€ |
| **2 — Konzept & Kosten** | M4–M9 | DFM-Redesign-Studie, BOM-Verifikation, IP-Klärung, 1 Funktionsprototyp | BOM Eos Five ≤26 k€; IP-Titel geklärt; Prototyp druckt Referenz-Testcase | 1,0 M€ |
| **3 — Design Partner** | M9–M15 | 5 zahlende Design-Partner (Pilotpreis 35–45 k€, Rückgaberecht) | ≥4 von 5 nehmen ab; Servicekosten <10 %; ≥2 zitierfähige Use Cases | 2,0 M€ |
| **4 — Pilotflotte & Pre-Orders** | M15–M22 | 10 Pilotmaschinen, Pre-Order-Buch, UL/CE-Abschluss | ≥30 Pre-Orders; Feldausfallrate <5 %/Quartal | 2,5 M€ → T2 |
| **5 — Serienfreigabe** | M22–M27 | Serienanlauf (Auftragsfertigung + Endmontage Nürnberg) | Stückkosten im Plan; Liefertreue >90 % | T2-Budget |

**Prinzip: So wenig Kapital wie möglich vor Validierung der kritischsten Annahmen** (V1–V7 in `../research/assumptions.md` §6). Jedes Gate hat ein explizites STOP-Szenario mit definiertem Restwert (Technologie-Lizenzierung, Projektgeschäft, Aion-5X als Standalone-Software).
