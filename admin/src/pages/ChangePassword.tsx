import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api } from "../utils/config";

const StudentChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  async function handleSubmit() {
    try {
      console.log(email);
      const response = await api.post("/admin/verify-token", {
        token,
        email,
        password,
      });
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:px-8 lg:px-24 bg-white w-full min-h-screen">
      <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 rounded-lg shadow-md border border-black flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl text-center">
          Reset Password
        </h1>

        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          size="small"
          required
        />

        <button
          onClick={() => handleSubmit()}
          className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full transition duration-300"
        >
          Set New Password
        </button>
      </div>
    </div>
  );
};

export default StudentChangePassword;
