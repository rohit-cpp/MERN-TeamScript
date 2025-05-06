import Navbar from "@/components/shared/Navbar";
import React from "react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import TeamSection from "./TeamSection";
import Footer from "@/components/shared/Footer";
import WhySection from "./WhySection";
import ProblemsWeSolve from "./ProblemWeSolveSection";
import AIFeatures from "./AiFeaturesSection";
import AccordionSection from "./AccordianSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <HeroSection />
        <WhySection />
        <ProblemsWeSolve />
        <AIFeatures />
        {/* <FeatureSection /> */}
        {/* <TeamSection /> */}
        <AccordionSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
