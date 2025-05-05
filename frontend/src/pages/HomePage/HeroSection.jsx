import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="text-center py-20 px-4 bg-gray-100 dark:bg-zinc-900">
      <h2 className="text-8xl font-bold text-cyan-600 mb-4">
        Welcome to TeamScript
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Collaborate, suggest, and build documents together effortlessly.
      </p>
      <Button className="bg-orange-500 text-white text-lg px-6 py-4">
        Get Started
      </Button>
    </section>
  );
};

export default HeroSection;
