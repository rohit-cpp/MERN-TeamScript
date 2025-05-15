import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CarosalSection from "./CarosalSection";
import GettingStarted from "./GettingStarted";

const HeroSection = () => {
  return (
    <section className="text-center py-5 px-4 bg-gray-100">
      <motion.h2
        className="text-6xl md:text-8xl font-bold text-orange-600 mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to TeamScript
      </motion.h2>

      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Collaborate, suggest, and build documents together effortlessly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <CarosalSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <GettingStarted />
      </motion.div>

      {/* Optional animated button */}
      {/* 
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <Button className="bg-cyan-600 text-white text-lg px-6 py-4 hover:bg-cyan-700">
          Get Started
        </Button>
      </motion.div>
      */}
    </section>
  );
};

export default HeroSection;
