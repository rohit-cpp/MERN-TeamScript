import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createComment);
router.route("/update/:commentId").put(isAuthenticated, updateComment);
router.route("/delete/:commentId").delete(isAuthenticated, deleteComment);

export default router;
