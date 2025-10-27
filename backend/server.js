// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

//app.use(cors());
app.use(cors({
  origin: ["http://localhost:3000", "https://lifeboon.vercel.app/login", "https://lifeboon-1qhyevnkl-ishetedgr8s-projects.vercel.app"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ishaanbshete_db_user:f6WQxTvVGooM7rAP@cluster0.aky5io8.mongodb.net/?appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Import routes
import hospitalRoutes from "./routes/hospitalRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// Use routes
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => res.send("LifeBoon API is running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API endpoints:`);
  console.log(`   - Hospitals: http://localhost:${PORT}/api/hospitals`);
  console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
  console.log(`   - Appointments: http://localhost:${PORT}/api/appointments`);
});