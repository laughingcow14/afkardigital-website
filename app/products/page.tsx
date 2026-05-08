import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductsHero from "@/components/products/ProductsHero";
import Catalog from "@/components/products/Catalog";

export const metadata = {
  title: "Products — AfkarDigital",
  description: "Manufactured devices, cloud platforms, and end-to-end IoT solutions. 7 products built around the HudHud platform, shipped with a 3-year warranty.",
};

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main>
        <ProductsHero />
        <Catalog />
      </main>
      <Footer />
    </>
  );
}
