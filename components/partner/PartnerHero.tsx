"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroCanvas from "@/components/HeroCanvas";

export default function PartnerHero() {
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
          <div className="eyebrow">Partner program · Three tiers</div>
          <h1>Grow with AFKAR DIGITAL.</h1>
          <p>Reseller, System Integrator, or OEM co-development — pick the level that fits your business and grow it over time as your deployments expand.</p>
        </div>
      </div>
    </section>
  );
}
