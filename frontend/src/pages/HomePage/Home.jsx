import Navbar from "@/components/shared/Navbar";
import React from "react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import TeamSection from "./TeamSection";
import Footer from "@/components/shared/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Home;
