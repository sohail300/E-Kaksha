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
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setCurrUser = useSetRecoilState(currUserState);
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  const api = axios.create({
    baseURL,
  });

  async function handleLogin() {
    const response = await api.post("/user/register", {
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
        <h1 className="text-5xl font-bold ">Student Register</h1>
        <div className="flex flex-col items-center p-4 rounded-lg  bg-white border-black">
          <input
            type="text"
            className="w-full mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md bg-white border border-gray-500 px-3 py-2"
            placeholder="Name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md bg-white border border-gray-500 px-3 py-2"
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="w-full mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md bg-white border border-gray-500 px-3 py-2"
            placeholder="Email"
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
            REGISTER
          </button>

          <div className="text-center mt-4">
            Already a member?
            <Link
              className="text-blue-600 hover:text-blue-800 ml-2 cursor-pointer"
              to={"/student/login"}
            >
              Login
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-2 mb-1">
            Go to login for trial
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
