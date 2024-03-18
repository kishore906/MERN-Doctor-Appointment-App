import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../redux/api/userApi";

function Header() {
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light py-3 fixed-top"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h3>🏥Medicare</h3>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <h6>Home</h6>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/doctors" className="nav-link">
                <h6>Find a Doctor</h6>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                <h6>Contact</h6>
              </Link>
            </li>
            {!isLoading && !user && (
              <>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="btn btn-primary px-3 me-2 mb-2 rounded-pill"
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="btn btn-primary px-4 rounded-pill"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <Link
              to={
                user?.role === "user"
                  ? "/users/profile/me"
                  : "/doctors/profile/me"
              }
            >
              <img
                src={
                  user?.photo ? user?.photo?.url : "/images/default_avatar.jpg"
                }
                className="nav_profile_img"
                alt="profile_img"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
