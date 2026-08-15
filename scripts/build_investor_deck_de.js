#!/usr/bin/env node
/* Erzeugt presentation/kronos-investor-deck-de.pptx — deutsche Ausgabe (20 Slides).
 * Regenerierung: node scripts/build_investor_deck.js  (aus dem Repo-Root)
 * Zahlenkanon: business-plan/financial-model.xlsx · research/assumptions.md
 */
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const icons = require("react-icons/fi");

// ------------------------------------------------------------------ palette
const C = {
  bg: "0B0F14",        // near-black blue — dominant
  panel: "131A24",
  card: "1A2432",
  cardHi: "20python2E40".slice(0, 6), // guard against typos
  line: "2A3648",
  ink: "EAF0F7",       // primary text
  mute: "8FA0B5",      // secondary text
  faint: "5A6A80",
  copper: "E0873A",    // accent — conductive trace
  copperSoft: "9C6A3E",
  teal: "3FB8C9",      // data secondary
  green: "5BBD8B",     // positive
  red: "D96A6A",       // negative / no-go
  white: "FFFFFF",
};
C.cardHi = "202E40";

const W = 13.333, H = 7.5;

// ------------------------------------------------------------------ icons
const ICONS = {
  target: icons.FiCrosshair, users: icons.FiUsers, cpu: icons.FiCpu,
  layers: icons.FiLayers, trend: icons.FiTrendingUp, shield: icons.FiShield,
  zap: icons.FiZap, check: icons.FiCheckCircle, x: icons.FiXCircle,
  globe: icons.FiGlobe, tool: icons.FiTool, box: icons.FiBox,
  clock: icons.FiClock, award: icons.FiAward, dollar: icons.FiDollarSign,
  flag: icons.FiFlag, book: icons.FiBookOpen, repeat: icons.FiRepeat,
  alert: icons.FiAlertTriangle, key: icons.FiKey, search: icons.FiSearch,
  gitbranch: icons.FiGitBranch, package: icons.FiPackage, radio: icons.FiRadio,
};
const iconCache = {};
async function iconPng(name, hex) {
  const k = name + hex;
  if (iconCache[k]) return iconCache[k];
  const Comp = ICONS[name];
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color: "#" + hex, size: 256, strokeWidth: 1.6 })
  );
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  iconCache[k] = "image/png;base64," + buf.toString("base64");
  return iconCache[k];
}

// ------------------------------------------------------------------ helpers
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: "Arial", bodyFontFace: "Calibri" };

function newSlide() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  return s;
}

// circuit-trace motif (top-right): thin trace with node pads
function trace(s, opts = {}) {
  const x0 = opts.x ?? W - 2.5, y0 = opts.y ?? 0.62, col = opts.color ?? C.copperSoft;
  s.addShape("line", { x: x0, y: y0, w: 1.1, h: 0, line: { color: col, width: 1 } });
  s.addShape("line", { x: x0 + 1.1, y: y0, w: 0.55, h: 0.35, line: { color: col, width: 1 }, flipV: false, rotate: 0 });
  s.addShape("rect", { x: x0 - 0.05, y: y0 - 0.035, w: 0.07, h: 0.07, fill: { color: col } });
  s.addShape("rect", { x: x0 + 1.065, y: y0 - 0.035, w: 0.07, h: 0.07, fill: { color: col } });
  s.addShape("line", { x: x0 + 1.65, y: y0 + 0.35, w: 0.5, h: 0, line: { color: col, width: 1 } });
  s.addShape("rect", { x: x0 + 2.115, y: y0 + 0.315, w: 0.07, h: 0.07, fill: { color: C.copper } });
}

function header(s, kicker, title, opts = {}) {
  s.addText(kicker.toUpperCase(), {
    x: 0.6, y: 0.42, w: 9.6, h: 0.3, fontFace: "Arial", fontSize: 11,
    color: C.copper, charSpacing: 4, bold: true, margin: 0,
  });
  s.addText(title, {
    x: 0.6, y: 0.72, w: opts.titleW ?? 11.0, h: 0.75, fontFace: "Arial",
    fontSize: opts.size ?? 28, color: C.ink, bold: true, margin: 0,
  });
  if (!opts.noTrace) trace(s);
}

function footer(s, n) {
  s.addText([
    { text: "KRONOS EOS", options: { color: C.faint, bold: true } },
    { text: "   ·   Investment Case   ·   ", options: { color: C.faint } },
    { text: String(n).padStart(2, "0"), options: { color: C.copperSoft, bold: true } },
  ], { x: 0.6, y: H - 0.42, w: 4.5, h: 0.25, fontSize: 8.5, fontFace: "Calibri", charSpacing: 2, margin: 0 });
}

function card(s, x, y, w, h, o = {}) {
  s.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.055,
    fill: { color: o.fill ?? C.card },
    line: o.line === null ? { type: "none" } : { color: o.line ?? C.line, width: 0.75 },
    shadow: { type: "outer", color: "000000", opacity: 0.35, blur: 8, offset: 3, angle: 90 },
  });
}

function stat(s, x, y, w, value, label, color = C.ink, valueSize = 34) {
  s.addText(value, { x, y, w, h: 0.62, fontFace: "Arial", fontSize: valueSize, bold: true, color, margin: 0 });
  s.addText(label, { x, y: y + 0.6, w, h: 0.55, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 12 });
}

async function iconChip(s, x, y, name, color, d = 0.42, bg = C.cardHi) {
  s.addShape("ellipse", { x, y, w: d, h: d, fill: { color: bg }, line: { color: C.line, width: 0.5 } });
  s.addImage({ data: await iconPng(name, color), x: x + d * 0.22, y: y + d * 0.22, w: d * 0.56, h: d * 0.56 });
}

(async () => {

// ============================================================ 01 — VISION
{
  const s = newSlide();
  // faint grid of trace nodes
  for (let i = 0; i < 7; i++)
    s.addShape("line", { x: 9.4 + i * 0.55, y: 0, w: 0, h: H, line: { color: "10161F", width: 0.75 } });
  s.addShape("line", { x: 0.62, y: 2.1, w: 2.0, h: 0, line: { color: C.copper, width: 1.25 } });
  s.addShape("rect", { x: 2.585, y: 2.065, w: 0.075, h: 0.075, fill: { color: C.copper } });
  s.addText("KRONOS", { x: 0.55, y: 2.35, w: 9, h: 1.0, fontFace: "Arial", fontSize: 58, bold: true, color: C.ink, charSpacing: 6, margin: 0 });
  s.addText("EOS", { x: 0.55, y: 3.35, w: 9, h: 1.0, fontFace: "Arial", fontSize: 58, bold: true, color: C.copper, charSpacing: 18, margin: 0 });
  s.addText("Der Aufbruch zu zugänglicher 3D-gedruckter Elektronik.", {
    x: 0.6, y: 4.55, w: 8.5, h: 0.5, fontFace: "Calibri", fontSize: 19, color: C.ink, italic: true, margin: 0,
  });
  s.addText("Investment Case für eine 5-Achs-AME-Plattform im Band 25–100 k€ —\ngebaut auf der Technologie des Kategorie-Pioniers.", {
    x: 0.6, y: 5.15, w: 8.5, h: 0.8, fontFace: "Calibri", fontSize: 13, color: C.mute, margin: 0, lineSpacing: 19 });
  s.addText("INVESTOR DUE-DILIGENCE-PAKET   ·   AUGUST 2026   ·   VERTRAULICH", {
    x: 0.6, y: 6.75, w: 9, h: 0.3, fontFace: "Arial", fontSize: 9.5, color: C.faint, charSpacing: 3, margin: 0 });
  s.addNotes("Vision: KRONOS Eos verlagert bewiesene 5-Achs-AME-Technologie in das leere 25-100k-Preisband. Alle Zahlen: financial-model.xlsx, Evidenzstufen research/assumptions.md.");
}

// ============================================================ 02 — INVESTMENT OPPORTUNITY
{
  const s = newSlide();
  header(s, "Die Investment-Chance", "Eine optionsstrukturierte Wette auf die leere Mitte der 3D-Elektronik");
  const y0 = 1.75;
  card(s, 0.6, y0, 5.9, 4.9);
  s.addText("Das Angebot", { x: 0.9, y: y0 + 0.25, w: 5, h: 0.3, fontFace: "Arial", fontSize: 13, bold: true, color: C.copper, margin: 0 });
  s.addText([
    { text: "2,5 M€ Tranche 1 ", options: { bold: true, color: C.ink, fontSize: 16 } },
    { text: "eines gestuften 13,2-M€-Plans — committet nur Gate für Gate.", options: { color: C.mute, fontSize: 13 } },
  ], { x: 0.9, y: y0 + 0.6, w: 5.3, h: 0.7, fontFace: "Calibri", margin: 0, lineSpacing: 19 });
  const asks = [
    ["check", "Bewiesene 5-Achs-Kerntechnologie — zu Distressed-Kosten aus der Neotech-Insolvenz erworben"],
    ["check", "Einziger Anbieter, der echtes 5-Achs-AME unter alle Vergabeschwellen bringen kann"],
    ["check", "Kategorie-Führung vakant: Nano Dimension stieg im April 2026 aus AME aus"],
    ["alert", "Ehrliches Framing: Der heutige Maschinenmarkt ist klein — eine Marktschaffungs-Wette mit gekapptem Downside"],
  ];
  let yy = y0 + 1.5;
  for (const [ic, t] of asks) {
    await iconChip(s, 0.9, yy, ic, ic === "alert" ? C.copper : C.green, 0.36);
    s.addText(t, { x: 1.4, y: yy - 0.06, w: 4.85, h: 0.75, fontFace: "Calibri", fontSize: 11.5, color: C.ink, margin: 0, lineSpacing: 14 });
    yy += 0.84;
  }
  // right: scenario stats
  card(s, 6.8, y0, 5.9, 4.9, { fill: C.panel });
  s.addText("Was die gestuften 13,2 M€ aufbauen können (Base Case)", { x: 7.1, y: y0 + 0.25, w: 5.4, h: 0.3, fontFace: "Arial", fontSize: 13, bold: true, color: C.ink, margin: 0 });
  stat(s, 7.1, y0 + 0.85, 2.6, "€16.0M", "Umsatz 2031\n(Base Case)", C.ink);
  stat(s, 9.85, y0 + 0.85, 2.6, "452", "installierte Maschinen\nbis 2031", C.ink);
  stat(s, 7.1, y0 + 2.25, 2.6, "50%", "Bruttomarge 2031,\n19 % wiederkehrend", C.teal);
  stat(s, 9.85, y0 + 2.25, 2.6, "2031", "EBITDA-Break-even\n(Upside: 2030)", C.teal);
  stat(s, 7.1, y0 + 3.65, 2.6, "11.4x", "MOIC im Upside-Pfad\n(IRR ≈ 48 %, Exit J7)", C.green);
  stat(s, 9.85, y0 + 3.65, 2.6, "€2.5M", "maximal im Risiko vor dem\nSerien-Gate", C.copper);
  footer(s, 2);
  s.addNotes("Struktur: T1 2,5M validiert; T2 4,5M industrialisiert; T3 4-5M skaliert. Konservativ-Szenario = No-Go (Slide 17). Erwartungswert ~3x MOIC bei 30/45/25-Gewichtung.");
}

// ============================================================ 03 — KRONOS TODAY
{
  const s = newSlide();
  header(s, "KRONOS heute", "Die Technologie des Pioniers, wiedergeboren als Start-up");
  // timeline
  const ty = 2.05;
  s.addShape("line", { x: 0.8, y: ty + 0.55, w: 11.7, h: 0, line: { color: C.line, width: 1 } });
  const steps = [
    ["2009–10", "Neotech AMT entwickelt 3D-gedruckte Elektronik; weltweit erstes 5-Achs-3D-PE-System installiert", C.mute],
    ["2013", "Erste Serieninstallation — gedruckte 3D-Antennen, Millionen Teile pro Jahr", C.mute],
    ["2024", "Neotech-Insolvenz (AG Nürnberg). KRONOS Mechatronics übernimmt die Assets", C.copper],
    ["2025", "Relaunch Helios & Hyperion · APES-Partnerschaft (Nordamerika) · productronica", C.ink],
    ["2026", "LOPEC Start-up Award „Best Business Potential“ · Aion-5X-SDK veröffentlicht", C.green],
  ];
  steps.forEach(([yr, txt, col], i) => {
    const x = 0.8 + i * 2.36;
    s.addShape("ellipse", { x: x - 0.045, y: ty + 0.505, w: 0.09, h: 0.09, fill: { color: col === C.mute ? C.faint : C.copper } });
    s.addText(yr, { x, y: ty, w: 2.2, h: 0.3, fontFace: "Arial", fontSize: 13, bold: true, color: col, margin: 0 });
    s.addText(txt, { x, y: ty + 0.75, w: 2.15, h: 1.2, fontFace: "Calibri", fontSize: 10, color: C.mute, margin: 0, lineSpacing: 13 });
  });
  // fact cards
  const fy = 4.35;
  const facts = [
    ["cpu", "Technologie", "Modulare 5-Achs-Plattformen, ±5 µm; Piezo-Jet, Inkjet, Dispensing, FFF; Plasma, UV, Fräsen, SMD-Bestückung"],
    ["gitbranch", "Software-Burggraben", "Aion-5X CAD/CAM: 5-Achs-Simultanbahnen, Kollisionssimulation, KI-Vision-QC — mit öffentlichem SDK"],
    ["globe", "Kanäle & Sichtbarkeit", "APES + NTV (USA), Nürnberger AME-Cluster (FAPS/FAU), OE-A-/LOPEC-Community"],
    ["alert", "Die ehrliche Lücke", "~6-Personen-Team, kein verifizierter Verkauf seit Relaunch, Patent-Titel ungeprüft → Gates V1–V7"],
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 3.11;
    card(s, x, fy, 2.96, 2.35, { fill: i === 3 ? "241C1C" : C.card, line: i === 3 ? "4A3030" : undefined });
    await iconChip(s, x + 0.22, fy + 0.22, facts[i][0], i === 3 ? C.red : C.copper, 0.4);
    s.addText(facts[i][1], { x: x + 0.75, y: fy + 0.27, w: 2.1, h: 0.3, fontFace: "Arial", fontSize: 11.5, bold: true, color: C.ink, margin: 0 });
    s.addText(facts[i][2], { x: x + 0.22, y: fy + 0.78, w: 2.55, h: 1.45, fontFace: "Calibri", fontSize: 10, color: C.mute, margin: 0, lineSpacing: 13.5 });
  }
  footer(s, 3);
  s.addNotes("Quellen: Handelsregister HRB 43784, VoxelMatters/APES-PR, GitHub-Verifikation (Helios 1.0/1.1, Aion-5X SDK, Team). Details: research/company-analysis.md");
}

// ============================================================ 04 — THE PROBLEM
{
  const s = newSlide();
  header(s, "Das Problem", "Brillante Technologie, gefangen im 200-k€-Projektgeschäft");
  stat(s, 0.6, 1.9, 3.6, "~100–190", "verkaufte AME-Maschinen pro Jahr, weltweit, alle Anbieter (Bottom-up)", C.ink, 30);
  stat(s, 4.5, 1.9, 3.4, "€15–28M", "gesamter AME-Maschinenmarkt heute — kleiner als ein einzelner Mittelständler", C.ink, 30);
  stat(s, 8.3, 1.9, 4.2, "50–80%", "der Platzierungen sind förderfinanzierte Forschungskäufe — einmalig, ohne Wiederkauf", C.ink, 30);
  // casualties panel
  const cy = 3.5;
  card(s, 0.6, cy, 12.13, 3.3, { fill: "1A1616", line: "4A3030" });
  s.addText("2024–2026: Die Kategorie hat sich selbst bereinigt", { x: 0.9, y: cy + 0.22, w: 11, h: 0.35, fontFace: "Arial", fontSize: 14, bold: true, color: C.red, margin: 0 });
  const cas = [
    ["Neotech AMT", "Der 5-Achs-Pionier — insolvent Juli 2024 nach ~20 Jahren und ~50 Systemen. Seine Assets wurden KRONOS."],
    ["Nano Dimension", "~1,5 Mrd. $ eingesammelt. ~51 DragonFly-Systeme verkauft. AME-Exit April 2026 für 2 M$ upfront — der Marktführer ging zum Schrottwert."],
    ["J.A.M.E.S GmbH", "Die Hensoldt-getragene AME-Community-Plattform — liquidiert August 2025. Das Ökosystem verlor seinen Anker."],
  ];
  cas.forEach(([n, t], i) => {
    const x = 0.9 + i * 4.0;
    s.addText(n, { x, y: cy + 0.75, w: 3.7, h: 0.3, fontFace: "Arial", fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
    s.addText(t, { x, y: cy + 1.1, w: 3.7, h: 1.3, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 14 });
  });
  s.addText([
    { text: "Die Diagnose: ", options: { bold: true, color: C.ink } },
    { text: "Alle verkauften 150–500-k€-Projektmaschinen in eine Forschungsnische. Niemand hat die Technologie für die Budgets produktisiert, die tatsächlich Laborgeräte kaufen.", options: { color: C.mute } },
  ], { x: 0.9, y: cy + 2.5, w: 11.4, h: 0.6, fontFace: "Calibri", fontSize: 12.5, margin: 0, lineSpacing: 17 });
  footer(s, 4);
  s.addNotes("Bottom-up-Herleitung der Einheiten: research/appendix/dossier-verification-2.md. Nano-Exit: 3DPrint.com 04/2026. Neotech: IN 771/24.");
}

// ============================================================ 05 — WHY MACHINES LIMIT MARKET SIZE
{
  const s = newSlide();
  header(s, "Warum heutige Maschinen den Markt begrenzen", "Vergabeschwellen entscheiden, wer kaufen darf — heutige Preise liegen über allen");
  // threshold ladder graphic
  const gx = 0.9, gw = 7.3, gy = 1.95, gh = 4.6;
  const maxV = 450; // k€ scale
  const bands = [
    { v: 400, label: "DragonFly IV ≈ €400k", col: C.red, type: "machine" },
    { v: 333, label: "Optomec Produktion ≈ 333 k€", col: C.red, type: "machine" },
    { v: 221, label: "EU-Tender-Schwelle — 221 k€", col: C.mute, type: "rule" },
    { v: 200, label: "DFG-Großgeräte (Uni) — 200 k€  ·  Neotech 15X ≈ 200 k€", col: C.mute, type: "rule", below: true },
    { v: 100, label: "DE-Direktauftrag (2025) · DFG HAW · NSF MRI — alle ≈ 100 k€/$", col: C.green, type: "rule" },
    { v: 65, label: "KRONOS EOS FIVE — €65k", col: C.copper, type: "eos", below: true },
  ];
  s.addShape("line", { x: gx, y: gy, w: 0, h: gh, line: { color: C.line, width: 1 } });
  for (const b of bands) {
    const y = gy + gh - (b.v / maxV) * gh;
    const wLine = b.type === "eos" ? gw : gw * 0.94;
    s.addShape("line", { x: gx, y, w: wLine, h: 0, line: { color: b.col, width: b.type === "eos" ? 2.5 : 1, dashType: b.type === "rule" ? "dash" : "solid" } });
    s.addText(b.label, { x: gx + 0.12, y: b.below ? y + 0.05 : y - 0.28, w: gw - 0.1, h: 0.25, fontFace: "Calibri", fontSize: b.type === "eos" ? 12 : 10.5, bold: b.type === "eos", color: b.col, margin: 0 });
    s.addText(`€${b.v}k`, { x: 0.12, y: y - 0.12, w: 0.72, h: 0.25, fontFace: "Arial", fontSize: 9, color: C.faint, align: "right", margin: 0 });
  }
  // right panel
  card(s, 8.6, 1.95, 4.13, 4.6, { fill: C.panel });
  s.addText("Unter 100 k€ wird ein Maschinenkauf zu etwas anderem", { x: 8.9, y: 2.2, w: 3.6, h: 0.7, fontFace: "Arial", fontSize: 14, bold: true, color: C.ink, margin: 0, lineSpacing: 18 });
  const rules = [
    ["Kein EU-Tender, keine DFG-Prüfung — eine Abteilungsentscheidung", "check"],
    ["Passt in ein einzelnes US-Faculty-Startpaket (300–500 k$)", "check"],
    ["Deutsche Direktauftragsgrenze 2025 auf 100 k€ erhöht — die Tür ist gerade aufgegangen", "zap"],
    ["Kauffenster: Wochen, keine Haushaltsjahre", "clock"],
  ];
  let ry = 3.05;
  for (const [t, ic] of rules) {
    await iconChip(s, 8.9, ry, ic, C.green, 0.34);
    s.addText(t, { x: 9.36, y: ry - 0.05, w: 3.15, h: 0.75, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 13.5 });
    ry += 0.87;
  }
  footer(s, 5);
  s.addNotes("Schwellen: DFG (200k Uni/100k HAW), EU 221k subzentral, Vergaberechtsreform 2025 Direktauftrag 100k, NSF MRI min 100k$. Quellen: research/sources.md §5.");
}

// ============================================================ 06 — THE GAP MAP
{
  const s = newSlide();
  header(s, "Die Low-Cost-Chance", "Das Band 25–100 k€ ist leer — für die Maschinen, auf die es ankommt");
  // three tiers horizontal
  const ty = 2.0, th = 4.35;
  const tiers = [
    { x: 0.6, w: 3.4, title: "DESKTOP · <12 k€", fill: C.card, items: ["Voltera V-One  ·  ~$5k", "BotFactory SV2  ·  ~$10k", "nano3Dprint  ·  ~$5k"], note: "Planar, Education-Klasse.\n5.000+ Voltera-Einheiten beweisen die Käuferbasis.", col: C.mute },
    { x: 4.2, w: 4.9, title: "25–100 k€ · DIE LÜCKE", fill: "1E1A12", items: ["Voltera NOVA  ·  46 k$  —  nur planar", "Fujifilm Dimatix  ·  ~55 k$  —  nur planar", "LPKF ProtoMat  ·  subtraktives Fräsen"], note: "KEIN 5-Achs-/Konform-AME-System existiert hier.\nDie definierende Fähigkeit der 3D-Elektronik fehlt\nim einzigen Band, das die Vergabe liebt.", col: C.copper, hot: true },
    { x: 9.3, w: 3.43, title: "INDUSTRIE · >150 k€", fill: C.card, items: ["Neotech/KRONOS 15X-class · €200k", "XTPL Delta  ·  €170–220k", "Optomec, nScrypt  ·  €150–500k"], note: "Quote-only-Projektmaschinen.\nDie Klasse, die ihren Pionier in die Insolvenz führte.", col: C.mute },
  ];
  for (const t of tiers) {
    card(s, t.x, ty, t.w, th, { fill: t.fill, line: t.hot ? C.copper : undefined });
    s.addText(t.title, { x: t.x + 0.25, y: ty + 0.22, w: t.w - 0.5, h: 0.3, fontFace: "Arial", fontSize: t.hot ? 15 : 12, bold: true, color: t.col, charSpacing: 1.5, margin: 0 });
    s.addText(t.items.map((it, i) => ({ text: it, options: { breakLine: i < t.items.length - 1 } })), {
      x: t.x + 0.25, y: ty + 0.75, w: t.w - 0.5, h: 1.55, fontFace: "Calibri", fontSize: t.hot ? 11.5 : 10.5, color: C.ink, margin: 0, paraSpaceAfter: 7 });
    s.addShape("line", { x: t.x + 0.25, y: ty + 2.5, w: t.w - 0.5, h: 0, line: { color: C.line, width: 0.75 } });
    s.addText(t.note, { x: t.x + 0.25, y: ty + 2.65, w: t.w - 0.5, h: 1.55, fontFace: "Calibri", fontSize: t.hot ? 11 : 9.5, italic: true, color: t.hot ? C.copper : C.mute, margin: 0, lineSpacing: 14.5 });
    if (t.hot) {
      s.addText("← KRONOS EOS →", { x: t.x, y: ty + th + 0.12, w: t.w, h: 0.32, align: "center", fontFace: "Arial", fontSize: 13, bold: true, color: C.copper, charSpacing: 2, margin: 0 });
    }
  }
  footer(s, 6);
  s.addNotes("Preisevidenz: Aniwaa, Voltera Store, East Value Research, Design World, Tender-Records. Vollständige Landkarte: research/competitors.md");
}

// ============================================================ 07 — PROOF THE BAND BUYS
{
  const s = newSlide();
  header(s, "Beweis: Das Band kauft", "Maschinen zu diesem Preis verkaufen sich tausendfach — nur additive 3D-Systeme noch nicht");
  const py = 1.95;
  const proofs = [
    ["5,000+", "Voltera-Einheiten in 92 Länder geliefert — Kunden u. a. NASA, MIT, Harvard, Stanford, Oxford", "Das Käuferuniversum ist real und global"],
    ["€26.2M", "LPKF-Development-Segmentumsatz 2024 — „Tausende“ installierte ProtoMat-Benchtop-Systeme", "EE-Labore zahlen seit Jahrzehnten 10–60 k€ für Inhouse-Prototyping"],
    ["130,000+", "verkaufte Formlabs-Drucker nach ~10x-Preissenkung im Profi-SLA — ein 2-Mrd.-$-Unternehmen", "Das 10x-Preissenkungs-Playbook funktioniert bei Profi-Maschinen"],
    ["40+ / 13", "XTPL-Delta-Systeme kumuliert / allein 2025 geliefert, bei 170–220 k€ — 71 % Forschungskunden", "Selbst beim 3-fachen unseres Preises beschleunigt die Forschungsnachfrage"],
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + (i % 2) * 6.23, y = py + Math.floor(i / 2) * 2.3;
    card(s, x, y, 5.9, 2.1);
    s.addText(proofs[i][0], { x: x + 0.3, y: y + 0.22, w: 2.35, h: 0.65, fontFace: "Arial", fontSize: 30, bold: true, color: C.copper, margin: 0 });
    s.addText(proofs[i][1], { x: x + 2.75, y: y + 0.22, w: 3.0, h: 1.1, fontFace: "Calibri", fontSize: 10, color: C.mute, margin: 0, lineSpacing: 13 });
    s.addShape("line", { x: x + 0.3, y: y + 1.5, w: 5.3, h: 0, line: { color: C.line, width: 0.75 } });
    s.addText(proofs[i][2], { x: x + 0.3, y: y + 1.6, w: 5.3, h: 0.4, fontFace: "Calibri", fontSize: 11, italic: true, color: C.ink, margin: 0 });
  }
  footer(s, 7);
  s.addNotes("Alle vier Datenpunkte Stufe A (live verifiziert): Voltera About, LPKF FY2024-Presse, Formlabs Form-4-PR, XTPL IR 01/2026.");
}

// ============================================================ 08 — NEW CUSTOMER UNIVERSE
{
  const s = newSlide();
  header(s, "Das neue Kundenuniversum", "~10.000 Organisationen, die nie eine 250-k€-Maschine kaufen konnten");
  const segs = [
    ["Universitäre Forschungslabore (EE/Material)", 1450],
    ["Corporate R&D — Medtech-KMU", 1900],
    ["Corporate R&D — Elektronik-OEMs", 1800],
    ["Ausbildung — HAW / Colleges", 1350],
    ["Automobilzulieferer (IME, Sensorik)", 1100],
    ["Aerospace- & Defense-R&D", 900],
    ["Forschungsinstitute / RTOs", 700],
    ["EMS- & PCB-Dienstleister", 700],
    ["FabLabs (institutionell) + Start-ups", 450],
  ];
  s.addChart("bar", [{
    name: "Organisationen",
    labels: segs.map(x => x[0]),
    values: segs.map(x => x[1]),
  }], {
    x: 0.6, y: 1.85, w: 8.1, h: 4.9, barDir: "bar",
    chartColors: [C.copper], showLegend: false, showTitle: false,
    catAxisLabelColor: C.mute, catAxisLabelFontSize: 10, catAxisLabelFontFace: "Calibri",
    valAxisLabelColor: C.faint, valAxisLabelFontSize: 9,
    valGridLine: { color: "1C2634", size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink, dataLabelFontSize: 10, dataLabelFontFace: "Arial",
    barGapWidthPct: 55, valAxisMinVal: 0, valAxisMaxVal: 2200, plotArea: { fill: { color: C.bg } },
  });
  card(s, 8.95, 1.85, 3.78, 4.9, { fill: C.panel });
  s.addText("Bottom-up gezählt, nicht behauptet", { x: 9.2, y: 2.1, w: 3.3, h: 0.6, fontFace: "Arial", fontSize: 13, bold: true, color: C.ink, margin: 0, lineSpacing: 17 });
  s.addText("963 forschungsaktive EE-Unis (Research.com) · 76 Fraunhofer-Institute · ZVEI 1.100+ · CLEPA 3.000+ · MedTech Europe 38.000 (90 % KMU) · in4ma 2.160 EMS · je Segment relevanzgefiltert.",
    { x: 9.2, y: 2.75, w: 3.3, h: 1.9, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 15 });
  stat(s, 9.2, 4.85, 3.3, "~10,000", "Kandidaten-Organisationen — vs. ~150 Maschinen, die die Branche heute pro Jahr verkauft", C.copper, 28);
  footer(s, 8);
  s.addNotes("Populationstabelle: research/assumptions.md §5, Segmentdetails research/customer-segments.md §1. Relevanzfilter je Segment dokumentiert.");
}

// ============================================================ 09 — SEGMENTATION & BEACHHEAD
{
  const s = newSlide();
  header(s, "Marktsegmentierung", "Ein Beachhead, zwei Expansionen — sequenziert nach Beschaffungsfriktion");
  const cols = [
    { x: 0.6, w: 4.3, tag: "BEACHHEAD · JAHR 1–2", col: C.copper, title: "Forschungslabore & Institute (EU/NA)", fill: "1E1A12",
      pts: ["~2.150 Organisationen, tender-frei unter 100 k€", "Technisch tolerant — Forschung verzeiht v1.0", "Jedes Paper ist eine Gratis-Referenz (Voltera-Playbook)", "KRONOS-Heimvorteil: FAPS-Cluster, LOPEC-Award"] },
    { x: 5.1, w: 3.8, tag: "EXPANSION · JAHR 2–3", col: C.teal, title: "Corporate R&D — Elektronik, Automotive/IME, Medtech", fill: C.card,
      pts: ["Referenzgetriebener Einstieg aus dem Beachhead", "IP-sensible Iteration bleibt im Haus", "IME-Vorentwicklung ohne Werkzeugkosten", "~4.800 gefilterte Organisationen"] },
    { x: 9.1, w: 3.63, tag: "EXPANSION · JAHR 3–5", col: C.green, title: "Defense- & Space-Labs · Ausbildungsflotten · Kleinserie", fill: C.card,
      pts: ["DoD-AM-Budget: 0,3 → 0,8 → ~2,6 Mrd. $ (2030e)", "Eos Max + Traceability über APES/NTV", "Eos-One-Curriculum-Bundles", "Produktionszellen speisen den Hyperion-Upsell"] },
  ];
  for (const c of cols) {
    card(s, c.x, 1.95, c.w, 4.7, { fill: c.fill, line: c.col === C.copper ? C.copper : undefined });
    s.addText(c.tag, { x: c.x + 0.25, y: 2.18, w: c.w - 0.5, h: 0.28, fontFace: "Arial", fontSize: 10.5, bold: true, color: c.col, charSpacing: 2, margin: 0 });
    s.addText(c.title, { x: c.x + 0.25, y: 2.5, w: c.w - 0.5, h: 0.85, fontFace: "Arial", fontSize: 14.5, bold: true, color: C.ink, margin: 0, lineSpacing: 18 });
    s.addText(c.pts.map((p, i) => ({ text: p, options: { bullet: { code: "2022", indent: 10 }, breakLine: i < c.pts.length - 1 } })),
      { x: c.x + 0.25, y: 3.5, w: c.w - 0.5, h: 2.9, fontFace: "Calibri", fontSize: 11, color: C.mute, margin: 0, paraSpaceAfter: 9, lineSpacing: 14.5 });
  }
  footer(s, 9);
  s.addNotes("Opportunity-Matrix mit 10 Segmenten und Scoring: research/customer-segments.md §2-3. Long-term: EMS-Kleinserie, IME-Serienökosystem, APAC.");
}

// ============================================================ 10 — USE CASES / JTBD
{
  const s = newSlide();
  header(s, "Use Cases", "Jobs to be done — wofür eine 65-k€-5-Achs-Maschine engagiert wird");
  const jt = [
    ["award", "Zuerst publizieren", "„Drucke die 3D-Antenne / den konformen Sensor, den die Konkurrenzgruppe nicht kann.“ 5-Achs-Fähigkeit ist Publikations-Differenzierung — das stärkste akademische Kaufmotiv."],
    ["clock", "Am selben Tag iterieren", "„Vom CAD zur funktionalen 3D-Schaltung vor dem Abend — statt 3-Wochen-Offshore-Schleife.“ Substitute deckeln nur flache Standard-PCBs; 3D-Iteration hat kein Substitut."],
    ["shield", "IP im Haus behalten", "„Defense, Automotive-Vorentwicklung und Medizin-Prototypen verlassen nie das Gebäude.“ ITAR-/IP-sensible Arbeit kann strukturell keine Board-Services nutzen."],
    ["users", "Die nächste Kohorte ausbilden", "„Lehre industrierelevantes AME auf echter Hardware.“ Curriculum-Plätze säen die Corporate-Käufe von morgen — die LPKF-ProtoMat-Dynamik seit 40 Jahren."],
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + (i % 2) * 6.23, y = 1.95 + Math.floor(i / 2) * 2.35;
    card(s, x, y, 5.9, 2.15);
    await iconChip(s, x + 0.25, y + 0.25, jt[i][0], C.copper, 0.44);
    s.addText(jt[i][1], { x: x + 0.85, y: y + 0.3, w: 4.8, h: 0.35, fontFace: "Arial", fontSize: 14, bold: true, color: C.ink, margin: 0 });
    s.addText(jt[i][2], { x: x + 0.25, y: y + 0.85, w: 5.4, h: 1.2, fontFace: "Calibri", fontSize: 11, color: C.mute, margin: 0, lineSpacing: 15 });
  }
  footer(s, 10);
  s.addNotes("JTBD aus Segment-Analyse (research/customer-segments.md §3). Anwendungen: gedruckte Antennen, konforme Sensorik, Heizstrukturen, IME-Vorstufen, Mikrofluidik-Elektronik.");
}

// ============================================================ 11 — COMPETITIVE LANDSCAPE (2x2)
{
  const s = newSlide();
  header(s, "Wettbewerbslandschaft", "Allein im Quadranten, auf den es ankommt");
  const gx = 1.5, gy = 1.95, gw = 7.6, gh = 4.55;
  s.addShape("rect", { x: gx, y: gy, w: gw, h: gh, fill: { color: C.panel }, line: { color: C.line, width: 0.75 } });
  s.addShape("line", { x: gx + gw / 2, y: gy, w: 0, h: gh, line: { color: C.line, width: 0.75, dashType: "dash" } });
  s.addShape("line", { x: gx, y: gy + gh / 2, w: gw, h: 0, line: { color: C.line, width: 0.75, dashType: "dash" } });
  s.addText("PREIS →  hoch", { x: gx - 1.28, y: gy + 0.1, w: 1.2, h: 0.3, fontFace: "Arial", fontSize: 9, color: C.faint, align: "right", margin: 0 });
  s.addText("niedrig", { x: gx - 1.28, y: gy + gh - 0.35, w: 1.2, h: 0.3, fontFace: "Arial", fontSize: 9, color: C.faint, align: "right", margin: 0 });
  s.addText("planar (2–2,5 Achsen)", { x: gx, y: gy + gh + 0.08, w: gw / 2, h: 0.28, fontFace: "Arial", fontSize: 9.5, color: C.faint, margin: 0 });
  s.addText("konform / 5-Achs →", { x: gx + gw / 2, y: gy + gh + 0.08, w: gw / 2, h: 0.28, align: "right", fontFace: "Arial", fontSize: 9.5, color: C.faint, margin: 0 });
  const dots = [
    // [x%, y% from top(=high price), label, color, dead]
    [0.18, 0.10, "DragonFly IV †exit", C.red],
    [0.30, 0.22, "XTPL Delta", C.mute],
    [0.62, 0.13, "nScrypt", C.mute],
    [0.72, 0.22, "Optomec AJ 5X", C.mute],
    [0.80, 0.33, "Neotech 15X † → KRONOS", C.mute],
    [0.13, 0.62, "Dimatix DMP", C.mute],
    [0.22, 0.68, "Voltera NOVA", C.teal],
    [0.10, 0.88, "V-One / SV2", C.mute],
    [0.30, 0.80, "LPKF ProtoMat (subtractive)", C.mute],
  ];
  for (const [px, py, label, col] of dots) {
    const x = gx + px * gw, y = gy + py * gh;
    s.addShape("ellipse", { x: x - 0.06, y: y - 0.06, w: 0.12, h: 0.12, fill: { color: col }, line: { type: "none" } });
    s.addText(label, { x: x + 0.1, y: y - 0.14, w: 2.1, h: 0.26, fontFace: "Calibri", fontSize: 9.5, color: col, margin: 0 });
  }
  // EOS marker in lower-right quadrant
  const ex = gx + 0.72 * gw, ey = gy + 0.72 * gh;
  s.addShape("ellipse", { x: ex - 0.4, y: ey - 0.4, w: 0.8, h: 0.8, fill: { color: "26180C", transparency: 20 }, line: { color: C.copper, width: 1.5 } });
  s.addShape("ellipse", { x: ex - 0.09, y: ey - 0.09, w: 0.18, h: 0.18, fill: { color: C.copper } });
  s.addText("KRONOS EOS", { x: ex - 1.0, y: ey + 0.42, w: 2.0, h: 0.3, align: "center", fontFace: "Arial", fontSize: 12, bold: true, color: C.copper, margin: 0 });
  // right panel
  card(s, 9.5, 1.95, 3.23, 4.55, { fill: C.panel });
  s.addText("Warum der Quadrant offen bleibt", { x: 9.75, y: 2.2, w: 2.75, h: 0.55, fontFace: "Arial", fontSize: 13, bold: true, color: C.ink, margin: 0, lineSpacing: 17 });
  s.addText([
    { text: "Incumbents: Kostenstrukturen & Kannibalisierungsangst blockieren Down-Market-Schritte", options: { bullet: { code: "2022", indent: 10 }, breakLine: true } },
    { text: "Voltera: 12–24 Monate Rückstand bei 5-Achs-CAM-Software", options: { bullet: { code: "2022", indent: 10 }, breakLine: true } },
    { text: "Neue Player (Hummink, Scrona, Quantica, XTPL) zielen alle auf Sub-Mikron-/Display-/Halbleiter-Nischen", options: { bullet: { code: "2022", indent: 10 }, breakLine: true } },
    { text: "Echte Gefahr: ein Bambu-artiger Entrant — Zeitfenster ≈ 3–5 Jahre", options: { bullet: { code: "2022", indent: 10 }, color: C.copper } },
  ], { x: 9.75, y: 2.85, w: 2.75, h: 3.4, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, paraSpaceAfter: 10, lineSpacing: 14 });
  footer(s, 11);
  s.addNotes("Vollprofile aller Anbieter inkl. Preisevidenz: research/competitors.md. † = ausgeschieden (Insolvenz/Exit).");
}

// ============================================================ 12 — PRODUCT CONCEPT
{
  const s = newSlide();
  header(s, "Produktkonzept", "KRONOS Eos — eine Plattform, drei Konfigurationen");
  const cfg = [
    { name: "EOS ONE", price: "€35k", tag: "Lehren & einsteigen", col: C.mute, feats: ["3+2-Achs indexierte Kinematik", "1 Werkzeugkopf (Mikrodispens) + UV + FFF", "±25 µm Depositionsgenauigkeit", "Kamerakalibrierung · Aion-5X Lite", "Für HAW, Colleges, Top-FabLabs"] },
    { name: "EOS FIVE", price: "€65k", tag: "Das Beachhead-Produkt", col: C.copper, hot: true, feats: ["ECHTER 5-ACHS-SIMULTANDRUCK", "2 Werkzeugköpfe: Piezo-Jet + Dispensing", "±15 µm · KI-Vision-Inspektion", "Aion-5X Pro · Material-Starterkit", "Für Forschungsgruppen & Corporate R&D"] },
    { name: "EOS MAX", price: "€95k", tag: "Qualifizieren & produzieren", col: C.teal, feats: ["5-Achs + Werkzeugwechsler (bis 4 Köpfe)", "SMD-Bestückmodul · Plasma-Option", "±10 µm · Closed-Loop-QC", "Traceability-Paket (defense-ready)", "Upsell-Pfad Richtung Hyperion-Klasse"] },
  ];
  for (let i = 0; i < 3; i++) {
    const c = cfg[i], x = 0.6 + i * 4.28;
    card(s, x, 1.95, 4.08, 4.65, { fill: c.hot ? "1E1A12" : C.card, line: c.hot ? C.copper : undefined });
    s.addText(c.name, { x: x + 0.3, y: 2.2, w: 2.4, h: 0.4, fontFace: "Arial", fontSize: 17, bold: true, color: C.ink, charSpacing: 2, margin: 0 });
    s.addText(c.price, { x: x + 2.45, y: 2.14, w: 1.35, h: 0.5, align: "right", fontFace: "Arial", fontSize: 21, bold: true, color: c.col, margin: 0 });
    s.addText(c.tag, { x: x + 0.3, y: 2.62, w: 3.5, h: 0.3, fontFace: "Calibri", fontSize: 11, italic: true, color: c.col, margin: 0 });
    s.addShape("line", { x: x + 0.3, y: 3.05, w: 3.48, h: 0, line: { color: C.line, width: 0.75 } });
    s.addText(c.feats.map((f, j) => ({ text: f, options: { bullet: { code: "2022", indent: 10 }, breakLine: j < c.feats.length - 1 } })),
      { x: x + 0.3, y: 3.2, w: 3.5, h: 2.6, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, paraSpaceAfter: 9, lineSpacing: 14 });
    if (c.hot) s.addText("≈ 55 % des geplanten Mixes", { x: x + 0.3, y: 6.12, w: 3.5, h: 0.3, fontFace: "Arial", fontSize: 10, bold: true, color: C.copper, margin: 0 });
  }
  footer(s, 12);
  s.addNotes("Vollspezifikation inkl. bewusst entfernter Features und Ziel-BOM: business-plan/business-plan.md §2.2. Preise = Arbeitshypothese (D), Van-Westendorp in Gate 0.");
}

// ============================================================ 13 — PLATFORM STRATEGY
{
  const s = newSlide();
  header(s, "Plattformstrategie", "Warum eine Plattform drei Maschinen schlägt — und die Software der Burggraben ist");
  const items = [
    ["box", "Ein Chassis, drei Stufen", "Gemeinsame 5-Achs-Basis, B&R-Steuerung, Vision-Stack. Ein Ersatzteilpool, eine CE/UL-Zertifizierung, feld-upgradefähige Stufen. F&E: 3,2 M€ statt 6–8 M€ für drei Einzelmaschinen."],
    ["gitbranch", "Aion-5X ist das eigentliche Produkt", "5-Achs-Depositions-CAM + Kalibrierung + KI-Inspektion brauchten ~15 Jahre. Es existiert bereits, skaliert grenzkostenfrei — und lizenziert an Dritte (APES Matrix6D)."],
    ["package", "Kuratiertes Materialprogramm", "Eine Silbertinte, ein Dielektrikum, zwei Polymere — qualifizierte Profile, Abo-Kits. Senkt Supportkosten, schafft die Annuität. „Experimental Mode“ erhält die Forschungsfreiheit."],
    ["shield", "Kannibalisierungs-Zaun", "Bauraum, Durchsatz, Autonomie und Materialbreite bleiben bei Helios/Hyperion (200 k€+). Eos Max ist als Zubringer gebaut, nicht als Killer — das Formlabs-Fuse-Muster, nicht MakerBot."],
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + (i % 2) * 6.23, y = 1.95 + Math.floor(i / 2) * 2.35;
    card(s, x, y, 5.9, 2.15);
    await iconChip(s, x + 0.25, y + 0.25, items[i][0], C.copper, 0.42);
    s.addText(items[i][1], { x: x + 0.82, y: y + 0.29, w: 4.8, h: 0.35, fontFace: "Arial", fontSize: 13.5, bold: true, color: C.ink, margin: 0 });
    s.addText(items[i][2], { x: x + 0.25, y: y + 0.82, w: 5.4, h: 1.25, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 14 });
  }
  footer(s, 13);
  s.addNotes("SDK bereits öffentlich (GitHub verifiziert) — Ökosystem-Ansatz ersetzt das liquidierte J.A.M.E.S. Fencing-Metriken: Upsell-Quote Eos→Hyperion wird gemessen.");
}

// ============================================================ 14 — BUSINESS MODEL
{
  const s = newSlide();
  header(s, "Geschäftsmodell", "Maschinen öffnen den Account — die installierte Basis zahlt die Marge");
  // revenue mix 2031 (Base) donut
  s.addChart("doughnut", [{
    name: "Umsatzmix 2031",
    labels: ["Maschinen 74 %", "Verbrauchsmaterial 11 %", "Services/NRE 7 %", "Wartung 5 %", "Software 3 %"],
    values: [74, 11, 7, 5, 3],
  }], {
    x: 0.6, y: 2.0, w: 4.4, h: 4.2, holeSize: 62,
    chartColors: [C.copper, C.teal, "8A5A9E", C.green, "C9A227"],
    showLegend: true, legendPos: "b", legendColor: C.mute, legendFontSize: 9.5, legendFontFace: "Calibri",
    showTitle: false, showValue: false, dataBorder: { pt: 1.5, color: C.bg },
    plotArea: { fill: { color: C.bg } },
  });
  s.addText("Umsatzmix 2031 · Base", { x: 0.6, y: 1.78, w: 4.4, h: 0.28, align: "center", fontFace: "Arial", fontSize: 11, bold: true, color: C.ink, margin: 0 });
  // right: per-machine economics
  card(s, 5.4, 1.95, 7.33, 2.2, { fill: C.panel });
  s.addText("Je installierte Maschine, pro Jahr (Base)", { x: 5.7, y: 2.16, w: 6.8, h: 0.3, fontFace: "Arial", fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
  stat(s, 5.7, 2.6, 1.7, "€5.0k", "Verbrauchsmaterial\n(kuratierte Tinten-Kits)", C.teal, 20);
  stat(s, 7.5, 2.6, 1.7, "€3.6k", "Servicevertrag\n(11 % · 50 % Attach)", C.green, 20);
  stat(s, 9.3, 2.6, 1.7, "€1.1k", "Aion-5X-Seat\n(60 % Attach)", "C9A227", 20);
  stat(s, 11.1, 2.6, 1.55, "≈€10k", "wiederkehrend je Einheit\n— wächst mit der Basis", C.copper, 20);
  // leasing / MaaS
  card(s, 5.4, 4.4, 7.33, 2.2);
  s.addText("Finanzierung für KMU-Budgets gebaut", { x: 5.7, y: 4.61, w: 6.8, h: 0.3, fontFace: "Arial", fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
  s.addText([
    { text: "Leasing über Partner (Grenke/DLL-Klasse), bilanzneutral: Eos Five ≈ 1,3–1,5 k€/Monat — eine OPEX-Entscheidung. Deutsche Leasingquote: 26,1 % aller Ausrüstungsinvestitionen (BDL 2024).", options: { breakLine: true } },
    { text: "30 % Anzahlung als Standard hält das Working Capital bei 12 % des Umsatzzuwachses. Machine-as-a-Service folgt dem Carbon-Präzedenzfall (~35–45 % des Kaufpreises pro Jahr).", options: {} },
  ], { x: 5.7, y: 5.0, w: 6.75, h: 1.5, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 14.5, paraSpaceAfter: 8 });
  footer(s, 14);
  s.addNotes("Wiederkehrender Umsatz 2031 Base: 3,0 M€ = 19% und steigend. Details: business-plan.md §3, Modell-Sheet 'Base'.");
}

// ============================================================ 15 — TAM SAM SOM
{
  const s = newSlide();
  header(s, "TAM · SAM · SOM", "Bottom-up aus gezählten Organisationen — nicht aus Analysten-Schlagzeilen");
  // funnel bars
  const fy = 2.1;
  const funnel = [
    { label: "TAM", w: 11.5, v: "≈ €1.2B", d: "10-Jahres-Equipment- + Attach-Potenzial · ~10.000 Organisationen weltweit × 1,3 Maschinen × 65 k€", col: C.card, tcol: C.ink },
    { label: "SAM", w: 7.6, v: "≈ €340M", d: "EU + Nordamerika, erreichbare Segmente 2027–2031 · ~4.200 Organisationen · ≈35–45 M€/Jahr bis 2031", col: C.cardHi, tcol: C.ink },
    { label: "SOM", w: 4.4, v: "≈ €34M", d: "KRONOS kumuliert 5 Jahre (Base): 452 Einheiten + Attach ≈ 30 % des gereiften Bandes", col: "1E1A12", tcol: C.copper },
  ];
  funnel.forEach((f, i) => {
    const y = fy + i * 1.28;
    s.addShape("roundRect", { x: 0.6, y, w: f.w, h: 1.05, rectRadius: 0.05, fill: { color: f.col }, line: { color: i === 2 ? C.copper : C.line, width: i === 2 ? 1 : 0.75 } });
    s.addText(f.label, { x: 0.9, y: y + 0.13, w: 1.2, h: 0.4, fontFace: "Arial", fontSize: 16, bold: true, color: f.tcol, margin: 0 });
    s.addText(f.v, { x: 0.9, y: y + 0.5, w: 1.8, h: 0.4, fontFace: "Arial", fontSize: 15, bold: true, color: C.copper, margin: 0 });
    if (i === 2) {
      // SOM-Box ist schmal — Beschreibung rechts daneben setzen
      s.addText(f.d, { x: 0.6 + f.w + 0.35, y: y + 0.16, w: 7.0, h: 0.8, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 14 });
    } else {
      s.addText(f.d, { x: 2.75, y: y + 0.16, w: f.w - 3.0, h: 0.8, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 14 });
    }
  });
  // honesty box
  card(s, 0.6, fy + 3.98, 12.13, 0.85, { fill: "1A1616", line: "4A3030" });
  s.addText([
    { text: "Realitäts-Check: ", options: { bold: true, color: C.red } },
    { text: "Der gesamte heutige AME-Maschinenmarkt liegt bei ~15–28 M€/Jahr. Jeder SAM-Euro darüber hinaus unterstellt eine 5–7x-Band-Expansion bis 2031 — der Konservativ-Fall unterstellt null Expansion und ist ein dokumentiertes No-Go.", options: { color: C.mute } },
  ], { x: 0.9, y: fy + 4.14, w: 11.5, h: 0.55, fontFace: "Calibri", fontSize: 11.5, margin: 0, lineSpacing: 15 });
  footer(s, 15);
  s.addNotes("Rechenweg: research/assumptions.md §5, market-analysis.md §7. Band-Expansion kalibriert an Formlabs-Elastizität (konservatives Ende) + Beschaffungsreform + Defense-Pull.");
}

// ============================================================ 16 — 5-YEAR FINANCIAL CASE
{
  const s = newSlide();
  header(s, "5-Jahres-Finanz-Case", "Base Case: 16 M€ Umsatz, 50 % Bruttomarge, EBITDA-Break-even 2031");
  const years = ["2027", "2028", "2029", "2030", "2031"];
  s.addChart([
    {
      type: "bar",
      data: [
        { name: "Maschinen", labels: years, values: [0.62, 1.94, 4.30, 7.58, 11.75] },
        { name: "Wiederkehrend (Mat.+Svc+SW)", labels: years, values: [0.04, 0.22, 0.67, 1.56, 3.02] },
        { name: "Applikationsprojekte", labels: years, values: [0.30, 0.50, 0.80, 1.00, 1.20] },
      ],
      options: { barGrouping: "stacked", chartColors: [C.copper, C.teal, "8A5A9E"] },
    },
    {
      type: "line",
      data: [{ name: "EBITDA", labels: years, values: [-2.02, -1.94, -1.82, -0.84, 1.05] }],
      options: { chartColors: [C.green], lineSize: 2.5, lineSmooth: false, lineDataSymbol: "circle", lineDataSymbolSize: 7 },
    },
  ], {
    x: 0.6, y: 1.95, w: 7.9, h: 4.6,
    showLegend: true, legendPos: "b", legendColor: C.mute, legendFontSize: 10, legendFontFace: "Calibri",
    showTitle: false, catAxisLabelColor: C.mute, catAxisLabelFontSize: 11,
    valAxisLabelColor: C.faint, valAxisLabelFontSize: 9.5, valAxisTitle: "€M", showValAxisTitle: false,
    valGridLine: { color: "1C2634", size: 0.5 }, catGridLine: { style: "none" },
    valAxisMinVal: -3, valAxisMaxVal: 16, plotArea: { fill: { color: C.bg } },
  });
  card(s, 8.75, 1.95, 3.98, 4.6, { fill: C.panel });
  s.addText("Base-Case-Anker", { x: 9.0, y: 2.18, w: 3.5, h: 0.3, fontFace: "Arial", fontSize: 13, bold: true, color: C.ink, margin: 0 });
  const anchors = [
    ["12 → 200", "Einheiten/Jahr, 2027 → 2031 (kum. 452)"],
    ["44% → 50%", "Bruttomarge bei COGS-Senkung 58 % → 48 %"],
    ["€13.2M", "Brutto-Kapitalbedarf (Cash-Tal + 15 % Puffer)"],
    ["XTPL-Check", "Vergleichsunternehmen brauchte 15–18 M€ für 13 Einheiten/Jahr — Eos startet mit fertiger Kerntechnik"],
  ];
  let ay = 2.6;
  for (const [v, l] of anchors) {
    s.addText(v, { x: 9.0, y: ay, w: 3.5, h: 0.4, fontFace: "Arial", fontSize: 17, bold: true, color: C.copper, margin: 0 });
    s.addText(l, { x: 9.0, y: ay + 0.38, w: 3.5, h: 0.55, fontFace: "Calibri", fontSize: 10, color: C.mute, margin: 0, lineSpacing: 13 });
    ay += 1.0;
  }
  footer(s, 16);
  s.addNotes("Zahlen aus financial-model.xlsx (formelvalidiert): Umsatz 0,96/2,66/5,78/10,1/16,0 M€; EBITDA -2,0/-1,9/-1,8/-0,8/+1,05 M€. Sensitivität: Stückzahlen und COGS dominieren.");
}

// ============================================================ 17 — SCENARIOS & RETURNS
{
  const s = newSlide();
  header(s, "Szenarien & Returns", "Drei Zukünfte, ehrlich bepreist — inklusive der, in der Sie verlieren");
  const sc = [
    { name: "KONSERVATIV", sub: "Keine Band-Expansion — nur heutige Nachfrage", col: C.red, fill: "1A1616", line: "4A3030",
      rows: [["Einheiten kum. 2031", "178"], ["Umsatz 2031", "4,9 M€"], ["EBITDA 2031", "−0,9 M€"], ["Break-even", "keiner"], ["MOIC / IRR (J7)", "0,3x / −18 %"]],
      verdict: "NICHT INVESTIERBAR — das dokumentierte No-Go-Szenario, vor dem die Gates schützen." },
    { name: "BASE", sub: "Band expandiert 5–7x — Formlabs-kalibriert", col: C.ink, fill: C.card,
      rows: [["Einheiten kum. 2031", "452"], ["Umsatz 2031", "16,0 M€"], ["EBITDA 2031", "+1,1 M€"], ["Break-even", "2031"], ["MOIC / IRR (J7)", "2,25x / +14 %"]],
      verdict: "Ein solides Geschäft der LPKF-Klasse — für sich allein unter der Venture-Schwelle." },
    { name: "UPSIDE", sub: "Marktschaffung: Defense, IME, Attach-Ökonomie", col: C.green, fill: "14201A", line: "2E4A3A",
      rows: [["Einheiten kum. 2031", "743"], ["Umsatz 2031", "29,1 M€"], ["EBITDA 2031", "+6,8 M€ (23 %)"], ["Break-even", "2030"], ["MOIC / IRR (J7)", "11,4x / +48 %"]],
      verdict: "Venture-tauglich. ~25–30 % Wahrscheinlichkeit tragen den Erwartungswert (≈3x blended)." },
  ];
  for (let i = 0; i < 3; i++) {
    const c = sc[i], x = 0.6 + i * 4.28;
    card(s, x, 1.9, 4.08, 4.75, { fill: c.fill, line: c.line });
    s.addText(c.name, { x: x + 0.28, y: 2.12, w: 3.5, h: 0.32, fontFace: "Arial", fontSize: 14, bold: true, color: c.col, charSpacing: 1.5, margin: 0 });
    s.addText(c.sub, { x: x + 0.28, y: 2.45, w: 3.55, h: 0.5, fontFace: "Calibri", fontSize: 10, italic: true, color: C.mute, margin: 0, lineSpacing: 12.5 });
    let ry = 3.05;
    for (const [k, v] of c.rows) {
      s.addText(k, { x: x + 0.28, y: ry, w: 2.2, h: 0.28, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0 });
      s.addText(v, { x: x + 2.2, y: ry, w: 1.6, h: 0.28, align: "right", fontFace: "Arial", fontSize: 10.5, bold: true, color: C.ink, margin: 0 });
      s.addShape("line", { x: x + 0.28, y: ry + 0.31, w: 3.52, h: 0, line: { color: C.line, width: 0.5 } });
      ry += 0.44;
    }
    s.addText(c.verdict, { x: x + 0.28, y: 5.4, w: 3.55, h: 1.1, fontFace: "Calibri", fontSize: 10, italic: true, color: c.col === C.ink ? C.mute : c.col, margin: 0, lineSpacing: 13.5 });
  }
  footer(s, 17);
  s.addNotes("Exit-Multiples: 1,0x/2,0x/3,0x Umsatz (Niche-HW-Comps; Markforged 1,2x). Returns-Sheet im XLSX. Tranchen kappen Downside auf 2,5 M€ bis Gate 2.");
}

// ============================================================ 18 — GO-TO-MARKET
{
  const s = newSlide();
  header(s, "Go-to-Market", "Community-geführt, direkt zuerst — eine Vertriebsarmee kommt später, wenn überhaupt");
  const ph = [
    { t: "PHASE A · 2027–28", n: "Forschungs-Beachhead (EU/NA)", col: C.copper,
      pts: ["LOPEC · productronica · Formnext — Award-Momentum", "Paper-Referenzprogramm: Rabatt gegen Zitierbarkeit", "Demo-Touren über das FAPS-/Fraunhofer-Netz", "Inside Sales + 2 Application Engineers · CAC ≈ 9 k€"] },
    { t: "PHASE B · 2028–29", n: "Corporate-R&D-Expansion", col: C.teal,
      pts: ["Referenzgetriebener Einstieg: ZVEI-/CLEPA-/SPECTARIS-Segmente", "Kanal-Aktivierung: APES & NTV (NA), Ex-Neotech-Partner (JP/AU)", "25 % des Volumens über Distributoren mit 30 % Rabatt", "electronica · SMTconnect · IME-Konsortien"] },
    { t: "PHASE C · 2029–31", n: "Defense · Ausbildung · Kleinserie", col: C.green,
      pts: ["Eos Max + Traceability ins SBIR-/NextFlex-Ökosystem", "Eos-One-Curriculum-Bundles für HAW & Colleges", "Erste Produktionszellen-Cluster — Hyperion-Zubringer", "APAC-Einstieg über reaktiviertes Distributorennetz"] },
  ];
  for (let i = 0; i < 3; i++) {
    const p = ph[i], x = 0.6 + i * 4.28;
    card(s, x, 1.95, 4.08, 4.65);
    s.addText(p.t, { x: x + 0.28, y: 2.18, w: 3.5, h: 0.28, fontFace: "Arial", fontSize: 10.5, bold: true, color: p.col, charSpacing: 2, margin: 0 });
    s.addText(p.n, { x: x + 0.28, y: 2.5, w: 3.55, h: 0.62, fontFace: "Arial", fontSize: 15, bold: true, color: C.ink, margin: 0, lineSpacing: 18 });
    s.addText(p.pts.map((t, j) => ({ text: t, options: { bullet: { code: "2022", indent: 10 }, breakLine: j < p.pts.length - 1 } })),
      { x: x + 0.28, y: 3.3, w: 3.55, h: 3.1, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, paraSpaceAfter: 10, lineSpacing: 14.5 });
  }
  footer(s, 18);
  s.addNotes("GTM-Details: business-plan.md §4. Kanalökonomie: 25% Kanal ab 2028 mit 30% Rabatt; CAC-Annahme messe-zentriert.");
}

// ============================================================ 19 — VALIDATION ROADMAP & INVESTMENT
{
  const s = newSlide();
  header(s, "Validierungsfahrplan", "Sechs Gates, harte Kill-Kriterien — 2,5 M€ kaufen die Wahrheit vor der Fabrik");
  const gates = [
    ["G0", "M1–3", "Discovery", "40 Interviews · ≥30 % budgetgedeckte Kaufabsicht"],
    ["G1", "M3–6", "Demand-Test", "≥10 LOIs (3 mit Anzahlungsabsicht) · Preistest"],
    ["G2", "M4–9", "Kosten & IP", "BOM ≤26 k€ · Patent-Titel geklärt"],
    ["G3", "M9–15", "Design-Partner", "5 bezahlte Piloten · ≥4 Abnahmen · Service <10 %"],
    ["G4", "M15–22", "Pilotflotte", "10 Maschinen · ≥30 Pre-Orders · Ausfälle <5 %/Q"],
    ["G5", "M22–27", "Serienfreigabe", "Stückkosten im Plan · Liefertreue >90 %"],
  ];
  const gy = 2.0;
  s.addShape("line", { x: 0.95, y: gy + 0.55, w: 11.4, h: 0, line: { color: C.line, width: 1 } });
  gates.forEach(([g, m, n, k], i) => {
    const x = 0.72 + i * 1.98;
    const active = i < 3;
    s.addShape("ellipse", { x: x + 0.62, y: gy + 0.41, w: 0.28, h: 0.28, fill: { color: active ? C.copper : C.panel }, line: { color: active ? C.copper : C.faint, width: 1 } });
    s.addText(g, { x: x + 0.62, y: gy + 0.42, w: 0.28, h: 0.26, align: "center", fontFace: "Arial", fontSize: 9, bold: true, color: active ? C.bg : C.mute, margin: 0 });
    s.addText(m, { x, y: gy, w: 1.55, h: 0.26, align: "center", fontFace: "Arial", fontSize: 9, color: C.faint, margin: 0 });
    s.addText(n, { x: x - 0.1, y: gy + 0.85, w: 1.75, h: 0.3, align: "center", fontFace: "Arial", fontSize: 11, bold: true, color: C.ink, margin: 0 });
    s.addText(k, { x: x - 0.1, y: gy + 1.16, w: 1.75, h: 0.85, align: "center", fontFace: "Calibri", fontSize: 8.5, color: C.mute, margin: 0, lineSpacing: 11 });
  });
  // tranches
  const trY = 4.35;
  const tr = [
    ["TRANCHE 1 — 2,5 M€", "Q4 2026 · finanziert G0–G4 bis zur Pilotflotte", "Das einzige heute erbetene Commitment", C.copper, "1E1A12"],
    ["TRANCHE 2 — 4,5 M€", "Q4 2027 · Industrialisierung & Launch", "Freigeschaltet durch: ≥10 LOIs · BOM ≤26 k€ · IP geklärt", C.ink, C.card],
    ["TRANCHE 3 — 4–5 M€", "Q1 2029 · Skalierung & Kanalausbau", "Freigeschaltet durch: ≥60 verkaufte Einheiten · GM ≥42 % · Service <8 %", C.ink, C.card],
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.28;
    card(s, x, trY, 4.08, 2.25, { fill: tr[i][4], line: i === 0 ? C.copper : undefined });
    s.addText(tr[i][0], { x: x + 0.28, y: trY + 0.22, w: 3.55, h: 0.32, fontFace: "Arial", fontSize: 14, bold: true, color: tr[i][3], margin: 0 });
    s.addText(tr[i][1], { x: x + 0.28, y: trY + 0.6, w: 3.55, h: 0.32, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0 });
    s.addShape("line", { x: x + 0.28, y: trY + 1.02, w: 3.52, h: 0, line: { color: C.line, width: 0.5 } });
    s.addText(tr[i][2], { x: x + 0.28, y: trY + 1.14, w: 3.55, h: 0.95, fontFace: "Calibri", fontSize: 10.5, italic: i === 0, color: i === 0 ? C.copper : C.mute, margin: 0, lineSpacing: 14 });
  }
  footer(s, 19);
  s.addNotes("Stage-Gate-Plan mit STOP-Szenarien: business-plan.md §9. Fördermittel 0,8-3,3 M€ (ZIM sicher, EIC als Hebel) + WC-Linie ~2 M€ ergänzen die Tranchen zur 13,2-M€-Deckung.");
}

// ============================================================ 20 — DECISION
{
  const s = newSlide();
  header(s, "Investment-These — Entscheidung", "Substanz vor Optimismus", { noTrace: true });
  trace(s, { color: C.copper });
  // left: thesis
  card(s, 0.6, 1.9, 7.3, 4.75, { fill: "1E1A12", line: C.copper });
  s.addText("DIE WETTE", { x: 0.9, y: 2.12, w: 6.7, h: 0.3, fontFace: "Arial", fontSize: 11, bold: true, color: C.copper, charSpacing: 3, margin: 0 });
  s.addText("Für 2,5 M€ kauft der Investor die Option auf die einzige unbesetzte Formlabs-Position der 3D-gedruckten Elektronik — bewiesene 5-Achs-Technologie, ein leeres Preisband, ein bereinigtes Feld und Vergaberegeln, die sich gerade zu ihren Gunsten gedreht haben.", {
    x: 0.9, y: 2.45, w: 6.7, h: 1.15, fontFace: "Calibri", fontSize: 13.5, color: C.ink, margin: 0, lineSpacing: 19 });
  const conds = [
    ["check", "GO — unter Bedingungen", "T1 nach drei Pre-Closing-Prüfungen committen: IP-Titel, Bindung des Software-Teams, saubere Insolvenz-Altlasten.", C.green],
    ["x", "STOPP an den Gates, wenn", "<10 LOIs in 6 Monaten · BOM >32 k€ · NOVA-Proxy <30 Einheiten/Jahr · Servicekosten >12 % in Piloten.", C.red],
    ["alert", "GAR NICHT investieren, wenn", "Sie einen sicheren Venture-Return brauchen: Nur der Upside-Pfad (~25–30 % Wahrscheinlichkeit) ist venture-tauglich. Das ist eine Option, kein Versprechen.", C.copper],
  ];
  let cy2 = 3.75;
  for (const [ic, t, d, col] of conds) {
    await iconChip(s, 0.9, cy2, ic, col, 0.36);
    s.addText([
      { text: t + "  —  ", options: { bold: true, color: C.ink } },
      { text: d, options: { color: C.mute } },
    ], { x: 1.4, y: cy2 - 0.05, w: 6.15, h: 0.9, fontFace: "Calibri", fontSize: 11, margin: 0, lineSpacing: 14.5 });
    cy2 += 0.98;
  }
  // right: the three strongest counter-arguments
  card(s, 8.2, 1.9, 4.53, 4.75, { fill: C.panel });
  s.addText("WAS DER SKEPTIKER SAGT", { x: 8.5, y: 2.12, w: 4, h: 0.3, fontFace: "Arial", fontSize: 11, bold: true, color: C.mute, charSpacing: 2, margin: 0 });
  const skeps = [
    "Jeder Vorgänger scheiterte oder blieb klein — vielleicht ist die Lücke fehlende Nachfrage, kein Marktversagen.",
    "Null verifizierte KRONOS-Verkäufe seit Relaunch — die Ausführung durch ein ~6-Personen-Team ist unbewiesen.",
    "Akademische Beachheads sind förderzyklisch und bestellen nicht nach — der Corporate-/Defense-Sprung muss aktiv gelingen.",
  ];
  let sy = 2.5;
  skeps.forEach((t, i) => {
    s.addText(String(i + 1), { x: 8.5, y: sy, w: 0.4, h: 0.4, fontFace: "Arial", fontSize: 20, bold: true, color: C.faint, margin: 0 });
    s.addText(t, { x: 9.0, y: sy + 0.02, w: 3.55, h: 0.9, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 13.5 });
    sy += 0.92;
  });
  s.addShape("line", { x: 8.5, y: sy, w: 3.95, h: 0, line: { color: C.line, width: 0.75 } });
  s.addText("Diese Argumente werden nicht weggewischt — sie sind die Gates. Halten sie, ist der Verlust 2,5 M€ und ein sauberer Stopp. Fallen sie, ist die Position kategorie-definierend.", {
    x: 8.5, y: sy + 0.12, w: 3.95, h: 1.15, fontFace: "Calibri", fontSize: 10, italic: true, color: C.copper, margin: 0, lineSpacing: 13.5 });
  footer(s, 20);
  s.addNotes("Vollständige No-Go-Bedingungen und die 10 Investorenfragen: business-plan/investment-thesis.md. Erwartungswert ~3x MOIC (30/45/25-Gewichtung, Exit J7).");
}

await pres.writeFile({ fileName: "presentation/kronos-investor-deck-de.pptx" });
console.log("kronos-investor-deck-de.pptx geschrieben (20 Slides, DE).");
})().catch((e) => { console.error(e); process.exit(1); });
