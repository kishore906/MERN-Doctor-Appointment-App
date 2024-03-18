import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { delete_file, upload_file } from "../utils/cloudinary.js";

// register functionality for user, doctor -> /api/register
const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role, gender, photo } = req.body;

    let emailExists;
    let user = null;

    // checking for Email already exists or not
    if (role === "user") {
      emailExists = await User.findOne({ email });
    } else if (role === "doctor") {
      emailExists = await Doctor.findOne({ email });
    }

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // getting photoUrl from cloudinary
    const photoResponse = await upload_file(
      req.body.photo,
      "Doctors-Appointment-MERN-App/profile-photos"
    );

    if (role === "user") {
      user = await User.create({
        fullName,
        email,
        password: hash,
        role,
        gender,
        photo: photoResponse,
      });
    } else if (role === "doctor") {
      user = await Doctor.create({
        fullName,
        email,
        password: hash,
        role,
        gender,
        photo: photoResponse,
      });
    }

    //res.status(201).json(user);
    //res.status(201).json({ message: "User Registered Successfully" });

    // token generation
    const token = generateToken(user._id, user.role);

    // Options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// function to generate Token
function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
}

// login functionality for user, doctor -> /api/login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = null;

    const normalUser = await User.findOne({ email }).select("+password");
    const doctor = await Doctor.findOne({ email }).select("+password");

    if (normalUser) {
      user = normalUser;
    }

    if (doctor) {
      user = doctor;
    }

    // throwing error if patient or doctor is not found
    if (!user) {
      return res.status(404).json({ message: "Invalid EmailId" });
    }

    // comparing passwords
    const pswdMatch = await bcrypt.compare(password, user.password);

    if (!pswdMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // token generation
    const token = generateToken(user._id, user.role);

    // Options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// function to get loggedIn User -> /api/me
const getUserProfile = async (req, res, next) => {
  const role = req?.user?.role;
  let user = null;

  if (role === "user") {
    user = await User.findById(req?.user?.id);
  } else if (role === "doctor") {
    user = await Doctor.findById(req?.user?.id);
  }

  res.status(200).json({
    user,
  });
};

// logout functionality for user & doctor -> /api/logout
const logout = (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ message: "Logged Out Successfully" });
};

// Update user -> /api/me/update
const updateDetails = async (req, res, next) => {
  const role = req?.user?.role;

  try {
    let updatedDoc = null;

    if (role === "user") {
      updatedDoc = await User.findByIdAndUpdate(req?.user?.id, req.body, {
        new: true,
      });
    } else if (role === "doctor") {
      updatedDoc = await Doctor.findByIdAndUpdate(req.user?.id, req.body, {
        new: true,
      });
    }

    if (!updatedDoc) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // res.status(200).json(updatedDoc);
    res.status(200).json({ message: "Details Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Password -> user & doctor -> /api/me/updatePassword
const updatePassword = async (req, res, next) => {
  let user = null;

  try {
    if (req.user.role === "user") {
      user = await User.findById(req.user.id).select("+password");
    } else if (req.user.role === "doctor") {
      user = await Doctor.findById(req.user.id).select("+password");
    }

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const isPswdMatch = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    if (!isPswdMatch) {
      return res.status(400).json({ message: "Old Password didn't match" });
    }

    // encrypting the pswd
    user.password = await bcrypt.hash(req.body.password, 10);
    user.save();

    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Upload user avatar   =>  /api/me/upload_photo
const uploadPhoto = async (req, res, next) => {
  try {
    let user;

    const photoResponse = await upload_file(
      req.body.photo,
      "Doctors-Appointment-MERN-App/profile-photos"
    );

    //console.log(photoResponse);

    // Remove previous avatar in cloudinary
    if (req?.user?.photo?.url) {
      await delete_file(req?.user?.photo?.public_id);
    }

    if (req?.user?.role === "user") {
      user = await User.findByIdAndUpdate(req?.user?.id, {
        photo: photoResponse,
      });
    } else if (req?.user?.role === "doctor") {
      user = await Doctor.findByIdAndUpdate(req?.user?.id, {
        photo: photoResponse,
      });
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    if (err.name === "PayloadTooLargeError") {
      return res.json(413).json({ message: "Photo Size Too Large" });
    }
    res.status(400).json({ message: err.message });
  }
};

// function to delete User or Doctor -> /api/me
const deleteUser = async (req, res, next) => {
  let user = null;

  if (req?.user?.role === "user") {
    user = await User.findById(req?.user?.id);
  } else if (req?.user?.role === "doctor") {
    user = await Doctor.findById(req?.user?.id);
  }

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  // Remove user avatar from cloudinary
  if (user?.photo?.public_id) {
    await delete_file(user?.photo?.public_id);
  }

  await user.deleteOne();

  res
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .json("Profile Deleted Successfully");
  //res.status(200).json({ message: "Profile Deleted Successfully" });
};

export {
  register,
  login,
  logout,
  updateDetails,
  updatePassword,
  uploadPhoto,
  getUserProfile,
  deleteUser,
};
