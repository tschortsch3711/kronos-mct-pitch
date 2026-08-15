# Customer Segmentation & Opportunity Mapping

> Leitfrage: **Wer würde KRONOS kaufen, wenn die Maschine 25.000–100.000 € kostet?** Evidenzstufen (A–D) gemäß `assumptions.md`.

## 1. Segmentierung mit Populationsgrößen

| # | Segment | Population (Quelle, A sofern nicht markiert) | Relevanzfilter | Adressierbare Orgs |
|---|---|---|---|---|
| S1 | **Universitäre Forschung** (EE/Materialwissenschaft/Mechatronik) | 963 forschungsaktive EE-Unis (Research.com); 20–25 T Hochschulen gesamt | Forschungsaktiv, Drittmittel | ~1.450 Labore |
| S2 | **Forschungsinstitute/RTOs** | 76 Fraunhofer (3,6 Mrd. € Budget); global ~600–700 RTOs (B) | Elektronik-/Materialbezug | ~700 |
| S3 | **Corporate R&D Elektronik-OEMs** | ZVEI 1.100+ (DE); EU/NA/Asien ~6.000 (B) | mit HW-Prototyping-Labs (~30 %) | ~1.800 |
| S4 | **Automotive-Zulieferer** (Smart Surfaces, IME, Sensorik, Antennen) | CLEPA 3.000+ (EU); 13.274 Zulieferer-Betriebe DE | Elektronik-R&D (~20 %) | ~1.100 |
| S5 | **Medizintechnik** (Wearables, Sensorik, Point-of-Care) | >38.000 Firmen EU (90 % KMU, MedTech Europe); AdvaMed 600+ | aktive Elektronik-Entwicklung (~5 %) | ~1.900 |
| S6 | **Aerospace & Defense** | ASD 4.000+ (EU); 39 US-FFRDCs; >10.000 Space-Firmen | R&D-Sites mit Elektronikfertigungsbedarf (~12 %) | ~900 |
| S7 | **EMS-/PCB-Prototyping-Dienstleister** | 2.160 EMS (EU, in4ma); ~2.500 PCB-Fabs weltweit | Quick-Turn-/Advanced-Angebote (~15 %) | ~700 |
| S8 | **HAW/Colleges/Ausbildung** | 209 HAW (DE); 431 US-Engineering-Institutionen; 354 Eng.-Tech-Colleges | Elektronik-Curricula | ~1.100 |
| S9 | **Top-FabLabs/Makerspaces** | 2.500+ FabLabs weltweit (Fab Foundation) | institutionell finanzierte Top-10 % | ~250 |
| S10 | **IoT-/Hardware-Start-ups, Antennen-/RF-Design-Häuser** | 13.500+ HW/IoT-Start-ups (StartupBlink) | mit eigener HW-Iteration (~1–2 %) | ~200 |
| | **Summe TAM-Population** | | | **~10.100** |

## 2. Segment-Scoring (Opportunity Matrix)

Bewertung 1 (schwach) – 5 (stark); Gewichtung in Klammern. **Attraktivität** = gewichtete Summe; **Machbarkeit** = Fit × (6 − Sales-Komplexität) × (6 − Supportlast), normiert.

| Segment | Marktgröße (15 %) | Wachstum (10 %) | Zahlungsbereitschaft (15 %) | Stückzahlpotenzial (10 %) | Techn. Fit (15 %) | Wettbewerb (5 %) | Kaufbarrieren (10 %) | Sales-Komplexität (10 %) | Marge (5 %) | Strategischer Wert (5 %) | **Score** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 Uni-Forschung | 4 | 3 | 3 | 4 | 5 | 4 | 5 | 4 | 3 | 5 | **4,0** |
| S2 Institute/RTOs | 3 | 3 | 4 | 3 | 5 | 4 | 4 | 4 | 4 | 5 | **3,9** |
| S3 Elektronik-OEM-R&D | 4 | 3 | 4 | 4 | 4 | 4 | 3 | 3 | 4 | 4 | **3,7** |
| S6 Aerospace & Defense | 3 | 5 | 5 | 3 | 5 | 4 | 2 | 2 | 5 | 5 | **3,7** |
| S4 Automotive (IME) | 4 | 5 | 3 | 3 | 4 | 4 | 3 | 3 | 3 | 5 | **3,6** |
| S8 HAW/Ausbildung | 3 | 2 | 2 | 5 | 4 | 5 | 4 | 4 | 2 | 3 | **3,4** |
| S5 Medizintechnik | 4 | 4 | 3 | 3 | 3 | 4 | 2 | 2 | 4 | 4 | **3,2** |
| S7 EMS/PCB-Services | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | **3,0** |
| S10 IoT-Start-ups | 2 | 4 | 2 | 2 | 4 | 4 | 3 | 4 | 2 | 3 | **2,9** |
| S9 FabLabs | 1 | 2 | 1 | 2 | 3 | 5 | 4 | 4 | 1 | 2 | **2,2** |

### Begründungen der kritischen Zellen

- **S1/S2 Zahlungsbereitschaft & Barrieren:** Unter 100 k€ entfallen DFG-Großgeräteverfahren (200 k€ Uni / 100 k€ HAW), EU-Tender (221 k€) und meist auch interne Berufungs-/Gremienprozesse; US-Faculty-Startup-Packages (300–500 k$) decken den Kauf einer Eos ab (A). XTPL (71 % Forschungskunden) und NOVA-Kundenlisten belegen den Kauftyp „ein Gerät pro Gruppe, grant-finanziert" (A).
- **S6 Defense:** höchste Zahlungsbereitschaft und strategischer Pull (DoD-AM-Budget ver-3-facht; NASA/ESA-Programme; ITAR-bedingter Zwang zu Inhouse-Fähigkeit), aber lange Qualifikationszyklen und (für US-Produktion) Buy-American-Themen → Expansion, nicht Beachhead. (A/B)
- **S4 Automotive/IME:** perfekter strategischer Fit (LOPEC-Award!), aber Tier-1-Qualifikationslogik und Seriendenken machen es zum Jahr-2+-Markt. (A/B)
- **S9 FabLabs:** Sichtbarkeit ja, Budget nein — bewusst deprioritisiert (MakerBot-Lehre).

## 3. Markt-Staffelung

### 🎯 Beachhead (Jahr 1–2): „Printed Electronics Research Lab"
**S1 + S2 in EU/UK + Nordamerika** — Forschungsgruppen für gedruckte/flexible/3D-Elektronik, Mechatronik-Institute, RTO-Abteilungen.

- **Warum zuerst:** kürzester Sales-Zyklus im Band (Beschaffungsschwellen!), technisch tolerant (Forschung verzeiht v1.0), publiziert (kostenlose Referenzen — Volteras „hundreds of research citations"-Playbook), dichte Community (OE-A 200+, LOPEC 2.400 Besucher, 963 EE-Unis) und KRONOS' Heimvorteil (FAPS-Cluster, LOPEC-Award). (A)
- **Bottom-up-Potenzial:** ~2.150 Organisationen; realistisch erreichbar in 24 Monaten: ~600 qualifizierte Kontakte, Ziel 45–50 Einheiten (Base).
- **Jobs-to-be-Done:**
  1. *„Publiziere neuartige 3D-/Konform-Elektronik, bevor es die Konkurrenzgruppe tut"* — 5-Achs-Fähigkeit = Publikations-Differenzierung
  2. *„Iteriere Sensor-/Antennen-Designs am selben Tag statt in 3 Wochen China-Loop"*
  3. *„Bilde Studierende an industrierelevanter Technologie aus"* (Curriculum-Effekt → spätere Industrie-Käufe)
  4. *„Bleib unter der Beschaffungsschwelle, kauf noch aus diesjährigem Budget"*

### 📈 Expansion 1 (Jahr 2–3): Corporate R&D (S3, S4-Vorlauf, S5-Vorlauf)
Elektronik-OEMs und Automotive-Tier-1s (Smart Surfaces/IME-Vorentwicklung, Antennen, Sensorik): Eos Five/Max als Rapid-Prototyping-Zelle neben dem LPKF-Fräser. Sales über Referenzen aus dem Beachhead + Messen (productronica, LOPEC, electronica). JTBD: *„Halte IP-sensitive Iterationen im Haus"*, *„Prüfe IME-Konzepte ohne Werkzeugkosten"*.

### 📈 Expansion 2 (Jahr 3–5): Defense/Space (S6) + Ausbildung (S8)
- Defense: Eos Max-Konfiguration mit Dokumentations-/Traceability-Paket über APES/NTV in US-Programme (SBIR-Ökosystem, NextFlex-Mitglieder); ESA/DLR-Ökosystem in EU.
- Ausbildung: Eos One als Klassensatz-Gerät, sobald COGS es erlaubt (Skaleneffekt), Curriculum-Paket mit Aion-5X-Schulungslizenzen.

### 🔭 Long-Term (Jahr 5+)
- **EMS/Produktions-Einstieg (S7):** Eos-Max-Cluster als Kleinserien-Zellen; Brücke zur Hyperion-Klasse (Upsell-Pfad im Bestand).
- **IME-Serienökosystem (S4):** wenn IME-CAGR (~28 %) Realität wird, Positionierung als Entwicklungs-Standard vor jeder TactoTek-artigen Serienlinie.
- **APAC-Rollout** über Distributoren (Ex-Neotech-Kanäle: Japan, Australien).

## 4. Buyer Personas & Beschaffungspsychologie (Beachhead)

| Persona | Budgetquelle | Schwelle | Entscheidungsdauer |
|---|---|---|---|
| Professor/in (W2/W3, Printed Electronics) | Grundausstattung, DFG-Sachmittel, ERC | <100 k€ ohne Großgeräteantrag | 1–4 Monate |
| US Assistant Professor | Startup-Package (300–500 k$) | Eigenentscheid | 1–3 Monate |
| Fraunhofer-/RTO-Abteilungsleitung | Projektpauschalen, Grundfinanzierung | Abteilungsbudget | 2–6 Monate |
| Corporate Lab Manager (OEM/Tier-1) | Capex <100 k€ = unterhalb CFO-Board-Schwelle | Abteilungs-/BU-Freigabe | 3–9 Monate |
| Defense Lab PI (US) | SBIR/IRAD/Programm-Mittel | Sole-Source-fähig unter Simplified Acquisition | 6–18 Monate |

**Kernaussage:** Der Preispunkt ≤100 k€ verwandelt einen Vorstandsbeschluss in eine Abteilungsentscheidung. Das ist kein Marketing-Detail, sondern **der** Mechanismus der Marktexpansion — und er ist regulatorisch verankert (Vergabeschwellen, A).

## 5. Was das Segment-Bild für das Produkt bedeutet

1. **Eos Five ist das Beachhead-Produkt** (5-Achs = Publikations-/Differenzierungswert; 65 k€ = Sweet Spot unter allen Schwellen).
2. **Eos One** dient S8/S9 und als „Lands-and-Expands"-Einstieg in S1 (Zweitgerät-Logik).
3. **Eos Max** bedient S6/S7 und schafft den Upsell-Pfad zur Hyperion-Klasse (Kannibalisierungs-Fence).
4. **Materialien-Abo** (kuratierte Tinten-Kits) monetarisiert die akademische Nutzung trotz niedriger Einzelverbräuche (F4).
5. **Community/Content** (Applikations-Bibliothek, Papers, Kurse) ersetzt das liquidierte J.A.M.E.S-Ökosystem und senkt CAC im Beachhead.
