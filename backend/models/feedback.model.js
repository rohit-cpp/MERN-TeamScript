import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
