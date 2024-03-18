import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="row align-items-center g-3 mt-5">
      <div className="col-md-6">
        <h1>
          We help patients to <br /> live a healthy, <br /> longer life.
        </h1>
        <p className="lead my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, ut
          repellendus itaque eius nemo nam modi eaque, corrupti nesciunt
          expedita quibusdam excepturi voluptatum temporibus quas laudantium
          enim? Molestias, ipsum earum?
        </p>
        <Link to="/doctors">
          <button className="btn btn-primary btn-lg rounded-pill px-4">
            Request an Appointment
          </button>
        </Link>
      </div>
      <div className="col-md-6">
        <img
          src="/images/hero-img.jpg"
          className="img-fluid rounded"
          alt="main_img"
        />
      </div>
    </div>
  );
}

export default Hero;
