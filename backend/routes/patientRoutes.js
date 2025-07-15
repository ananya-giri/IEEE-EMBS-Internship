import express from "express";
import { addPatient, getPatients } from "../controllers/patientController.js";

const router = express.Router();

router.post("/", addPatient);  // Add patient
router.get("/", getPatients);  // Fetch all patients

export default router;
