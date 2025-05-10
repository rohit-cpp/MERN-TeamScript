import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useGetSuggestionsByUserQuery } from "@/store/api/suggestionApi";
import Navbar from "@/components/shared/Navbar";
import { Badge } from "@/components/ui/badge";

const UserSuggestionList = () => {
  const { data, isLoading, error } = useGetSuggestionsByUserQuery();

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-10" />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-6">
        Failed to load suggestions.
      </p>
    );

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto space-y-4 mt-18">
        <h2 className="text-2xl font-semibold text-cyan-800">My Suggestions</h2>
        {data?.suggestions?.length ? (
          data.suggestions.map((s) => (
            <Card key={s._id}>
              <CardContent className="px-8 flex justify-between items-center space-y-1">
                <div>
                  <p className="text-gray-800 text-xl">{s.content}</p>
                  <p className="text-sm text-gray-500">
                    For Document: {s.document?.title || "Untitled"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Badge>pending</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">
            You haven’t added any suggestions yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserSuggestionList;
