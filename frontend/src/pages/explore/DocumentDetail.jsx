import React from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import SuggestionForm from "../suggestionPage/Suggestion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetDocumentByIdQuery } from "@/store/api/documentApi";
import Navbar from "@/components/shared/Navbar";

const ExploreDocumentDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetDocumentByIdQuery(id);

  if (isLoading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load document.</p>;

  const { title, content, createdAt, owner, versions = [] } = data.document;

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto space-y-8 mt-20">
        {/* Document */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-cyan-800">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              By {owner?.name || "Unknown"} • Created:{" "}
              {format(new Date(createdAt), "PPP")}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </CardContent>
          <div className="ml-5">
            {" "}
            <SuggestionForm />
          </div>
        </Card>

        {/* Versions */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-cyan-800">Versions</h3>
          {versions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No versions available.
            </p>
          ) : (
            versions.map((version, index) => (
              <Card
                key={version._id}
                className="border border-cyan-200 shadow-sm"
              >
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-cyan-700">
                    Version {index + 1}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Created by {version.createdBy?.name || "Unknown"} •{" "}
                    {format(new Date(version.createdAt), "PPPpp")}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                    {version.content || "No content available."}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreDocumentDetail;
