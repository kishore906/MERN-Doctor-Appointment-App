function DoctorOverview({ user }) {
  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <img
          src={user?.photo ? user?.photo?.url : "/images/default_avatar.jpg"}
          alt="doc_img"
          style={{ width: "200px", height: "200px" }}
        />
        <div>
          <p className="btn btn-light profession">{user?.profession}</p>
          <h4 className="my-2">Dr. {user?.fullName}</h4>
          <p>
            ⭐ {user?.averageRating} ({user?.totalRating})
          </p>
          <p className="my-2">Specialization in {user?.specialization}</p>
        </div>
      </div>

      {/* About */}
      <div className="mt-4">
        <h5>
          About <span>Dr. {user?.fullName}</span>
        </h5>
        <p className="fw-light">{user?.bio}</p>

        <h5 className="my-4">Education:</h5>
        {user?.qualifications?.map((qualification) => {
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
                <p style={{ fontWeight: "500" }}>{qualification?.university}</p>
              </div>
            </div>
          );
        })}

        <h5 className="my-4">Experience:</h5>
        <div className="d-flex gap-3">
          {user?.experiences?.map((exp) => {
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
      </div>
    </div>
  );
}

export default DoctorOverview;
