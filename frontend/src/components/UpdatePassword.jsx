import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "../redux/api/userApi";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const [updatePassword, { isLoading, error, isSuccess, data }] =
    useUpdatePasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success(data?.message);
      navigate(role === "user" ? "/users/profile/me" : "/doctors/profile/me");
    }
  }, [error, isSuccess, data, role, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    const pswdDetails = { oldPassword, password };
    updatePassword(pswdDetails);
    setOldPassword("");
    setPassword("");
  }

  return (
    <div className="mt-5">
      <h4 className="mb-3">Update Password</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          className="form-control mb-3 w-75"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3 w-75"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
