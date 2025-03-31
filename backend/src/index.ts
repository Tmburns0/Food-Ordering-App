import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/MyUserRoutes";

// Load environment variables
dotenv.config();

const app = express();


app.use(express.json());


app.use(cors());

// Connect to MongoDB
const connectToMongoDB = async () => {
  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  if (!connectionString) {
    console.error("MONGODB_CONNECTION_STRING is not defined in the .env file.");
    process.exit(1);
  }
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to the database!");
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

connectToMongoDB();

// Test endpoint to verify server is running
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Server is running smoothly!" });
});


console.log("Registering /api/my-user route...");
app.use("/api/my-user", userRouter);


app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found!" });
});


app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error("Unhandled Error:", err.message);
    res.status(500).json({ error: err.message });
  } else {
    console.error("Unhandled Error:", err);
    res.status(500).json({ error: "An unexpected error occurred!" });
  }
});

// Start the server using the PORT from .env or default to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
