import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HeroAbout from "@/components/about/HeroAbout";
import WhatWeDeliver from "@/components/about/WhatWeDeliver";
import CustomDesigns from "@/components/about/CustomDesigns";
import Verticals from "@/components/about/Verticals";
import Numbers from "@/components/about/Numbers";
import Customers from "@/components/about/Customers";
import Showcase from "@/components/about/Showcase";
import Activities from "@/components/about/Activities";
import CtaBand from "@/components/about/CtaBand";

export const metadata = {
  title: "About Us — AfkarDigital",
  description: "AFKAR DIGITAL builds the hardware, cloud and software that bring any device to your mobile or PC. Founded 2017 in Amman, Jordan.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <HeroAbout />
        <WhatWeDeliver />
        <CustomDesigns />
        <Verticals />
        <Numbers />
        <Customers />
        <Showcase />
        <Activities />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
