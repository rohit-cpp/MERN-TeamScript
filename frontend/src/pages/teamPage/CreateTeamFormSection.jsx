import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTeamMutation } from "@/store/api/teamApi";
import React, { useState } from "react";

import { toast } from "sonner";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      toast.error("Team name is required!");
      return;
    }
    try {
      await createTeam(teamName).unwrap();
      toast.success("Team created successfully!");
      setTeamName("");
    } catch (error) {
      toast.error("Failed to create team");
    }
  };

  return (
    <form onSubmit={handleCreateTeam} className="space-y-4">
      <div>
        <Input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Team"}
      </Button>
    </form>
  );
};

export default CreateTeam;
