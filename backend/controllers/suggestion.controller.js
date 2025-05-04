import { Suggestion } from "../models/suggestion.model.js";
import { Document } from "../models/document.model.js";

// 1. Create a suggestion
export const createSuggestion = async (req, res) => {
  try {
    const { documentId, content, position, comment } = req.body;
    const userId = req.id;

    // Input validation
    if (!documentId || !content) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const suggestion = await Suggestion.create({
      document: documentId,
      suggestedBy: userId,
      content,
      position,
      comment,
    });

    res.status(201).json({
      message: "Suggestion created",
      suggestion,
      success: true,
    });
  } catch (error) {
    console.error("Error in createSuggestion:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// 2. Get all suggestions for a document
export const getSuggestionsByDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const suggestions = await Suggestion.find({ document: documentId });

    res.status(200).json({
      message: "Suggestions fetched",
      totalSuggestions: suggestions.length,
      suggestions,
      success: true,
    });
  } catch (error) {
    console.error("Error in getSuggestionsByDocument:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// 3. Delete suggestion
export const deleteSuggestion = async (req, res) => {
  try {
    const { suggestionId } = req.params;

    const suggestion = await Suggestion.findById(suggestionId);
    if (!suggestion) {
      return res
        .status(404)
        .json({ message: "Suggestion not found", success: false });
    }

    await Document.findByIdAndUpdate(suggestion.document, {
      $pull: { suggestions: suggestion._id },
    });

    await suggestion.deleteOne();

    res.status(200).json({ message: "Suggestion deleted", success: true });
  } catch (error) {
    console.error("Error in deleteSuggestion:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
