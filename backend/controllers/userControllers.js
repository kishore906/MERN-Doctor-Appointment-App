import mongoose from "mongoose";
import User from "../models/UserSchema.js";

// get user by id -> /api/users/:id
const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getUser };
