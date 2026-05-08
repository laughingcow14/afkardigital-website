"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 450, suf: "+", t: "Devices manufactured", d: "Connected devices made by AFKAR DIGITAL across active deployments." },
  { num: 2.1, suf: "k", t: "3rd-party integrations", d: "Sensors, devices and actuators integrated through HudHud APIs." },
  { num: 12, suf: "k", t: "Connected users", d: "End-customer users actively monitoring through our cloud platform." },
  { num: 180, suf: "+", t: "IoT gateways", d: "Loggers and IoT gateways developed and shipped by AFKAR DIGITAL." },
];

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" } });

    const cards = gridRef.current?.querySelectorAll(".num-card");
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none none",
          onEnter: () => {
            stats.forEach((s, i) => {
              const el = numRefs.current[i];
              if (!el) return;
              const obj = { val: 0 };
              gsap.to(obj, { val: s.num, duration: 1.8, ease: "power2.out", delay: i * 0.1,
                onUpdate: () => { el.textContent = s.num % 1 !== 0 ? obj.val.toFixed(1) : Math.round(obj.val).toString(); }
              });
            });
          }
        }
      });
    }
  }, []);

  return (
    <section className="section alt" ref={sectionRef}>
      <div className="container">
        <div className="section-head" ref={headRef}>
          <div className="eyebrow">Numbers that speak for themselves</div>
          <h2>Eight years of quietly running the room.</h2>
          <p>Devices on walls, sensors in racks, controllers in pumps — the AFKAR DIGITAL footprint, in numbers.</p>
        </div>
        <div className="numbers-grid" ref={gridRef}>
          {stats.map((s, i) => (
            <div key={s.t} className="num-card">
              <div className="num">
                <span ref={el => { numRefs.current[i] = el; }}>0</span>
                <span className="suf">{s.suf}</span>
              </div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
