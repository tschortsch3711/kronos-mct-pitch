#!/usr/bin/env node
/* Erzeugt presentation/kronos-investor-deck.pptx — 20 Slides, Premium Industrial Design.
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
  s.addText("The dawn of accessible 3D-printed electronics.", {
    x: 0.6, y: 4.55, w: 8.5, h: 0.5, fontFace: "Calibri", fontSize: 19, color: C.ink, italic: true, margin: 0,
  });
  s.addText("Investment case for a 25k–100k € five-axis AME platform\nbuilt on the technology of the category's pioneer.", {
    x: 0.6, y: 5.15, w: 8.5, h: 0.8, fontFace: "Calibri", fontSize: 13, color: C.mute, margin: 0, lineSpacing: 19 });
  s.addText("INVESTOR DUE DILIGENCE PACKAGE   ·   AUGUST 2026   ·   CONFIDENTIAL", {
    x: 0.6, y: 6.75, w: 9, h: 0.3, fontFace: "Arial", fontSize: 9.5, color: C.faint, charSpacing: 3, margin: 0 });
  s.addNotes("Vision: KRONOS Eos verlagert bewiesene 5-Achs-AME-Technologie in das leere 25-100k-Preisband. Alle Zahlen: financial-model.xlsx, Evidenzstufen research/assumptions.md.");
}

// ============================================================ 02 — INVESTMENT OPPORTUNITY
{
  const s = newSlide();
  header(s, "Investment Opportunity", "An option-structured bet on the vacant middle of 3D-printed electronics");
  const y0 = 1.75;
  card(s, 0.6, y0, 5.9, 4.9);
  s.addText("The ask", { x: 0.9, y: y0 + 0.25, w: 5, h: 0.3, fontFace: "Arial", fontSize: 13, bold: true, color: C.copper, margin: 0 });
  s.addText([
    { text: "€2.5M Tranche 1 ", options: { bold: true, color: C.ink, fontSize: 16 } },
    { text: "of a €13.2M staged plan — committed only gate by gate.", options: { color: C.mute, fontSize: 13 } },
  ], { x: 0.9, y: y0 + 0.6, w: 5.3, h: 0.7, fontFace: "Calibri", margin: 0, lineSpacing: 19 });
  const asks = [
    ["check", "Proven 5-axis core technology — acquired at distressed cost from the Neotech insolvency"],
    ["check", "Only vendor able to put true 5-axis AME below every procurement threshold"],
    ["check", "Category leadership vacant: Nano Dimension exited AME in April 2026"],
    ["alert", "Honest framing: today's machine market is small — this is a market-creation bet with capped downside"],
  ];
  let yy = y0 + 1.5;
  for (const [ic, t] of asks) {
    await iconChip(s, 0.9, yy, ic, ic === "alert" ? C.copper : C.green, 0.36);
    s.addText(t, { x: 1.4, y: yy - 0.06, w: 4.85, h: 0.75, fontFace: "Calibri", fontSize: 11.5, color: C.ink, margin: 0, lineSpacing: 14 });
    yy += 0.84;
  }
  // right: scenario stats
  card(s, 6.8, y0, 5.9, 4.9, { fill: C.panel });
  s.addText("What the staged €13.2M can build (Base case)", { x: 7.1, y: y0 + 0.25, w: 5.4, h: 0.3, fontFace: "Arial", fontSize: 13, bold: true, color: C.ink, margin: 0 });
  stat(s, 7.1, y0 + 0.85, 2.6, "€16.0M", "revenue 2031\n(Base case)", C.ink);
  stat(s, 9.85, y0 + 0.85, 2.6, "452", "machines installed\nby 2031", C.ink);
  stat(s, 7.1, y0 + 2.25, 2.6, "50%", "gross margin 2031,\n19% recurring revenue", C.teal);
  stat(s, 9.85, y0 + 2.25, 2.6, "2031", "EBITDA break-even\n(Upside: 2030)", C.teal);
  stat(s, 7.1, y0 + 3.65, 2.6, "11.4x", "MOIC in the Upside path\n(IRR ≈ 48%, exit yr 7)", C.green);
  stat(s, 9.85, y0 + 3.65, 2.6, "€2.5M", "maximum at risk before\nseries-production gate", C.copper);
  footer(s, 2);
  s.addNotes("Struktur: T1 2,5M validiert; T2 4,5M industrialisiert; T3 4-5M skaliert. Konservativ-Szenario = No-Go (Slide 17). Erwartungswert ~3x MOIC bei 30/45/25-Gewichtung.");
}

// ============================================================ 03 — KRONOS TODAY
{
  const s = newSlide();
  header(s, "KRONOS Today", "The pioneer's technology, reborn as a startup");
  // timeline
  const ty = 2.05;
  s.addShape("line", { x: 0.8, y: ty + 0.55, w: 11.7, h: 0, line: { color: C.line, width: 1 } });
  const steps = [
    ["2009–10", "Neotech AMT develops 3D-printed electronics; installs world's first 5-axis 3D-PE system", C.mute],
    ["2013", "First mass-production install — printed 3D antennas, millions of parts per year", C.mute],
    ["2024", "Neotech insolvency (AG Nürnberg). KRONOS Mechatronics acquires the assets", C.copper],
    ["2025", "Relaunch Helios & Hyperion · APES partnership (North America) · productronica", C.ink],
    ["2026", "LOPEC Start-up Award “Best Business Potential” · Aion-5X SDK published", C.green],
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
    ["cpu", "Technology", "Modular 5-axis platforms, ±5 µm; piezo-jet, inkjet, dispensing, FFF; plasma, UV, milling, SMD placement"],
    ["gitbranch", "Software moat", "Aion-5X CAD/CAM: 5-axis simultaneous toolpaths, collision simulation, AI vision QC — with public SDK"],
    ["globe", "Channels & visibility", "APES + NTV (USA), Nürnberg AME cluster (FAPS/FAU), OE-A / LOPEC community"],
    ["alert", "The honest gap", "~6-person team, no verified sale since relaunch, patent chain-of-title unverified → gates V1–V7"],
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
  header(s, "The Problem", "Brilliant technology, trapped in a €200k+ project business");
  stat(s, 0.6, 1.9, 3.6, "~100–190", "AME machines sold per year, worldwide, across all vendors (bottom-up)", C.ink, 30);
  stat(s, 4.5, 1.9, 3.4, "€15–28M", "total annual AME machine market today — smaller than one mid-size Mittelstand firm", C.ink, 30);
  stat(s, 8.3, 1.9, 4.2, "50–80%", "of placements are grant-funded research buys — one-off, non-repeating", C.ink, 30);
  // casualties panel
  const cy = 3.5;
  card(s, 0.6, cy, 12.13, 3.3, { fill: "1A1616", line: "4A3030" });
  s.addText("2024–2026: the category cleared itself out", { x: 0.9, y: cy + 0.22, w: 11, h: 0.35, fontFace: "Arial", fontSize: 14, bold: true, color: C.red, margin: 0 });
  const cas = [
    ["Neotech AMT", "The 5-axis pioneer — insolvent July 2024 after ~20 years and ~50 systems. Its assets became KRONOS."],
    ["Nano Dimension", "Raised ~$1.5B. Sold ~51 DragonFly systems. Exited AME in April 2026 for $2M upfront — the leader left at scrap value."],
    ["J.A.M.E.S GmbH", "The Hensoldt-backed AME community platform — liquidated August 2025. The ecosystem lost its anchor."],
  ];
  cas.forEach(([n, t], i) => {
    const x = 0.9 + i * 4.0;
    s.addText(n, { x, y: cy + 0.75, w: 3.7, h: 0.3, fontFace: "Arial", fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
    s.addText(t, { x, y: cy + 1.1, w: 3.7, h: 1.3, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 14 });
  });
  s.addText([
    { text: "The diagnosis: ", options: { bold: true, color: C.ink } },
    { text: "every player sold €150–500k project machines into a research niche. Nobody productized the technology for the budgets that actually buy lab equipment.", options: { color: C.mute } },
  ], { x: 0.9, y: cy + 2.5, w: 11.4, h: 0.6, fontFace: "Calibri", fontSize: 12.5, margin: 0, lineSpacing: 17 });
  footer(s, 4);
  s.addNotes("Bottom-up-Herleitung der Einheiten: research/appendix/dossier-verification-2.md. Nano-Exit: 3DPrint.com 04/2026. Neotech: IN 771/24.");
}

// ============================================================ 05 — WHY MACHINES LIMIT MARKET SIZE
{
  const s = newSlide();
  header(s, "Why current machines limit the market", "Procurement thresholds decide who can buy — today's prices sit above all of them");
  // threshold ladder graphic
  const gx = 0.9, gw = 7.3, gy = 1.95, gh = 4.6;
  const maxV = 450; // k€ scale
  const bands = [
    { v: 400, label: "DragonFly IV ≈ €400k", col: C.red, type: "machine" },
    { v: 333, label: "Optomec production ≈ €333k", col: C.red, type: "machine" },
    { v: 221, label: "EU tender threshold — €221k", col: C.mute, type: "rule" },
    { v: 200, label: "DFG review (university) — €200k  ·  Neotech 15X ≈ €200k", col: C.mute, type: "rule", below: true },
    { v: 100, label: "DE direct award (2025) · DFG HAW · NSF MRI — all ≈ €/$100k", col: C.green, type: "rule" },
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
  s.addText("Below €100k, a machine purchase changes species", { x: 8.9, y: 2.2, w: 3.6, h: 0.7, fontFace: "Arial", fontSize: 14, bold: true, color: C.ink, margin: 0, lineSpacing: 18 });
  const rules = [
    ["No EU tender, no DFG review — a department-level decision", "check"],
    ["Fits a single US faculty startup package ($300–500k)", "check"],
    ["German direct-award limit raised to €100k in 2025 — the door just opened", "zap"],
    ["Buying window: weeks, not budget years", "clock"],
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
  header(s, "The Low-Cost Opportunity", "The 25–100k € band is empty — for the machines that matter");
  // three tiers horizontal
  const ty = 2.0, th = 4.35;
  const tiers = [
    { x: 0.6, w: 3.4, title: "DESKTOP · <€12k", fill: C.card, items: ["Voltera V-One  ·  ~$5k", "BotFactory SV2  ·  ~$10k", "nano3Dprint  ·  ~$5k"], note: "Planar, education-grade.\n5,000+ Voltera units prove the buyer base exists.", col: C.mute },
    { x: 4.2, w: 4.9, title: "€25–100k · THE GAP", fill: "1E1A12", items: ["Voltera NOVA  ·  $46k  —  planar only", "Fujifilm Dimatix  ·  ~$55k  —  planar only", "LPKF ProtoMat  ·  subtractive milling"], note: "NO five-axis / conformal AME system exists here.\nThe defining capability of 3D electronics is absent\nfrom the only band procurement loves.", col: C.copper, hot: true },
    { x: 9.3, w: 3.43, title: "INDUSTRIAL · >€150k", fill: C.card, items: ["Neotech/KRONOS 15X-class · €200k", "XTPL Delta  ·  €170–220k", "Optomec, nScrypt  ·  €150–500k"], note: "Quote-only project machines.\nThe tier that bankrupted its pioneer.", col: C.mute },
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
  header(s, "Proof the band buys", "Machines at this price point sell in the thousands — just not additive 3D ones yet");
  const py = 1.95;
  const proofs = [
    ["5,000+", "Voltera units shipped to 92 countries — NASA, MIT, Harvard, Stanford, Oxford among customers", "The buyer universe is real and global"],
    ["€26.2M", "LPKF Development segment revenue 2024 — “thousands” of ProtoMat benchtop PCB machines installed", "EE labs pay 10–60k € for in-house prototyping, for decades"],
    ["130,000+", "Formlabs printers sold after cutting professional SLA prices ~10x — a $2B company", "The 10x price-cut playbook works for professional machines"],
    ["40+ / 13", "XTPL Delta systems cumulative / delivered in 2025 alone at €170–220k — 71% research customers", "Even at 3x our price, research demand is accelerating"],
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
  header(s, "New Customer Universe", "~10,000 organizations that could never buy a €250k machine");
  const segs = [
    ["University research labs (EE/materials)", 1450],
    ["Corporate R&D — medtech SMEs", 1900],
    ["Corporate R&D — electronics OEMs", 1800],
    ["Education — HAW / eng. colleges", 1350],
    ["Automotive suppliers (IME, sensors)", 1100],
    ["Aerospace & defense R&D sites", 900],
    ["Research institutes / RTOs", 700],
    ["EMS & PCB prototyping services", 700],
    ["FabLabs (institutional) + startups", 450],
  ];
  s.addChart("bar", [{
    name: "Organizations",
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
  s.addText("Counted bottom-up, not asserted", { x: 9.2, y: 2.1, w: 3.3, h: 0.6, fontFace: "Arial", fontSize: 13, bold: true, color: C.ink, margin: 0, lineSpacing: 17 });
  s.addText("963 research-active EE universities (Research.com) · 76 Fraunhofer institutes · ZVEI 1,100+ · CLEPA 3,000+ · MedTech Europe 38,000 (90% SME) · in4ma 2,160 EMS · relevance-filtered per segment.",
    { x: 9.2, y: 2.75, w: 3.3, h: 1.9, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 15 });
  stat(s, 9.2, 4.85, 3.3, "~10,000", "candidate organizations — vs. ~150 machines the industry sells per year today", C.copper, 28);
  footer(s, 8);
  s.addNotes("Populationstabelle: research/assumptions.md §5, Segmentdetails research/customer-segments.md §1. Relevanzfilter je Segment dokumentiert.");
}

// ============================================================ 09 — SEGMENTATION & BEACHHEAD
{
  const s = newSlide();
  header(s, "Market Segmentation", "One beachhead, two expansions — sequenced by procurement friction");
  const cols = [
    { x: 0.6, w: 4.3, tag: "BEACHHEAD · YEAR 1–2", col: C.copper, title: "Research labs & institutes (EU/NA)", fill: "1E1A12",
      pts: ["~2,150 organizations, tender-free below €100k", "Technically tolerant — research forgives v1.0", "Every paper is a free reference (Voltera playbook)", "KRONOS home turf: FAPS cluster, LOPEC award"] },
    { x: 5.1, w: 3.8, tag: "EXPANSION · YEAR 2–3", col: C.teal, title: "Corporate R&D — electronics, automotive/IME, medtech", fill: C.card,
      pts: ["Reference-driven entry from beachhead", "IP-sensitive iteration stays in-house", "IME pre-development without tooling cost", "~4,800 filtered organizations"] },
    { x: 9.1, w: 3.63, tag: "EXPANSION · YEAR 3–5", col: C.green, title: "Defense & space labs · education fleets · small series", fill: C.card,
      pts: ["DoD AM budget: $0.3B → $0.8B → ~$2.6B (2030e)", "Eos Max + traceability via APES/NTV", "Eos One curriculum bundles", "Production cells feed Hyperion upsell"] },
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
  header(s, "Use Cases", "Jobs to be done — what a €65k five-axis machine gets hired for");
  const jt = [
    ["award", "Publish first", "“Print the 3D antenna / conformal sensor the competing group can't.” Five-axis capability is publication-grade differentiation — the strongest academic buying motive."],
    ["clock", "Iterate same-day", "“From CAD to functional 3D circuit before the evening — not a 3-week offshore loop.” Substitutes cap value only for flat standard PCBs; 3D iteration has no substitute."],
    ["shield", "Keep IP in-house", "“Defense, automotive pre-development and medical prototypes never leave the building.” ITAR/IP-sensitive work structurally cannot use board services."],
    ["users", "Train the next cohort", "“Teach industry-relevant AME on real hardware.” Curriculum seats seed tomorrow's corporate purchases — the LPKF ProtoMat dynamic for 40 years."],
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
  header(s, "Competitive Landscape", "Alone in the quadrant that matters");
  const gx = 1.5, gy = 1.95, gw = 7.6, gh = 4.55;
  s.addShape("rect", { x: gx, y: gy, w: gw, h: gh, fill: { color: C.panel }, line: { color: C.line, width: 0.75 } });
  s.addShape("line", { x: gx + gw / 2, y: gy, w: 0, h: gh, line: { color: C.line, width: 0.75, dashType: "dash" } });
  s.addShape("line", { x: gx, y: gy + gh / 2, w: gw, h: 0, line: { color: C.line, width: 0.75, dashType: "dash" } });
  s.addText("PRICE →  high", { x: gx - 1.28, y: gy + 0.1, w: 1.2, h: 0.3, fontFace: "Arial", fontSize: 9, color: C.faint, align: "right", margin: 0 });
  s.addText("low", { x: gx - 1.28, y: gy + gh - 0.35, w: 1.2, h: 0.3, fontFace: "Arial", fontSize: 9, color: C.faint, align: "right", margin: 0 });
  s.addText("planar (2–2.5 axis)", { x: gx, y: gy + gh + 0.08, w: gw / 2, h: 0.28, fontFace: "Arial", fontSize: 9.5, color: C.faint, margin: 0 });
  s.addText("conformal / 5-axis →", { x: gx + gw / 2, y: gy + gh + 0.08, w: gw / 2, h: 0.28, align: "right", fontFace: "Arial", fontSize: 9.5, color: C.faint, margin: 0 });
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
  s.addText("Why the quadrant stays open", { x: 9.75, y: 2.2, w: 2.75, h: 0.55, fontFace: "Arial", fontSize: 13, bold: true, color: C.ink, margin: 0, lineSpacing: 17 });
  s.addText([
    { text: "Incumbents: cost structures & cannibalization fear block down-market moves", options: { bullet: { code: "2022", indent: 10 }, breakLine: true } },
    { text: "Voltera: 12–24 months behind on 5-axis CAM software", options: { bullet: { code: "2022", indent: 10 }, breakLine: true } },
    { text: "New entrants (Hummink, Scrona, Quantica, XTPL) all target sub-micron / display / semiconductor niches", options: { bullet: { code: "2022", indent: 10 }, breakLine: true } },
    { text: "Real threat: a Bambu-style entrant — window ≈ 3–5 years", options: { bullet: { code: "2022", indent: 10 }, color: C.copper } },
  ], { x: 9.75, y: 2.85, w: 2.75, h: 3.4, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, paraSpaceAfter: 10, lineSpacing: 14 });
  footer(s, 11);
  s.addNotes("Vollprofile aller Anbieter inkl. Preisevidenz: research/competitors.md. † = ausgeschieden (Insolvenz/Exit).");
}

// ============================================================ 12 — PRODUCT CONCEPT
{
  const s = newSlide();
  header(s, "Product Concept", "KRONOS Eos — one platform, three configurations");
  const cfg = [
    { name: "EOS ONE", price: "€35k", tag: "Teach & enter", col: C.mute, feats: ["3+2-axis indexed kinematics", "1 toolhead (micro-dispense) + UV + FFF", "±25 µm deposition accuracy", "Camera calibration · Aion-5X Lite", "For HAW, colleges, top fab labs"] },
    { name: "EOS FIVE", price: "€65k", tag: "The beachhead product", col: C.copper, hot: true, feats: ["TRUE 5-AXIS SIMULTANEOUS printing", "2 toolheads: piezo-jet + dispensing", "±15 µm · AI vision inspection", "Aion-5X Pro · materials starter kit", "For research groups & corporate R&D"] },
    { name: "EOS MAX", price: "€95k", tag: "Qualify & produce", col: C.teal, feats: ["5-axis + toolchanger (up to 4 heads)", "SMD placement module · plasma option", "±10 µm · closed-loop QC", "Traceability package (defense-ready)", "Upsell path toward Hyperion class"] },
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
    if (c.hot) s.addText("≈ 55% of projected mix", { x: x + 0.3, y: 6.12, w: 3.5, h: 0.3, fontFace: "Arial", fontSize: 10, bold: true, color: C.copper, margin: 0 });
  }
  footer(s, 12);
  s.addNotes("Vollspezifikation inkl. bewusst entfernter Features und Ziel-BOM: business-plan/business-plan.md §2.2. Preise = Arbeitshypothese (D), Van-Westendorp in Gate 0.");
}

// ============================================================ 13 — PLATFORM STRATEGY
{
  const s = newSlide();
  header(s, "Platform Strategy", "Why one platform beats three machines — and why the software is the moat");
  const items = [
    ["box", "One chassis, three tiers", "Shared 5-axis base, B&R control, vision stack. One spare-parts pool, one CE/UL certification, field-upgradeable tiers. R&D: €3.2M instead of €6–8M for three separate machines."],
    ["gitbranch", "Aion-5X is the real product", "5-axis deposition CAM + calibration + AI inspection took ~15 years to build. It already exists, scales at zero marginal cost — and licenses to third parties (APES Matrix6D)."],
    ["package", "Curated materials program", "One silver ink, one dielectric, two polymers — qualified profiles, subscription kits. Cuts support cost, creates the annuity. “Experimental mode” keeps research freedom."],
    ["shield", "Cannibalization fence", "Build volume, throughput, autonomy and material breadth stay with Helios/Hyperion (€200k+). Eos Max is designed as the feeder, not the killer — the Formlabs-Fuse pattern, not MakerBot."],
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
  header(s, "Business Model", "Machines open the account — the installed base pays the margin");
  // revenue mix 2031 (Base) donut
  s.addChart("doughnut", [{
    name: "Revenue mix 2031",
    labels: ["Machines 74%", "Consumables 11%", "Services/NRE 7%", "Maintenance 5%", "Software 3%"],
    values: [74, 11, 7, 5, 3],
  }], {
    x: 0.6, y: 2.0, w: 4.4, h: 4.2, holeSize: 62,
    chartColors: [C.copper, C.teal, "8A5A9E", C.green, "C9A227"],
    showLegend: true, legendPos: "b", legendColor: C.mute, legendFontSize: 9.5, legendFontFace: "Calibri",
    showTitle: false, showValue: false, dataBorder: { pt: 1.5, color: C.bg },
    plotArea: { fill: { color: C.bg } },
  });
  s.addText("Revenue mix 2031 · Base", { x: 0.6, y: 1.78, w: 4.4, h: 0.28, align: "center", fontFace: "Arial", fontSize: 11, bold: true, color: C.ink, margin: 0 });
  // right: per-machine economics
  card(s, 5.4, 1.95, 7.33, 2.2, { fill: C.panel });
  s.addText("Per installed machine, per year (Base)", { x: 5.7, y: 2.16, w: 6.8, h: 0.3, fontFace: "Arial", fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
  stat(s, 5.7, 2.6, 1.7, "€5.0k", "consumables\n(curated ink kits)", C.teal, 20);
  stat(s, 7.5, 2.6, 1.7, "€3.6k", "service contract\n(11% · 50% attach)", C.green, 20);
  stat(s, 9.3, 2.6, 1.7, "€1.1k", "Aion-5X seat\n(60% attach)", "C9A227", 20);
  stat(s, 11.1, 2.6, 1.55, "≈€10k", "recurring per unit\n— growing with base", C.copper, 20);
  // leasing / MaaS
  card(s, 5.4, 4.4, 7.33, 2.2);
  s.addText("Financing built for SME budgets", { x: 5.7, y: 4.61, w: 6.8, h: 0.3, fontFace: "Arial", fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
  s.addText([
    { text: "Leasing via partners (Grenke/DLL class), balance-sheet neutral: Eos Five ≈ €1.3–1.5k/month — an OPEX decision. German equipment-leasing share: 26.1% of all equipment investment (BDL 2024).", options: { breakLine: true } },
    { text: "30% down-payment standard keeps working capital at 12% of revenue growth. Machine-as-a-Service tier follows the Carbon precedent (~35–45% of sale price per year).", options: {} },
  ], { x: 5.7, y: 5.0, w: 6.75, h: 1.5, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 14.5, paraSpaceAfter: 8 });
  footer(s, 14);
  s.addNotes("Wiederkehrender Umsatz 2031 Base: 3,0 M€ = 19% und steigend. Details: business-plan.md §3, Modell-Sheet 'Base'.");
}

// ============================================================ 15 — TAM SAM SOM
{
  const s = newSlide();
  header(s, "TAM · SAM · SOM", "Sized bottom-up from counted organizations — not from analyst headlines");
  // funnel bars
  const fy = 2.1;
  const funnel = [
    { label: "TAM", w: 11.5, v: "≈ €1.2B", d: "10-yr equipment + attach potential · ~10,000 organizations worldwide × 1.3 machines × €65k", col: C.card, tcol: C.ink },
    { label: "SAM", w: 7.6, v: "≈ €340M", d: "EU + North America, reachable segments 2027–2031 · ~4,200 organizations · ≈€35–45M/yr by 2031", col: C.cardHi, tcol: C.ink },
    { label: "SOM", w: 4.4, v: "≈ €34M", d: "KRONOS cumulative 5-yr (Base): 452 units + attach ≈ 30% of the matured band", col: "1E1A12", tcol: C.copper },
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
    { text: "Reality check: ", options: { bold: true, color: C.red } },
    { text: "today's entire AME machine market is ~€15–28M/yr. Every euro of SAM beyond that assumes the band expands 5–7x by 2031 — the Conservative case assumes zero expansion and is a documented no-go.", options: { color: C.mute } },
  ], { x: 0.9, y: fy + 4.14, w: 11.5, h: 0.55, fontFace: "Calibri", fontSize: 11.5, margin: 0, lineSpacing: 15 });
  footer(s, 15);
  s.addNotes("Rechenweg: research/assumptions.md §5, market-analysis.md §7. Band-Expansion kalibriert an Formlabs-Elastizität (konservatives Ende) + Beschaffungsreform + Defense-Pull.");
}

// ============================================================ 16 — 5-YEAR FINANCIAL CASE
{
  const s = newSlide();
  header(s, "5-Year Financial Case", "Base case: €16M revenue, 50% gross margin, EBITDA break-even 2031");
  const years = ["2027", "2028", "2029", "2030", "2031"];
  s.addChart([
    {
      type: "bar",
      data: [
        { name: "Machines", labels: years, values: [0.62, 1.94, 4.30, 7.58, 11.75] },
        { name: "Recurring (mat.+svc+SW)", labels: years, values: [0.04, 0.22, 0.67, 1.56, 3.02] },
        { name: "Application projects", labels: years, values: [0.30, 0.50, 0.80, 1.00, 1.20] },
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
  s.addText("Base case anchors", { x: 9.0, y: 2.18, w: 3.5, h: 0.3, fontFace: "Arial", fontSize: 13, bold: true, color: C.ink, margin: 0 });
  const anchors = [
    ["12 → 200", "units/yr, 2027 → 2031 (cum. 452)"],
    ["44% → 50%", "gross margin as COGS falls 58% → 48%"],
    ["€13.2M", "gross funding need (peak cash + 15% buffer)"],
    ["XTPL check", "comparable needed €15–18M for 13 units/yr — Eos starts with finished core tech"],
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
  header(s, "Scenarios & Returns", "Three futures, honestly priced — including the one where you lose");
  const sc = [
    { name: "CONSERVATIVE", sub: "No band expansion — today's demand only", col: C.red, fill: "1A1616", line: "4A3030",
      rows: [["Units cum. 2031", "178"], ["Revenue 2031", "€4.9M"], ["EBITDA 2031", "−€0.9M"], ["Break-even", "none"], ["MOIC / IRR (yr 7)", "0.3x / −18%"]],
      verdict: "NOT INVESTABLE — this is the documented no-go scenario the gates protect against." },
    { name: "BASE", sub: "Band expands 5–7x — Formlabs-calibrated", col: C.ink, fill: C.card,
      rows: [["Units cum. 2031", "452"], ["Revenue 2031", "€16.0M"], ["EBITDA 2031", "+€1.1M"], ["Break-even", "2031"], ["MOIC / IRR (yr 7)", "2.25x / +14%"]],
      verdict: "A solid LPKF-class business — below venture threshold on its own." },
    { name: "UPSIDE", sub: "Market creation: defense, IME, attach economy", col: C.green, fill: "14201A", line: "2E4A3A",
      rows: [["Units cum. 2031", "743"], ["Revenue 2031", "€29.1M"], ["EBITDA 2031", "+€6.8M (23%)"], ["Break-even", "2030"], ["MOIC / IRR (yr 7)", "11.4x / +48%"]],
      verdict: "Venture-grade. ~25–30% probability carries the deal's expected value (≈3x blended)." },
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
  header(s, "Go-to-Market", "Community-led, direct-first — a sales army comes later, if ever");
  const ph = [
    { t: "PHASE A · 2027–28", n: "Research beachhead (EU/NA)", col: C.copper,
      pts: ["LOPEC · productronica · Formnext presence — award momentum", "Paper-reference program: discount for citability", "Demo tours via FAPS / Fraunhofer network", "Inside sales + 2 application engineers · CAC ≈ €9k"] },
    { t: "PHASE B · 2028–29", n: "Corporate R&D expansion", col: C.teal,
      pts: ["Reference-driven entry: ZVEI / CLEPA / SPECTARIS segments", "Channel activation: APES & NTV (NA), ex-Neotech partners (JP/AU)", "25% of volume through distributors at 30% discount", "electronica · SMTconnect · IME consortia"] },
    { t: "PHASE C · 2029–31", n: "Defense · education · small series", col: C.green,
      pts: ["Eos Max + traceability into SBIR / NextFlex ecosystem", "Eos One curriculum bundles for HAW & colleges", "First production-cell clusters — Hyperion feeder", "APAC entry via reactivated distributor network"] },
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
  header(s, "Validation Roadmap", "Six gates, hard kill criteria — €2.5M buys the truth before the factory");
  const gates = [
    ["G0", "M1–3", "Discovery", "40 interviews · ≥30% budget-backed intent"],
    ["G1", "M3–6", "Demand test", "≥10 LOIs (3 with deposit intent) · price test"],
    ["G2", "M4–9", "Cost & IP", "BOM ≤€26k · patent chain-of-title cleared"],
    ["G3", "M9–15", "Design partners", "5 paid pilots · ≥4 accept · service <10%"],
    ["G4", "M15–22", "Pilot fleet", "10 machines · ≥30 pre-orders · failures <5%/q"],
    ["G5", "M22–27", "Series release", "unit cost on plan · delivery >90%"],
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
    ["TRANCHE 1 — €2.5M", "Q4 2026 · funds G0–G4 through pilot fleet", "The only commitment requested today", C.copper, "1E1A12"],
    ["TRANCHE 2 — €4.5M", "Q4 2027 · industrialization & launch", "Unlocked by: ≥10 LOIs · BOM ≤€26k · IP cleared", C.ink, C.card],
    ["TRANCHE 3 — €4–5M", "Q1 2029 · scale & channel build-out", "Unlocked by: ≥60 units sold · GM ≥42% · service <8%", C.ink, C.card],
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
  header(s, "Investment Thesis — Decision", "Substance over optimism", { noTrace: true });
  trace(s, { color: C.copper });
  // left: thesis
  card(s, 0.6, 1.9, 7.3, 4.75, { fill: "1E1A12", line: C.copper });
  s.addText("THE BET", { x: 0.9, y: 2.12, w: 6.7, h: 0.3, fontFace: "Arial", fontSize: 11, bold: true, color: C.copper, charSpacing: 3, margin: 0 });
  s.addText("For €2.5M, the investor buys the option on the only unclaimed Formlabs position in 3D-printed electronics — proven 5-axis technology, a vacant price band, a cleared field, and procurement rules that just tilted in its favor.", {
    x: 0.9, y: 2.45, w: 6.7, h: 1.15, fontFace: "Calibri", fontSize: 13.5, color: C.ink, margin: 0, lineSpacing: 19 });
  const conds = [
    ["check", "GO — conditionally", "Commit T1 after three pre-closing checks: IP chain-of-title, software-team retention, insolvency legacy clean.", C.green],
    ["x", "STOP at the gates if", "<10 LOIs in 6 months · BOM >€32k · NOVA proxy <30 units/yr · service cost >12% in pilots.", C.red],
    ["alert", "DO NOT invest at all if", "you require a certain venture return: only the Upside path (~25–30% probability) is venture-grade. This is an option, not a promise.", C.copper],
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
  s.addText("WHAT THE SKEPTIC SAYS", { x: 8.5, y: 2.12, w: 4, h: 0.3, fontFace: "Arial", fontSize: 11, bold: true, color: C.mute, charSpacing: 2, margin: 0 });
  const skeps = [
    "Every predecessor failed or stayed small — maybe the gap is absent demand, not market failure.",
    "Zero verified KRONOS sales since relaunch — execution by a ~6-person team is unproven.",
    "Academic beachheads are grant-cyclical and don't reorder — the corporate/defense jump must actively succeed.",
  ];
  let sy = 2.5;
  skeps.forEach((t, i) => {
    s.addText(String(i + 1), { x: 8.5, y: sy, w: 0.4, h: 0.4, fontFace: "Arial", fontSize: 20, bold: true, color: C.faint, margin: 0 });
    s.addText(t, { x: 9.0, y: sy + 0.02, w: 3.55, h: 0.9, fontFace: "Calibri", fontSize: 10.5, color: C.mute, margin: 0, lineSpacing: 13.5 });
    sy += 0.92;
  });
  s.addShape("line", { x: 8.5, y: sy, w: 3.95, h: 0, line: { color: C.line, width: 0.75 } });
  s.addText("These are not dismissed — they are the gates. If they hold, the loss is €2.5M and a clean stop. If they fall, the position is category-defining.", {
    x: 8.5, y: sy + 0.12, w: 3.95, h: 1.15, fontFace: "Calibri", fontSize: 10, italic: true, color: C.copper, margin: 0, lineSpacing: 13.5 });
  footer(s, 20);
  s.addNotes("Vollständige No-Go-Bedingungen und die 10 Investorenfragen: business-plan/investment-thesis.md. Erwartungswert ~3x MOIC (30/45/25-Gewichtung, Exit J7).");
}

await pres.writeFile({ fileName: "presentation/kronos-investor-deck.pptx" });
console.log("kronos-investor-deck.pptx geschrieben (20 Slides).");
})().catch((e) => { console.error(e); process.exit(1); });
