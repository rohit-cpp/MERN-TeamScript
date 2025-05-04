import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createVersion,
  deleteVersion,
  getVersionById,
  getVersionsByDocument,
  updateVersion,
} from "../controllers/version.controller.js";

const router = express.Router();
router.route("/create").post(isAuthenticated, createVersion);
router.route("/all/:documentId").get(isAuthenticated, getVersionsByDocument);
router.route("/single/:versionId").get(isAuthenticated, getVersionById);
router.route("/update/:versionId").put(isAuthenticated, updateVersion);
router.route("/delete/:versionId").delete(isAuthenticated, deleteVersion);

export default router;
