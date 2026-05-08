import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StoreHero from "@/components/store/StoreHero";
import StoreComponent from "@/components/store/StoreComponent";

export const metadata = {
  title: "Store — AfkarDigital",
  description: "ESP32 modules, RTUs, PoE devices and RS-485 components. Ships from Amman.",
};

export default function StorePage() {
  return (
    <>
      <Nav />
      <main>
        <StoreHero />
        <StoreComponent />
      </main>
      <Footer />
    </>
  );
}
