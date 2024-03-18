import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUploadPhotoMutation } from "../redux/api/userApi";

function UpdatePhoto() {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState(
    user?.photo ? user?.photo?.url : "/images/default_avatar.jpg"
  );

  const navigate = useNavigate();

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadPhotoMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Photo Uploaded Successfully");
      navigate(role === "user" ? "/users/profile/me" : "/doctors/profile/me");
    }
  }, [error, isSuccess, role, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      photo,
    };

    // console.log(userData);

    uploadAvatar(userData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      // readyStatus === 2 means file reading is successful
      if (reader.readyState === 2) {
        setPhotoPreview(reader.result);
        setPhoto(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">Update Photo</h4>

      <form
        className="d-flex align-items-center mb-3 w-75"
        onSubmit={submitHandler}
      >
        <img
          src={photoPreview}
          alt="preview_img"
          className="rounded-circle me-3"
          style={{ width: "50px", height: "50px" }}
        />
        <input
          type="file"
          className="form-control"
          name="photo"
          accept="images/*"
          onChange={onChange}
          required
        />
        <button className="btn btn-primary ms-3" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePhoto;
