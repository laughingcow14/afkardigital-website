"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PhoneCallVisual() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "rgba(220,49,49,0.15)", border: "1px solid rgba(220,49,49,0.4)", borderRadius: 10, width: "fit-content" }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: "#e03131", boxShadow: "0 0 0 4px rgba(224,49,49,0.18)", display: "inline-block" }} />
          <span style={{ font: "600 11px/1 var(--font-sans)", color: "#ff8a8a", letterSpacing: 0.6, textTransform: "uppercase" }}>Critical alarm</span>
        </div>
        <div style={{ font: "600 14px/1.3 var(--font-sans)", color: "#fff", marginTop: 14 }}>Rack 4 · Cold aisle</div>
        <div style={{ font: "600 36px/1 var(--font-sans)", color: "#fff", marginTop: 6, letterSpacing: -1 }}>34.8°C</div>
        <div style={{ font: "500 11px/1.3 var(--font-sans)", color: "rgba(255,255,255,0.55)", marginTop: 4, letterSpacing: 0.4, textTransform: "uppercase" }}>Threshold 28°C · breached 02:14</div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: "linear-gradient(135deg, #1aae39, #0f7a25)", display: "grid", placeItems: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <div style={{ font: "600 13px/1.3 var(--font-sans)", color: "#fff" }}>Calling on-call engineer</div>
              <div style={{ font: "500 11px/1.3 var(--font-sans)", color: "rgba(255,255,255,0.55)", letterSpacing: 0.4, marginTop: 2 }}>+962-79-XXX-XXXX · 02:14:38</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[1,2,3].map(i => (<span key={i} style={{ width: 4, height: 14 + i * 4, borderRadius: 2, background: "#1aae39", opacity: 0.4 + i * 0.2, display: "inline-block" }} />))}
          </div>
        </div>
        <div style={{ marginTop: 12, padding: "8px 10px", background: "rgba(0,0,0,0.25)", borderRadius: 6, font: "500 11px/1.4 var(--font-sans)", color: "rgba(255,255,255,0.7)" }}>
          &ldquo;Critical thermal alarm at site Amman-DC. Rack 4 cold aisle. Temperature thirty-four point eight degrees Celsius. Press one to acknowledge.&rdquo;
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(boxRef.current, { opacity: 0, y: 48, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: boxRef.current, start: "top 80%", toggleActions: "play none none none" } });
  }, []);

  return (
    <section className="section alt" id="showcases" ref={sectionRef}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Showcase · 17 April 2020</div>
          <h2>An automated phone call saved a data center.</h2>
          <p>During the Corona lockdown in Jordan, an HVAC system at a client data center failed shortly after midnight. Our system noticed.</p>
        </div>
        <div className="showcase" ref={boxRef} style={{ opacity: 0 }}>
          <div>
            <span className="meta">Real incident · Real customer</span>
            <h3>Off-site engineers were on the phone before the racks even got warm.</h3>
            <p>Temperature climbed. Threshold breached. The HudHud platform fired an automated phone call with digital voice to the on-call engineer — who took corrective action remotely.</p>
            <p>Phone calls are still the most reliable alert channel for emergencies, more so than SMS, email, or WhatsApp. We learned that the hard way, then we built it in.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <Link href="/products#hudhud" className="btn-on-dark" style={{ padding: "12px 18px" }}>How HudHud alerts work →</Link>
            </div>
          </div>
          <div className="visual"><PhoneCallVisual /></div>
        </div>
      </div>
    </section>
  );
}
