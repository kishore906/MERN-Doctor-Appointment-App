import { useEffect } from "react";
import Loader from "./Loader";
import { useGetAppointmentsQuery } from "../redux/api/appointmentApi";
import toast from "react-hot-toast";

function DoctorAppointments() {
  const { data, isLoading, error } = useGetAppointmentsQuery();
  const appointments = data?.appointments;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h4 className="mb-3">My Appointments</h4>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">BookedOn</th>
            <th scope="col">Price($)</th>
            <th scope="col">Payment_Status</th>
            <th scope="col">Appointment_Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => {
              return (
                <tr key={appointment._id}>
                  <th scope="row">{appointment?.user?.fullName}</th>
                  <td>{appointment?.user?.gender}</td>
                  <td>{new Date(appointment?.createdAt).toDateString()}</td>
                  <td>{appointment?.consultationPrice}</td>
                  <td>{appointment?.isPaid ? "Paid" : "Not Paid"}</td>
                  <td>
                    {new Date(appointment?.appointmentDate).toDateString()}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>
                <h6 className="text-center">No Appointments Available</h6>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorAppointments;
