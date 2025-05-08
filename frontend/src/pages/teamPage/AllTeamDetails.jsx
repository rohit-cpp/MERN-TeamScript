import React from "react";
import { useGetMyTeamsQuery } from "@/store/api/teamApi";

import { Loader2 } from "lucide-react";
import TeamCard from "@/components/shared/TeamCard";

const AllTeams = () => {
  const { data, isLoading, isError } = useGetMyTeamsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data || !data.teams?.length) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No teams found or failed to load teams.
      </div>
    );
  }

  // Remove duplicate teams by ID
  const uniqueTeams = Array.from(
    new Map(data.teams.map((team) => [team._id, team])).values()
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {uniqueTeams.map((team) => (
        <TeamCard key={team._id} team={team} />
      ))}
    </div>
  );
};

export default AllTeams;
