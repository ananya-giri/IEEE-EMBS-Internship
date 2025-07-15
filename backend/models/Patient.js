import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
