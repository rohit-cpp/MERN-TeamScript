import React from "react";
import {
  useGetAllSuggestionsQuery,
  useUpdateSuggestionStatusMutation,
} from "@/store/api/suggestionApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const AdminSuggestions = () => {
  const { data: suggestions = [], isLoading } = useGetAllSuggestionsQuery();

  const [updateStatus] = useUpdateSuggestionStatusMutation();

  const handleAction = async (id, status) => {
    try {
      await updateStatus({ suggestionId: id, status }).unwrap();
      console.log(id);

      toast.success(`Suggestion ${status}`);
    } catch {
      toast.error("Failed to update suggestion status");
      console.log(error);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">All Suggestions</h2>
      {isLoading ? (
        <p>Loading suggestions...</p>
      ) : suggestions.length === 0 ? (
        <p>No suggestions found.</p>
      ) : (
        suggestions.map((s) => (
          <Card key={s._id}>
            <CardHeader>
              <CardTitle>{s.content}</CardTitle>
              <CardDescription>
                Suggested by: {s.user?.name} | Status: {s.status}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2">
              <Button
                onClick={() => handleAction(s._id, "accepted")}
                variant="success"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleAction(s._id, "rejected")}
                variant="destructive"
              >
                Reject
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminSuggestions;
