import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createSuggestion,
  getSuggestionsByDocument,
  deleteSuggestion,
  getSuggestionsByUser,
} from "../controllers/suggestion.controller.js";

const router = express.Router();
router.route("/create").post(isAuthenticated, createSuggestion);
router.route("/all/:documentId").get(isAuthenticated, getSuggestionsByDocument);
router.route("/delete/:suggestionId").delete(isAuthenticated, deleteSuggestion);
router.route("/user-suggestion").get(isAuthenticated, getSuggestionsByUser);
export default router;
