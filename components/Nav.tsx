"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UtilityBar from "./UtilityBar";

const NAV_ITEMS = [
  { key: "about", label: "About Us", href: "/about" },
  { key: "products", label: "Products", href: "/products" },
  { key: "store", label: "Store", href: "/store" },
  { key: "partner", label: "Become a Partner", href: "/partner" },
  { key: "contact", label: "Contact Us", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = NAV_ITEMS.find((i) => pathname.startsWith(i.href))?.key ?? "";

  return (
    <>
      <UtilityBar />
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="row">
          <Link href="/about" className="logo">
            <span className="logo-mark">A</span>
            <span className="logo-text">
              <span className="b1">AfkarDigital</span>
              <span className="b2">Control · IoT · Automation</span>
            </span>
          </Link>
          <div className="links">
            {NAV_ITEMS.map((it) => (
              <Link
                key={it.key}
                href={it.href}
                className={active === it.key ? "active" : ""}
              >
                {it.label}
              </Link>
            ))}
          </div>
          <div className="right">
            <button className="lang-toggle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
              EN
            </button>
            <Link href="/contact" className="cta">Request a demo</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
