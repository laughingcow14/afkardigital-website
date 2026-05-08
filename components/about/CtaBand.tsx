"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBand() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 48, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" } });
  }, []);

  return (
    <section style={{ padding: "96px 0", background: "#fff" }}>
      <div className="container">
        <div className="cta-card" ref={ref} style={{ opacity: 0 }}>
          <div>
            <h3>Got a thing you want monitored?</h3>
            <p>Send us a sketch, a photo of the equipment, or a description. We&apos;ll come back with how we&apos;d build it.</p>
          </div>
          <div className="actions">
            <Link href="/contact" style={{ padding: "14px 22px", background: "#fff", color: "#0a1530", borderRadius: 8, textDecoration: "none", font: "500 14px/1.3 var(--font-sans)", display: "inline-flex" }}>Request audit</Link>
            <Link href="/products" style={{ padding: "14px 22px", background: "transparent", color: "#fff", borderRadius: 8, textDecoration: "none", font: "500 14px/1.3 var(--font-sans)", border: "1px solid rgba(255,255,255,0.22)", display: "inline-flex" }}>Browse products</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
