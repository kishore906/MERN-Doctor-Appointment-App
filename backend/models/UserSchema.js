import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    fullName: { type: String, required: true },
    photo: { public_id: String, url: String },
    role: {
      type: String,
      enum: ["user", "doctor"],
      default: "user",
    },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bloodGroup: { type: String },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
