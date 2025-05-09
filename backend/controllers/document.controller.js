import { Document } from "../models/document.model.js";
import { Team } from "../models/team.model.js";

// Create a document
export const createDocument = async (req, res) => {
  try {
    const { title, content, teamId } = req.body;
    const userId = req.id;

    if (!title || !content || !teamId) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res
        .status(404)
        .json({ message: "Team not found", success: false });
    }

    const document = await Document.create({
      title,
      content,
      owner: userId,
      team: teamId,
      versions: [],
      suggestions: [],
    });

    // Add the new document to the team
    team.documents.push(document._id);
    await team.save();

    return res
      .status(201)
      .json({ message: "Document created", document, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Document creation failed", success: false });
  }
};

// Update a document
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.id;

    const document = await Document.findById(id);
    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found", success: false });
    }

    if (String(document.owner) !== userId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    if (title) document.title = title;
    if (content) document.content = content;
    await document.save();

    res
      .status(200)
      .json({ message: "Document updated", document, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to update document", success: false });
  }
};

// Delete a document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const document = await Document.findById(id);
    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found", success: false });
    }

    if (String(document.owner) !== userId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    await Document.findByIdAndDelete(id);
    await Team.findByIdAndUpdate(document.team, { $pull: { documents: id } });

    res
      .status(200)
      .json({ message: "Document deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to delete document", success: false });
  }
};

// Get document by ID
export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id)
      .populate("owner", "name email")
      .populate("team", "name")
      .populate({
        path: "versions",
        populate: { path: "createdBy", select: "name email" },
      })
      .populate("suggestions");

    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found", success: false });
    }

    res.status(200).json({ document, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch document", success: false });
  }
};

// Get all documents for a team
export const getAllDocumentsForTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const documents = await Document.find({ team: teamId }).populate(
      "owner",
      "name email"
    );

    res.status(200).json({ documents, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch documents", success: false });
  }
};

// Get all documents (for /explore)
export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .populate("owner", "name email")
      .populate("team", "name ")
      .populate("versions", "title createdAt createdBy")
      .populate("suggestions");

    res.status(200).json({ documents, success: true });
  } catch (error) {
    console.error("Error fetching all documents:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch documents", success: false });
  }
};
