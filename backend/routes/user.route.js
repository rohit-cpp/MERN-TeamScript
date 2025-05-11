import express from "express";
import {
  getAllUsers,
  getUserProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(isAuthenticated, getUserProfile);
router
  .route("/profile/update")
  .post(isAuthenticated, upload.single("profilePhoto"), updateProfile);
router.route("/logout").get(logout);
router.route("/users").get(isAuthenticated, getAllUsers);
export default router;
