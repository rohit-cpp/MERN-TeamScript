import express from "express";
import {
  addMemberToTeam,
  createTeam,
  getMyTeams,
  getTeamById,
} from "../controllers/team.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/create").post(isAuthenticated, createTeam);
router.route("/my-teams").get(isAuthenticated, getMyTeams);
router.route("/:id").get(isAuthenticated, getTeamById);
router.route("/add-member").post(isAuthenticated, addMemberToTeam);

export default router;
