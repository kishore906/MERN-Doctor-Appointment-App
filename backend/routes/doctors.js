import express from "express";
import {
  getDoctorsByProfession,
  getDoctor,
  createDoctorReview,
  canUserReview,
  getAllDoctors,
} from "../controllers/doctorControllers.js";
import { isAuthenticated } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/alldoctors").get(getAllDoctors);
router.route("/doctors").post(getDoctorsByProfession);
router.route("/doctors/:id").get(getDoctor);
router.route("/reviews").put(isAuthenticated, createDoctorReview);

router.route("/canUserReview").get(isAuthenticated, canUserReview);

export default router;
