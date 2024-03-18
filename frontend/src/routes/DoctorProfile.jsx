import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useGetDoctorQuery } from "../redux/api/doctorApi";
import DoctorDetails from "../components/DoctorDetails";
import DoctorTimings from "../components/DoctorTimings";

function DoctorProfile() {
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const { isLoading, error, data } = useGetDoctorQuery(id);
  const doctor = data?.doctor;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <div className="d-flex justify-content-center flex-column-reverse flex-md-row gap-3 mt-5">
      <DoctorDetails doctor={doctor} />
      {user?.role === "user" && <DoctorTimings doctor={doctor} />}
    </div>
  );
}

export default DoctorProfile;
