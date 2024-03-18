import express from "express";
import { isAuthenticated } from "../middleware/verifyToken.js";
import { getUser } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/user/:id").get(isAuthenticated, getUser);

export default router;
