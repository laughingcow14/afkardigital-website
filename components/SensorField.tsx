"use client";

import { useEffect, useRef } from "react";

// Sensor field — a calm grid of live-updating IoT readings across the hero background.
// Pure DOM (no canvas). Replaces HeroCanvas. Honours prefers-reduced-motion.

export default function SensorField() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // ---- styles (injected once) ----
    if (!document.getElementById("sf-style")) {
      const st = document.createElement("style");
      st.id = "sf-style";
      st.textContent = `
.sf-wrap {
  position:absolute;inset:0;pointer-events:none;overflow:hidden;
  --sf-mono:ui-monospace,'JetBrains Mono','SF Mono',Menlo,Consolas,monospace;
  --sf-fg:rgba(255,255,255,0.55);
  --sf-fg-strong:rgba(255,255,255,0.78);
  --sf-dim:rgba(255,255,255,0.22);
  --sf-line:rgba(255,255,255,0.055);
  --sf-accent:#2a9d99;
  --sf-alert:#f5d75e;
  -webkit-mask-image:radial-gradient(ellipse 42% 55% at 24% 58%,rgba(0,0,0,0.05) 8%,rgba(0,0,0,0.35) 55%,rgba(0,0,0,1) 95%);
  mask-image:radial-gradient(ellipse 42% 55% at 24% 58%,rgba(0,0,0,0.05) 8%,rgba(0,0,0,0.35) 55%,rgba(0,0,0,1) 95%);
}
.sf-grid {
  position:absolute;inset:-1px;display:grid;gap:0;
  grid-template-columns:repeat(var(--sf-cols,12),1fr);
  grid-auto-rows:var(--sf-row,58px);
}
.sf-cell {
  position:relative;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;
  padding:10px 12px;border-right:1px solid var(--sf-line);border-bottom:1px solid var(--sf-line);
  font-family:var(--sf-mono);color:var(--sf-fg);
  transition:background-color 800ms ease,color 800ms ease;
}
.sf-cell .sf-code {
  font:500 9px/1 var(--sf-mono);color:var(--sf-dim);letter-spacing:0.6px;
  margin-bottom:6px;text-transform:uppercase;
}
.sf-cell .sf-val {
  font:600 13px/1 var(--sf-mono);color:var(--sf-fg);letter-spacing:-0.2px;
  font-variant-numeric:tabular-nums;transition:color 600ms ease;
}
.sf-cell.muted .sf-val{display:none}
.sf-cell.muted::after {
  content:'';position:absolute;left:12px;bottom:18px;
  width:3px;height:3px;border-radius:50%;background:var(--sf-dim);
}
.sf-cell.alert .sf-code{color:rgba(245,215,94,0.55)}
.sf-cell.alert .sf-val{color:var(--sf-alert)}
.sf-cell.flash{background-color:rgba(42,157,153,0.07)}
.sf-cell.flash .sf-val{color:var(--sf-fg-strong)}
.sf-cell.flash::before {
  content:'';position:absolute;top:0;left:0;width:2px;height:100%;
  background:var(--sf-accent);
  box-shadow:0 0 14px var(--sf-accent),0 0 4px var(--sf-accent);
  animation:sf-bar 700ms ease-out forwards;
}
.sf-cell.alert.flash::before {
  background:var(--sf-alert);
  box-shadow:0 0 14px var(--sf-alert),0 0 4px var(--sf-alert);
}
@keyframes sf-bar {
  0%{opacity:0;transform:scaleY(0.2)}
  20%{opacity:1;transform:scaleY(1)}
  100%{opacity:0;transform:scaleY(1)}
}
@media(prefers-reduced-motion:reduce){
  .sf-cell{transition:none}
  .sf-cell.flash{background-color:transparent}
  .sf-cell.flash .sf-val{color:var(--sf-fg)}
  .sf-cell.flash::before{display:none;animation:none}
}
`;
      document.head.appendChild(st);
    }

    // ---- data tables ----
    const TYPES = [
      { id: "temp",  fmt: (v: number) => v.toFixed(1) + "°C",    seq: [21.4,22.1,22.4,22.8,23.1,23.6,22.9,22.2,21.9,22.5] },
      { id: "pwr",   fmt: (v: number) => v.toFixed(0) + " kW",   seq: [184,187,191,186,189,192,188,185,190] },
      { id: "flow",  fmt: (v: number) => v.toFixed(1) + " L/s",  seq: [4.1,4.2,4.0,4.3,4.5,4.2,3.9,4.0,4.4] },
      { id: "hum",   fmt: (v: number) => v.toFixed(0) + "%",     seq: [65,66,68,67,69,70,66,64] },
      { id: "soil",  fmt: (v: number) => v.toFixed(0) + "%",     seq: [42,43,44,42,41,40,43] },
      { id: "rpm",   fmt: (v: number) => v.toFixed(0) + " rpm",  seq: [1420,1432,1418,1425,1421,1438] },
      { id: "volt",  fmt: (v: number) => v.toFixed(1) + " V",    seq: [230.1,230.4,229.8,230.2,230.0,230.6] },
      { id: "bar",   fmt: (v: number) => v.toFixed(1) + " bar",  seq: [2.1,2.2,2.0,2.2,2.3,2.1] },
      { id: "batt",  fmt: (v: number) => v.toFixed(0) + "%",     seq: [98,97,96,97,98,96] },
      { id: "co2",   fmt: (v: number) => v.toFixed(0) + " ppm",  seq: [612,624,631,618,605,627] },
      { id: "lux",   fmt: (v: number) => v.toFixed(0) + " lx",   seq: [320,340,295,360,410,335] },
    ];
    const CODES = [
      "R4·C12","R7·A03","MDF·1","IDF·3","UPS·A","CRAC·2","GH2·S4","GH5·P1",
      "WELL·3","PUMP·12","LOBBY","B2·F7","ROOF·A","CHILL·1","ICU·A2","OR·3",
      "PHARM","MRI·1","BTS·04","CAB·22","SITE·09","Z·204","PCB·11","RTU·7",
      "GW·02","FAB·3","LINE·8","TANK·2","VLV·9","FAN·15","CHL·4","BOIL·1",
      "WTR·6","GAS·3","CCT·11","PNL·A4","MTR·22","PVE·3","BAT·7","GEN·2",
      "R2·C04","R8·B11","SUB·12","TEL·07","ROOM·14","EAST·3","WEST·5",
    ];

    const isMuted = (i: number) => (i * 7 + 3) % 11 === 0;
    const isAlert = (i: number) => (i * 13 + 5) % 47 === 0;

    function makeOrder(n: number) {
      const arr = Array.from({ length: n }, (_, i) => i);
      let s = 1;
      for (let i = n - 1; i > 0; i--) {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        const j = s % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    const grid = document.createElement("div");
    grid.className = "sf-grid";
    wrap.appendChild(grid);

    type Cell = { el: HTMLDivElement; type: typeof TYPES[0]; seqIdx: number; muted: boolean };
    let cells: Cell[] = [];
    let order: number[] = [];
    let tick = 0;
    let interval: ReturnType<typeof setTimeout> | null = null;
    let visible = true;

    const reducedMq = matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = reducedMq.matches;

    function build() {
      const w = wrap.clientWidth || 1200;
      const h = wrap.clientHeight || 600;
      const cols = w < 520 ? 5 : w < 820 ? 8 : w < 1180 ? 11 : w < 1480 ? 13 : 15;
      const rowH = 58;
      const rows = Math.ceil(h / rowH) + 1;
      grid.style.setProperty("--sf-cols", String(cols));
      grid.style.setProperty("--sf-row", rowH + "px");
      grid.innerHTML = "";
      cells = [];
      const total = cols * rows;
      for (let i = 0; i < total; i++) {
        const type = TYPES[(i * 5 + 1) % TYPES.length];
        const code = CODES[(i * 3 + 7) % CODES.length];
        const seqIdx = (i * 11) % type.seq.length;
        const muted = isMuted(i);
        const alert = !muted && isAlert(i);
        const el = document.createElement("div") as HTMLDivElement;
        el.className = "sf-cell" + (muted ? " muted" : "") + (alert ? " alert" : "");
        el.innerHTML =
          `<span class="sf-code">${code}</span>` +
          `<span class="sf-val">${type.fmt(type.seq[seqIdx])}</span>`;
        grid.appendChild(el);
        cells.push({ el, type, seqIdx, muted });
      }
      order = makeOrder(cells.length);
      tick = 0;
    }

    function step() {
      if (!visible || reduced || !cells.length) return;
      let attempts = 0;
      let c: Cell | null = null;
      while (attempts < cells.length) {
        const idx = order[tick % order.length];
        tick++;
        const cand = cells[idx];
        if (cand && !cand.muted) { c = cand; break; }
        attempts++;
      }
      if (!c) return;
      c.seqIdx = (c.seqIdx + 1) % c.type.seq.length;
      const valEl = c.el.querySelector(".sf-val") as HTMLSpanElement;
      valEl.textContent = c.type.fmt(c.type.seq[c.seqIdx]);
      c.el.classList.add("flash");
      setTimeout(() => c!.el.classList.remove("flash"), 700);
    }

    function start() {
      if (interval || reduced) return;
      const loop = () => {
        step();
        const jitter = ((tick * 53) % 340) - 140;
        interval = setTimeout(loop, 620 + jitter);
      };
      interval = setTimeout(loop, 350);
    }

    function stop() {
      if (interval) { clearTimeout(interval); interval = null; }
    }

    build();

    const ro = new ResizeObserver(() => { stop(); build(); if (visible && !reduced) start(); });
    ro.observe(wrap);

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          visible = e.isIntersecting;
          if (visible) start(); else stop();
        }
      }, { threshold: 0.01 });
      io.observe(wrap);
    }

    const onMq = () => {
      reduced = reducedMq.matches;
      if (reduced) stop(); else if (visible) start();
    };
    reducedMq.addEventListener("change", onMq);

    if (!reduced) start();

    return () => {
      stop();
      if (io) io.disconnect();
      ro.disconnect();
      reducedMq.removeEventListener("change", onMq);
      grid.remove();
    };
  }, []);

  return <div ref={wrapRef} className="sf-wrap" aria-hidden="true" />;
}
