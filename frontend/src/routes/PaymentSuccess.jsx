import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="mt-5 mx-auto w-75 text-center">
      <i className="bi bi-check-circle-fill fs-1"></i>
      <h4 className="my-4">
        Thank You For The Payment, Booking IS Successful, <br />
        Please Check Your Email For Confirmation
      </h4>
      <Link to="/" className="btn btn-primary px-4 rounded-pill">
        Go To Home
      </Link>
    </div>
  );
}

export default PaymentSuccess;
