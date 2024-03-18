import { useState, useEffect } from "react";
import { useRegisterMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Account Created Successfully");
      navigate("/");
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isAuthenticated, error, navigate, isSuccess]);

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      // readyStatus === 2 means file reading is successful
      if (reader.readyState === 2) {
        setPhotoPreview(reader.result);
        setPhoto(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  function handleRegister(e) {
    e.preventDefault();

    const user = { fullName, email, password, role, gender, photo };

    register(user);
  }

  return (
    <div className="row justify-content-center my-5">
      <div className="col-md-6 text-center">
        <img src="/images/login.jpg" className="w-75" alt="register_img" />
      </div>
      <form className="col-md-6" onSubmit={handleRegister}>
        <h3 className="mb-4">
          Create an <span style={{ color: "#9195F6" }}>Account</span>
        </h3>

        <div className="mb-3 w-75">
          <label className="form-label fw-bold" htmlFor="fullName">
            FullName:
          </label>
          <input
            type="text"
            id="fullName"
            className="form-control"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 w-75">
          <label className="form-label fw-bold" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 w-75">
          <label className="form-label fw-bold" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-between gap-4 mb-4 w-75">
          <select
            className="form-select"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option>Are you a:</option>
            <option value="doctor">Doctor</option>
            <option value="user">User</option>
          </select>
          <select
            className="form-select"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option>Gender:</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4 w-75 d-flex">
          <img
            src={photoPreview}
            alt="preview_img"
            className="rounded-circle me-3"
            style={{ width: "36px", height: "36px" }}
          />
          <input
            type="file"
            name="photo"
            className="form-control"
            accept="images/*"
            onChange={onChange}
          />
        </div>

        <button
          className="btn btn-primary px-4 rounded-pill"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
