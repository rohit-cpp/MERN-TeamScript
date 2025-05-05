import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { title: "Live Suggestions", description: "Suggest edits in real-time." },
  { title: "Comment System", description: "Threaded discussions for changes." },
  {
    title: "Role Management",
    description: "Admins and members access control.",
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white dark:bg-black">
      <h3 className="text-3xl font-bold text-center mb-10 text-cyan-600">
        Features
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feat, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{feat.title}</CardTitle>
              <Badge variant="outline">NEW</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {feat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
