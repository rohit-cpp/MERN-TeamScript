import { Team } from "../models/team.model.js";
import { User } from "../models/user.model.js";

//create team function
export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.id;

    //check if Team name is already exits
    const existing = await Team.findOne({ name });
    if (existing) {
      return res.status(400).json({
        message: "Team name already exists",
        success: false,
      });
    }

    const team = await Team.create({
      name,
      members: [userId],
      createdBy: userId,
    });

    //add Team to users list
    await User.findByIdAndUpdate(userId, {
      $push: { teams: team._id },
    });
    res.status(201).json({
      message: "Team created successfully",
      team,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create team",
      success: false,
    });
  }
};

// get all teams for Logged-In users
export const getMyTeams = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate("teams");
    if (!user) {
      res.status(404).json({
        message: "User not exists",
        success: false,
      });
    }

    res.status(200).json({
      message: "Teams fetched successfully",
      teams: user.teams,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch teams",
      success: false,
    });
  }
};

//get team by id
export const getTeamById = async (req, res) => {
  try {
    const teamId = req.params.id;

    const team = await Team.findById(teamId).populate("members");
    //   .populate("documents");

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Team fetched successfully",
      team,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch team",
      success: false,
    });
  }
};

//  add member to the team (admin)
export const addMemberToTeam = async (req, res) => {
  try {
    const { teamId, userIdToAdd } = req.body;
    const currentUserId = req.id;
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        message: "Team not found",
        success: false,
      });
    }

    if (String(team.createdBy) !== currentUserId) {
      return res.status(403).json({
        message: "Only admin can add members",
        success: false,
      });
    }

    // avoid adding duplicate members
    if (team.members.includes(userIdToAdd)) {
      return res.status(400).json({
        message: "User is already in a team member",
        success: false,
      });
    }
    team.members.push(userIdToAdd);
    await team.save();

    //add team to new members records
    await User.findByIdAndUpdate(userIdToAdd, {
      $push: { teams: team._id },
    });

    res.status(200).json({
      message: "Member added successfully",
      team,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add member",
      success: false,
    });
  }
};
