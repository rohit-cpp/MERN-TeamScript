import Team from "@/components/shared/Team";
import { useGetMyTeamsQuery } from "@/store/api/teamApi";
import React from "react";

const MyTeams = () => {
  const { data: teamsData, isLoading, error } = useGetMyTeamsQuery();

  if (isLoading) {
    return <div>Loading teams...</div>;
  }

  if (error) {
    return <div>Error fetching teams</div>;
  }

  const teams = teamsData?.teams || [];

  return (
    <div>
      <h2>Your Teams</h2>
      {teams.length ? (
        <div className="space-y-4">
          {teams.map((team) => (
            <Team key={team._id} team={team} />
          ))}
        </div>
      ) : (
        <p>You are not part of any teams yet.</p>
      )}
    </div>
  );
};

export default MyTeams;
