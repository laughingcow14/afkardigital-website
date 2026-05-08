"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroCanvas from "@/components/HeroCanvas";

export default function ProductsHero() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const children = innerRef.current?.children;
    if (children) {
      gsap.fromTo(Array.from(children), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" });
    }
  }, []);

  return (
    <section className="page-hero">
      <HeroCanvas />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="inner" ref={innerRef}>
          <div className="eyebrow">Products · 7 solutions</div>
          <h1>The AFKAR DIGITAL product family.</h1>
          <p>Manufactured devices, cloud platforms, and end-to-end solutions in Control, Integration &amp; Automation — built around our HudHud platform and shipped with a 3-year warranty.</p>
        </div>
      </div>
    </section>
  );
}
