import { useGetVersionByIdQuery } from "@/store/api/VersionApi";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ViewVersion() {
  const { versionId } = useParams();
  const { data, isLoading } = useGetVersionByIdQuery(versionId);

  if (isLoading) return <Skeleton className="h-24 w-full" />;

  const version = data?.version;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Created by: {version?.createdBy?.name || "Unknown"}
          <br />
          On: {new Date(version?.createdAt).toLocaleString()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{version?.content}</p>
      </CardContent>
    </Card>
  );
}
