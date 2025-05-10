import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGemini } from "@/hooks/useGemini";

const OptimizeSEO = ({ content, setGeneratedContent }) => {
  const { askGemini } = useGemini();
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    if (!content) return;
    setLoading(true);
    const prompt = `Optimize the following text for SEO best practices:\n\n${content}`;
    const result = await askGemini(prompt);
    setGeneratedContent(result);
    setLoading(false);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleOptimize}
      disabled={loading || !content}
    >
      {loading ? "Optimizing..." : "SEO Optimize"}
    </Button>
  );
};

export default OptimizeSEO;
