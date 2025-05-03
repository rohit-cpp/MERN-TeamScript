import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      startIndex: { type: Number },
      endIndex: { type: Number },
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
