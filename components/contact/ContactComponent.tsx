"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INFO = [
  { label: "Phone", value: "+962-79-871-5260", sub: "Sun–Thu, 9:00 AM – 6:00 PM AST", href: "tel:+962798715260", icon: "phone" },
  { label: "WhatsApp", value: "+962-79-871-5260", sub: "Quick questions & photos welcome", href: "https://wa.me/962798715260", icon: "phone" },
  { label: "Email", value: "Info@afkardigital.com", sub: "Usually reply within one business day", href: "mailto:Info@afkardigital.com", icon: "mail" },
  { label: "Hours", value: "Sun – Thu", sub: "9:00 AM – 6:00 PM (AST, UTC+3)", href: undefined, icon: "clock" },
];

const INQUIRIES = ["General inquiry", "Request a quote", "Product support", "Partnership / OEM", "Press & media", "Other"];

function Icon({ type }: { type: string }) {
  if (type === "phone") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 0 0.12 1.19 2 2 0 012.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.55 6.55l1.27-1.34a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
  if (type === "mail") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
    </svg>
  );
  if (type === "map") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function MapCard() {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, overflow: "hidden", height: "100%", minHeight: 280, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 220 }}>
        <iframe
          title="AFKAR DIGITAL office location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.5!2d35.8708546!3d32.0295085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c9f9e51bc2e3b%3A0xc6f386e24c66dcb8!2sAFKAR%20DIGITAL!5e0!3m2!1sen!2sjo!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, position: "absolute", inset: 0, minHeight: 220 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--hairline)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ font: "500 13px/1.3 var(--font-sans)", color: "var(--ink)", marginBottom: 2 }}>Al-Manhal Center, Amman</div>
          <div style={{ font: "400 12px/1.5 var(--font-sans)", color: "var(--steel)" }}>#105 Floor #3, Office #304 — Jordan</div>
        </div>
        <a
          href="https://maps.google.com/?q=32.0295085,35.8708546"
          target="_blank"
          rel="noopener noreferrer"
          style={{ font: "500 12px/1 var(--font-sans)", color: "var(--primary)", textDecoration: "none", whiteSpace: "nowrap", marginLeft: 16 }}
        >
          Open in Maps →
        </a>
      </div>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="form-card">
      {submitted ? (
        <div style={{ padding: 40, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: "var(--tint-mint)", color: "var(--brand-green)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style={{ font: "600 22px/1.3 var(--font-sans)", margin: "0 0 8px", color: "var(--ink)" }}>Message sent</h3>
          <p style={{ font: "400 14px/1.5 var(--font-sans)", color: "var(--steel)", margin: 0 }}>We&apos;ll get back to you within one business day.</p>
        </div>
      ) : (
        <>
          <h3 style={{ font: "600 22px/1.3 var(--font-sans)", margin: "0 0 6px", color: "var(--ink)", letterSpacing: -0.3 }}>Send us a message</h3>
          <p style={{ font: "400 14px/1.5 var(--font-sans)", color: "var(--steel)", margin: "0 0 24px" }}>A sketch, a photo, a description — anything helps. We&apos;ll come back with how we&apos;d build it.</p>
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            <div className="form-row">
              <div className="field"><label>Full name</label><input required placeholder="Jane Engineer" /></div>
              <div className="field"><label>Work email</label><input type="email" required placeholder="you@company.com" /></div>
            </div>
            <div className="form-row">
              <div className="field"><label>Company</label><input placeholder="Optional" /></div>
              <div className="field">
                <label>Inquiry type</label>
                <select>
                  {INQUIRIES.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row full">
              <div className="field"><label>Message</label><textarea required placeholder="Describe what you're building or what you need. Attach a file after we reply if that's easier." style={{ minHeight: 120 }} /></div>
            </div>
            <button type="submit" style={{ padding: "14px 24px", background: "var(--primary)", color: "#fff", border: 0, borderRadius: 8, font: "500 14px/1.3 var(--font-sans)", cursor: "pointer", letterSpacing: 0.1 }}>Send message</button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ContactComponent() {
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" } });

    const cards = cardsRef.current?.querySelectorAll(".info-card");
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 36, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 82%", toggleActions: "play none none none" } });
    }

    gsap.fromTo(leftRef.current, { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: leftRef.current, start: "top 80%", toggleActions: "play none none none" } });
    gsap.fromTo(rightRef.current, { opacity: 0, x: 32 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: rightRef.current, start: "top 80%", toggleActions: "play none none none" } });
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head" ref={headRef}>
            <div className="eyebrow">How to reach us</div>
            <h2>Four ways to get in touch.</h2>
            <p>Pick the channel that works for you. We&apos;re a small team, which means you talk to the people who built the product.</p>
          </div>
          <div className="contact-cards" ref={cardsRef}>
            {INFO.map(item => (
              <a
                key={item.label}
                className="info-card"
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="info-icon">
                  <Icon type={item.icon} />
                </div>
                <div>
                  <div className="info-label">{item.label}</div>
                  <div className="info-value">{item.value}</div>
                  <div className="info-sub">{item.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="contact-grid">
            <div ref={leftRef} style={{ opacity: 0 }}>
              <MapCard />
            </div>
            <div ref={rightRef} style={{ opacity: 0 }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
