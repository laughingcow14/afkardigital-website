"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number; r: number; phase: number;
  activate: number; appearAt: number; ringRot: number;
}
interface Edge {
  a: number; b: number; startedAt: number; life: number; pulseSeed: number;
}
interface Shape {
  x: number; y: number; rot: number; rotSpeed: number; size: number;
  vx: number; vy: number; kind: "hex" | "sq";
}
interface Spark {
  x: number; y: number; vx: number; vy: number; t: number; life: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    nodes: Node[]; edges: Edge[]; shapes: Shape[]; sparks: Spark[];
    bootStart: number; lastActivate: number; raf: number;
  }>({ nodes: [], edges: [], shapes: [], sparks: [], bootStart: 0, lastActivate: 0, raf: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let W = 0, H = 0;

    function buildScene() {
      const count = Math.min(24, Math.max(18, Math.floor((W * H) / 45000)));
      state.nodes = [];
      for (let i = 0; i < count; i++) {
        const sr = Math.random();
        const r = sr < 0.55 ? 3 + Math.random() * 2 : sr < 0.85 ? 8 + Math.random() * 4 : 16 + Math.random() * 6;
        state.nodes.push({ x: 40 + Math.random() * (W - 80), y: 40 + Math.random() * (H - 80), r, phase: Math.random() * Math.PI * 2, activate: 0, appearAt: (i / count) * 1900 + 400, ringRot: Math.random() * Math.PI * 2 });
      }
      state.edges = [];
      state.shapes = [];
      for (let i = 0; i < 7; i++) {
        const big = i < 2;
        state.shapes.push({ x: Math.random() * W, y: Math.random() * H, rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.0006, size: big ? 150 + Math.random() * 60 : 40 + Math.random() * 60, vx: (Math.random() - 0.5) * (big ? 0.10 : 0.25), vy: (Math.random() - 0.5) * (big ? 0.10 : 0.25), kind: Math.random() < 0.6 ? "hex" : "sq" });
      }
      state.bootStart = performance.now();
      state.lastActivate = state.bootStart + 4500;
    }

    function spawnEdge(idx: number, t: number) {
      const a = state.nodes[idx];
      const candidates: { j: number; d: number }[] = [];
      for (let j = 0; j < state.nodes.length; j++) {
        if (j === idx) continue;
        const dx = state.nodes[j].x - a.x, dy = state.nodes[j].y - a.y;
        const d = Math.hypot(dx, dy);
        if (d > 60 && d < Math.min(W, H) * 0.55) candidates.push({ j, d });
      }
      if (!candidates.length) return;
      candidates.sort((x, y) => x.d - y.d);
      const pick = candidates[Math.floor(Math.random() * Math.min(8, candidates.length))];
      state.edges.push({ a: idx, b: pick.j, startedAt: t, life: 1800 + Math.random() * 1400, pulseSeed: Math.random() });
    }

    function spawnSpark(x: number, y: number) {
      state.sparks.push({ x, y, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, t: 0, life: 600 + Math.random() * 400 });
    }

    function resize() {
      if (!canvas || !ctx) return;
      const r = canvas.parentElement?.getBoundingClientRect();
      W = Math.max(1, Math.floor(r?.width ?? window.innerWidth));
      H = Math.max(1, Math.floor(r?.height ?? window.innerHeight));
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildScene();
    }

    function tick(now: number) {
      if (!ctx) return;
      const elapsed = now - state.bootStart;
      const bootP = Math.min(1, elapsed / 2500);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0e1a";
      ctx.fillRect(0, 0, W, H);

      // Grid
      const ga = 0.06 * Math.min(1, elapsed / 900) * (0.85 + 0.15 * Math.sin(now * 0.0006));
      const step = 48 * (1 + 0.005 * Math.sin(now * 0.0004));
      ctx.strokeStyle = `rgba(0,170,255,${ga})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = now * 0.002 % step; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = now * 0.002 % step; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();
      ctx.strokeStyle = `rgba(0,229,255,${ga * 0.5})`;
      ctx.beginPath();
      ctx.moveTo(-H, H); ctx.lineTo(W + H, -H);
      ctx.moveTo(-H, 0); ctx.lineTo(W + H, H * 2);
      ctx.stroke();

      // Shapes
      for (const s of state.shapes) {
        s.x += s.vx; s.y += s.vy; s.rot += s.rotSpeed;
        if (s.x < -s.size) s.x = W + s.size;
        if (s.x > W + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = H + s.size;
        if (s.y > H + s.size) s.y = -s.size;
        ctx.save();
        ctx.translate(s.x, s.y); ctx.rotate(s.rot);
        ctx.fillStyle = "rgba(0,229,255,0.05)"; ctx.strokeStyle = "rgba(0,229,255,0.22)"; ctx.lineWidth = 1;
        ctx.beginPath();
        if (s.kind === "hex") {
          for (let k = 0; k < 6; k++) { const a = (Math.PI / 3) * k; const px = Math.cos(a) * s.size * 0.5; const py = Math.sin(a) * s.size * 0.5; if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
          ctx.closePath();
        } else { const sz = s.size * 0.4; ctx.rect(-sz / 2, -sz / 2, sz, sz); }
        ctx.fill(); ctx.stroke();
        ctx.restore();
      }

      // Activate nodes
      if (bootP >= 1 && now - state.lastActivate > 6000 + Math.random() * 2000) {
        const idx = Math.floor(Math.random() * state.nodes.length);
        state.nodes[idx].activate = 1;
        for (let k = 0; k < 3 + Math.floor(Math.random() * 2); k++) spawnEdge(idx, now);
        state.lastActivate = now;
      }
      if (bootP >= 1 && Math.random() < 0.05) spawnEdge(Math.floor(Math.random() * state.nodes.length), now);

      // Edges
      for (let i = state.edges.length - 1; i >= 0; i--) {
        const e = state.edges[i];
        const t = (now - e.startedAt) / e.life;
        if (t >= 1) { state.edges.splice(i, 1); continue; }
        const a = state.nodes[e.a], b = state.nodes[e.b];
        const fade = t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1;
        ctx.strokeStyle = `rgba(0,229,255,${0.18 * fade})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        const pulseT = (t * 1.6 + e.pulseSeed) % 1;
        const px = a.x + (b.x - a.x) * pulseT, py = a.y + (b.y - a.y) * pulseT;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grd.addColorStop(0, `rgba(0,229,255,${0.95 * fade})`); grd.addColorStop(1, "rgba(0,229,255,0)");
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
        if (Math.random() < 0.012 * fade) spawnSpark(px, py);
      }

      // Sparks
      for (let i = state.sparks.length - 1; i >= 0; i--) {
        const s = state.sparks[i];
        s.t += 16;
        if (s.t >= s.life) { state.sparks.splice(i, 1); continue; }
        s.x += s.vx; s.y += s.vy;
        const al = 1 - s.t / s.life;
        ctx.fillStyle = `rgba(0,255,213,${al})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, 1.5 + al * 1.2, 0, Math.PI * 2); ctx.fill();
      }

      // Nodes
      for (let i = 0; i < state.nodes.length; i++) {
        const n = state.nodes[i];
        const ap = Math.max(0, Math.min(1, (elapsed - n.appearAt) / 360));
        if (ap <= 0) continue;
        n.activate *= 0.985;
        const r = n.r * (ap < 1 ? 1.6 - 0.6 * ap : 1) * (1 + n.activate * 0.4);
        const breath = 0.85 + 0.15 * Math.sin(now * 0.002 + n.phase);
        const glowR = r * 5;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        const intensity = (0.55 + 0.25 * breath + n.activate * 0.5) * ap;
        grd.addColorStop(0, `rgba(0,229,255,${0.35 * intensity})`);
        grd.addColorStop(0.4, `rgba(0,170,255,${0.15 * intensity})`);
        grd.addColorStop(1, "rgba(0,170,255,0)");
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(220,250,255,${ap})`; ctx.beginPath(); ctx.arc(n.x, n.y, r * 0.55, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(0,229,255,${0.9 * ap})`; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.stroke();
        if (n.r >= 14) {
          n.ringRot += 0.0008 * 16;
          ctx.strokeStyle = `rgba(0,229,255,${0.18 * ap})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.setLineDash([4, 6]);
          ctx.arc(n.x, n.y, r * 1.9, n.ringRot, n.ringRot + Math.PI * 1.5); ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Vignette
      const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.7);
      vg.addColorStop(0, "rgba(10,14,26,0)"); vg.addColorStop(1, "rgba(10,14,26,0.85)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

      state.raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    resize();
    state.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none", zIndex: 0 }}
    />
  );
}
