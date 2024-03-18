import Appointment from "../models/AppointmentSchema.js";
import Stripe from "stripe";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Booking an Appointment /api/bookAppointment
/*
const bookAppointment = async (req, res, next) => {
  try {
    const appointment = {
      doctor: req.body.doctorId,
      user: req?.user?.id,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      consultationPrice: req.body.consultationPrice,
    };

    const appointmentDoc = await Appointment.create(appointment);

    //res.status(200).json({ message: "Appointment Booked Successfully" });
    res.status(200).json({ appointmentDoc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
*/

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// function for booking appointment -> /api/bookAppointment
const bookAppointment = async (req, res) => {
  try {
    //get currently booked doctor
    const doctor = await Doctor.findById(req.body.doctorId);
    const user = await User.findById(req?.user?.id);

    // let user = null;

    // if (req?.user?.role === "user") {
    //   user = await User.findById(req?.user?.id);
    // } else if (req?.user?.role === "doctor") {
    //   user = await Doctor.findById(req?.user?.id);
    // }

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment_success`,
      cancel_url: `${process.env.FRONTEND_URL}/doctors/${doctor._id}`,
      //cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor._id}`,
      //cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: user.email,
      client_reference_id: req.body.doctorId.toString(), // unique id for the checkout session
      line_items: [
        {
          price_data: {
            currency: "aud",
            unit_amount: doctor.consultationPrice * 100,
            product_data: {
              name: doctor.fullName,
              description: doctor.bio,
              images: [doctor.photo.url],
            },
          },
          quantity: 1,
        },
      ],
    });

    // console.log(session);

    // create new booking appointment
    if (session) {
      const bookAppointment = {
        doctor: doctor._id,
        user: user._id,
        consultationPrice: req.body.consultationPrice,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        session: session.id,
      };
      const appointmentDoc = await Appointment.create(bookAppointment);
    } else {
      return res
        .status(500)
        .json({ meesage: "Error in Creating Booking or Session Problem" });
    }

    res
      .status(200)
      .json({ success: true, message: "Payment Successful", session });
  } catch (err) {
    res.status(500).json({ message: "Error in creating checkout session" });
  }
};

// get all appointments for user & doctor -> /api/myappointments
const getAllAppointments = async (req, res, next) => {
  const { role } = req?.user;
  let appointments = null;

  // console.log(new Date("2023-03-15T00:00:00.000Z").toDateString());

  try {
    if (role === "user") {
      appointments = await Appointment.find({ user: req?.user?.id }).populate(
        "doctor",
        "fullName profession specialization"
      );
    } else if (role === "doctor") {
      appointments = await Appointment.find({ doctor: req?.user?.id }).populate(
        "user",
        "fullName gender"
      );
    }

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { bookAppointment, getAllAppointments };
