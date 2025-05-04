import { Version } from "../models/version.model.js";
import { Document } from "../models/document.model.js";

// 1. Create a new version
export const createVersion = async (req, res) => {
  try {
    const { documentId, content } = req.body;
    const userId = req.id;

    const document = await Document.findById(documentId);

    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found", success: false });
    }

    const version = await Version.create({
      content,
      document: documentId,
      createdBy: userId,
    });

    document.versions.push(version._id);
    await document.save();

    res.status(201).json({
      message: "Version created",
      version,
      success: true,
    });
  } catch (error) {
    console.error("Error in createVersion:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// 2. Get all versions for a document
export const getVersionsByDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const versions = await Version.find({ document: documentId })
      .populate("createdBy", "name email")
      .populate("document", "title");

    res.status(200).json({
      message: "Versions fetched successfully",
      totalVersions: versions.length,
      versions,
      success: true,
    });
  } catch (error) {
    console.error("Error in getVersionsByDocument:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// 3. Get single version by ID
export const getVersionById = async (req, res) => {
  try {
    const { versionId } = req.params;

    const version = await Version.findById(versionId)
      .populate("createdBy", "name email")
      .populate("document", "title");

    if (!version) {
      return res
        .status(404)
        .json({ message: "Version not found", success: false });
    }

    res.status(200).json({
      message: "Version fetched",
      version,
      success: true,
    });
  } catch (error) {
    console.error("Error in getVersionById:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// 4. Update version
export const updateVersion = async (req, res) => {
  try {
    const { versionId } = req.params;
    const { content } = req.body;

    const version = await Version.findById(versionId);
    if (!version) {
      return res
        .status(404)
        .json({ message: "Version not found", success: false });
    }

    version.content = content;
    await version.save();

    res.status(200).json({
      message: "Version updated",
      version,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateVersion:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// 5. Delete version
export const deleteVersion = async (req, res) => {
  try {
    const { versionId } = req.params;

    const version = await Version.findById(versionId);
    if (!version) {
      return res
        .status(404)
        .json({ message: "Version not found", success: false });
    }

    await Document.findByIdAndUpdate(version.document, {
      $pull: { versions: version._id },
    });

    await version.deleteOne();

    res.status(200).json({ message: "Version deleted", success: true });
  } catch (error) {
    console.error("Error in deleteVersion:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
