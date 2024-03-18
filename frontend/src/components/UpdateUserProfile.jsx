import { useEffect, useState } from "react";
import { useUpdateProfileMutation } from "../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UpdateUserProfile({ user }) {
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup);
  const [gender, setGender] = useState(user?.gender);

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Profile Updated Successfully");
      navigate("/users/profile/me");
    }
  }, [error, isSuccess, navigate]);

  function handleUpdate(e) {
    e.preventDefault();
    const updatedUser = { fullName, email, bloodGroup, gender };
    updateProfile(updatedUser);
  }

  return (
    <form className="mt-5" onSubmit={handleUpdate}>
      <h4 className="mb-3">Profile Settings</h4>

      <input
        type="text"
        name="fullName"
        className="form-control mb-3 w-75"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <input
        type="email"
        name="email"
        className="form-control mb-3 w-75"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        name="bloodgroup"
        className="form-control mb-3 w-75"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        required
      />

      <label htmlFor="gender" className="form-label">
        Gender:
      </label>
      <select
        id="gender"
        className="form-select mb-3 w-75"
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <button className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}

export default UpdateUserProfile;
