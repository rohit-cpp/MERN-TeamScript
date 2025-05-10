import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import RichTextEditorForCreate from "./EditorForCreate";

const FullPageEditor = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [content, setContent] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [selectedTeamId, setSelectedTeamId] = useState(
    state?.selectedTeamId || ""
  );

  const handleSave = () => {
    navigate("/document", {
      state: {
        updatedContent: content,
        title,
        selectedTeamId,
      },
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Document Content</h1>
      <RichTextEditorForCreate content={content} setContent={setContent} />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Save and Go Back
      </button>
    </div>
  );
};

export default FullPageEditor;
