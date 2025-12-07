const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// Helper to get db from app.locals populated in index.js
function getDb(req) {
  return req.app.locals.db;
}

// Fetch categories for a user
router.get("/getCategories2/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "Missing parameter: userId" });
    }
    const db = getDb(req);
    if (!db) {
      return res.status(503).json({ error: "Database not initialized" });
    }
    const user = await db.collection("userData").findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const categories = user.categories || [];
    return res.status(200).json({ success: true, message: "Categories fetched successfully", categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new category for a user
router.post("/addNewCategory2/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { newCategory } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Missing parameter: userId" });
    }
    if (!newCategory || typeof newCategory !== "string") {
      return res.status(400).json({ error: "Invalid or missing category name" });
    }
    const db = getDb(req);
    if (!db) {
      return res.status(503).json({ error: "Database not initialized" });
    }
    const user = await db.collection("userData").findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const existingCategories = user.categories || [];
    const categoryExists = existingCategories.some(c => c.toLowerCase() === newCategory.toLowerCase());
    if (categoryExists) {
      return res.status(400).json({ error: "Category already exists" });
    }
    await db.collection("userData").updateOne({ _id: new ObjectId(userId) }, { $push: { categories: newCategory } });
    return res.status(201).json({ success: true, message: "Category added successfully", newCategory });
  } catch (error) {
    console.error("Error adding new category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all the files for that particular userId
router.get("/files2/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "Missing parameter: userId" });
    }
    const db = getDb(req);
    if (!db) {
      return res.status(503).json({ error: "Database not initialized" });
    }
    const user = await db.collection("userData").findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const files = await db.collection("encryptedFiles.files")
      .find({ "metadata.userId": userId.toString() }, { projection: { filename: 1, _id: 0 } })
      .toArray();
    if (files.length === 0) {
      return res.status(200).json({ message: "No files found.", files: [] });
    }
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
