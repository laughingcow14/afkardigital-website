import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="brand">
            <Link href="/about" className="logo">
              <span className="logo-mark" style={{ background: "#fff", color: "#0a1530" }}>A</span>
              <span className="logo-text">
                <span className="b1" style={{ color: "#fff" }}>AfkarDigital</span>
                <span className="b2" style={{ color: "#a4a097" }}>Control · IoT · Automation</span>
              </span>
            </Link>
            <p>Continuous monitoring in front of your eyes. Total control at your fingertips. Solutions in Control, Integration &amp; Automation, enriched with IoT.</p>
            <div className="socials">
              <a href="https://www.linkedin.com/company/afkardigital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/afkardigital" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://twitter.com/afkardigital" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="col">
            <h6>Company</h6>
            <Link href="/about">About Us</Link>
            <Link href="/about#customers">Customers</Link>
            <Link href="/about#showcases">Showcases</Link>
            <Link href="/about#activities">Activities</Link>
          </div>
          <div className="col">
            <h6>Products</h6>
            <Link href="/products">All Products</Link>
            <Link href="/products#hudhud">Smart HudHud</Link>
            <Link href="/products#qatarat">QATARAT</Link>
            <Link href="/products#labeeb">LABEEB</Link>
          </div>
          <div className="col">
            <h6>Store</h6>
            <Link href="/store">Modules</Link>
            <Link href="/store">RTUs</Link>
            <Link href="/store">PoE Devices</Link>
            <Link href="/store">Sale</Link>
          </div>
          <div className="col">
            <h6>Connect</h6>
            <Link href="/partner">Become a Partner</Link>
            <Link href="/contact">Contact Us</Link>
            <a href="mailto:Info@afkardigital.com">Email Sales</a>
            <a href="tel:+962798715260">+962-79-871-5260</a>
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 AFKAR DIGITAL. All rights reserved.</span>
          <a href="https://maps.google.com/?q=32.0295085,35.8708546" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.25)" }}>Amman · Al-Jubeiha · Al-Manhal Center #105, Floor #3, Office #304</a>
          <span>Sun–Thu 9:00 AM – 6:00 PM</span>
        </div>
      </div>
    </footer>
  );
}
