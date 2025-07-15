import Patient from "../models/Patient.js";

export const addPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    const newPatient = new Patient({
      name,
      age,
      gender,
    });

    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient);
  } catch (err) {
    console.error("Add Patient Error:", err);
    res.status(500).json({ error: "Failed to add patient" });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error("Fetch Patients Error:", err);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};
