"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroCanvas from "@/components/HeroCanvas";

export default function StoreHero() {
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
          <div className="eyebrow">Store · Components &amp; Hardware</div>
          <h1>AFKAR DIGITAL hardware store.</h1>
          <p>ESP32 modules, RTUs, PoE injectors, serial converters and RS-485 components — the building blocks behind every deployment. Ships from Amman.</p>
        </div>
      </div>
    </section>
  );
}
