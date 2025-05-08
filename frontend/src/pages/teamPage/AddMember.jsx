import { useAddMemberToTeamMutation } from "@/store/api/teamApi";
import { useState } from "react";
import { toast } from "sonner";

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
      className="space-y-4 p-4 border rounded max-w-md"
    >
      <input
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="User Name to Add"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isLoading ? "Adding..." : "Add Member"}
      </button>
    </form>
  );
}
