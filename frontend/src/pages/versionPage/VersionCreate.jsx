import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateVersionMutation } from "@/store/api/VersionApi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function CreateVersion() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [createVersion] = useCreateVersionMutation();

  const handleSubmit = async () => {
    if (!content.trim()) return toast.error("Content is required.");
    try {
      await createVersion({ documentId, content }).unwrap();
      toast.success("Version created");
      navigate("../list");
    } catch {
      toast.error("Failed to create version");
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter version content"
        className="min-h-[200px] resize-none w-full"
      />
      <Button onClick={handleSubmit} className="w-full md:w-fit">
        Save Version
      </Button>
    </div>
  );
}
