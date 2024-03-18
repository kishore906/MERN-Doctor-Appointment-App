import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import UserBookings from "../components/UserBookings";
import UpdateUserProfile from "../components/UpdateUserProfile";
import UpdatePhoto from "../components/UpdatePhoto";
import UpdatePassword from "../components/UpdatePassword";
import { useLazyLogoutQuery } from "../redux/api/authApi";
import { useDeleteUserMutation } from "../redux/api/userApi";
import { setUser, setIsAuthenticated } from "../redux/features/userSlice";

function UserProfileLayout() {
  const [isOpen, setIsOpen] = useState("My Appointments");
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
  //     dispatch(setUser(null));
  //     dispatch(setIsAuthenticated(false));
  //     navigate("/");
  //   }
  // }, [isSuccess, data, dispatch, navigate]);

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

  function handleIsOpen(e) {
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
      "Are You Sure You Want To Delete Your Profile 🤔"
    );
    if (confirmDelete) deleteUser();
  }

  return (
    <div className="row justify-content-center g-3 my-5">
      <div className="col-md-4 text-center">
        <div>
          <img
            src={user?.photo ? user?.photo?.url : "/images/default_avatar.jpg"}
            className="w-25 rounded-circle border border-light border-4"
            alt="profile_img"
          />
          <h5 className="mt-3">{user?.fullName}</h5>
          <p>{user?.email}</p>
          <p>
            Blood Group: <b>{user?.bloodGroup}</b>
          </p>
        </div>
        <button className="btn btn-dark mt-4" onClick={handleLogout}>
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

      <div className="col-md-6">
        <button className="btn btn-outline-primary me-3" onClick={handleIsOpen}>
          My Appointments
        </button>
        <button className="btn btn-outline-primary me-3" onClick={handleIsOpen}>
          Settings
        </button>
        <button className="btn btn-outline-primary me-3" onClick={handleIsOpen}>
          Change Photo
        </button>
        <button className="btn btn-outline-primary" onClick={handleIsOpen}>
          Update Password
        </button>

        {isOpen === "My Appointments" && <UserBookings />}
        {isOpen === "Settings" && <UpdateUserProfile user={user} />}
        {isOpen === "Change Photo" && <UpdatePhoto />}
        {isOpen === "Update Password" && <UpdatePassword />}
      </div>
    </div>
  );
}

export default UserProfileLayout;
