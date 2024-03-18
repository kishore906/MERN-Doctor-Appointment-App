import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useBookAppointmentMutation } from "../redux/api/appointmentApi";

function DoctorTimings({ doctor }) {
  const [appointment, setAppointment] = useState("");

  const [bookAppointment, { error, isSuccess, data }] =
    useBookAppointmentMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    // data has url of the stripe checkout page
    if (data?.session?.url) {
      window.location.href = data?.session?.url;
    }
  }, [error, isSuccess, navigate, data]);

  function handleAppointmentBooking(e) {
    e.preventDefault();

    const appointmentObj = {
      doctorId: doctor?._id,
      consultationPrice: doctor?.consultationPrice,
      appointmentDate: appointment.slice(0, 24),
      appointmentTime: appointment.slice(25),
    };

    bookAppointment(appointmentObj);
  }

  return (
    <form
      className="shadow-lg bg-body rounded p-4"
      style={{ width: "100%", maxWidth: "400px", height: "320px" }}
      onSubmit={handleAppointmentBooking}
    >
      <div className="d-flex justify-content-between mb-4">
        <h5>Consultation Price:</h5>
        <h3>${doctor?.consultationPrice}</h3>
      </div>

      <h6 className="mb-4">Available Time Slots:</h6>
      {doctor?.timeSlots.map((timeSlot) => {
        return (
          <div className="form-check" key={timeSlot._id}>
            <input
              className="form-check-input"
              type="radio"
              name="timeSlot"
              id="timeSlot"
              value={`${timeSlot?.date} ${timeSlot?.startTime} ${
                timeSlot?.startTime?.split(":")[0] >= 12 ? "PM" : "AM"
              } - ${timeSlot?.endTime} ${
                timeSlot?.endTime?.split(":")[0] >= 12 ? "PM" : "AM"
              }`}
              checked={
                appointment ===
                `${timeSlot?.date} ${timeSlot?.startTime} ${
                  timeSlot?.startTime?.split(":")[0] >= 12 ? "PM" : "AM"
                } - ${timeSlot?.endTime} ${
                  timeSlot?.endTime?.split(":")[0] >= 12 ? "PM" : "AM"
                }`
              }
              onChange={(e) => setAppointment(e.target.value)}
              required
            />
            <label className="form-check-label" htmlFor="timeSlot">
              {new Date(timeSlot?.date).toDateString()} &nbsp; &nbsp;
              {`${timeSlot?.startTime} ${
                timeSlot?.startTime?.split(":")[0] >= 12 ? "PM" : "AM"
              }`}
              -
              {`${timeSlot?.endTime} ${
                timeSlot?.endTime?.split(":")[0] >= 12 ? "PM" : "AM"
              }`}
            </label>
          </div>
        );
      })}

      <button className="btn btn-primary btn-lg mt-5 d-block mx-auto">
        Book Appointment
      </button>
    </form>
  );
}

export default DoctorTimings;
