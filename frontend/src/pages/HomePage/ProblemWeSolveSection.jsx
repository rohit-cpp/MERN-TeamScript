import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const problems = [
  "Who made this change?",
  "We lost the original content!",
  "I added a suggestion, but someone accidentally changed it.",
  "What is this comment referring to?",
  "Everyone has edit access, and it's chaos.",
];

const ProblemsWeSolve = () => {
  return (
    <section className="w-full px-4 md:px-10 py-16 bg-muted">
      <motion.h2
        className="text-5xl md:text-5xl font-bold text-center text-orange-600 mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Problems We Solve
        <p className="text-lg font-normal mt-2 text-gray-600">
          Problems people face on other platforms
        </p>
      </motion.h2>

      <motion.div
        className="space-y-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-6`}
          >
            <div className="w-full md:w-1/2">
              <div className="p-10 bg-white shadow-md rounded-md border text-2xl font-medium text-cyan-700">
                ❓ {problem}
              </div>
            </div>
            <div className="hidden md:block w-full md:w-1/2 h-[1px] bg-gray-300" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Button className="bg-cyan-600 text-white text-lg px-6 py-4 rounded-md hover:bg-cyan-700 transition">
          Fix them all with TeamScript
        </Button>
      </motion.div>
    </section>
  );
};

export default ProblemsWeSolve;
