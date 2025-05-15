import { motion } from "framer-motion";
import { Sparkles, Brain, Wand2, FileSearch } from "lucide-react";

const aiFeatures = [
  {
    icon: <Sparkles className="h-8 w-8 text-cyan-600" />,
    title: "Smart Suggestions",
    description:
      "Get instant improvement ideas and content suggestions while writing collaboratively.",
  },
  {
    icon: <Brain className="h-8 w-8 text-cyan-600" />,
    title: "Tone & Clarity Assistance",
    description:
      "AI enhances readability, tone, and grammar in real time for better communication.",
  },
  {
    icon: <Wand2 className="h-8 w-8 text-cyan-600" />,
    title: "Auto Summarization",
    description:
      "Summarize lengthy documents into quick, understandable insights in one click.",
  },
  {
    icon: <FileSearch className="h-8 w-8 text-cyan-600" />,
    title: "Content Insights",
    description:
      "Analyze document structure and detect inconsistencies or repetitive content instantly.",
  },
];

const AIFeatures = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-5xl font-bold mb-6 text-orange-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Smart Collaboration Powered by AI
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          TeamScript uses AI to supercharge your productivity, clarity, and team
          coordination — all in real-time.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-muted rounded-lg p-6 shadow-sm hover:shadow-md text-left transition hover:-translate-y-1 hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIFeatures;
