import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGemini } from "@/hooks/useGemini";

const GenerateTitle = ({ content, setGeneratedContent }) => {
  const { askGemini } = useGemini();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!content) return;
    setLoading(true);
    const prompt = `Generate a suitable and concise title for the following content:\n\n${content}`;
    const result = await askGemini(prompt);
    setGeneratedContent(result);
    setLoading(false);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleGenerate}
      disabled={loading || !content}
    >
      {loading ? "Generating Title..." : "Generate Title"}
    </Button>
  );
};

export default GenerateTitle;
