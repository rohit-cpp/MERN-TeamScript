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

const WhySection = () => {
  return (
    <section className="py-20 my-14 px-4 md:px-8 lg:px-16 bg-muted">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold text-orange-600">
          Why Choose TeamScript?
        </h2>
        <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
          Built for teams who need structure, speed, and smart collaboration.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-white shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
          >
            <CardHeader>
              <CardTitle className="text-2xl text-cyan-700 ">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
