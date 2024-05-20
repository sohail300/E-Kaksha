import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
    <div className="flex flex-col items-center p-6 px-24 bg-white rounded w-full pt-28 h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-center text-5xl font-bold text-black mb-4">
            Profile
          </h1>

          <div className="flex flex-row justify-around w-full mt-16">
            <div className="flex flex-col justify-between items-center ">
              <div className="rounded-full w-32 h-32 object-cover border border-black"></div>
              {/* <img
                className="rounded-full w-32 h-32 object-cover"
                src={photourl}
                alt="photo"
              /> */}
              <button className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full ">
                UPLOAD
                <input type="file" hidden onChange={(e) => handleUpload(e)} />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4 ">
              <div className="flex justify-between w-full items-center ">
                <TextField
                  label="Name"
                  size="small"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  className="w-full"
                />
                <button className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full ml-16">
                  UPDATE
                </button>
              </div>

              <div className="flex justify-between items-center w-full mb-4">
                <TextField
                  label="Email"
                  size="small"
                  variant="outlined"
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  className="w-full"
                />
                <button className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full ml-16">
                  CHANGE
                </button>
              </div>

              <div className="flex justify-between w-full items-center mb-4">
                <button className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full ml-16">
                  CHANGE PASSWORD
                </button>
              </div>

              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full">
                DELETE ACCOUNT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
