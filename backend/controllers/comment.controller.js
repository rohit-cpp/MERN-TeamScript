import { Comment } from "../models/comment.model.js";

// Create a comment
export const createComment = async (req, res) => {
  try {
    const { documentId, content } = req.body;
    const userId = req.id;

    if (!documentId || !content) {
      return res
        .status(400)
        .json({ message: "Missing fields", success: false });
    }

    const comment = await Comment.create({
      document: documentId,
      content,
      commentedBy: userId,
    });

    res.status(201).json({ message: "Comment posted", comment, success: true });
  } catch (error) {
    console.error("Error in createComment:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found", success: false });
    }

    comment.content = content;
    await comment.save();

    res
      .status(200)
      .json({ message: "Comment updated", comment, success: true });
  } catch (error) {
    console.error("Error in updateComment:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found", success: false });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted", success: true });
  } catch (error) {
    console.error("Error in deleteComment:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
