import express from "express";
import {
  register,
  login,
  logout,
  updateDetails,
  updatePassword,
  uploadPhoto,
  getUserProfile,
  deleteUser,
} from "../controllers/authControllers.js";
import { isAuthenticated, authorizeRoles } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getUserProfile);
router.route("/me/update").put(isAuthenticated, updateDetails);
router.route("/me/updatePassword").put(isAuthenticated, updatePassword);
router.route("/me/upload_photo").put(isAuthenticated, uploadPhoto);
router.route("/me").delete(isAuthenticated, deleteUser);

export default router;
