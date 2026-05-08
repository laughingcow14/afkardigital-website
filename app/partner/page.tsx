import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PartnerHero from "@/components/partner/PartnerHero";
import PartnerComponent from "@/components/partner/PartnerComponent";

export const metadata = {
  title: "Become a Partner — AfkarDigital",
  description: "Join the AFKAR DIGITAL partner program as a Reseller, System Integrator, or OEM co-development partner.",
};

export default function PartnerPage() {
  return (
    <>
      <Nav />
      <main>
        <PartnerHero />
        <PartnerComponent />
      </main>
      <Footer />
    </>
  );
}
