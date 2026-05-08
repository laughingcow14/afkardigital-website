"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const verts = [
  { title: "Customized control devices", desc: "Integrated multifunctional capabilities in a single unit. Multiple protocols, any cloud.", tint: "lavender", icon: "cpu" },
  { title: "Smart facility", desc: "Auto-disable A/C in vacant spaces; setpoint optimization; sustainable Green IoT practices.", tint: "mint", icon: "building" },
  { title: "Smart wireless sensing", desc: "No drilling, no dust, no wiring. Easily relocatable units monitor temperature, power, leakage.", tint: "sky", icon: "wifi" },
  { title: "Smart thermal monitoring", desc: "Continuous, alarm-driven thermal mapping for data centers, switchgear and cold storage.", tint: "rose", icon: "thermo" },
  { title: "Power & smart metering", desc: "Real-time power monitoring with smart meters across distribution, sub-metering and tenants.", tint: "yellow", icon: "bolt" },
  { title: "Smart irrigation", desc: "QATARAT systems irrigate by time, period or volume — proven across NARC research projects.", tint: "peach", icon: "drop" },
  { title: "Indoor equipment localization", desc: "Locate any tagged equipment inside your facility — assets, tools, mobile racks.", tint: "lavender", icon: "pin" },
  { title: "IoT cloud platform development", desc: "We build cloud-native platforms for IoT — multi-tenant, API-first, SDK-integrated.", tint: "mint", icon: "cloud" },
  { title: "Automation software", desc: "Custom automation software and SCADA/BMS/DCIM integrations, end-to-end.", tint: "sky", icon: "code" },
];

const ICONS: Record<string, React.ReactNode> = {
  cpu: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/></svg>),
  building: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/></svg>),
  wifi: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>),
  thermo: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4 4 0 1 0 5 0z"/></svg>),
  bolt: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  drop: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>),
  pin: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  cloud: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>),
  code: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
};

export default function Verticals() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" } });
    const cards = gridRef.current?.querySelectorAll(".vert-card");
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none none" } });
    }
  }, []);

  return (
    <section className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-head" ref={headRef}>
          <div className="eyebrow">Smart verticals</div>
          <h2>Nine ways AFKAR DIGITAL shows up.</h2>
          <p>From the device on the rack to the dashboard on your phone — we cover the full IoT stack across nine specialized practice areas.</p>
        </div>
        <div className="verticals-grid" ref={gridRef}>
          {verts.map(v => (
            <div key={v.title} className={`vert-card t-${v.tint}`}>
              <div className="ico">{ICONS[v.icon]}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
