import React from "react";
import { useParams } from "react-router-dom";
import { useGetTeamByIdQuery } from "@/store/api/teamApi";

const SingleTeamDetails = () => {
  const { id } = useParams(); // Assuming you use react-router
  const { data: teamData, isLoading, error } = useGetTeamByIdQuery(id);

  if (isLoading) {
    return <div>Loading team details...</div>;
  }

  if (error) {
    return <div>Error fetching team details</div>;
  }

  const team = teamData?.team;

  return (
    <div>
      <h2>{team?.name}</h2>
      <p>{team?.description}</p>
      {/* Add more team details */}
    </div>
  );
};

export default SingleTeamDetails;
