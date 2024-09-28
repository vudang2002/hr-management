import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./server/user/user.router";
import leaveApplicationRouter from "./server/leave_application/leave_application.router";
import employeeRouter from "./server/employee/employee.router";
import payRollRouter from "./server/payroll/payroll.router";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

console.log(`MongoDB URI: ${mongoUri}`);

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", userRouter);
app.use("/api", leaveApplicationRouter);
app.use("/api", employeeRouter);
app.use("/api", payRollRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
