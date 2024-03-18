function Contact() {
  return (
    <div className="mt-5 w-50 mx-auto">
      <h4 className="mb-5 text-center">Contact Us</h4>

      <form>
        <label htmlFor="fullName" className="form-label fw-bold">
          FullName:
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-control mb-3"
          required
        />

        <label htmlFor="email" className="form-label fw-bold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control mb-3"
          required
        />

        <label htmlFor="message" className="form-label fw-bold">
          Message:
        </label>
        <textarea
          rows={10}
          cols={50}
          className="form-control mb-3"
          required
        ></textarea>

        <button className="btn btn-primary rounded-pill d-block mx-auto px-4">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
