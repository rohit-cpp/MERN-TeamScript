import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGetAllDocumentsQuery } from "@/store/api/documentApi";
import { useGetSuggestionsByDocumentQuery } from "@/store/api/suggestionApi";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import { useGetVersionsByDocumentQuery } from "@/store/api/VersionApi";

const AdminDocuments = () => {
  const {
    data: documentData,
    isLoading: docLoading,
    isError: docError,
  } = useGetAllDocumentsQuery();

  if (docLoading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (docError || !documentData?.documents) {
    return (
      <div className="p-6 text-red-500 text-center">
        Failed to fetch documents.
      </div>
    );
  }

  const documents = documentData.documents;

  return (
    <div>
      <div className="px-6">
        <h2 className="text-3xl font-bold mb-6 text-cyan-800">
          Admin Documents Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DocumentCard = ({ document }) => {
  const { data: versionData, isLoading: versionsLoading } =
    useGetVersionsByDocumentQuery(document._id);

  const { data: suggestionData, isLoading: suggestionsLoading } =
    useGetSuggestionsByDocumentQuery(document._id);

  return (
    <Card className="shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-cyan-800 truncate">
          {document.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          <div>By: {document.owner?.name || "Unknown"}</div>
          <div>Team: {document.team?.name || "N/A"}</div>
        </p>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>Created: {format(new Date(document.createdAt), "PPP")}</p>

        <p>
          Versions:{" "}
          {versionsLoading ? "Loading..." : versionData?.versions?.length || 0}
        </p>

        <p>
          Suggestions:{" "}
          {suggestionsLoading
            ? "Loading..."
            : suggestionData?.suggestions?.length || 0}
        </p>

        <div className="flex gap-2 pt-2">
          <Link to={`/document/${document._id}`}>
            <Button size="sm" variant="outline" className="w-full">
              View
            </Button>
          </Link>
          {/* Optional edit link */}
          {/* <Link to={`/document/edit/${document._id}`}>
            <Button size="sm" variant="ghost" className="w-full">
              Edit
            </Button>
          </Link> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDocuments;
