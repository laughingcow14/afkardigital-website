"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CUSTOMERS } from "@/lib/data/customers";

gsap.registerPlugin(ScrollTrigger);

const FLAG_TEXT: Record<string, string> = { Jordan: "Jordan", KSA: "Saudi Arabia", UAE: "UAE", Kuwait: "Kuwait" };

export default function Customers() {
  const [openIdx, setOpenIdx] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenIdx(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openIdx >= 0 ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openIdx]);

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" } });
    const cards = gridRef.current?.querySelectorAll(".cust-card-v2");
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none none" } });
    }
  }, []);

  const c = openIdx >= 0 ? CUSTOMERS[openIdx] : null;

  return (
    <section className="section" id="customers" ref={sectionRef}>
      <div className="container">
        <div className="section-head" ref={headRef}>
          <div className="eyebrow">Trusted across the region</div>
          <h2>27 customers. Across Jordan, KSA, UAE &amp; Kuwait.</h2>
          <p>Banks, telcos, hospitals, ministries, universities, factories, dairies — the people running things across the region rely on our IoT.</p>
        </div>
        <div className="cust-grid-v2" ref={gridRef}>
          {CUSTOMERS.map((cust, i) => (
            <button key={cust.name} className="cust-card-v2" onClick={() => setOpenIdx(i)}>
              <div className="row-top">
                <span className="country">{FLAG_TEXT[cust.country] ?? cust.country}</span>
                <span className="more-arrow">→</span>
              </div>
              <div className="name">{cust.name}</div>
              <div className="sect">{cust.sector}</div>
              <div className="read-more">Read more</div>
            </button>
          ))}
        </div>
      </div>

      <div className={`cd-scrim${openIdx >= 0 ? " open" : ""}`} onClick={() => setOpenIdx(-1)} />
      <div className={`cd-modal${openIdx >= 0 ? " open" : ""}`} role="dialog">
        {c && (
          <>
            <div className="cd-head">
              <div>
                <div className="cd-flag">{FLAG_TEXT[c.country] ?? c.country}</div>
                <h3>{c.name}</h3>
                <div className="cd-sect">{c.sector}</div>
              </div>
              <button className="cd-close" onClick={() => setOpenIdx(-1)} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="cd-body">
              <h4>What Afkar Digital delivered</h4>
              <ul className="cd-list">
                {c.work.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
