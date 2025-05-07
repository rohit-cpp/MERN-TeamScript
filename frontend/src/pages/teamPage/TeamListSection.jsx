import { useGetMyTeamsQuery } from "@/store/api/teamApi";
import React from "react";

const TeamList = () => {
  const { data, isLoading, error } = useGetMyTeamsQuery();

  if (isLoading) return <p>Loading teams...</p>;
  if (error) return <p>Error loading teams</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Teams</h2>
      <ul className="space-y-2">
        {data.teams.map((team) => (
          <li
            key={team._id}
            className="p-4 border rounded shadow hover:bg-gray-50"
          >
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
