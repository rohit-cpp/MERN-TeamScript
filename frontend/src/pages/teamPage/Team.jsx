import React from "react";
import CreateTeam from "./CreateTeamFormSection";
import MyTeams from "./AllTeamDetails";
import AddMemberToTeam from "./AddMember";

const TeamPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      {/* <CreateTeam />
      <MyTeams />
      <AddMemberToTeam teamId="teamId" /> */}
    </div>
  );
};

export default TeamPage;
