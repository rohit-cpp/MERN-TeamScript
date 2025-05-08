import { useState } from "react";
import { useCreateTeamMutation } from "@/store/api/teamApi";
import { toast } from "sonner";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTeam(name).unwrap();
      toast.success("Team created successfully");
      setName("");
    } catch (error) {
      toast.error("Failed to create team");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create a New Team</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Creating..." : "Create Team"}
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
