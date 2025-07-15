import axios from "axios";
import Event from "../models/Event.js";

export const predictSeizure = async (req, res) => {
  try {
    const { eeg, patientName, age, gender } = req.body;

    if (!eeg || !Array.isArray(eeg)) {
      return res.status(400).json({ error: "Invalid EEG data provided" });
    }

    // Send EEG data to ML API
    const flaskResponse = await axios.post("http://127.0.0.1:5000/predict", { eeg });
    const prediction = flaskResponse.data.prediction;

    // Save full event data
    const newEvent = new Event({
      patientName,
      age,
      gender,
      time: new Date().toISOString().slice(0, 19).replace("T", " "),
      status: prediction,
      duration: prediction === "Seizure" ? "30s" : "-",
    });

    await newEvent.save();

    res.status(200).json({ prediction });

  } catch (err) {
    console.error("Prediction error:", err.message);
    res.status(500).json({ error: "Prediction failed" });
  }
};
