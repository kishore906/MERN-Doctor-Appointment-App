import { Link } from "react-router-dom";

function Doctor({ doctor }) {
  return (
    <div style={{ width: "240px" }}>
      <img
        src={doctor?.photo ? doctor?.photo?.url : "/images/default_avatar.jpg"}
        className="w-100"
        alt="doctor_img"
      />
      <h5 className="my-4">Dr. {doctor?.fullName}</h5>
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
  );
}

export default Doctor;
