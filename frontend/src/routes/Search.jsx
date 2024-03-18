import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useGetDoctorsByProfessionMutation } from "../redux/api/doctorApi";
import Doctor from "../components/Doctor";
import Loader from "../components/Loader";

function Search() {
  const [search, setSearch] = useState("");

  const [getDoctorsByProfession, { isLoading, error, data }] =
    useGetDoctorsByProfessionMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (data?.doctors?.length === 0) {
      toast.success("No Doctor's Found With The Profession");
    }
  }, [error, data]);

  function handleSearch(e) {
    e.preventDefault();
    getDoctorsByProfession({ search });
    setSearch("");
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="search mx-auto w-50">
        <form className="d-flex justify-content-center" onSubmit={handleSearch}>
          <select
            className="form-control w-75"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          >
            <option value="">Choose Doctor:</option>
            <option value="Surgeon">Surgeon</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="General Practitioner">General Practitioner</option>
          </select>
          <button className="btn btn-primary ms-2">Search</button>
        </form>
      </div>

      {/* Displaying doctors */}
      <div className="d-flex justify-content-center justify-content-md-start align-items-center flex-wrap gap-5">
        {data?.doctors?.length > 0 &&
          data?.doctors.map((doctor) => (
            <Doctor doctor={doctor} key={doctor._id} />
          ))}
      </div>
    </>
  );
}

export default Search;
