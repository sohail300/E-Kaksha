import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isUserLoggedInState } from "../../store/atoms/user.js";
import bgImage from "../../assets/images/bg.jpg";
import { api } from "../../utils/config.js";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  async function handleLogin() {
    const response = await api.post("/student/signup", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setIsUserLoggedIn(true);
    navigate("/all-courses");
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat w-full px-4 py-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-4 sm:p-6 space-y-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          Student Register
        </h1>
        <div className="flex flex-col items-center p-4 rounded-lg bg-white border-black">
          <input
            type="text"
            className="w-full mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md bg-white border border-gray-500 px-3 py-2 text-sm sm:text-base"
            placeholder="Name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md bg-white border border-gray-500 px-3 py-2 text-sm sm:text-base"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md bg-white border border-gray-500 px-3 py-2 text-sm sm:text-base"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 w-full text-sm sm:text-base"
            onClick={() => handleLogin()}
          >
            REGISTER
          </button>
          <div className="text-center mt-4 text-sm sm:text-base">
            Already a member?
            <Link
              className="text-blue-600 hover:text-blue-800 ml-2 cursor-pointer"
              to={"/student/login"}
            >
              Login
            </Link>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 mb-1">
            Go to login for trial
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
