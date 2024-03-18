import { Link } from "react-router-dom";

function MainServices() {
  return (
    <>
      <h2 className="text-center mt-5">Our Medical Services</h2>
      <p className="text-center my-3 fw-lighter">
        World-class care for everyone. Our health system offers <br />
        unmatched, expert health care.
      </p>

      <div className="row g-5 mt-3 text-center text-md-start">
        <div className="col-md-6 col-lg-4">
          <div>
            <h3>Cancer Care</h3>
            <p>
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to the clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div>
            <h3>Heart & Vascular</h3>
            <p>
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to the clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div>
            <h3>Mental Health</h3>
            <p>
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to the clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div>
            <h3>Neurology</h3>
            <p>
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to the clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div>
            <h3>Burn Treatment</h3>
            <p>
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to the clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div>
            <h3>Labor & Delivery</h3>
            <p>
              World-class care for everyone. Our health system offers <br />
              unmatched, expert health care from the lab to the clinic
            </p>
            <Link to="/">
              <i className="bi bi-arrow-right-circle fs-2 text-dark"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainServices;
