import { useGetVersionsByDocumentQuery } from "@/store/api/VersionApi";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function VersionList() {
  const { documentId } = useParams();
  const { data, isLoading } = useGetVersionsByDocumentQuery(documentId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const versions = data?.versions || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        All Versions ({versions.length})
      </h2>
      {versions.map((v) => (
        <Card key={v._id}>
          <CardHeader>
            <CardTitle className="text-base font-medium line-clamp-1">
              {v.createdBy?.name || "Unknown User"} –{" "}
              {new Date(v.createdAt).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2 mb-2">
              {v.content}
            </p>
            <div className="flex gap-4 text-sm text-blue-600">
              <Link to={`../view/${v._id}`} className="hover:underline">
                View
              </Link>
              <Link to={`../edit/${v._id}`} className="hover:underline">
                Edit
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
