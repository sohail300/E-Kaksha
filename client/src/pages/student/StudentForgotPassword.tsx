import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const ForgotPassword = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic here to handle the forgot password request
    // For example:
    // try {
    //   await api.post('/forgot-password', { email });
    //   // Handle success (e.g., show a message, navigate to a confirmation page)
    // } catch (error) {
    //   // Handle error
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:px-8 lg:px-24 bg-white w-full min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 space-y-6 sm:space-y-8 rounded-lg shadow-md border border-black flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-100"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl text-center">
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
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full transition duration-300"
        >
          Send Mail
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
