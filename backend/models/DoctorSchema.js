import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    fullName: { type: String, required: true },
    photo: { public_id: String, url: String },
    consultationPrice: { type: Number },
    role: {
      type: String,
    },
    gender: {
      type: String,
    },

    // Fields for doctors only
    profession: { type: String },
    specialization: { type: String },
    qualifications: [
      {
        courseStartDate: { type: Date },
        courseEndDate: { type: Date },
        degree: { type: String },
        university: { type: String },
      },
    ],

    experiences: [
      {
        startDate: { type: Date },
        endDate: { type: Date },
        position: { type: String },
        company: { type: String },
      },
    ],

    bio: { type: String, maxLength: 50 },
    timeSlots: [
      {
        date: { type: Date },
        startTime: { type: String },
        endTime: { type: String },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        reviewDate: {
          type: Date,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doctor", DoctorSchema);
