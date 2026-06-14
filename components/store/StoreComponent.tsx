"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitOrder, type OrderItem } from "@/app/store/actions";

gsap.registerPlugin(ScrollTrigger);

// ── Category list ────────────────────────────────────────────────────────────

const cats = [
  { id: "all",        name: "All categories",                   count: 12 },
  { id: "modules",    name: "Modules with original components", count: 3 },
  { id: "rtus-esp32", name: "RTUs programmed with your ESP32",  count: 2 },
  { id: "poe",        name: "PoE Injectors / Splitters",        count: 2 },
  { id: "rtu-io",     name: "RTU Digital & Analogue I/O",       count: 2 },
  { id: "serial-ip",  name: "Serial to IP Converters",          count: 2 },
  { id: "rs485",      name: "RS485 Isolator / Repeater",        count: 1 },
  { id: "sale",       name: "Sale",                             count: 2 },
];

// Prices in JOD
const items = [
  { id:1,  cat:"modules",    name:"ESP32-WROOM-32 Module",          desc:"Original Espressif WROOM-32 with shielded package.",             price:10,  sale:false, color:"#391c57" },
  { id:2,  cat:"modules",    name:"LoRa SX1278 Module",             desc:"433 MHz LoRa transceiver with antenna.",                         price:13,  sale:false, color:"#5645d4" },
  { id:3,  cat:"modules",    name:"4G LTE Modem Module",            desc:"Quectel EC25 mini-PCIe with breakout.",                          price:44,  sale:false, color:"#0a1530" },
  { id:4,  cat:"rtus-esp32", name:"HudHud RTU-8 (ESP32)",           desc:"8-channel RTU programmable with your own ESP32 code.",           price:63,  sale:false, color:"#523410" },
  { id:5,  cat:"rtus-esp32", name:"HudHud RTU-16 (ESP32)",          desc:"16-channel RTU. Dual-core, dual-RS485, expandable.",            price:101, sale:false, color:"#391c57" },
  { id:6,  cat:"poe",        name:"PoE Injector — Gigabit",         desc:"30W IEEE 802.3at PoE+ injector for industrial use.",            price:17,  sale:false, color:"#1a2a52" },
  { id:7,  cat:"poe",        name:"PoE Splitter — 12V/24V",         desc:"Selectable output PoE splitter for cameras and APs.",           price:14,  sale:true,  color:"#dd5b00" },
  { id:8,  cat:"rtu-io",     name:"RTU 12-DI / 4-DO Module",        desc:"12 digital inputs, 4 relay outputs, RS-485, MQTT.",             price:38,  sale:false, color:"#391c57" },
  { id:9,  cat:"rtu-io",     name:"RTU 4-AI / 4-AO Module",         desc:"4 analogue inputs (0–10V), 4 analogue outputs (4–20mA).",       price:48,  sale:false, color:"#5645d4" },
  { id:10, cat:"serial-ip",  name:"Serial-to-IP Converter (single)", desc:"RS-232/485 to TCP/UDP. DIN-rail mount.",                       price:30,  sale:false, color:"#1a2a52" },
  { id:11, cat:"serial-ip",  name:"Serial-to-IP Converter (dual)",  desc:"Two independent serial channels over Ethernet.",                price:52,  sale:false, color:"#070f24" },
  { id:12, cat:"rs485",      name:"RS-485 Isolator / Repeater",     desc:"Galvanic isolation up to 2.5 kV with auto-direction.",          price:27,  sale:true,  color:"#523410" },
];

// ── Tiny device illustration ─────────────────────────────────────────────────

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

// ── Cart drawer ──────────────────────────────────────────────────────────────

type CartItem = OrderItem;
type CheckoutStep = "cart" | "details" | "confirm";

interface CartDrawerProps {
  cartItems: CartItem[];
  onClose: () => void;
  onQtyChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

function CartDrawer({ cartItems, onClose, onQtyChange, onRemove }: CartDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [orderRef, setOrderRef] = useState("");
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: "", phone: "", address: "", city: "Amman", notes: "",
    paymentMethod: "cod" as "cod" | "cheque",
  });

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await submitOrder({ ...form, items: cartItems, total });
      if (result.success) {
        setOrderRef(result.orderRef);
        setStep("confirm");
      }
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position:"fixed", inset:0, background:"rgba(10,21,48,0.5)", backdropFilter:"blur(4px)", zIndex:200 }}
      />

      {/* Drawer panel */}
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:"min(480px,100vw)", background:"#fff", zIndex:201, display:"flex", flexDirection:"column", boxShadow:"-8px 0 40px rgba(0,0,0,0.18)", overflowY:"auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", borderBottom:"1px solid var(--hairline)", flexShrink:0 }}>
          <h2 style={{ font:"600 18px/1.2 var(--font-sans)", margin:0, color:"var(--ink)" }}>
            {step === "cart" ? "Your cart" : step === "details" ? "Checkout" : "Order placed"}
          </h2>
          <button onClick={onClose} style={{ border:0, background:"none", cursor:"pointer", padding:4, color:"var(--steel)", display:"grid", placeItems:"center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── STEP: CART ── */}
        {step === "cart" && (
          <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
            {cartItems.length === 0 ? (
              <div style={{ flex:1, display:"grid", placeItems:"center", color:"var(--steel)", font:"400 14px/1.5 var(--font-sans)", textAlign:"center", padding:40 }}>
                <div>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity:0.3, marginBottom:12, display:"block", margin:"0 auto 12px" }}>
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57L23 6H6"/>
                  </svg>
                  <p style={{ margin:0 }}>Your cart is empty.<br/>Add items from the store.</p>
                </div>
              </div>
            ) : (
              <>
                <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:"1px solid var(--hairline)" }}>
                      <div style={{ flexShrink:0, width:48, height:48, borderRadius:8, background:"var(--surface)", display:"grid", placeItems:"center" }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--steel)" strokeWidth="1.5">
                          <rect x="2" y="7" width="20" height="14" rx="2"/>
                          <path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0"/>
                        </svg>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ font:"500 13px/1.3 var(--font-sans)", color:"var(--ink)", marginBottom:2 }}>{item.name}</div>
                        <div style={{ font:"400 12px/1.3 var(--font-sans)", color:"var(--steel)" }}>{item.price} JOD each</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                        <button onClick={() => onQtyChange(item.id, -1)} style={{ width:28, height:28, border:"1px solid var(--hairline)", borderRadius:6, background:"#fff", cursor:"pointer", font:"500 14px/1 var(--font-sans)", color:"var(--ink)", display:"grid", placeItems:"center" }}>−</button>
                        <span style={{ font:"600 13px/1 var(--font-sans)", color:"var(--ink)", minWidth:20, textAlign:"center" }}>{item.qty}</span>
                        <button onClick={() => onQtyChange(item.id, +1)} style={{ width:28, height:28, border:"1px solid var(--hairline)", borderRadius:6, background:"#fff", cursor:"pointer", font:"500 14px/1 var(--font-sans)", color:"var(--ink)", display:"grid", placeItems:"center" }}>+</button>
                        <button onClick={() => onRemove(item.id)} style={{ width:28, height:28, border:0, background:"none", cursor:"pointer", color:"var(--steel)", display:"grid", placeItems:"center" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </div>
                      <div style={{ font:"600 13px/1 var(--font-sans)", color:"var(--ink)", flexShrink:0, minWidth:52, textAlign:"right" }}>{item.price * item.qty} JOD</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"20px 24px", borderTop:"1px solid var(--hairline)", flexShrink:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ font:"400 14px/1.5 var(--font-sans)", color:"var(--steel)" }}>Subtotal</span>
                    <span style={{ font:"400 14px/1.5 var(--font-sans)", color:"var(--ink)" }}>{total} JOD</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
                    <span style={{ font:"500 15px/1.3 var(--font-sans)", color:"var(--ink)" }}>Delivery</span>
                    <span style={{ font:"400 13px/1.3 var(--font-sans)", color:"var(--steel)" }}>Calculated at checkout</span>
                  </div>
                  <button
                    onClick={() => setStep("details")}
                    style={{ width:"100%", padding:"14px 0", background:"var(--primary)", color:"#fff", border:0, borderRadius:10, font:"600 15px/1.3 var(--font-sans)", cursor:"pointer" }}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── STEP: DETAILS ── */}
        {step === "details" && (
          <form onSubmit={handleSubmit} style={{ flex:1, display:"flex", flexDirection:"column" }}>
            <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>

              {/* Order summary */}
              <div style={{ background:"var(--surface)", borderRadius:10, padding:"14px 16px", marginBottom:24 }}>
                {cartItems.map(i => (
                  <div key={i.id} style={{ display:"flex", justifyContent:"space-between", font:"400 13px/1.8 var(--font-sans)", color:"var(--ink)" }}>
                    <span>{i.name} × {i.qty}</span>
                    <span>{i.price * i.qty} JOD</span>
                  </div>
                ))}
                <div style={{ borderTop:"1px solid var(--hairline)", marginTop:10, paddingTop:10, display:"flex", justifyContent:"space-between", font:"600 14px/1 var(--font-sans)", color:"var(--ink)" }}>
                  <span>Total</span><span>{total} JOD</span>
                </div>
              </div>

              {/* Contact & delivery fields */}
              {([
                { label:"Full name",       key:"name",    type:"text", placeholder:"Your full name",        required:true },
                { label:"Phone number",    key:"phone",   type:"tel",  placeholder:"+962 XX XXX XXXX",      required:true },
                { label:"Delivery address",key:"address", type:"text", placeholder:"Street, building, floor",required:true },
                { label:"City",            key:"city",    type:"text", placeholder:"Amman",                 required:true },
              ] as const).map(f => (
                <div key={f.key} style={{ marginBottom:16 }}>
                  <label style={{ display:"block", font:"500 13px/1.3 var(--font-sans)", color:"var(--ink)", marginBottom:6 }}>{f.label}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width:"100%", padding:"10px 14px", border:"1px solid var(--hairline)", borderRadius:8, font:"400 14px/1.3 var(--font-sans)", color:"var(--ink)", background:"#fff", outline:"none", boxSizing:"border-box" }}
                  />
                </div>
              ))}

              {/* Payment method */}
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", font:"500 13px/1.3 var(--font-sans)", color:"var(--ink)", marginBottom:10 }}>Payment method</label>
                {[
                  { val:"cod",    label:"Cash on delivery", desc:"Pay in cash when your order arrives." },
                  { val:"cheque", label:"Cheque",           desc:"Pay by company cheque upon delivery or pick-up." },
                ].map(opt => (
                  <label
                    key={opt.val}
                    style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px", border:`1.5px solid ${form.paymentMethod === opt.val ? "var(--primary)" : "var(--hairline)"}`, borderRadius:10, marginBottom:10, cursor:"pointer", background: form.paymentMethod === opt.val ? "rgba(86,69,212,0.04)" : "#fff" }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.val}
                      checked={form.paymentMethod === opt.val}
                      onChange={() => setForm(p => ({ ...p, paymentMethod: opt.val as "cod"|"cheque" }))}
                      style={{ marginTop:2, accentColor:"var(--primary)", flexShrink:0 }}
                    />
                    <div>
                      <div style={{ font:"500 14px/1.3 var(--font-sans)", color:"var(--ink)" }}>{opt.label}</div>
                      <div style={{ font:"400 12px/1.5 var(--font-sans)", color:"var(--steel)", marginTop:2 }}>{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Notes */}
              <div>
                <label style={{ display:"block", font:"500 13px/1.3 var(--font-sans)", color:"var(--ink)", marginBottom:6 }}>
                  Order notes <span style={{ color:"var(--steel)", fontWeight:400 }}>(optional)</span>
                </label>
                <textarea
                  placeholder="Special delivery instructions, preferred call time, etc."
                  value={form.notes}
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  style={{ width:"100%", padding:"10px 14px", border:"1px solid var(--hairline)", borderRadius:8, font:"400 14px/1.5 var(--font-sans)", color:"var(--ink)", background:"#fff", minHeight:80, resize:"vertical", outline:"none", boxSizing:"border-box" }}
                />
              </div>
            </div>

            <div style={{ padding:"16px 24px", borderTop:"1px solid var(--hairline)", flexShrink:0 }}>
              <button
                type="button"
                onClick={() => setStep("cart")}
                style={{ width:"100%", padding:"12px 0", background:"none", color:"var(--steel)", border:"1px solid var(--hairline)", borderRadius:10, font:"500 14px/1.3 var(--font-sans)", cursor:"pointer", marginBottom:10 }}
              >
                ← Back to cart
              </button>
              <button
                type="submit"
                disabled={isPending}
                style={{ width:"100%", padding:"14px 0", background:"var(--primary)", color:"#fff", border:0, borderRadius:10, font:"600 15px/1.3 var(--font-sans)", cursor: isPending ? "default" : "pointer", opacity: isPending ? 0.7 : 1 }}
              >
                {isPending ? "Placing order…" : `Place order · ${total} JOD`}
              </button>
            </div>
          </form>
        )}

        {/* ── STEP: CONFIRM ── */}
        {step === "confirm" && (
          <div style={{ flex:1, display:"grid", placeItems:"center", padding:40, textAlign:"center" }}>
            <div>
              <div style={{ width:72, height:72, borderRadius:36, background:"rgba(26,174,57,0.12)", color:"#1aae39", display:"grid", placeItems:"center", margin:"0 auto 20px" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 style={{ font:"600 22px/1.3 var(--font-sans)", margin:"0 0 10px", color:"var(--ink)" }}>Order received!</h3>
              <p style={{ font:"400 14px/1.6 var(--font-sans)", color:"var(--steel)", margin:"0 0 6px" }}>
                Reference: <strong style={{ color:"var(--ink)" }}>{orderRef}</strong>
              </p>
              <p style={{ font:"400 14px/1.6 var(--font-sans)", color:"var(--steel)", margin:"0 0 28px" }}>
                Our team will call you at <strong style={{ color:"var(--ink)" }}>{form.phone}</strong> to confirm delivery details.
              </p>
              <div style={{ background:"var(--surface)", borderRadius:12, padding:"16px 20px", marginBottom:28, textAlign:"left" }}>
                <div style={{ font:"500 11px/1.3 var(--font-sans)", color:"var(--steel)", textTransform:"uppercase", letterSpacing:0.8, marginBottom:10 }}>Payment</div>
                <div style={{ font:"500 14px/1.3 var(--font-sans)", color:"var(--ink)" }}>
                  {form.paymentMethod === "cod" ? "Cash on delivery" : "Cheque"}
                </div>
                <div style={{ font:"400 12px/1.5 var(--font-sans)", color:"var(--steel)", marginTop:4 }}>
                  Amount due upon delivery: <strong>{total} JOD</strong>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{ padding:"13px 28px", background:"var(--primary)", color:"#fff", border:0, borderRadius:10, font:"600 14px/1.3 var(--font-sans)", cursor:"pointer" }}
              >
                Continue browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Main store component ─────────────────────────────────────────────────────

export default function StoreComponent() {
  const [active, setActive] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const list = active === "all" ? items : active === "sale" ? items.filter(i => i.sale) : items.filter(i => i.cat === active);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  function addToCart(item: typeof items[0]) {
    setCartItems(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  }

  function changeQty(id: number, delta: number) {
    setCartItems(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  }

  function removeItem(id: number) {
    setCartItems(prev => prev.filter(c => c.id !== id));
  }

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
  }, []);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".item-card");
    if (cards) gsap.fromTo(cards, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" });
  }, [active]);

  const activeCat = cats.find(c => c.id === active);

  return (
    <>
      {/* Floating cart button */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          style={{ position:"fixed", bottom:28, right:28, zIndex:150, display:"flex", alignItems:"center", gap:10, padding:"14px 20px", background:"var(--primary)", color:"#fff", border:0, borderRadius:999, font:"600 14px/1.3 var(--font-sans)", cursor:"pointer", boxShadow:"0 4px 24px rgba(86,69,212,0.35)", letterSpacing:0.1 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57L23 6H6"/>
          </svg>
          View cart
          <span style={{ background:"rgba(255,255,255,0.25)", borderRadius:999, padding:"2px 8px", font:"700 12px/1.4 var(--font-sans)" }}>{cartCount}</span>
        </button>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <CartDrawer
          cartItems={cartItems}
          onClose={() => setCartOpen(false)}
          onQtyChange={changeQty}
          onRemove={removeItem}
        />
      )}

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
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div>
                  <h2 style={{ font:"600 28px/1.2 var(--font-sans)", letterSpacing:-0.4, margin:0, color:"var(--ink)" }}>{activeCat?.name}</h2>
                  <p style={{ font:"400 14px/1.5 var(--font-sans)", color:"var(--steel)", margin:"4px 0 0" }}>
                    {list.length} item{list.length !== 1 ? "s" : ""} · ships from Amman · payment on delivery
                  </p>
                </div>
                <select style={{ padding:"10px 14px", border:"1px solid var(--hairline)", borderRadius:8, font:"500 13px/1.3 var(--font-sans)", background:"#fff", color:"var(--charcoal)" }}>
                  <option>Sort: Featured</option>
                  <option>Price low → high</option>
                  <option>Price high → low</option>
                </select>
              </div>

              <div className="item-grid" ref={gridRef}>
                {list.map(it => (
                  <div key={it.id} className="item-card">
                    <div className="thumb">
                      {it.sale && <span className="sale-tag">Sale</span>}
                      <span className="stock-tag">● In stock</span>
                      <ItemDevice color={it.color} />
                    </div>
                    <div className="body">
                      <h3>{it.name}</h3>
                      <p>{it.desc}</p>
                      <div className="price-row">
                        <span className="price">{it.price}<small>JOD</small></span>
                        <button className="add" onClick={() => addToCart(it)}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
