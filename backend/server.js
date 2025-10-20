import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // to accept JSON data

// Routes
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});
const PORT = 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
