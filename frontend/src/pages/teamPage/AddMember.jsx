import React, { useState } from "react";

import { useAddMemberToTeamMutation } from "@/store/api/teamApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddMemberToTeam = ({ teamId }) => {
  const [userIdToAdd, setUserIdToAdd] = useState("");
  const [addMemberToTeam, { isLoading }] = useAddMemberToTeamMutation();

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!userIdToAdd.trim()) {
      toast.error("User ID is required!");
      return;
    }

    try {
      await addMemberToTeam({ teamId, userIdToAdd }).unwrap();
      toast.success("Member added successfully!");
      setUserIdToAdd("");
    } catch (error) {
      toast.error("Failed to add member");
    }
  };

  return (
    <form onSubmit={handleAddMember} className="space-y-4">
      <div>
        <Input
          type="text"
          value={userIdToAdd}
          onChange={(e) => setUserIdToAdd(e.target.value)}
          placeholder="Enter User ID"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Member"}
      </Button>
    </form>
  );
};

export default AddMemberToTeam;
