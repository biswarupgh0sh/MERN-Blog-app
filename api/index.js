import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MONGODB is connected");
  })
  .catch((err) => {
    console.log("MONGODB is not connected");
  });

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Serving at ${port}`);
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Invalid";

  res.status(statusCode).json({
    success: false,
    statusCode: err.statusCode,
    stack: process.env.NODE_ENV === "development" ? err.stack : "",
    message: err.message,
  });
});
