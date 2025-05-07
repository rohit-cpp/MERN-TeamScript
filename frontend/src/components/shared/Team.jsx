import React from "react";
import { useLoadUserQuery } from "@/store/api/authApi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const Team = () => {
  const { data, isLoading } = useLoadUserQuery();
  const user = data?.user;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="p-4 space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (!user?.teams?.length) {
    return (
      <div className="text-center text-gray-500 text-sm">
        You are not part of any teams yet.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {user.teams.map((team) => (
          <Card key={team._id} className="rounded-lg shadow-sm border">
            <CardHeader>
              <CardTitle className="text-cyan-700 text-2xl font-semibold">
                {team.name}
              </CardTitle>
              <CardDescription>Team overview and members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Members Section */}
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">
                  Members:
                </p>
                {team.members?.length ? (
                  <ul className="space-y-1">
                    {team.members.map((member) => (
                      <li key={member._id} className="text-sm text-gray-700">
                        <span className="font-medium">{member.name}</span> —{" "}
                        <span className="text-muted-foreground">
                          {member.email}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No members listed
                  </p>
                )}
              </div>

              {/* Documents Section */}
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">
                  Documents:
                </p>
                {team.documents?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {team.documents.map((doc) => (
                      <Badge
                        key={doc._id}
                        variant="outline"
                        className="text-xs"
                      >
                        {doc.title}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No documents yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;
