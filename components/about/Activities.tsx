"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { when: "April 2026", sub: "PSUT · Amman", title: "IoT Workshop Day at PSUT", desc: "Hands-on workshop with engineering students at Princess Sumaya University for Technology — introducing real-world IoT design patterns through our manufactured devices.", tag: "Education", tone: "sky" },
  { when: "February 2026", sub: "NARC", title: "Sustainable Irrigation Water Management", desc: "AFKAR Digital presented at NARC's workshop on Participatory Action Plans, focusing on Decision Support Systems that automatically mix fresh and saline water by crop type — reducing irrigation waste.", tag: "Agri-tech", tone: "mint" },
  { when: "April 2025", sub: "PSUT", title: "IoT Lecture at PSUT University", desc: "Lecture and live demo for the Computer Engineering department. Six photos. One excited classroom of future IoT engineers.", tag: "Education", tone: "peach" },
  { when: "2022", sub: "Amman", title: "GIMEX 2022", desc: "AFKAR DIGITAL exhibited the second generation of HudHud loggers, MURAQEB wireless thermal kits, and the QATARAT smart-irrigation controller.", tag: "Exhibition", tone: "yellow" },
  { when: "2019", sub: "Amman", title: "GIMEX 2019", desc: "First showing at the Jordan International Manufacturing Exhibition. Nine booth photos. The launchpad for everything since.", tag: "Exhibition", tone: "lavender" },
  { when: "2018 – 2019", sub: "JU · PSUT", title: "Sponsored graduation projects", desc: "4 graduation projects sponsored across JU and PSUT — IoT proxies, IR remote control over Wi-Fi, encrypted remote control, and modem interfacing.", tag: "Education", tone: "sky" },
];

export default function Activities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" } });
    const items = listRef.current?.querySelectorAll(".activity");
    if (items) {
      gsap.fromTo(items, { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: listRef.current, start: "top 80%", toggleActions: "play none none none" } });
    }
  }, []);

  return (
    <section className="section" id="activities" ref={sectionRef}>
      <div className="container">
        <div className="section-head" ref={headRef}>
          <div className="eyebrow">Our activities</div>
          <h2>Conferences, classrooms, and a bit of community.</h2>
          <p>The work we do beyond shipping product — workshops with universities, exhibitions, sponsored projects.</p>
        </div>
        <div className="activities" ref={listRef}>
          {events.map(e => (
            <div key={e.title} className={`activity t-${e.tone}`}>
              <div className="when">{e.when}<small>{e.sub}</small></div>
              <div>
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
                <span className="pill">{e.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
