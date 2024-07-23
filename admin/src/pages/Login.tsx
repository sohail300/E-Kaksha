import { Link } from "react-router-dom";
import bgImage from "../assets/bg.jpg";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with", email, password);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat w-full px-4 py-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          Student Login
        </h1>
        <div className="flex flex-col items-center p-4 rounded-lg bg-white">
          <input
            type="text"
            className="w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md bg-white border border-gray-300 px-3 py-2"
            placeholder="Email or Username"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md bg-white border border-gray-300 px-3 py-2"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full transition duration-300"
            onClick={handleLogin}
          >
            LOGIN
          </button>
          <Link
            className="text-blue-600 hover:text-blue-800 cursor-pointer mt-4"
            to={"/student/forgot-password"}
          >
            Forgot Password?
          </Link>

          <div className="text-center mt-6">
            Not a member?{" "}
            <Link
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
              to={"/student/register"}
            >
              Register
            </Link>
          </div>

          <div
            className="cursor-pointer mt-6 text-center"
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
        </div>
      </div>
    </div>
  );
};

export default Login;
