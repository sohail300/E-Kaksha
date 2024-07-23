import { useState } from "react";
import TextField from "@mui/material/TextField";
import { api } from "../../utils/config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    try {
      const response = await api.post("/student/send-token", { email });
      console.log(response);

      if (response) {
        alert("Email sent!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:px-8 lg:px-24 bg-white w-full min-h-screen">
      <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 rounded-lg shadow-md border border-black flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-100">
        <h1 className="text-3xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-center">
          Forgot Password
        </h1>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          size="small"
          required
        />
        <button
          className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full transition duration-300"
          onClick={() => handleSubmit()}
        >
          Send Mail
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
