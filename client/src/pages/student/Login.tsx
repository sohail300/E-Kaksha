import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/config.js";
import axios from "axios";
import { currUserState } from "../../store/atoms/admin.js";
import { useSetRecoilState } from "recoil";
import { isUserLoggedInState } from "../../store/atoms/user.js";
import bgImage from "../../assets/images/bg.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setCurrUser = useSetRecoilState(currUserState);
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  const api = axios.create({
    baseURL,
  });

  async function handleLogin() {
    const response = await api.post("/student/login", {
      email: email,
      password: password,
    });
    localStorage.setItem("token", response.data);
    setCurrUser("user");
    setIsUserLoggedIn(true);
    navigate("/all-courses");
  }

  return (
    <div
      className="h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat w-full "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold ">Student Login</h1>
        <div className="flex flex-col items-center p-4 rounded-lg  bg-white border-black">
          <input
            type="text"
            className="w-full mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md bg-white border border-gray-500 px-3 py-2"
            placeholder="Email or Username"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md bg-white border border-gray-500 px-3 py-2"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full"
            onClick={() => handleLogin()}
          >
            LOGIN
          </button>
          <br />
          <Link
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            to={"/student/forgot-password"}
          >
            Forgot Password
          </Link>

          <div className="text-center mt-4">
            Not a member?
            <Link
              className="text-blue-600 hover:text-blue-800 ml-2 cursor-pointer"
              to={"/student/register"}
            >
              Register
            </Link>
          </div>

          <div
            className="cursor-pointer"
            onClick={() => {
              console.log("running");
              setEmail("stud1@gmail.com");
              setPassword("stud123");
            }}
          >
            <p className="text-gray-500 text-sm mt-2 mb-1 cursor-pointer">
              Login Credentials for trial (click to copy)
            </p>
            <p className="text-gray-500 text-sm ">
              Email: <b>stud1@gmail.com</b> & Password: <b>stud123</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
