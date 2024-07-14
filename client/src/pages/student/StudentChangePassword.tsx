import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const StudentChangePassword = () => {
  // const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your logic here to handle the password reset
    // For example:
    // try {
    //   // Assume you have a reset token in the URL or stored somewhere
    //   const resetToken = new URLSearchParams(window.location.search).get('token');
    //   await api.post('/reset-password', { resetToken, newPassword });
    //   // Handle success (e.g., show a message, navigate to login page)
    //   navigate('/login');
    // } catch (error) {
    //   setError("Failed to reset password. Please try again.");
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:px-8 lg:px-24 bg-white w-full min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 space-y-6 sm:space-y-8 rounded-lg shadow-md border border-black flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-100"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl text-center">
          Reset Password
        </h1>

        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          className="w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          size="small"
          required
        />

        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full transition duration-300"
        >
          Set New Password
        </button>
      </form>
    </div>
  );
};

export default StudentChangePassword;
