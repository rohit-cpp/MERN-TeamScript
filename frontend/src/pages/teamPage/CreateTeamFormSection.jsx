import { useState } from "react";
import { useCreateTeamMutation } from "@/store/api/teamApi";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTeam(name).unwrap();
      toast.success("Team created successfully");
      setName("");
    } catch {
      toast.error("Failed to create team");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Create a Team</h2>
      <form onSubmit={handleCreate} className="space-y-3">
        <Input
          placeholder="Team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="outline"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Creating..." : "Create Team"}
        </Button>
      </form>
    </div>
  );
};

export default CreateTeam;
