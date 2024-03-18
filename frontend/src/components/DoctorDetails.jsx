import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCanUserReviewQuery,
  useSubmitReviewMutation,
} from "../redux/api/doctorApi";

function DoctorDetails({ doctor }) {
  const [isOpen, setIsOpen] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { error, data } = useCanUserReviewQuery(doctor._id);
  const canReview = data?.canReview;
  console.log(canReview);

  const [submitReview, { error: reviewError, isSuccess }] =
    useSubmitReviewMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Submitted Successfully");
    }
  }, [reviewError, isSuccess]);

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    const reviewObj = { doctorId: doctor?._id, rating, comment };
    submitReview(reviewObj);
    setRating(0);
    setComment("");
  }

  return (
    <div style={{ width: "100%", maxWidth: "700px" }}>
      <div className="d-flex align-items-center gap-3">
        <img
          src={
            doctor?.photo ? doctor?.photo?.url : "/images/default_avatar.jpg"
          }
          alt="doc_img"
          style={{ width: "200px", height: "200px" }}
        />
        <div>
          <p className="btn btn-light profession">{doctor?.profession}</p>
          <h4 className="my-2">Dr. {doctor?.fullName}</h4>
          <p>
            ⭐ {doctor?.averageRating} ({doctor?.totalRating})
          </p>
          <p className="my-2 fw-bold">
            Specialization in {doctor?.specialization}
          </p>
        </div>
      </div>

      <ul className="nav nav-tabs mt-5">
        <li className="nav-item">
          <div
            className={`nav-link text-decoration-none text-dark ${
              isOpen && "active"
            }`}
            onClick={handleOpen}
          >
            About
          </div>
        </li>
        <li className="nav-item">
          <div
            className={`nav-link text-decoration-none text-dark ${
              !isOpen && "active"
            }`}
            onClick={handleOpen}
          >
            Reviews
          </div>
        </li>
      </ul>

      {/* About & Reviews */}
      {isOpen ? (
        <div className="mt-4">
          <h5>
            About <span>Dr. {doctor?.fullName}</span>
          </h5>
          <p className="fw-light">{doctor?.bio}</p>

          <h5 className="my-4">Education:</h5>
          <div>
            {doctor?.qualifications?.map((qualification) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light"
                  key={qualification._id}
                >
                  <div>
                    <p className="text-primary">
                      {new Date(qualification?.courseStartDate)
                        .getFullYear()
                        .toString()}
                      -
                      {new Date(qualification?.courseEndDate)
                        .getFullYear()
                        .toString()}
                    </p>
                    <p style={{ fontWeight: "500" }}>{qualification?.degree}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "500" }}>
                      {qualification?.university}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <h5 className="my-4">Experience:</h5>
          <div className="d-flex gap-3">
            {doctor?.experiences?.map((exp) => {
              return (
                <div className="p-3 bg-light w-50 lh-1" key={exp._id}>
                  <p className="text-primary">
                    {new Date(exp?.startDate).getFullYear().toString()}-
                    {new Date(exp?.endDate).getFullYear().toString()}
                  </p>
                  <p className="fw-bold fs-5">{exp.position}</p>
                  <p className="fst-italic fw-light">{exp.company}</p>
                </div>
              );
            })}
          </div>

          {!isAuthenticated && (
            <div className="alert alert-info mt-4 text-center" role="alert">
              Please <Link to="/register">Register</Link> or{" "}
              <Link to="/login">Login</Link> To Get Information On Appointments
            </div>
          )}
        </div>
      ) : (
        <div className="mt-5">
          <h5 className="mb-4">
            All Reviews ⭐ {doctor?.averageRating} ({doctor?.totalRating})
          </h5>
          {doctor?.reviews.map((review) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2 w-75">
                  <img
                    src={
                      review?.user?.photo
                        ? review?.user?.photo?.url
                        : "/images/default_avatar.jpg"
                    }
                    alt="reviewer_img"
                    className="rounded-circle"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div>
                    <span className="fw-bold">{review?.user?.fullName}</span>
                    <br />
                    <span>{review?.comment}</span>
                    <br />
                    <span className="fw-light">
                      <i>{new Date(review?.reviewDate)?.toDateString()}</i>
                    </span>
                  </div>
                </div>
                <StarRatings
                  rating={review?.rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  starDimension="18px"
                  starSpacing="1px"
                />
              </div>
            );
          })}

          {isAuthenticated && canReview && (
            <form className="mt-5" onSubmit={handleReviewSubmit}>
              <p>How would you rate your overall experience?</p>
              <StarRatings
                rating={rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="18px"
                starSpacing="1px"
                changeRating={(e) => setRating(e)}
              />
              <br />
              <br />

              <label htmlFor="comment" className="form-label">
                Share your feedback or suggestions
              </label>
              <textarea
                rows={10}
                cols={92}
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <button className="btn btn-primary rounded-pill px-4 d-block mx-auto my-5">
                Give Review
              </button>
            </form>
          )}

          {!isAuthenticated && (
            <div className="alert alert-info mt-4" role="alert">
              Please Login To Give Rating & Review &nbsp;
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DoctorDetails;
