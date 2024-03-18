import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorOverview from "../components/DoctorOverview";
import DoctorAppointments from "../components/DoctorAppointments";
import UpdateDoctorProfile from "../components/UpdateDoctorProfile";
import UpdatePassword from "../components/UpdatePassword";
import UpdatePhoto from "../components/UpdatePhoto";
import { useDeleteUserMutation } from "../redux/api/userApi";
import { useLazyLogoutQuery } from "../redux/api/authApi";
import { setUser, setIsAuthenticated } from "../redux/features/userSlice";

function DoctorUpdateProfileLayout() {
  const [isOpen, setIsOpen] = useState("Overview");
  const { user } = useSelector((state) => state.auth);

  const [logout, { isSuccess, data }] = useLazyLogoutQuery();

  const [
    deleteUser,
    {
      isLoading: isDeleteLoading,
      error: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(data?.message);
  //     //dispatch(setUser(null));
  //     //dispatch(setIsAuthenticated(false));
  //     //navigate(0);
  //   }
  // }, [isSuccess, data, navigate]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (deleteSuccess) {
      toast.success("Profile Deleted Successfully");
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      navigate("/");
    }
  }, [deleteError, deleteSuccess, navigate, dispatch]);

  function handleOpen(e) {
    setIsOpen(e.target.textContent);
  }

  function handleLogout() {
    logout();
    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
    navigate("/");
  }

  function handleDeleteProfile() {
    const confirmDelete = window.confirm(
      "Are You Sure You Want To Delete Your profile 🤔"
    );
    if (confirmDelete) deleteUser();
  }

  return (
    <div className="row justify-content-center g-4 my-5">
      <div className="col-md-3 text-center p-4 shadow bg-body rounded h-50">
        <div>
          <button
            type="button"
            className="btn btn-outline-info w-75 mb-4"
            onClick={handleOpen}
          >
            Overview
          </button>
          <br />
          <button
            type="button"
            className="btn btn-outline-info w-75 mb-4"
            onClick={handleOpen}
          >
            Appointments
          </button>
          <br />
          <button
            type="button"
            className="btn btn-outline-info w-75 mb-4"
            onClick={handleOpen}
          >
            Update Profile
          </button>
          <button
            type="button"
            className="btn btn-outline-info w-75 mb-4"
            onClick={handleOpen}
          >
            Update Password
          </button>
          <button
            type="button"
            className="btn btn-outline-info w-75 mb-4"
            onClick={handleOpen}
          >
            Update Photo
          </button>
        </div>
        <button className="btn btn-dark mt-5" onClick={handleLogout}>
          Logout
        </button>
        <br />
        <br />
        <button
          className="btn btn-danger"
          disabled={isDeleteLoading}
          onClick={handleDeleteProfile}
        >
          Delete Profile
        </button>
      </div>

      <div className="col-md-6 ps-md-5">
        {isOpen === "Overview" && <DoctorOverview user={user} />}
        {isOpen === "Appointments" && <DoctorAppointments />}
        {isOpen === "Update Profile" && <UpdateDoctorProfile />}
        {isOpen === "Update Password" && <UpdatePassword />}
        {isOpen === "Update Photo" && <UpdatePhoto />}
      </div>
    </div>
  );
}

export default DoctorUpdateProfileLayout;
