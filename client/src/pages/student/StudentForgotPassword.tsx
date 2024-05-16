import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseURL } from "../../utils/config.js";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const api = axios.create({
    baseURL,
  });

  return (
    <div className=" flex flex-col items-center justify-center p-6 px-24 bg-white w-full pt-28 h-screen">
      <div className="p-8 space-y-8 rounded-lg shadow-md border border-black flex flex-col items-center w-1/4 bg-gray-100">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl ">
          Verify OTP
        </h1>

        <TextField
          label="OTP"
          variant="outlined"
          className=" w-full"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          autoComplete="off"
          size="small"
        />
        <button className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full ">
          VERIFY OTP
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
