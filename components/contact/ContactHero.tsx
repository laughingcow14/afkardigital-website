"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroCanvas from "@/components/HeroCanvas";

export default function ContactHero() {
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
          <div className="eyebrow">Contact · Get in touch</div>
          <h1>Let&apos;s talk about your project.</h1>
          <p>Send us a sketch, a photo of the equipment, or a description. We&apos;ll come back with how we&apos;d build it. Usually within one business day.</p>
        </div>
      </div>
    </section>
  );
}
