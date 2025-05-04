import express from "express";
import {
  createDocument,
  deleteDocument,
  getAllDocumentsForTeam,
  getDocumentById,
  updateDocument,
} from "../controllers/document.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/create").post(isAuthenticated, createDocument);
router.route("/update/:id").post(isAuthenticated, updateDocument);
router.route("/delete/:id").delete(isAuthenticated, deleteDocument);
router.route("/:id").get(isAuthenticated, getDocumentById);
router.route("/team/:teamId").get(isAuthenticated, getAllDocumentsForTeam);

export default router;
