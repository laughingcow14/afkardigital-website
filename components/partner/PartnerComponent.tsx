"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { nm: "Reseller", lvl: "Authorized", feats: ["Discount on store SKUs","Co-branded marketing material","Lead routing for your region","Sales training session (online)","Priority email support"], featured: false },
  { nm: "System Integrator", lvl: "Recommended", feats: ["Full reseller benefits","Engineering pre-sales support","HudHud platform white-label option","Custom firmware tuning service","3-year extended warranty option","Dedicated account engineer"], featured: true },
  { nm: "OEM / Co-development", lvl: "Strategic", feats: ["All System Integrator benefits","Custom hardware design (PCB)","Joint product development","Manufacturing slot allocation","Source code escrow","Roadmap influence"], featured: false },
];

const reasons = [
  { h: "Made in Jordan, shipped worldwide", d: "Manufacturing in Amman with global shipping. Short lead times and direct support." },
  { h: "No vendor lock-in", d: "MQTT, Modbus, SNMP, BACnet — open protocols throughout. Your data, your cloud, your call." },
  { h: "8 years of field-tested IoT", d: "From a data-center save during lockdown to NARC irrigation projects, the deployments are real." },
  { h: "Direct line to engineering", d: "No tier-1 call center. Your account engineer is the person who designed the hardware." },
];

function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="form-card">
      {submitted ? (
        <div style={{ padding: 32, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: "var(--tint-mint)", color: "var(--brand-green)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style={{ font: "600 22px/1.3 var(--font-sans)", margin: "0 0 8px", color: "var(--ink)" }}>Application received</h3>
          <p style={{ font: "400 14px/1.5 var(--font-sans)", color: "var(--steel)", margin: 0 }}>We&apos;ll get back to you within two business days.</p>
        </div>
      ) : (
        <>
          <h3 style={{ font: "600 22px/1.3 var(--font-sans)", margin: "0 0 6px", color: "var(--ink)", letterSpacing: -0.3 }}>Apply to the partner program</h3>
          <p style={{ font: "400 14px/1.5 var(--font-sans)", color: "var(--steel)", margin: "0 0 24px" }}>Tell us about your business and we&apos;ll get back to you within two business days.</p>
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            <div className="form-row">
              <div className="field"><label>Full name</label><input required placeholder="Jane Engineer" /></div>
              <div className="field"><label>Company</label><input required placeholder="Your company" /></div>
            </div>
            <div className="form-row">
              <div className="field"><label>Work email</label><input type="email" required placeholder="you@company.com" /></div>
              <div className="field"><label>Country</label><input required placeholder="Jordan" /></div>
            </div>
            <div className="form-row full">
              <div className="field">
                <label>Partner tier</label>
                <select><option>Reseller</option><option>System Integrator</option><option>OEM / Co-development</option></select>
              </div>
            </div>
            <div className="form-row full">
              <div className="field"><label>Tell us about your business</label><textarea placeholder="What sectors do you serve? Roughly how many deployments per year?" /></div>
            </div>
            <button type="submit" style={{ padding: "14px 22px", background: "var(--primary)", color: "#fff", border: 0, borderRadius: 8, font: "500 14px/1.3 var(--font-sans)", cursor: "pointer" }}>Submit application</button>
          </form>
        </>
      )}
    </div>
  );
}

export default function PartnerComponent() {
  const tiersRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const head2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" } });
    const tierCards = tiersRef.current?.querySelectorAll(".tier");
    if (tierCards) {
      gsap.fromTo(tierCards, { opacity: 0, y: 48, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: tiersRef.current, start: "top 80%", toggleActions: "play none none none" } });
    }
    gsap.fromTo(head2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: head2Ref.current, start: "top 85%", toggleActions: "play none none none" } });
    gsap.fromTo(reasonsRef.current, { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: reasonsRef.current, start: "top 80%", toggleActions: "play none none none" } });
    gsap.fromTo(formRef.current, { opacity: 0, x: 32 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: formRef.current, start: "top 80%", toggleActions: "play none none none" } });
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head" ref={headRef}>
            <div className="eyebrow">Partner tiers</div>
            <h2>Three ways to grow together.</h2>
            <p>Pick the level that fits your business. Move up over time as your deployments grow.</p>
          </div>
          <div className="tier-grid" ref={tiersRef}>
            {tiers.map(t => (
              <div key={t.nm} className={`tier${t.featured ? " featured" : ""}`}>
                <div className="lvl">{t.lvl}</div>
                <div className="nm">{t.nm}</div>
                <p style={{ font: "400 14px/1.5 var(--font-sans)", color: t.featured ? "rgba(255,255,255,0.7)" : "var(--steel)", margin: "12px 0 24px" }}>
                  For {t.nm === "Reseller" ? "sales-led teams who want to add IoT to their portfolio" : t.nm === "System Integrator" ? "integrators who deploy & support customer projects end-to-end" : "manufacturers building IoT products of their own"}.
                </p>
                <ul className="feat-list">{t.feats.map(f => <li key={f}>{f}</li>)}</ul>
                <Link href="/contact" className="cta-btn">Apply →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head" ref={head2Ref}>
            <div className="eyebrow">Why partner</div>
            <h2>Why companies in 9 countries chose us.</h2>
          </div>
          <div className="partner-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 18, opacity: 0 }} ref={reasonsRef}>
              {reasons.map(r => (
                <div key={r.h} style={{ padding: "24px 28px", background: "#fff", border: "1px solid var(--hairline)", borderRadius: 12 }}>
                  <h4 style={{ font: "600 17px/1.3 var(--font-sans)", margin: "0 0 6px", color: "var(--ink)", letterSpacing: -0.2 }}>{r.h}</h4>
                  <p style={{ font: "400 14px/1.55 var(--font-sans)", color: "var(--steel)", margin: 0 }}>{r.d}</p>
                </div>
              ))}
            </div>
            <div ref={formRef} style={{ opacity: 0 }}>
              <ApplicationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
