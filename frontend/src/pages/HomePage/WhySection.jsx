import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "🗂️ Document Management",
    description:
      "Create, edit, and manage team documents with automatic version tracking. Never lose your progress again.",
  },
  {
    title: "✍️ Suggestion System",
    description:
      "Suggest edits without changing the original content. Admins review and approve changes—collaboration stays clean.",
  },
  {
    title: "💬 In-Context Commenting",
    description:
      "Comment directly within documents to give feedback and clarify ideas right where they matter most.",
  },
  {
    title: "🔐 Role-Based Access",
    description:
      "Admins manage users and documents, while members focus on collaboration. Everyone gets the right access.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WhySection = () => {
  return (
    <section className="py-20 my-14 px-4 md:px-8 lg:px-16 bg-muted">
      <div className="text-center mb-10">
        <motion.h2
          className="text-5xl font-bold text-orange-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose TeamScript?
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Built for teams who need structure, speed, and smart collaboration.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="bg-white shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-700">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhySection;
