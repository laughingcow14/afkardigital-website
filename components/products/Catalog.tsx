"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS, PRODUCT_DETAILS } from "@/lib/data/products";

gsap.registerPlugin(ScrollTrigger);

function ProductThumb({ id }: { id: string }) {
  const renderers: Record<string, React.ReactNode> = {
    power: (<svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}><polyline points="20,80 50,60 80,70 110,40 140,55 170,30" fill="none" stroke="#523410" strokeWidth="2.5"/><polygon points="100,30 90,60 100,60 95,90 110,55 100,55" fill="#f5d75e"/></svg>),
    "thermal-central": (<svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}><rect x="60" y="20" width="20" height="80" rx="10" fill="#fff" stroke="#dd5b00" strokeWidth="2"/><rect x="64" y="40" width="12" height="50" fill="#dd5b00"/><circle cx="70" cy="92" r="10" fill="#dd5b00"/><path d="M100 60 L160 60" stroke="#dd5b00" strokeWidth="2" strokeDasharray="3 3"/><rect x="160" y="40" width="30" height="40" rx="3" fill="#0a1530"/><text x="175" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600">22°C</text></svg>),
    "data-center": (<svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}>{[0,1,2,3].map(i=><rect key={i} x={20+i*40} y="20" width="32" height="80" rx="3" fill="#5645d4" opacity={0.3+i*0.15}/>)}{[0,1,2,3].map(i=>[20,40,60,80].map(y=><rect key={`${i}-${y}`} x={24+i*40} y={20+(y/100)*80} width="24" height="3" fill="rgba(255,255,255,0.6)"/>))}</svg>),
    "wireless-thermal": (<svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}><circle cx="100" cy="60" r="15" fill="#dd5b00"/>{[25,35,45].map(r=><circle key={r} cx="100" cy="60" r={r} fill="none" stroke="#dd5b00" strokeWidth="1.5" opacity={1-r/55}/>)}</svg>),
    hudhud: (<svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}><rect x="40" y="30" width="120" height="60" rx="4" fill="#391c57"/><rect x="80" y="50" width="40" height="20" rx="2" fill="#7b3ff2"/><text x="100" y="64" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">ESP32</text>{[0,1,2,3].map(i=><circle key={i} cx={50+i*8} cy="40" r="2" fill="#1aae39"/>)}</svg>),
    qatarat: (<svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}><path d="M0 90 Q50 70 100 80 T200 75 L200 120 L0 120 Z" fill="#1aae39" opacity="0.4"/><circle cx="40" cy="50" r="6" fill="#dcecfa"/><circle cx="80" cy="40" r="4" fill="#dcecfa"/><circle cx="130" cy="55" r="5" fill="#dcecfa"/><circle cx="170" cy="45" r="4" fill="#dcecfa"/>{[60,100,140].map(x=><line key={x} x1={x} y1="80" x2={x} y2="100" stroke="#5645d4" strokeWidth="2"/>)}</svg>),
    labeeb: (<svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}><path d="M40 70 L100 30 L160 70 L160 100 L40 100 Z" fill="#523410" opacity="0.2"/><path d="M40 70 L100 30 L160 70" fill="none" stroke="#523410" strokeWidth="2"/><rect x="85" y="70" width="30" height="30" fill="#f5d75e"/><circle cx="100" cy="50" r="4" fill="#dd5b00"/></svg>),
  };
  return <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>{renderers[id] ?? null}</div>;
}

const CATS = ["All", "Platform", "Thermal", "Power", "Facility", "Agri"];

export default function Catalog() {
  const [active, setActive] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const items = active === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === active);
  const product = openId ? PRODUCTS.find(p => p.id === openId) : null;
  const detail = openId ? PRODUCT_DETAILS[openId] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openId]);

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" } });
  }, []);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".product-card");
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
    }
  }, [active]);

  // Open from URL hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      if (PRODUCTS.find(p => p.id === id)) setOpenId(id);
    }
  }, []);

  return (
    <section className="section alt">
      <div className="container">
        <div className="section-head" ref={headRef}>
          <div className="eyebrow">Full catalog</div>
          <h2>Seven products across the IoT stack.</h2>
          <p>From wireless thermal kits to full smart-irrigation deployments — find what fits your environment.</p>
        </div>
        <div className="filter-row">
          {CATS.map(c => (
            <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
        <div className="product-grid" ref={gridRef}>
          {items.map(p => (
            <div key={p.id} id={p.id} className={`product-card t-${p.tint}`}>
              <div className="thumb"><ProductThumb id={p.id} /></div>
              <div className="body">
                <div className="tag-row"><span className="tag tag-purple">{p.tag}</span></div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <a className="more" href={`#${p.id}`} onClick={e => { e.preventDefault(); setOpenId(p.id); }}>Read more →</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`pd-scrim${openId ? " open" : ""}`} onClick={() => setOpenId(null)} />
      <aside className={`pd-drawer${openId ? " open" : ""}`}>
        {product && detail && (
          <>
            <div className="pd-head">
              <div className={`product-card t-${product.tint}`} style={{ width: 64, height: 64, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: "1px solid var(--hairline)" }}>
                <ProductThumb id={product.id} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="tag tag-purple" style={{ marginBottom: 6 }}>{product.tag}</div>
                <h2 style={{ font: "600 20px/1.25 var(--font-sans)", margin: "0 0 4px", letterSpacing: -0.3 }}>{detail.name}</h2>
                <p className="tagline">{detail.tagline}</p>
              </div>
              <button className="pd-close" onClick={() => setOpenId(null)} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="pd-body">
              <div className="pd-overview">
                {detail.overview.map((para, i) => <p key={i}>{para}</p>)}
              </div>
              {detail.sections.map((s, i) => (
                <div key={i} className="pd-section">
                  <h4>{s.h}</h4>
                  <ul className="pd-list">
                    {s.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="pd-foot">
              <Link href="/contact" style={{ flex: 1, padding: "13px 18px", background: "var(--primary)", color: "#fff", borderRadius: 8, textDecoration: "none", font: "500 14px/1.3 var(--font-sans)", textAlign: "center" }}>Request a demo</Link>
              <a href="mailto:Info@afkardigital.com" style={{ flex: 1, padding: "13px 18px", background: "#fff", color: "var(--ink)", borderRadius: 8, textDecoration: "none", font: "500 14px/1.3 var(--font-sans)", textAlign: "center", border: "1px solid var(--hairline)" }}>Get pricing</a>
            </div>
          </>
        )}
      </aside>
    </section>
  );
}
