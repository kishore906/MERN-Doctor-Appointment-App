import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Importing all Routes
import authRoutes from "./routes/auth.js";
import doctorsRoutes from "./routes/doctors.js";
import userRoutes from "./routes/user.js";
import appointmentRoutes from "./routes/appointment.js";

// configuring .env file data
dotenv.config();

const app = express();

// Middleware
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

// Connexting to Database and running server
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to Database && Server listening to PORT ${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.log(error.message));

// Routes Usage
app.use("/api", authRoutes);
app.use("/api", doctorsRoutes);
app.use("/api", userRoutes);
app.use("/api", appointmentRoutes);
