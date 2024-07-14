import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../utils/config.js";
import Loader from "../../components/Shimmer/Loader.js";

const Profile = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL,
  });

  async function getUser() {
    const response = await api.get("/student/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    console.log(response);
    setName(response.data.user.name);
    setEmail(response.data.user.email);
    setPhotourl(response.data.user.photoUrl);
    setId(response.data.user._id);
    setIsLoading(false);
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.put(
      "/student/profile/photo",
      { formData },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6 lg:p-8 mt-28">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-indigo-600 md:w-48 flex flex-col items-center justify-center p-8">
              <div className="rounded-full w-32 h-32 bg-white border-4 border-indigo-300 overflow-hidden mb-4">
                {photourl ? (
                  <img
                    src={photourl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Photo
                  </div>
                )}
              </div>
              <label className="bg-white text-indigo-600 px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-indigo-100 transition duration-300">
                Upload Photo
                <input type="file" hidden onChange={handleUpload} />
              </label>
            </div>
            <div className="p-8 md:p-12 w-full">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 flex-grow"
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300">
                    Update
                  </button>
                </div>
                <div>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={email}
                    className="bg-gray-50"
                  />
                </div>
                <button className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 transition duration-300 w-full">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
