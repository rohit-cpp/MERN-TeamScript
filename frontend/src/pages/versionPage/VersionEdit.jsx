import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetVersionByIdQuery,
  useUpdateVersionMutation,
} from "@/store/api/VersionApi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function EditVersion() {
  const { versionId } = useParams();
  const { data } = useGetVersionByIdQuery(versionId);
  const [updateVersion] = useUpdateVersionMutation();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.version?.content) setContent(data.version.content);
  }, [data]);

  const handleUpdate = async () => {
    try {
      await updateVersion({ versionId, content }).unwrap();
      toast.success("Version updated");
      navigate(`../view/${versionId}`);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[200px] resize-none w-full"
      />
      <Button onClick={handleUpdate} className="w-full md:w-fit">
        Update Version
      </Button>
    </div>
  );
}
