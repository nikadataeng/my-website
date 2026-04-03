"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useView } from "@/context/ViewContext";

// Career view
import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero";
import WhatIReplace from "@/components/WhatIReplace";
import IdentityBlock from "@/components/IdentityBlock";
import Projects from "@/components/Projects";
import POV from "@/components/POV";
import MiscGrid from "@/components/MiscGrid";
import { CareerMountain } from "@/components/CareerMountain";
import Footer from "@/components/Footer";

// Personal view
import PersonalHero from "@/components/personal/PersonalHero";
import EditorialFeature from "@/components/personal/EditorialFeature";
import BookOfTheMonth from "@/components/personal/BookOfTheMonth";
import Hobbies from "@/components/personal/Hobbies";
import WorthReading from "@/components/personal/WorthReading";

export default function Home() {
  const { view } = useView();

  return (
    <AnimatePresence mode="wait">
      {view === "career" ? (
        <motion.div
          key="career"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <PageTransition>
            <Hero />
            <WhatIReplace />
            <IdentityBlock />
            <CareerMountain />
            <Projects />
            <POV />
            <MiscGrid />
            <Footer />
          </PageTransition>
        </motion.div>
      ) : (
        <motion.div
          key="personal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <PersonalHero />
          <EditorialFeature />
          <BookOfTheMonth />
          <Hobbies />
          <WorthReading />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
