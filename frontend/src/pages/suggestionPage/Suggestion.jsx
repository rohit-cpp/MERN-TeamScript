import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddSuggestionMutation } from "@/store/api/suggestionApi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SuggestionInputPopover = () => {
  const { id: documentId } = useParams();
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const [addSuggestion, { isLoading }] = useAddSuggestionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addSuggestion({ documentId, content }).unwrap();
      toast.success("Suggestion Added");
      setContent("");
      setOpen(false);
    } catch (err) {
      toast.error("Failed to submit suggestion");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">+ Add Suggestion</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a suggestion"
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Adding..." : "Submit"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default SuggestionInputPopover;
