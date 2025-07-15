import express from "express";
import { predictSeizure } from "../controllers/predictionController.js";

const router = express.Router();

// ✅ Route: POST /api/predict
// Description: Accepts EEG data, sends to Flask ML API, stores result in DB, returns prediction
router.post("/", predictSeizure);

export default router;
