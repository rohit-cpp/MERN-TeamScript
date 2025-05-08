import {
  useGetAllDocumentsForTeamQuery,
  useDeleteDocumentMutation,
} from "@/store/api/documentApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DocumentListWrapper({ teamId }) {
  const { data, isLoading, refetch } = useGetAllDocumentsForTeamQuery(teamId, {
    skip: !teamId,
  });
  const [deleteDocument] = useDeleteDocumentMutation();

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id).unwrap();
      toast.success("Document deleted successfully");
      refetch();
    } catch (err) {
      toast.error("Error", err?.data?.message || err.message);
    }
  };

  if (!teamId) return <p className="text-center text-sm">No team selected.</p>;
  if (isLoading)
    return <p className="text-center text-sm">Loading documents...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data?.documents?.length === 0 ? (
        <p className="text-center col-span-full text-muted-foreground">
          No documents found.
        </p>
      ) : (
        data.documents.map((doc) => (
          <Card key={doc._id}>
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3 line-clamp-3">{doc.content}</p>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = `/document/detail?id=${doc._id}`)
                  }
                >
                  View
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(doc._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
