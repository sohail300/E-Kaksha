import "./Admin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "./config.js";
import axios from "axios";
import "./Home.css";
import { currUserState } from "../store/atoms/admin";
import { useSetRecoilState } from "recoil";

const Signup = () => {
  const navigate = useNavigate();
  const setCurrUser = useSetRecoilState(currUserState);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const api = axios.create({
    baseURL,
  });

  function handleLoginEmail(e) {
    setLoginEmail(e.target.value);
  }

  function handleLoginPassword(e) {
    setLoginPassword(e.target.value);
  }

  async function handleLogin() {
    const response = await api.post("/admin/login", {
      email: loginEmail,
      password: loginPassword,
    });
    localStorage.setItem("token", response.data);
    setCurrUser("user");
    navigate("/allcourse");
  }

  return (
    <div className="reg-container admin-section">
      <h1 style={{ color: "#fff" }}>Admin Login</h1>
      <div className="card">

        <>
          <input
            type="text"
            className="LoginEmail card-comp"
            placeholder="Email"
            value={loginEmail}
            onChange={handleLoginEmail}
            autoComplete="off"
          />
          <input
            type="password"
            className="LoginPassword card-comp"
            placeholder="Password"
            value={loginPassword}
            onChange={handleLoginPassword}
            autoComplete="off"
          />
          <br />
          <button className="login-btn" onClick={handleLogin}>
            LOGIN
          </button>
          <br />
          <a
            style={{
              color: "Highlight",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot Password
          </a>
          <p style={{ margin: "4px 0px" }}>Login Credentials for trial</p>
          <p style={{ margin: "4px 0px" }}>
            Email: <b>admin1@gmail.com</b> & Password: <b>admin123</b>
          </p>
        </>
      </div>
    </div>
  );
};

export default Signup;
