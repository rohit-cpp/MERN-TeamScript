import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useDeleteDocumentMutation,
  useGetAllDocumentsForTeamQuery,
  useUpdateDocumentMutation,
} from "@/store/api/documentApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

const DocumentManager = () => {
  const { teamId } = useParams();
  const { data, refetch } = useGetAllDocumentsForTeamQuery(teamId);
  const [updateDocument] = useUpdateDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const [editingDocId, setEditingDocId] = useState(null);
  const [editValues, setEditValues] = useState({ title: "", content: "" });

  const handleEdit = (doc) => {
    setEditingDocId(doc._id);
    setEditValues({ title: doc.title, content: doc.content });
  };

  const handleUpdate = async () => {
    try {
      await updateDocument({ id: editingDocId, ...editValues }).unwrap();
      toast.success("Document updated");
      setEditingDocId(null);
      refetch();
    } catch (err) {
      toast.error("Update failed", err.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteDocument(id);
    toast.success("Document deleted");
    refetch();
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {data?.documents?.map((doc) => (
        <Card key={doc._id}>
          <CardHeader>
            <CardTitle>
              {editingDocId === doc._id ? (
                <Input
                  value={editValues.title}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              ) : (
                doc.title
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {editingDocId === doc._id ? (
              <>
                <textarea
                  className="resize-none"
                  value={editValues.content}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
                <div className="flex gap-2">
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button variant="ghost" onClick={() => setEditingDocId(null)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p>{doc.content.slice(0, 120)}...</p>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(doc)}>Edit</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(doc._id)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentManager;
