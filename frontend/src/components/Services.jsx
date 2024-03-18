import { Link } from "react-router-dom";

function Services() {
  return (
    <div className="mt-5">
      <h2 className="text-center">Providing The Best Medical Services</h2>
      <p className="text-center my-3 fw-lighter">
        World-class care for everyone. Our health system offers <br />
        unmatched, expert health care.
      </p>

      {/* Services Section */}
      <div className="row g-2 mt-3">
        <div className="col-md">
          <div className="text-center p-3">
            <img
              src="/images/icon01.png"
              className="img-fluid"
              alt="service1_img"
            />
            <h4 className="py-3">Find a Doctor</h4>
            <p className="fw-lighter">
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
        <div className="col-md text-center p-3">
          <div className="text-center p-3">
            <img
              src="/images/icon02.png"
              className="img-fluid"
              alt="service1_img"
            />
            <h4 className="py-3">Find a Location</h4>
            <p className="fw-lighter">
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
        <div className="col-md text-center p-3">
          <div className="text-center p-3">
            <img
              src="/images/icon03.png"
              className="img-fluid"
              alt="service1_img"
            />
            <h4 className="py-3">Book Appointment</h4>
            <p className="fw-lighter">
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Services sub-section */}
      <div className="row g-3 g-md-2 mt-5 align-items-center">
        <div className="col-md">
          <div className="position-relative">
            <img
              src="/images/doctor-img01.png"
              className="img-fluid"
              alt="sub_section_doctor_img"
            />
            <img
              src="/images/logo.png"
              className="position-absolute"
              style={{ left: "45%", bottom: "20%", height: "50px" }}
              alt="medicare_png"
            />
          </div>
        </div>
        <div className="col-md">
          <div>
            <h2>Proud to be one of the nations best</h2>
            <p className="fw-light my-3">
              For 30 years in a row, AUS News & World report has recognized us
              as one of the best public hospital in the nation and #1 in Sydney.{" "}
              <br /> <br />
              Our best is something we strive on each day is caring our
              patients-not looking back at what we accomplished but towards what
              we can do tomorrow. Providing the best medical care and
              facilities.
            </p>
            <button className="btn btn-primary rounded-pill px-3">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
