import mongoose from "mongoose";
import Doctor from "../models/DoctorSchema.js";
import Appointment from "../models/AppointmentSchema.js";

// Get all doctors -> /api/alldoctors
const getAllDoctors = async (req, res, next) => {
  try {
    const allDoctors = await Doctor.find({});
    res.status(200).json({ allDoctors });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get doctor details based on selected profession(frontend) -> /api/doctors
const getDoctorsByProfession = async (req, res, next) => {
  const searchedProfession = req.body.search;

  try {
    const doctors = await Doctor.find({ profession: searchedProfession });

    // if (doctors.length === 0) {
    //   return res
    //     .status(200)
    //     .json({ message: "No Doctors Found With The Profession" });
    // }

    res.status(200).json({ doctors });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get doctor profile -> /api/doctors/:id
const getDoctor = async (req, res, next) => {
  const id = req?.params?.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Please Provide Valid ID" });
    }

    const doctor = await Doctor.findById(id).populate(
      "reviews.user",
      "fullName photo"
    );

    if (!doctor) {
      return res
        .status(404)
        .json({ message: "No Doctor Was Found With the ID" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a doctorReview -> /api/reviews
const createDoctorReview = async (req, res, next) => {
  const { doctorId, rating, comment } = req.body;

  try {
    // creating a new Review
    const review = {
      user: req?.user?.id,
      rating: Number(rating),
      comment,
      reviewDate: new Date().toUTCString(),
    };

    //const doctor = await Doctor.findById(doctorId).populate("reviews.user");
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "No Doctor Found" });
    }

    // Checking whether user is given review or not
    const isReviewed = doctor?.reviews?.find(
      (r) => r?.user?.toString() === req?.user?.id.toString()
    );

    // if user was given review we will update it or else we will create a new review
    if (isReviewed) {
      doctor.reviews.forEach((review) => {
        if (review?.user?.toString() === req?.user?.id.toString()) {
          review.comment = comment;
          review.rating = rating;
          review.reviewDate = new Date().toUTCString();
        }
      });
    } else {
      doctor.reviews.push(review);
      doctor.totalRating = doctor.reviews.length;
    }

    // calculating average rating
    doctor.averageRating =
      doctor.reviews.reduce((acc, item) => item.rating + acc, 0) /
      doctor.reviews.length;

    await doctor.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// function to check whether user can review or not /api/canUserReview?doctorId={doctorId}
const canUserReview = async (req, res, next) => {
  const appointments = await Appointment.find({
    user: req.user.id,
    doctor: req.query.doctorId,
  });

  if (appointments.length === 0) {
    return res.status(200).json({ canReview: false });
  }

  res.status(200).json({
    canReview: true,
  });
};

export {
  getAllDoctors,
  getDoctorsByProfession,
  getDoctor,
  createDoctorReview,
  canUserReview,
};
