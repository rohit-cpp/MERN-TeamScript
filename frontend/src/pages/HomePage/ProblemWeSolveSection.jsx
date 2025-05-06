import { Button } from "@/components/ui/button";

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
      <h2 className="text-3xl md:text-5xl font-bold text-center text-orange-600 mb-10">
        Problems We Solve
        <p className="text-lg font-normal mt-2 text-gray-600">
          Problem people face on ther websites
        </p>
      </h2>

      <div className="space-y-10">
        {problems.map((problem, index) => (
          <div
            key={index}
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
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-16">
        <Button className="bg-cyan-600 text-white text-lg px-6 py-4 rounded-md hover:bg-cyan-700 transition">
          Fix them all with TeamScript
        </Button>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;
