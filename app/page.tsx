import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero";
import WhatIReplace from "@/components/WhatIReplace";
import IdentityBlock from "@/components/IdentityBlock";
import Projects from "@/components/Projects";
import POV from "@/components/POV";
import MiscGrid from "@/components/MiscGrid";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <WhatIReplace />
      <IdentityBlock />
      <Projects />
      <POV />
      <MiscGrid />
      <BookingSection />
      <Footer />
    </PageTransition>
  );
}
