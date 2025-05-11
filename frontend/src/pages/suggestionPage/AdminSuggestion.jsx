// components/admin/AdminSuggestionManager.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import {
  useGetSuggestionsByDocumentQuery,
  useUpdateSuggestionStatusMutation,
} from "@/store/api/suggestionApi";
import { useParams } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import { toast } from "sonner";

const AdminSuggestionManager = () => {
  const { documentId } = useParams();
  const { data, isLoading, error, refetch } =
    useGetSuggestionsByDocumentQuery(documentId);
  const [updateStatus] = useUpdateSuggestionStatusMutation();

  const handleAction = async (id, action) => {
    console.log("handleAction called with:", id, action); // Debug log

    if (!id || !action) {
      toast.error("Invalid suggestion ID or action");
      return;
    }

    try {
      await updateStatus({ suggestionId: id, status: action }).unwrap();
      toast.success(`Suggestion ${action}ed successfully`);
      refetch();
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto space-y-4 mt-18">
        <h2 className="text-2xl font-semibold text-cyan-800">
          Suggestions for Document
        </h2>
        {data?.suggestions?.length ? (
          data.suggestions.map((s) => (
            <Card key={s._id}>
              <CardContent className="p-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-800 text-lg">{s.content}</p>
                    <p className="text-sm text-gray-500">
                      By: {s.suggestedBy?.name} ({s.suggestedBy?.email})
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(s.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Badge
                      variant={
                        s.status === "accepted"
                          ? "success"
                          : s.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {s.status}
                    </Badge>
                    {s.status === "pending" && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          onClick={() => handleAction(s._id, "accepted")}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleAction(s._id, "rejected")}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">
            No suggestions available for this document.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminSuggestionManager;
