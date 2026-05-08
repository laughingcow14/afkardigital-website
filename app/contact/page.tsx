import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactComponent from "@/components/contact/ContactComponent";

export const metadata = {
  title: "Contact — AfkarDigital",
  description: "Get in touch with the AFKAR DIGITAL team. Send us a sketch, a photo, or a description — we'll come back with how we'd build it.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactHero />
        <ContactComponent />
      </main>
      <Footer />
    </>
  );
}
