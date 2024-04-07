import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/config.js";
import axios from "axios";
import { currUserState } from "../store/atoms/admin.js";
import { useSetRecoilState } from "recoil";
import bgImage from '../assets/images/bg.jpg'

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
    <div
      className="reg-container admin-section"
      style={{
        margin: "0px",
        height: "90vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        fontFamily: "Inter, Helvetica, sans-serif, Arial",
      }}
    >
      <h1 style={{ color: "#fff", fontFamily: "Manrope, Helvetica, sans-serif, Arial" }}>
        Admin Login
      </h1>
      <div
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          width: "30%",
          backdropFilter: "blur(2px) saturate(120%)",
          WebkitBackdropFilter: "blur(2px) saturate(100%)",
          backgroundColor: "rgba(251, 251, 251, 1)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <input
          type="text"
          className="LoginEmail card-comp"
          placeholder="Email"
          value={loginEmail}
          onChange={handleLoginEmail}
          autoComplete="off"
          style={{ width: "70%", margin: "15px", backgroundColor: "white", border: "1px solid black", borderRadius: "5px", height: "32px", color: "black" }}
        />
        <input
          type="password"
          className="LoginPassword card-comp"
          placeholder="Password"
          value={loginPassword}
          onChange={handleLoginPassword}
          autoComplete="off"
          style={{ width: "70%", margin: "15px", backgroundColor: "white", border: "1px solid black", borderRadius: "5px", height: "32px", color: "black" }}
        />
        <br />
        <button
          className="login-btn"
          onClick={handleLogin}
          style={{ borderRadius: "5px", width: "25%", height: "36px", border: "none", background: "#e91965", cursor: 'pointer' }}
        >
          LOGIN
        </button>
        <br />
        <a
          style={{
            fontSize: "20px",
            width: "40%",
            padding: "4px 12px",
            borderRadius: "5px",
            color: "Highlight",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => navigate("/adminforgotpassword")}
        >
          Forgot Password
        </a>
        <p style={{ margin: "4px 0px" }}>Login Credentials for trial</p>
        <p style={{ margin: "4px 0px" }}>
          Email: <b>admin1@gmail.com</b> & Password: <b>admin123</b>
        </p>
      </div>
    </div>
  );
};

export default Signup;
