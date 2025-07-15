// server.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import patientRoutes from "./routes/patientRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use("/api/patients", patientRoutes);  // New route for patients

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
// import patientRoutes from './routes/patientRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

// API routes
app.use('/api/patient', patientRoutes);
app.use('/api/predict', predictionRoutes);  // EEG Prediction Route (uses Flask ML API internally)
app.use("/api/history", historyRoutes);

// ✅ Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
