import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// GET /api/history - fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: -1 }); // newest first
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;
