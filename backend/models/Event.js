import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  gender: String,
  time: String,
  status: String,
  duration: String,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
