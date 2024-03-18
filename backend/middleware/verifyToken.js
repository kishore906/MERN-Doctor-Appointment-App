import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

// function to verify the token in cookie
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({ message: "Please Login First.." });
    }

    // retrieving payload Info from token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }

    res.status(400).json({ message: error.message });
  }
};

// authorizing the route based on roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `${req.user.role} is not allowed to access the resource`,
      });
    }

    next();
  };
};
