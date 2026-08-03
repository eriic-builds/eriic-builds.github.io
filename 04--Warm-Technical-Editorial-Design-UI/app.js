const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const colors = {
  accent: token("--accent"), accentSoft: token("--accent-soft"), success: token("--success"),
  successSoft: token("--success-soft"), neutral: token("--neutral-data"), border: token("--border"),
  borderStrong: token("--border-strong"), text: token("--text-primary"), muted: token("--text-muted"), surface: token("--surface-raised")
};
const NS = "http://www.w3.org/2000/svg";
const svgEl = (tag, attrs = {}) => {
  const element = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
};
const seededRandom = (seed = 4815) => () => {
  seed = Math.imul(48271, seed) | 0;
  return (seed >>> 0) / 4294967296;
};
const random = seededRandom();
const makeSvg = (viewBox = "0 0 800 260") => {
  const svg = svgEl("svg", { viewBox, preserveAspectRatio: "none", "aria-hidden": "true" });
  const defs = svgEl("defs");
  svg.append(defs);
  return svg;
};
const line = (x1, y1, x2, y2, stroke = colors.border, dash = "") => svgEl("line", { x1, y1, x2, y2, stroke, "stroke-width": 1, "stroke-dasharray": dash, "vector-effect": "non-scaling-stroke" });
const path = (d, stroke, fill = "none", width = 1) => svgEl("path", { d, stroke, fill, "stroke-width": width, "vector-effect": "non-scaling-stroke" });

function drawSpark(container) {
  const svg = makeSvg("0 0 420 110");
  svg.append(line(8, 99, 414, 99));
  let d = "M 8 92";
  for (let x = 8; x <= 414; x += 12) {
    const progress = (x - 8) / 406;
    const y = 93 - Math.pow(progress, 1.55) * 76 + (random() - .5) * 2;
    d += ` L ${x} ${y.toFixed(2)}`;
  }
  const area = `${d} L 414 99 L 8 99 Z`;
  svg.append(path(area, "none", colors.successSoft), path(d, colors.success, "none", 1.4));
  svg.append(svgEl("circle", { cx: 414, cy: 17, r: 3, fill: colors.success }));
  container.append(svg);
}

function drawLattice(container) {
  const svg = makeSvg();
  for (let row = 0; row < 9; row++) {
    const count = row + 1;
    for (let column = 0; column < count; column++) {
      const x = 400 + (column - row / 2) * 43;
      const y = 25 + row * 18;
      svg.append(svgEl("circle", { cx: x, cy: y, r: 2.3, fill: row < 2 ? colors.text : colors.neutral, opacity: .7 }));
    }
  }
  for (let index = 0; index < 74; index++) {
    const x = 220 + random() * 390;
    const y = 62 + random() * 115;
    svg.append(svgEl("circle", { cx: x, cy: y, r: 1.7 + random() * 1.2, fill: random() > .72 ? colors.success : colors.text, opacity: .72 }));
  }
  const heights = [8, 17, 37, 68, 94, 86, 55, 29, 12, 5];
  heights.forEach((height, index) => {
    const x = 175 + index * 47;
    const positive = index >= 3;
    svg.append(svgEl("rect", { x, y: 244 - height, width: 39, height, fill: positive ? colors.success : colors.neutral, opacity: positive ? .95 : .75 }));
  });
  svg.append(line(400, 15, 400, 246, colors.text, "4 4"));
  svg.append(svgEl("rect", { x: 345, y: 41, width: 110, height: 18, rx: 9, fill: colors.accent }));
  const label = svgEl("text", { x: 400, y: 53.5, fill: "white", "text-anchor": "middle", "font-size": 8, "font-family": "DM Mono" });
  label.textContent = "EDGE CROSS · 0.3";
  svg.append(label);
  container.append(svg);
}

function drawRidge(container) {
  const svg = makeSvg();
  for (let ridge = 0; ridge < 17; ridge++) {
    let d = "";
    const baseline = 216 - ridge * 9;
    for (let x = 65; x <= 745; x += 10) {
      const peak = Math.exp(-Math.pow((x - 420) / (130 + ridge * 2), 2)) * (66 - ridge * 1.3);
      const wave = Math.sin(x * .045 + ridge) * 1.8;
      const y = baseline - peak + wave;
      d += `${x === 65 ? "M" : "L"} ${x} ${y.toFixed(1)} `;
    }
    svg.append(path(d, ridge < 4 ? colors.text : colors.neutral, "none", ridge < 4 ? 1.3 : .85));
  }
  for (let stripe = 0; stripe < 12; stripe++) {
    const x = 545 + stripe * 12;
    svg.append(path(`M ${x} 222 L ${x + 66} ${55 + stripe * 6}`, colors.accent, colors.accentSoft, .65));
  }
  svg.append(line(610, 28, 565, 178, colors.text, "4 3"));
  svg.append(svgEl("rect", { x: 576, y: 24, width: 70, height: 10, rx: 2, fill: colors.text }));
  container.append(svg);
}

function drawNetwork(container) {
  const svg = makeSvg();
  const nodes = Array.from({ length: 68 }, (_, index) => ({
    x: 35 + random() * 720, y: 24 + random() * 202,
    size: index < 4 ? 12 + random() * 7 : 1.5 + random() * 3,
    tone: index === 0 ? colors.accent : index === 1 ? colors.text : index === 2 ? colors.neutral : random() > .68 ? colors.accent : colors.neutral
  }));
  for (let index = 0; index < 38; index++) {
    const a = nodes[Math.floor(random() * nodes.length)];
    const b = nodes[Math.floor(random() * nodes.length)];
    svg.append(line(a.x, a.y, b.x, b.y, colors.border));
  }
  svg.append(path("M 48 143 C 210 92, 292 184, 422 126 S 638 112, 760 75", colors.text, "none", 1.5));
  svg.lastChild.setAttribute("stroke-dasharray", "5 4");
  nodes.forEach((node) => svg.append(svgEl("circle", { cx: node.x, cy: node.y, r: node.size, fill: node.tone, opacity: node.size > 10 ? 1 : .78 })));
  [[nodes[0], "BEAR CLUSTER"], [nodes[1], "MID HUB"], [nodes[2], "CATALYST FLOW"]].forEach(([node, text]) => {
    const group = svgEl("g");
    group.append(svgEl("rect", { x: node.x - 28, y: node.y + node.size + 4, width: 56, height: 12, rx: 2, fill: colors.surface, stroke: colors.borderStrong }));
    const label = svgEl("text", { x: node.x, y: node.y + node.size + 13, "text-anchor": "middle", "font-size": 6, fill: colors.text, "font-family": "DM Mono" });
    label.textContent = text;
    group.append(label); svg.append(group);
  });
  container.append(svg);
}

function drawDistribution(container) {
  const svg = makeSvg("0 0 180 100");
  const bars = [10, 18, 32, 49, 66, 77, 64, 45, 28, 15, 7];
  bars.forEach((height, index) => svg.append(svgEl("rect", { x: 8 + index * 15, y: 90 - height, width: 10, height, fill: index < 5 ? colors.accent : colors.success })));
  svg.append(line(5, 90, 175, 90, colors.borderStrong));
  container.append(svg);
}

const chartRenderers = { spark: drawSpark, lattice: drawLattice, ridge: drawRidge, network: drawNetwork, distribution: drawDistribution };
document.querySelectorAll("[data-chart]").forEach((container) => chartRenderers[container.dataset.chart]?.(container));

function updateClock() {
  const now = new Date();
  const clock = document.querySelector("#utcClock");
  clock.textContent = `${now.toLocaleTimeString("en-GB", { timeZone: "UTC" })} UTC`;
  clock.dateTime = now.toISOString();
}
updateClock();
setInterval(updateClock, 1000);

document.querySelectorAll(".kpi-segment").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".kpi-segment").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  const figure = document.querySelector("#heroValue");
  figure.textContent = button.dataset.value;
  figure.animate([{ opacity: .35 }, { opacity: 1 }], { duration: 420, easing: "ease-out" });
}));

document.querySelector(".sound-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
});

const panels = ["Probability Ridge · Strike Landscape", "Volatility Ridge · Session Drift", "Payout Ridge · Tail Compression"];
let panelIndex = 0;
document.querySelectorAll(".carousel-control").forEach((button) => button.addEventListener("click", () => {
  panelIndex = (panelIndex + (button.classList.contains("next") ? 1 : -1) + panels.length) % panels.length;
  const heading = document.querySelector("[data-panel='ridge'] h2");
  heading.childNodes[heading.childNodes.length - 1].textContent = ` ${panels[panelIndex]}`;
  document.querySelector("[data-panel='ridge'] .chart-frame").animate([{ opacity: .25, transform: "translateX(8px)" }, { opacity: 1, transform: "translateX(0)" }], { duration: 240 });
}));