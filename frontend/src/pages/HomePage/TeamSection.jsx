import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const team = [
  { name: "Alice", img: "", initials: "A" },
  { name: "Bob", img: "", initials: "B" },
  { name: "Charlie", img: "", initials: "C" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 px-4 bg-gray-100 dark:bg-zinc-900">
      <h3 className="text-3xl font-bold text-center mb-10 text-cyan-600">
        Our Team
      </h3>
      <div className="flex justify-center gap-6">
        {team.map((member, i) => (
          <div key={i} className="text-center">
            <Avatar className="mx-auto mb-2">
              <AvatarImage src={member.img} alt={member.name} />
              <AvatarFallback>{member.initials}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {member.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
