import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6 text-orange-600">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mb-10">
          We’ve answered some common questions. Still confused? You can always
          reach out!
        </p>

        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4 text-left"
        >
          <AccordionItem value="q1">
            <AccordionTrigger className="text-cyan-600 text-lg">
              Why is my work not syncing in real-time on other platforms?
            </AccordionTrigger>
            <AccordionContent>
              Many tools struggle with real-time accuracy under multiple users.
              TeamScript solves this with smooth, consistent updates across all
              devices instantly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger className="text-cyan-600 text-lg">
              How does AI help while writing?
            </AccordionTrigger>
            <AccordionContent>
              Our AI offers suggestions, clarity enhancements, tone analysis,
              and even summaries — helping you write faster and smarter.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger className="text-cyan-600 text-lg">
              Can I track changes and suggestions easily?
            </AccordionTrigger>
            <AccordionContent>
              Yes! Every suggestion is stored and versioned. You can review,
              accept, or reject them with complete transparency.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger className="text-cyan-600 text-lg">
              Is TeamScript good for teams or just individuals?
            </AccordionTrigger>
            <AccordionContent>
              TeamScript is designed for both. Whether you're solo writing or
              managing a large editing team — collaboration is smooth and
              intuitive.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default AccordionSection;
