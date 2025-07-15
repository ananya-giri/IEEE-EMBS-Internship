// Inside historyController.js
import Event from "../models/Event.js";

export const getHistory = async (req, res) => {
  try {
    const history = await Event.find().sort({ time: -1 });
    res.json(history);
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
