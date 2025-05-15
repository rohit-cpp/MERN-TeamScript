import express from "express";
import {
  submitFeedback,
  getAllFeedback,
} from "../controllers/feedback.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/submit").post(isAuthenticated, submitFeedback); // POST /api/feedback/submit
router.route("/all").get(isAuthenticated, getAllFeedback); // GET /api/feedback/all

export default router;
