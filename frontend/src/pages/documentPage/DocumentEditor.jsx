import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useGetMyTeamsQuery } from "@/store/api/teamApi";
import {
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
} from "@/store/api/documentApi";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import { useNavigate } from "react-router-dom";

const DocumentEditor = ({ existingDocument, onSuccess }) => {
  const [title, setTitle] = useState(existingDocument?.title || "");
  const [content, setContent] = useState(existingDocument?.content || "");
  const [teamId, setTeamId] = useState(existingDocument?.team || "");

  const { data: teamsData } = useGetMyTeamsQuery();
  const [createDocument] = useCreateDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingDocument) {
        await updateDocument({ id: existingDocument._id, title, content });
        toast.success("Updated successfully");
      } else {
        await createDocument({ title, content, teamId });
        toast.success("Created successfully");
        setTitle("");
        setContent("");
        setTeamId("");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Error", err.message);
    }
  };

  // const navigate = useNavigate();
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Card className="w-full max-w-xl mx-auto my-30">
        <CardHeader>
          <CardTitle>
            {existingDocument ? "Edit Document" : "New Document"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="resize-none"
            />
            {!existingDocument && (
              <Select onValueChange={setTeamId} value={teamId} required>
                <SelectTrigger>Choose Team</SelectTrigger>
                <SelectContent>
                  {teamsData?.teams?.map((team) => (
                    <SelectItem key={team._id} value={team._id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button type="submit">
              {existingDocument ? "Update Document" : "Create Document"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div>
        <Button> click here to view all documents </Button>
      </div>
    </div>
  );
};

export default DocumentEditor;
