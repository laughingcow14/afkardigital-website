"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cats = [
  { id: "all", name: "All categories", count: 12 },
  { id: "modules", name: "Modules with original components", count: 3 },
  { id: "rtus-esp32", name: "RTUs programmed with your ESP32", count: 2 },
  { id: "poe", name: "PoE Injectors / Splitters", count: 2 },
  { id: "rtu-io", name: "RTU Digital & Analogue I/O", count: 2 },
  { id: "serial-ip", name: "Serial to IP Converters", count: 2 },
  { id: "rs485", name: "RS485 Isolator / Repeater", count: 1 },
  { id: "sale", name: "Sale", count: 2 },
];

const items = [
  { id: 1, cat: "modules", name: "ESP32-WROOM-32 Module", desc: "Original Espressif WROOM-32 with shielded package.", price: 14, sale: false, stock: true, color: "#391c57" },
  { id: 2, cat: "modules", name: "LoRa SX1278 Module", desc: "433 MHz LoRa transceiver with antenna.", price: 18, sale: false, stock: true, color: "#5645d4" },
  { id: 3, cat: "modules", name: "4G LTE Modem Module", desc: "Quectel EC25 mini-PCIe with breakout.", price: 62, sale: false, stock: true, color: "#0a1530" },
  { id: 4, cat: "rtus-esp32", name: "HudHud RTU-8 (ESP32)", desc: "8-channel RTU programmable with your own ESP32 code.", price: 89, sale: false, stock: true, color: "#523410" },
  { id: 5, cat: "rtus-esp32", name: "HudHud RTU-16 (ESP32)", desc: "16-channel RTU. Dual-core, dual-RS485, expandable.", price: 142, sale: false, stock: true, color: "#391c57" },
  { id: 6, cat: "poe", name: "PoE Injector — Gigabit", desc: "30W IEEE 802.3at PoE+ injector for industrial use.", price: 24, sale: false, stock: true, color: "#1a2a52" },
  { id: 7, cat: "poe", name: "PoE Splitter — 12V/24V", desc: "Selectable output PoE splitter for cameras and APs.", price: 19, sale: true, stock: true, color: "#dd5b00" },
  { id: 8, cat: "rtu-io", name: "RTU 12-DI / 4-DO Module", desc: "12 digital inputs, 4 relay outputs, RS-485, MQTT.", price: 54, sale: false, stock: true, color: "#391c57" },
  { id: 9, cat: "rtu-io", name: "RTU 4-AI / 4-AO Module", desc: "4 analogue inputs (0–10V), 4 analogue outputs (4–20mA).", price: 68, sale: false, stock: true, color: "#5645d4" },
  { id: 10, cat: "serial-ip", name: "Serial-to-IP Converter (single)", desc: "RS-232/485 to TCP/UDP. DIN-rail mount.", price: 42, sale: false, stock: true, color: "#1a2a52" },
  { id: 11, cat: "serial-ip", name: "Serial-to-IP Converter (dual)", desc: "Two independent serial channels over Ethernet.", price: 74, sale: false, stock: true, color: "#070f24" },
  { id: 12, cat: "rs485", name: "RS-485 Isolator / Repeater", desc: "Galvanic isolation up to 2.5 kV with auto-direction.", price: 38, sale: true, stock: true, color: "#523410" },
];

function ItemDevice({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "70%", height: "70%" }}>
      <rect x="20" y="35" width="80" height="50" rx="4" fill={color}/>
      <rect x="46" y="50" width="28" height="20" rx="2" fill="rgba(255,255,255,0.18)"/>
      {[0,1,2,3].map(i => <rect key={i} x={26+i*5} y="40" width="2" height="2" fill="#1aae39"/>)}
      {[0,1,2,3,4].map(i => <rect key={i} x={28+i*14} y="30" width="6" height="5" fill={color} stroke="rgba(255,255,255,0.2)"/>)}
      {[0,1,2,3,4].map(i => <rect key={i} x={28+i*14} y="85" width="6" height="5" fill={color} stroke="rgba(255,255,255,0.2)"/>)}
    </svg>
  );
}

export default function StoreComponent() {
  const [active, setActive] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const list = active === "all" ? items : active === "sale" ? items.filter(i => i.sale) : items.filter(i => i.cat === active);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" } });
  }, []);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".item-card");
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" });
    }
  }, [active]);

  const activeCat = cats.find(c => c.id === active);

  return (
    <section className="section" ref={sectionRef} style={{ opacity: 0 }}>
      <div className="container">
        <div className="store-grid">
          <aside className="cat-list">
            {cats.map(c => (
              <button key={c.id} className={active === c.id ? "active" : ""} onClick={() => setActive(c.id)}>
                <span>{c.name}</span>
                <span className="count">{c.count}</span>
              </button>
            ))}
          </aside>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ font: "600 28px/1.2 var(--font-sans)", letterSpacing: -0.4, margin: 0, color: "var(--ink)" }}>{activeCat?.name}</h2>
                <p style={{ font: "400 14px/1.5 var(--font-sans)", color: "var(--steel)", margin: "4px 0 0" }}>{list.length} item{list.length !== 1 ? "s" : ""} in stock · ships from Amman</p>
              </div>
              <select style={{ padding: "10px 14px", border: "1px solid var(--hairline)", borderRadius: 8, font: "500 13px/1.3 var(--font-sans)", background: "#fff", color: "var(--charcoal)" }}>
                <option>Sort: Featured</option>
                <option>Price low → high</option>
                <option>Price high → low</option>
                <option>Newest</option>
              </select>
            </div>
            <div className="item-grid" ref={gridRef}>
              {list.map(it => (
                <div key={it.id} className="item-card">
                  <div className="thumb">
                    {it.sale && <span className="sale-tag">Sale</span>}
                    {it.stock && <span className="stock-tag">● In stock</span>}
                    <ItemDevice color={it.color} />
                  </div>
                  <div className="body">
                    <h3>{it.name}</h3>
                    <p>{it.desc}</p>
                    <div className="price-row">
                      <span className="price">${it.price}<small>USD</small></span>
                      <button className="add">Add to cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
