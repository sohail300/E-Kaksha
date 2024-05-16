import VerifiedIcon from "@mui/icons-material/Verified";
import imagepath from "../../assets/images/notebook.png";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseURL } from "../../utils/config.js";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = axios.create({
    baseURL,
  });

  async function buyCourse() {}

  useEffect(() => {
    // buyCourse();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 px-24 bg-white rounded w-full pt-28 h-screen">
      <h1 className="text-center text-5xl font-bold text-green-500 mb-4">
        Payment Successful!
      </h1>
      <img src={imagepath} alt="image" className="h-80 my-8" />

      <button
        className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 mt-8"
        onClick={() => navigate("/student/purchased-courses")}
      >
        View Purchased Courses
      </button>
    </div>
  );
};

export default PaymentSuccess;
