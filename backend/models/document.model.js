import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    versions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Version",
      },
    ],
    suggestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Suggestion",
      },
    ],
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", documentSchema);
