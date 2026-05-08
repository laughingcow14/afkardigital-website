"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import { gsap } from "gsap";

function MetricTile({ color, label, value, trend, up }: { color: string; label: string; value: string; trend: string; up: boolean }) {
  return (
    <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderRadius: "50%", background: color, opacity: 0.18, transform: "translate(20px,-20px)" }} />
      <div style={{ font: "500 11px/1.3 var(--font-sans)", color: "rgba(255,255,255,0.55)", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ font: "600 24px/1 var(--font-sans)", color: "#fff", letterSpacing: -0.5 }}>{value}</div>
      <div style={{ font: "500 11px/1.3 var(--font-sans)", color: up ? "#1aae39" : "#5d9af0", marginTop: 6 }}>{up ? "▲" : "▼"} {trend}</div>
    </div>
  );
}

function ChartSpark() {
  const pts = [22,21,22,24,28,32,30,26,23,22,24,27,29,28,25,23,24,26,28,30,29,25,22,21];
  const max = 35, min = 18, w = 100, h = 22;
  const path = pts.map((p, i) => { const x = (i / (pts.length - 1)) * w; const y = h - ((p - min) / (max - min)) * h; return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`; }).join(" ");
  const fill = path + ` L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block" }}>
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7b3ff2" stopOpacity="0.4"/><stop offset="100%" stopColor="#7b3ff2" stopOpacity="0"/></linearGradient></defs>
      <path d={fill} fill="url(#sg)" />
      <path d={path} fill="none" stroke="#d6b6f6" strokeWidth="0.5" />
    </svg>
  );
}

function HeroDashboard() {
  return (
    <div className="hero-media" style={{ position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a2a52 0%, #0a1530 60%, #070f24 100%)", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: "#f5d75e", display: "inline-block" }} />
          <span style={{ width: 8, height: 8, borderRadius: 4, background: "#1aae39", display: "inline-block" }} />
          <span style={{ width: 8, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.18)", display: "inline-block" }} />
          <span style={{ font: "500 11px/1.3 var(--font-sans)", color: "rgba(255,255,255,0.6)", marginLeft: 8, letterSpacing: 0.4 }}>HudHud · Live monitoring</span>
          <span style={{ marginLeft: "auto", font: "600 10px/1 var(--font-sans)", color: "#1aae39", padding: "4px 8px", background: "rgba(26,174,57,0.12)", borderRadius: 999, letterSpacing: 0.6, textTransform: "uppercase" }}>● Online</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <MetricTile color="#ff64c8" label="Avg. cold aisle" value="22.4°C" trend="-0.6°C" up={false} />
          <MetricTile color="#5645d4" label="Active power" value="184 kW" trend="+3.1%" up={true} />
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ font: "500 11px/1 var(--font-sans)", color: "rgba(255,255,255,0.55)", letterSpacing: 0.6, textTransform: "uppercase" }}>Thermal map · Rack 4</div>
              <div style={{ font: "600 18px/1.2 var(--font-sans)", color: "#fff", marginTop: 4 }}>24-hour temperature trend</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["1H","24H","7D"].map((t, i) => (
                <span key={t} style={{ padding: "4px 8px", borderRadius: 6, font: "500 10px/1.3 var(--font-sans)", background: i === 1 ? "rgba(123,63,242,0.22)" : "transparent", color: i === 1 ? "#d6b6f6" : "rgba(255,255,255,0.55)", border: "1px solid " + (i === 1 ? "rgba(123,63,242,0.4)" : "rgba(255,255,255,0.08)") }}>{t}</span>
              ))}
            </div>
          </div>
          <ChartSpark />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            {[{n:"Sensor #03",v:"21.8°C",c:"#1aae39"},{n:"Sensor #04",v:"24.1°C",c:"#f5d75e"},{n:"Sensor #05",v:"22.6°C",c:"#1aae39"},{n:"Sensor #06",v:"27.9°C",c:"#dd5b00"}].map(s => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: s.c, display: "inline-block" }} />
                  <span style={{ font: "500 12px/1.3 var(--font-sans)", color: "rgba(255,255,255,0.85)" }}>{s.n}</span>
                </span>
                <span style={{ font: "600 13px/1.3 var(--font-sans)", color: "#fff" }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 16, background: "rgba(10,21,48,0.78)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.14)", padding: "10px 14px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex" }}>
            <span style={{ width: 24, height: 24, borderRadius: 12, border: "2px solid rgba(10,21,48,0.78)", background: "linear-gradient(135deg, #d6b6f6, #5645d4)", display: "inline-block" }} />
            <span style={{ width: 24, height: 24, borderRadius: 12, border: "2px solid rgba(10,21,48,0.78)", background: "linear-gradient(135deg, #ffd0b0, #dd5b00)", marginLeft: -8, display: "inline-block" }} />
            <span style={{ width: 24, height: 24, borderRadius: 12, border: "2px solid rgba(10,21,48,0.78)", background: "linear-gradient(135deg, #d9f3e1, #2a9d99)", marginLeft: -8, display: "inline-block" }} />
          </div>
          <div>
            <div style={{ font: "600 11px/1.2 var(--font-sans)", color: "#fff", letterSpacing: 0.5, textTransform: "uppercase" }}>Trusted by 27+ teams</div>
            <div style={{ font: "500 10px/1.2 var(--font-sans)", color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Data centers · Agri · Facilities</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(h1Ref.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
      .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
      .fromTo(ctasRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .fromTo(mediaRef.current, { opacity: 0, x: 40, scale: 0.97 }, { opacity: 1, x: 0, scale: 1, duration: 1.0 }, "-=0.9");
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <HeroCanvas />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>Founded 2017 · Amman, Jordan</div>
            <h1 ref={h1Ref} style={{ opacity: 0 }}>
              Engineered IoT for <em>monitoring, control</em> and automation.
            </h1>
            <p className="hero-sub" ref={subRef} style={{ opacity: 0 }}>
              Continuous monitoring in front of your eyes. Total control at your fingertips. AFKAR DIGITAL builds the hardware, cloud and software that bring any device — temperature, power, water, machinery — to your mobile or PC.
            </p>
            <div className="hero-ctas" ref={ctasRef} style={{ opacity: 0 }}>
              <Link href="/products" className="btn-on-dark">
                Explore products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="/contact" className="btn-ghost-dark">Schedule a call</Link>
            </div>
            <div className="hero-stats" ref={statsRef} style={{ opacity: 0 }}>
              <div className="hero-stat"><div className="num">8+</div><div className="lbl">Years building IoT in Jordan and across the region</div></div>
              <div className="hero-stat"><div className="num">20+</div><div className="lbl">Years prior telecom &amp; electronics experience</div></div>
              <div className="hero-stat"><div className="num">27</div><div className="lbl">Customers across data centers, agri, facilities</div></div>
            </div>
          </div>
          <div ref={mediaRef} style={{ opacity: 0 }}>
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
