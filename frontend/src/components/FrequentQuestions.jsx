function FrequentQuestions() {
  return (
    <div className="row my-5 align-items-center">
      <div className="d-none col-md d-md-block text-center">
        <img src="/images/faq-img.png" alt="img" style={{ height: "400px" }} />
      </div>

      <div className="col-md">
        <h3 className="mb-5">Most asked questions by our patients</h3>

        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                What is your medical care?
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                One Medical was founded on a better model of care one designed
                around patients needs that provides a higher level of quality
                and service affordably. We do this through innovative design,
                excellent customer service, and the efficient use of technology.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                What happens if I need to go a hospital?
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                One Medical was founded on a better model of care one designed
                around patients needs that provides a higher level of quality
                and service affordably. We do this through innovative design,
                excellent customer service, and the efficient use of technology.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Can I visit your medical office?
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                One Medical was founded on a better model of care one designed
                around patients needs that provides a higher level of quality
                and service affordably. We do this through innovative design,
                excellent customer service, and the efficient use of technology.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour"
              >
                Does you provide urgent care?
              </button>
            </h2>
            <div
              id="flush-collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFour"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                One Medical was founded on a better model of care one designed
                around patients needs that provides a higher level of quality
                and service affordably. We do this through innovative design,
                excellent customer service, and the efficient use of technology.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFive"
                aria-expanded="false"
                aria-controls="flush-collapseFive"
              >
                Does you provide urgent care?
              </button>
            </h2>
            <div
              id="flush-collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFive"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                One Medical was founded on a better model of care one designed
                around patients needs that provides a higher level of quality
                and service affordably. We do this through innovative design,
                excellent customer service, and the efficient use of technology.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrequentQuestions;
