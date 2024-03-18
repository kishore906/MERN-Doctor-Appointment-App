import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateProfileMutation } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UpdateDoctorProfile() {
  const { user } = useSelector((state) => state.auth);

  const data = {
    fullName: user?.fullName,
    email: user?.email,
    bio: user?.bio,
    gender: user?.gender,
    consultationPrice: user?.consultationPrice,
    profession: user?.profession,
    specialization: user?.specialization,
    qualifications: user?.qualifications, // { courseStartDate: "", courseEndDate: "", degree: "", university: "" }
    experiences: user?.experiences, // { startDate: "", endDate: "", position: "", company: "" }
    timeSlots: user?.timeSlots, // { date: "", startTime: "", endTime: "" }
  };

  const [formData, setFormData] = useState(data);

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Details Updated Successfully");
      navigate("/doctors/profile/me");
    }
  }, [error, isSuccess, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // reusable function for adding formData's qualifications, experiences, timeSlots object
  function addItem(key, item) {
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key], item],
    }));
  }

  // Reusable input change function
  // 'key' can be = 'qualifications', 'experiences', 'timeSlots'
  // 'index' is element of the selected key
  function handleResuableInputChange(key, index, event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      //const updateItems = [...prevData[key]];
      //updateItems[index][name] = value; // updating object properties

      return {
        ...prevData,
        [key]: prevData[key].map((obj, i) =>
          i === index ? { ...obj, [name]: value } : obj
        ),
      };
    });
  }

  // Reusable delete function
  function deleteItem(key, index) {
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key].filter((_, i) => i !== index)],
    }));
  }

  // function to add new qualification
  function addQualification(e) {
    e.preventDefault();
    addItem("qualifications", {
      courseStartDate: "",
      courseEndDate: "",
      degree: "",
      university: "",
    });
  }

  // function to add new experience
  function addExperience(e) {
    e.preventDefault();
    addItem("experiences", {
      startDate: "",
      endDate: "",
      position: "",
      company: "",
    });
  }

  // function to add new timeSlot
  function addTimeSlot(e) {
    e.preventDefault();
    addItem("timeSlots", { date: "", startTime: "00:00", endTime: "00:00" });
  }

  const handleQualificationChange = (event, index) => {
    handleResuableInputChange("qualifications", index, event);
  };

  const handleExperienceChange = (event, index) => {
    handleResuableInputChange("experiences", index, event);
  };

  const handleTimeSlotChange = (event, index) => {
    handleResuableInputChange("timeSlots", index, event);
  };

  const deleteQualifications = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const deleteExperiences = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const deleteTimeSlots = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile(formData);
  }

  return (
    <div>
      <h4 className="mb-3">Update Profile</h4>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="fullName" className="form-label fw-bold">
            FullName
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label htmlFor="bio" className="form-label fw-bold">
            Bio
          </label>
          <input
            type="text"
            className="form-control"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="gender" className="form-label fw-bold">
            Gender
          </label>
          <select
            id="gender"
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="consultationPrice" className="form-label fw-bold">
            Consultation Price
          </label>
          <input
            type="number"
            className="form-control"
            id="consultationPrice"
            name="consultationPrice"
            value={formData.consultationPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="profession" className="form-label fw-bold">
            Profession
          </label>
          <select
            id="profession"
            className="form-select"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          >
            <option value="Surgeon">Surgeon</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="General Practitioner">General Practitioner</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="specialization" className="form-label fw-bold">
            Specialized In
          </label>
          <select
            id="specialization"
            className="form-select"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option value="Heart">Heart</option>
            <option value="Neurology">Neurology</option>
            <option value="Lungs">Lungs</option>
            <option value="Skin">Skin</option>
            <option value="Teeth">Teeth</option>
            <option value="Bones">Bones</option>
            <option value="General Care">General Care</option>
          </select>
        </div>

        {/* Qualifications */}
        <label className="fw-bold">Qualifications</label>
        <div>
          {formData.qualifications?.map((item, index) => (
            <div className="mb-3" key={index}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="courseStartDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="courseStartDate"
                    name="courseStartDate"
                    value={
                      item.courseStartDate
                        ? new Date(item.courseStartDate)
                            .toISOString()
                            .slice(0, 10)
                        : ""
                    }
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="courseEndDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="courseEndDate"
                    name="courseEndDate"
                    value={
                      item.courseEndDate
                        ? new Date(item.courseEndDate)
                            .toISOString()
                            .slice(0, 10)
                        : ""
                    }
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="degree" className="form-label">
                    Degree
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="degree"
                    name="degree"
                    value={item.degree}
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="university" className="form-label">
                    University
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="university"
                    name="university"
                    value={item.university}
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
              </div>

              <button
                className="px-2 my-2 btn btn-danger"
                onClick={(e) => deleteQualifications(e, index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}

          <button className="btn btn-dark" onClick={addQualification}>
            Add Qualification
          </button>
        </div>

        {/* Experiences */}
        <label className="fw-bold">Experiences</label>
        <div>
          {formData.experiences?.map((item, index) => (
            <div className="mb-3" key={index}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={
                      item.startDate
                        ? new Date(item.startDate).toISOString().slice(0, 10)
                        : ""
                    }
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={
                      item.endDate
                        ? new Date(item.endDate).toISOString().slice(0, 10)
                        : ""
                    }
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="position" className="form-label">
                    Position
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    name="position"
                    value={item.position}
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="company" className="form-label">
                    University/Company
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    value={item.company}
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>
              </div>

              <button
                className="px-2 my-2 btn btn-danger"
                onClick={(e) => deleteExperiences(e, index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}

          <button className="btn btn-dark" onClick={addExperience}>
            Add Experience
          </button>
        </div>

        {/* TimeSlots */}
        <label className="fw-bold">Time Slots</label>
        <div>
          {formData.timeSlots?.map((item, index) => (
            <div className="mb-3" key={index}>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="form-control"
                    value={
                      item.date
                        ? new Date(item.date).toISOString().slice(0, 10)
                        : ""
                    }
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="startTime" className="form-label">
                    Starting Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    className="form-control"
                    name="startTime"
                    value={item.startTime.split(" ")[0]}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="endTime" className="form-label">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    name="endTime"
                    value={item.endTime.split(" ")[0]}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  />
                </div>
              </div>

              <button
                className="px-2 btn btn-danger"
                onClick={(e) => deleteTimeSlots(e, index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}

          <button className="btn btn-dark" onClick={addTimeSlot}>
            Add TimeSlot
          </button>
        </div>

        <button
          className="btn btn-primary w-25 d-block mx-auto"
          disabled={isLoading}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UpdateDoctorProfile;
