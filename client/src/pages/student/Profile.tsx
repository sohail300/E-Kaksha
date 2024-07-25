import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, UserX } from "lucide-react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TextField from "@mui/material/TextField";
import { api } from "../../utils/config.js";
import Loader from "../../components/Shimmer/Loader.js";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert] = useState(null);

  const navigate = useNavigate();

  async function handleUpload(e) {
    try {
      setIsLoading(true);

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);

      const response = await api.post("/student/profile/photo", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        console.log(response.data);
        getUser();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteUser() {
    try {
      setIsLoading(true);

      const response = await api.delete("/student/delete", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response) {
        console.log(response.data);
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeName() {
    try {
      setIsLoading(true);
      const response = await api.put(
        "/student/change-name",
        {
          name,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        console.log(response.data);
        getUser();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getUser() {
    try {
      setIsLoading(true);
      const response = await api.get("/student/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(response);
      setName(response.data.user.name);
      setEmail(response.data.user.email);
      setPhotourl(response.data.user.photoUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getProfile() {
    try {
      await api.get("/student/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      navigate("/student/login");
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getProfile();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <motion.div
        className="z-10 max-w-4xl w-full bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-indigo-600 md:w-48 flex flex-col items-center justify-center p-8">
            <motion.div
              className="relative rounded-full w-32 h-32 bg-white border-4 border-indigo-300 overflow-hidden mb-4 group"
              whileHover={{ scale: 1.05 }}
            >
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
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="text-white" size={24} />
              </div>
            </motion.div>
            <label className="bg-white text-indigo-600 px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-indigo-100 transition duration-300">
              Upload Photo
              <input
                type="file"
                hidden
                onChange={handleUpload}
                accept="image/*"
              />
            </label>
          </div>
          <div className="p-8 md:p-12 w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
            {alert && (
              <Alert severity={alert.severity} className="mb-4">
                <AlertTitle>
                  {alert.severity === "error" ? "Error" : "Success"}
                </AlertTitle>
                {alert.message}
              </Alert>
            )}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white flex-grow"
                />
                <motion.button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
                  onClick={handleChangeName}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Update
                </motion.button>
              </div>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                disabled
                value={email}
                className="bg-white"
              />
              <motion.button
                className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 transition duration-300 w-full flex items-center justify-center space-x-2"
                onClick={handleDeleteUser}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserX size={20} />
                <span>Delete Account</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
