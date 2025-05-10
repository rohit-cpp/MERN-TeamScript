// controllers/suggestion.controller.js
import { Suggestion } from "../models/suggestion.model.js";

// Create suggestion
export const createSuggestion = async (req, res) => {
  try {
    const { documentId, content } = req.body;
    const userId = req.id;

    if (!documentId || !content) {
      return res
        .status(400)
        .json({ message: "Missing fields", success: false });
    }

    const suggestion = await Suggestion.create({
      document: documentId,
      suggestedBy: userId,
      content,
    });

    res
      .status(201)
      .json({ message: "Suggestion added", suggestion, success: true });
  } catch (error) {
    console.error("Create suggestion error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get suggestions by document
export const getSuggestionsByDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const suggestions = await Suggestion.find({
      document: documentId,
    }).populate("suggestedBy", "name email");

    res.status(200).json({ suggestions, success: true });
  } catch (error) {
    console.error("Get suggestions error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Delete suggestion
export const deleteSuggestion = async (req, res) => {
  try {
    const { suggestionId } = req.params;

    const suggestion = await Suggestion.findById(suggestionId);
    if (!suggestion) {
      return res
        .status(404)
        .json({ message: "Suggestion not found", success: false });
    }

    await suggestion.deleteOne();

    res.status(200).json({ message: "Suggestion deleted", success: true });
  } catch (error) {
    console.error("Delete suggestion error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get all suggestions by current user
export const getSuggestionsByUser = async (req, res) => {
  try {
    const userId = req.id;
    const suggestions = await Suggestion.find({ suggestedBy: userId }).populate(
      "document"
    );

    res.status(200).json({
      message: "User suggestions fetched successfully",
      suggestions,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user suggestions:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
