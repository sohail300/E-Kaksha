import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../utils/config";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    try {
      const response = await api.post("/admin/send-token", { email });
      console.log(response);

      if (response) {
        alert("Email sent!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 py-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Forgot Password
          </h1>
        </div>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-gray-700 text-sm transition duration-300 ease-in-out"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              className="w-full bg-[#1f2937] hover:bg-[#374151] text-white rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-105"
              onClick={handleSubmit}
            >
              Send Reset Link
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminForgotPassword;
