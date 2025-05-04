import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    suggestedBy: {
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
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Suggestion = mongoose.model("Suggestion", suggestionSchema);
