"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: "Customized control devices", body: "Tailored hardware design with multifunctional capabilities in a single unit. Multiple communication protocols and API connectivity to any preferred cloud platform." },
  { title: "HudHud platform", body: "Our proprietary control & automation platform, used by clients in Jordan and internationally to monitor hundreds of control units we have designed and manufactured." },
  { title: "PCBs & control units", body: "Custom PCB design and assembly tuned to actual market demands — not over-engineered, not under-spec." },
  { title: "3-year operational warranty", body: "Standard 3-year warranty across our manufactured devices, with an extended 5-year option for mission-critical deployments." },
  { title: "Cost-competitive integration", body: "All-in-one devices that replace stacks of legacy PLCs and RTUs — same functionality, better price, simpler maintenance." },
];

function DeviceCard({ tint, name, sub, code }: { tint: string; name: string; sub: string; code: string }) {
  return (
    <div style={{ background: tint, borderRadius: 12, padding: "18px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -10, top: -10, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
      <div style={{ font: "500 10px/1.3 var(--font-sans)", color: "var(--charcoal)", letterSpacing: 1, textTransform: "uppercase", opacity: 0.7 }}>{code}</div>
      <div style={{ font: "600 16px/1.2 var(--font-sans)", color: "var(--ink)", marginTop: 6, letterSpacing: -0.2, position: "relative" }}>{name}</div>
      <div style={{ font: "400 12px/1.4 var(--font-sans)", color: "var(--charcoal)", marginTop: 2, position: "relative" }}>{sub}</div>
      <svg viewBox="0 0 100 32" style={{ width: "100%", height: 32, marginTop: 12, display: "block" }}>
        <rect x="2" y="6" width="96" height="22" rx="3" fill="rgba(255,255,255,0.65)" stroke="rgba(0,0,0,0.08)"/>
        <rect x="6" y="10" width="14" height="14" rx="1.5" fill="rgba(0,0,0,0.10)"/>
        <circle cx="28" cy="17" r="1.5" fill="#1aae39"/>
        <circle cx="34" cy="17" r="1.5" fill="#f5d75e"/>
        <rect x="44" y="13" width="28" height="8" rx="1" fill="rgba(0,0,0,0.08)"/>
        <rect x="78" y="11" width="16" height="4" rx="0.5" fill="rgba(0,0,0,0.08)"/>
        <rect x="78" y="18" width="16" height="4" rx="0.5" fill="rgba(0,0,0,0.08)"/>
      </svg>
    </div>
  );
}

function DeviceFamilyMockup() {
  return (
    <div style={{ position: "relative", background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: 32, boxShadow: "var(--shadow-2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div className="eyebrow" style={{ margin: 0 }}>Manufactured by AFKAR</div>
          <div style={{ font: "600 20px/1.3 var(--font-sans)", color: "var(--ink)", marginTop: 4 }}>Device family · 2026</div>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "var(--tint-mint)", color: "var(--brand-green)", font: "600 11px/1.3 var(--font-sans)", letterSpacing: 0.5, textTransform: "uppercase" }}>● In stock</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <DeviceCard tint="#e6e0f5" name="Smart HudHud" sub="IoT Logger / Controller" code="HH-32" />
        <DeviceCard tint="#dcecfa" name="QATARAT" sub="Smart irrigation RTU" code="QT-08" />
        <DeviceCard tint="#fde0ec" name="LABEEB" sub="Smart home gateway" code="LB-04" />
        <DeviceCard tint="#fef7d6" name="MURAQEB" sub="Wireless thermal" code="MQ-12" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {["ESP32","LoRa","Modbus","MQTT","SNMP","RS-485","PoE","BACnet"].map(p => (
          <span key={p} style={{ padding: "6px 10px", borderRadius: 6, background: "var(--surface)", border: "1px solid var(--hairline)", font: "500 11px/1.3 var(--font-sans)", color: "var(--charcoal)", letterSpacing: 0.3, textAlign: "center" }}>{p}</span>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "14px 16px", borderRadius: 10, background: "var(--brand-navy)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ font: "500 11px/1.3 var(--font-sans)", color: "var(--on-dark-muted)", letterSpacing: 0.5, textTransform: "uppercase" }}>Built around</div>
          <div style={{ font: "600 14px/1.3 var(--font-sans)", marginTop: 2 }}>HudHud Control &amp; Automation Platform</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    </div>
  );
}

export default function CustomDesigns() {
  const [open, setOpen] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(leftRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" } });
    gsap.fromTo(rightRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" } });
  }, []);

  return (
    <section className="section alt" ref={sectionRef}>
      <div className="container">
        <div className="split">
          <div ref={leftRef} style={{ opacity: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>The art of customized designs</div>
            <h2 style={{ font: "600 44px/1.12 var(--font-sans)", letterSpacing: -0.8, margin: "0 0 20px", color: "var(--ink)" }}>
              We build the device, the cloud, and the software in-house.
            </h2>
            <p style={{ font: "400 17px/1.6 var(--font-sans)", color: "var(--steel)", margin: "0 0 32px", maxWidth: 480 }}>
              AFKAR DIGITAL designs customized hardware, PCBs and control units tailored to client needs — solutions delivered as all-in-one devices that beat legacy PLC stacks on price and footprint.
            </p>
            <div className="accordion">
              {items.map((it, i) => (
                <div key={it.title} className={`item${open === i ? " open" : ""}`}>
                  <div className="item-head" onClick={() => setOpen(open === i ? -1 : i)}>
                    <span>{it.title}</span>
                    <span className="plus">{open === i ? "−" : "+"}</span>
                  </div>
                  <div className="item-body">
                    <div className="item-body-inner">
                      {it.body}
                      <Link href="/products" className="learn">Learn more →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <Link href="/contact" style={{ padding: "14px 22px", background: "var(--primary)", color: "#fff", borderRadius: 8, textDecoration: "none", font: "500 14px/1.3 var(--font-sans)", display: "inline-flex", alignItems: "center" }}>Request audit</Link>
            </div>
          </div>
          <div ref={rightRef} style={{ opacity: 0 }}>
            <DeviceFamilyMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
