import { useEffect } from "react";
import Loader from "./Loader";
import { useGetAppointmentsQuery } from "../redux/api/appointmentApi";
import toast from "react-hot-toast";

function UserBookings() {
  const { data, isLoading, error } = useGetAppointmentsQuery();
  const appointments = data?.appointments;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-5">
      <h4 className="mb-3">My Bookings</h4>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Doctor</th>
            <th scope="col">Profession</th>
            <th scope="col">Speciality</th>
            <th scope="col">Appointment Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.length > 0 ? (
            appointments?.map((appointment, index) => {
              return (
                <tr key={appointment._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{appointment?.doctor?.fullName}</td>
                  <td>{appointment?.doctor?.profession}</td>
                  <td>{appointment?.doctor?.specialization}</td>
                  <td>
                    {new Date(appointment.appointmentDate).toDateString()}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>
                <h6 className="text-center">No Appointments Available</h6>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserBookings;
