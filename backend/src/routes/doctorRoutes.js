const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// Helper to get db from app.locals
function getDb(req) {
  return req.app.locals.db;
}

/**
 * Get doctor statistics
 * @route GET /doctor/stats/:doctorId
 */
router.get("/doctor/stats/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    // Get pending requests count
    const pendingRequests = await db.collection("doctorRequests")
      .countDocuments({ doctorId, status: "pending" });

    // Get total patients count (including active)
    const totalPatients = await db.collection("doctorPatients")
      .countDocuments({ doctorId });

    // Get active chats/sessions count
    const activeChats = await db.collection("sessionData")
      .countDocuments({ doctorName: doctorId, sessionState: "Active" });

    // Get total files received from all patients
    const patients = await db.collection("doctorPatients")
      .find({ doctorId })
      .toArray();
    
    let totalFiles = 0;
    for (const patient of patients) {
      const fileCount = await db.collection("files")
        .countDocuments({ userId: patient.patientId });
      totalFiles += fileCount;
    }

    res.json({
      totalPatients,
      pendingRequests,
      activeChats,
      totalFiles
    });
  } catch (error) {
    console.error("Error fetching doctor stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Get doctor's pending requests
 * @route GET /doctor/requests/:doctorId
 */
router.get("/doctor/requests/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    const requests = await db.collection("doctorRequests")
      .find({ doctorId, status: "pending" })
      .sort({ requestDate: -1 })
      .toArray();

    res.json({ requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Get doctor's patients with file counts
 * @route GET /doctor/patients/:doctorId
 */
router.get("/doctor/patients/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    const patients = await db.collection("doctorPatients")
      .find({ doctorId })
      .sort({ createdAt: -1 })
      .toArray();

    // Add file count for each patient
    const patientsWithFiles = await Promise.all(
      patients.map(async (patient) => {
        const fileCount = await db.collection("files")
          .countDocuments({ userId: patient.patientId });
        return {
          ...patient,
          fileCount
        };
      })
    );

    res.json({ patients: patientsWithFiles });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Get patient info for doctor
 * @route GET /doctor/patient-info/:patientId/:doctorId
 */
router.get("/doctor/patient-info/:patientId/:doctorId", async (req, res) => {
  try {
    const { patientId, doctorId } = req.params;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    const patient = await db.collection("doctorPatients")
      .findOne({ patientId, doctorId });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({ patient });
  } catch (error) {
    console.error("Error fetching patient info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Get patient files for doctor
 * @route GET /doctor/patient-files/:patientId
 */
router.get("/doctor/patient-files/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    const files = await db.collection("files")
      .find({ userId: patientId })
      .sort({ uploadDate: -1 })
      .toArray();

    res.json({ files });
  } catch (error) {
    console.error("Error fetching patient files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Accept consultation request
 * @route POST /doctor/accept-request
 */
router.post("/doctor/accept-request", async (req, res) => {
  try {
    const { requestId, doctorId, patientId } = req.body;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    // Update request status
    const request = await db.collection("doctorRequests").findOne({ 
      _id: new ObjectId(requestId) 
    });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    await db.collection("doctorRequests").updateOne(
      { _id: new ObjectId(requestId) },
      { 
        $set: { 
          status: "accepted",
          acceptedDate: new Date()
        } 
      }
    );

    // Check if patient already exists
    const existingPatient = await db.collection("doctorPatients").findOne({
      doctorId,
      patientId: request.patientId
    });

    if (!existingPatient) {
      // Add patient to doctor's patient list
      await db.collection("doctorPatients").insertOne({
        doctorId,
        patientId: request.patientId,
        patientName: request.patientName,
        patientEmail: request.patientEmail,
        status: "active",
        createdAt: new Date(),
        lastConsultation: new Date()
      });
    }

    res.json({ message: "Request accepted successfully" });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Reject consultation request
 * @route POST /doctor/reject-request
 */
router.post("/doctor/reject-request", async (req, res) => {
  try {
    const { requestId } = req.body;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    await db.collection("doctorRequests").updateOne(
      { _id: new ObjectId(requestId) },
      { 
        $set: { 
          status: "rejected",
          rejectedDate: new Date()
        } 
      }
    );

    res.json({ message: "Request rejected" });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Add doctor notes for patient
 * @route POST /doctor/add-notes
 */
router.post("/doctor/add-notes", async (req, res) => {
  try {
    const { patientId, doctorId, notes } = req.body;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    await db.collection("doctorNotes").insertOne({
      patientId,
      doctorId,
      notes,
      createdAt: new Date()
    });

    // Update last consultation date
    await db.collection("doctorPatients").updateOne(
      { doctorId, patientId },
      { $set: { lastConsultation: new Date() } }
    );

    res.json({ message: "Notes saved successfully" });
  } catch (error) {
    console.error("Error saving notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Get patient statistics
 * @route GET /stats/:userId
 */
router.get("/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const db = getDb(req);
    if (!db) return res.status(503).json({ error: "Database not initialized" });

    // Get total files
    const totalFiles = await db.collection("files")
      .countDocuments({ userId });

    // Get categories
    const categories = await db.collection("categories")
      .find({ userId })
      .toArray();

    // Get shared doctors count
    const sharedDoctors = await db.collection("doctorPatients")
      .countDocuments({ patientId: userId, status: "active" });

    // Calculate storage (sum of file sizes)
    const filesWithSize = await db.collection("files")
      .find({ userId })
      .toArray();
    
    const storageUsed = filesWithSize.reduce((total, file) => {
      return total + (file.fileSize || 0);
    }, 0) / (1024 * 1024); // Convert to MB

    res.json({
      totalFiles,
      totalCategories: categories.length,
      sharedDoctors,
      storageUsed: parseFloat(storageUsed.toFixed(2))
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
