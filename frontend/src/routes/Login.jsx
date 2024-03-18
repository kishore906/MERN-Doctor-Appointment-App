import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, error, navigate]);

  function handleLogin(e) {
    e.preventDefault();

    const loginObj = { email, password };

    login(loginObj);
  }

  return (
    <div className="mt-5 mx-auto" style={{ width: "400px" }}>
      <form onSubmit={handleLogin}>
        <h4 className="text-center mb-4">Hi, Welcome back 👋</h4>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary px-4 rounded-pill"
          disabled={isLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
