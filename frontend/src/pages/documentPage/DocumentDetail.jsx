import { useParams } from "react-router-dom";
import { useGetDocumentByIdQuery } from "@/store/api/documentApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DocumentDetail = () => {
  const { id: documentId } = useParams();
  const { data, isLoading, error } = useGetDocumentByIdQuery(documentId);
  const document = data?.document;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load document.</p>;
  if (!document) return <p>No document found.</p>;

  return (
    <div>
      <Card className="p-4 max-w-2xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 whitespace-pre-wrap">{document.content}</p>
          <p className="text-xs text-muted-foreground">
            Owner: {document.owner?.name} ({document.owner?.email})
          </p>
          <p className="text-xs text-muted-foreground">
            Team: {document.team?.name}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentDetail;
