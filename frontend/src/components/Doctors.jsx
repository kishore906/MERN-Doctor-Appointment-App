import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useGetAllDoctorsQuery } from "../redux/api/doctorApi";

function Doctors() {
  const { isLoading, data } = useGetAllDoctorsQuery();
  const doctors = data?.allDoctors?.slice(0, 3);

  if (isLoading) return <Loader />;

  return (
    <>
      <h2 className="text-center mt-5">Our Qualified Doctors</h2>
      <p className="text-center my-3 fw-lighter">
        World-class care for everyone. Our health system offers <br />
        unmatched, expert health care.
      </p>

      <div className="d-flex justify-content-center align-items-center gap-5 mt-5 flex-wrap">
        {doctors?.map((doctor) => (
          <div className="w-25" key={doctor._id}>
            <img
              src={
                doctor?.photo
                  ? doctor?.photo?.url
                  : "/images/default_avatar.jpg"
              }
              className="w-100"
              alt="doctor_img"
            />
            <h4 className="my-4">Dr. {doctor?.fullName}</h4>
            <div className="d-flex justify-content-between align-items-center">
              <p className="btn btn-light profession">{doctor?.profession}</p>
              <p>
                ⭐ {doctor?.averageRating} ({doctor?.totalRating})
              </p>
            </div>
            <Link to={`/doctors/${doctor?._id}`}>
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Doctors;
