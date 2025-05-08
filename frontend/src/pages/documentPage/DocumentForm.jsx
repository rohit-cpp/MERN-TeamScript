// DocumentForm.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useGetMyTeamsQuery } from "@/store/api/teamApi";
import {
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
} from "@/store/api/documentApi";
import { toast } from "sonner";

const DocumentForm = ({
  existingDocument = null,
  onSuccess,
  selectedTeamId,
  setSelectedTeamId,
}) => {
  const [title, setTitle] = useState(existingDocument?.title || "");
  const [content, setContent] = useState(existingDocument?.content || "");
  const { data: teamsData } = useGetMyTeamsQuery();
  const [createDocument] = useCreateDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingDocument) {
        await updateDocument({ id: existingDocument._id, title, content });
        toast.success("Document updated");
      } else {
        await createDocument({ title, content, teamId: selectedTeamId });
        toast.success("Document created");
        setTitle("");
        setContent("");
        setSelectedTeamId("");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Error", err.message);
    }
  };

  return (
    <div>
      <Card className="w-full max-w-xl mx-auto my-6">
        <CardHeader>
          <CardTitle>
            {existingDocument ? "Edit Document" : "Create New Document"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Document Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Document Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
              className="resize-none w-full h-10 pl-2"
            />
            {!existingDocument && (
              <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a team" />
                </SelectTrigger>
                <SelectContent>
                  {teamsData?.teams?.map((team) => (
                    <SelectItem key={team._id} value={team._id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button type="submit" className="w-full">
              {existingDocument ? "Update" : "Create"}
            </Button>
          </form>
          {/* {selectedTeamId && (
          <Button
            onClick={() => onSuccess?.()}
            variant="outline"
            className="mt-4 w-full"
          >
            View All Documents
          </Button>
        )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentForm;
