import express from "express";
import { isAuthenticated } from "../middleware/verifyToken.js";
import {
  bookAppointment,
  getAllAppointments,
} from "../controllers/appointmentControllers.js";

const router = express.Router();

router.route("/bookAppointment").post(isAuthenticated, bookAppointment);
router.route("/myAppointments").get(isAuthenticated, getAllAppointments);

export default router;
