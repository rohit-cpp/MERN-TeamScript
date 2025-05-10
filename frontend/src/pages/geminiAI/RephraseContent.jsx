import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGemini } from "@/hooks/useGemini";

const RephraseContent = ({ content, setGeneratedContent }) => {
  const { askGemini } = useGemini();
  const [loading, setLoading] = useState(false);

  const handleRephrase = async () => {
    if (!content) return;
    setLoading(true);
    const prompt = `Rephrase the following text:\n\n${content}`;
    const result = await askGemini(prompt);
    setGeneratedContent(result);
    setLoading(false);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleRephrase}
      disabled={loading || !content}
    >
      {loading ? "Rephrasing..." : "Rephrase Content"}
    </Button>
  );
};

export default RephraseContent;
