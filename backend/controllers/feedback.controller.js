import { Feedback } from "../models/feedback.model.js";

// Submit Feedback
export const submitFeedback = async (req, res) => {
  try {
    const { name, email, feedback, rating } = req.body;

    if (!name || !email || !feedback || !rating) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const newFeedback = await Feedback.create({
      name,
      email,
      feedback,
      rating,
    });
    res.status(201).json({
      message: "Feedback submitted",
      feedback: newFeedback,
      success: true,
    });
  } catch (error) {
    console.error("Submit Feedback Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get All Feedback (Admin)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ feedbacks, success: true });
  } catch (error) {
    console.error("Fetch Feedback Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
