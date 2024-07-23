import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { isUserLoggedInState } from "../../store/atoms/user.js";
import { api } from "../../utils/config.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  async function handleLogin() {
    try {
      const response = await api.post("/student/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsUserLoggedIn(true);
      navigate("/all-courses");
    } catch (error) {
      console.error("Signup failed:", error);
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
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Log In</h1>
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
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-gray-700 text-sm transition duration-300 ease-in-out"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              className="w-full bg-[#1f2937] hover:bg-[#374151]  text-white rounded-lg px-4 py-3 transition-all duration-300 ease-in-out  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-105"
              onClick={handleLogin}
            >
              Log In
            </button>
          </motion.div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-6">
          Haven't registered yet?{" "}
          <Link
            to="/student/register"
            className="font-medium text-blue-600 hover:text-purple-500 transition-colors duration-300 ease-in-out"
          >
            Sign up
          </Link>
        </div>
        <Link
          to="/student/forgot-password"
          className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300 ease-in-out text-sm"
        >
          Forgot Password
        </Link>
        <div
          className="cursor-pointer mt-6 text-center text-xs text-gray-500"
          onClick={() => {
            console.log("running");
            setEmail("stud1@gmail.com");
            setPassword("stud123");
          }}
        >
          <p className="text-gray-500 text-sm mb-1">
            Login Credentials for trial (click to copy)
          </p>
          <p className="text-gray-500 text-sm">
            Email: <b>stud1@gmail.com</b> & Password: <b>stud123</b>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
