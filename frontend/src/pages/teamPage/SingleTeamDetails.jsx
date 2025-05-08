import React from "react";
import { useParams } from "react-router-dom";
import { useGetTeamByIdQuery } from "@/store/api/teamApi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SingleTeamDetails = () => {
  const { id } = useParams();
  const { data: teamData, isLoading, error } = useGetTeamByIdQuery(id);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (error || !teamData?.team) {
    return (
      <div className="text-center text-red-500 text-sm mt-10">
        Error fetching team details.
      </div>
    );
  }

  const team = teamData.team;

  return (
    <div className="max-w-4xl mx-auto px-4 py-3 space-y-8">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-cyan-700">{team.name}</CardTitle>
          <CardDescription>
            {team.description || "No description available."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Members Section */}
          <div>
            <h3 className="text-lg font-semibold">Team Members</h3>
            <Separator className="my-2" />
            {team.members?.length ? (
              <ul className="space-y-2">
                {team.members.map((member) => (
                  <li key={member._id} className="bg-muted/40 p-3 rounded-md">
                    <p className="text-sm">
                      <strong>Name:</strong> {member.name}
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> {member.email}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No members listed.
              </p>
            )}
          </div>

          {/* Documents Section */}
          <div>
            <h3 className="text-lg font-semibold">Team Documents</h3>
            <Separator className="my-2" />
            {team.documents?.length ? (
              <div className="flex flex-wrap gap-2">
                {team.documents.map((doc) => (
                  <Badge key={doc._id} variant="outline" className="text-xs">
                    {doc.title}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No documents uploaded.
              </p>
            )}
          </div>

          {/* Created By / Timestamps */}
          <div className="text-sm text-muted-foreground pt-4">
            <p>
              <strong>Created By:</strong> {team.createdBy.name || "Unknown"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(team.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(team.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleTeamDetails;
