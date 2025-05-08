import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TeamCard = ({ team }) => {
  return (
    <Card className="hover:shadow-md border rounded-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-cyan-700 text-xl">{team.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Members: {team.members?.length || 0}
        </p>
        <p className="text-sm text-muted-foreground">
          Documents: {team.documents?.length || 0}
        </p>
        <Link to={`/teams/${team._id}`}>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
