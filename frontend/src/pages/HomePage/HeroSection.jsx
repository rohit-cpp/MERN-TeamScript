import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import CarosalSection from "./CarosalSection";
const HeroSection = () => {
  return (
    <section className="text-center py-5 px-4 bg-gray-100 ">
      <h2 className="text-6xl md:text-8xl font-bold text-orange-600 mb-4">
        Welcome to TeamScript
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Collaborate, suggest, and build documents together effortlessly.
      </p>
      <CarosalSection />
      <Button className="bg-cyan-600 text-white text-lg px-6 py-4 hover:bg-cyan-700">
        Get Started
      </Button>
    </section>
  );
};

export default HeroSection;
