import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useGetAllDocumentsQuery } from "@/store/api/documentApi";
import Navbar from "@/components/shared/Navbar";

const Explore = () => {
  const { data, isLoading, isError } = useGetAllDocumentsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {[...Array(6)].map((_, idx) => (
          <Skeleton key={idx} className="h-72 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">Failed to load documents.</p>
    );
  }

  const { documents } = data;

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="p-6 mt-18">
        <h2 className="text-3xl font-bold mb-6 text-cyan-800">
          Explore Documents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {documents?.map((doc) => (
            <Card
              key={doc._id}
              className="shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-cyan-800 truncate">
                  {doc.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  <div>By {doc.owner?.name || "Unknown"}</div>
                  <div>Team: {doc.team?.name || "N/A"}</div>
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Created: {format(new Date(doc.createdAt), "PPP")}
                </p>
                <div className="flex gap-2">
                  <Link to={`/document/${doc._id}`}>
                    <Button size="sm" variant="outline" className="w-full">
                      View
                    </Button>
                  </Link>
                  <Link to={`/document/edit/${doc._id}`}>
                    <Button size="sm" variant="ghost" className="w-full">
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
