import { useAddMemberToTeamMutation } from "@/store/api/teamApi";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddMemberForm() {
  const [teamName, setTeamName] = useState("");
  const [userName, setUserName] = useState("");
  const [addMember, { isLoading }] = useAddMemberToTeamMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addMember({ teamName, userNameToAdd: userName }).unwrap();
      toast.success("Member added successfully!");
      setTeamName("");
      setUserName("");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleAdd}
      className="space-y-4 max-w-sm mx-auto mt-10 p-4 border rounded-md"
    >
      <Input
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
      />
      <Input
        placeholder="User Name to Add"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="outline"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Adding..." : "Add Member"}
      </Button>
    </form>
  );
}
