import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer py-5">
      <div className="container">
        <div className="row g-3">
          <div className="col-md-4">
            <h3>🏥Medicare</h3>
            <p className="my-4">
              Copyright &copy; 2025 Medicare, All Rights Reserved.
            </p>
            <div>
              <i className="bi bi-facebook me-4 fs-4"></i>
              <i className="bi bi-instagram me-4 fs-4"></i>
              <i className="bi bi-twitter-x me-4 fs-4"></i>
              <i className="bi bi-linkedin me-4 fs-4"></i>
            </div>
          </div>
          <div className="col-md-3">
            <h4 className="mb-4">Quick Links</h4>
            <Link to="/">Home</Link>
            <br />
            <Link to="/">Services</Link>
            <br />
            <Link to="/">Doctors</Link>
          </div>
          <div className="col-md-3">
            <h4 className="mb-4">I want to</h4>
            <Link to="/">Find a Doctor</Link>
            <br />
            <Link to="/">Find an Appointment</Link>
            <br />
            <Link to="/">Find a Location</Link>
          </div>
          <div className="col-md-2">
            <h4 className="mb-4">Support</h4>
            <Link to="/">Contact Us</Link>
            <br />
            <Link to="/">Donate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
