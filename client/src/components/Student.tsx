import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/config.js";
import axios from "axios";
import { currUserState } from "../store/atoms/admin.js";
import { useSetRecoilState } from "recoil";
import { isUserLoggedInState } from "../store/atoms/user.js";
import bgImage from '../assets/images/bg.jpg'

const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(true);
  const [login, setLogin] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const setCurrUser = useSetRecoilState(currUserState);
  // const currIsUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  const api = axios.create({
    baseURL,
  });

  function enableLogin() {
    setSignup(false);
    setLogin(true);
  }

  function enableSignup() {
    setSignup(true);
    setLogin(false);
  }

  function handleSignupEmail(e) {
    setSignupEmail(e.target.value);
  }

  function handleSignupPassword(e) {
    setSignupPassword(e.target.value);
  }

  function handleLoginEmail(e) {
    setLoginEmail(e.target.value);
  }

  function handleLoginPassword(e) {
    setLoginPassword(e.target.value);
  }

  async function handleSignup() {
    const response = await api.post("/user/signup", {
      email: signupEmail,
      password: signupPassword,
    });
    localStorage.setItem("token", response.data);
    setCurrUser("user");
    setIsUserLoggedIn(true);
    navigate("/allcourse");
  }

  async function handleLogin() {
    const response = await api.post("/user/login", {
      email: loginEmail,
      password: loginPassword,
    });
    localStorage.setItem("token", response.data);
    setCurrUser("user");
    setIsUserLoggedIn(true);
    navigate("/allcourse");
  }

  return (
    <div
      className="reg-container user-section"
      style={{
        margin: 0,
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
      <h1 style={{ color: "#fff", fontFamily: "Manrope, Helvetica, sans-serif, Arial" }}>Student Login</h1>
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
        <div
          className="reg-option"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70%",
            margin: "30px",
          }}
        >
          <a
            onClick={enableSignup}
            style={{
              fontSize: "20px",
              width: "40%",
              fontFamily: "Archivo, Helvetica, sans-serif, Arial",
              padding: "4px 12px",
              borderRadius: "5px",
              border: "2px solid #1976d2",
              color: signup ? "#fff" : "#1976d2",
              cursor: "pointer",
              backgroundColor: signup ? "#1976d2" : "#fff",
            }}
            className="card-signup"
          >
            SIGNUP
          </a>
          <a
            onClick={enableLogin}
            style={{
              fontSize: "20px",
              width: "40%",
              fontFamily: "Archivo, Helvetica, sans-serif, Arial",
              padding: "4px 12px",
              borderRadius: "5px",
              border: "2px solid #1976d2",
              color: login ? "#fff" : "#1976d2",
              cursor: "pointer",
              backgroundColor: login ? "#1976d2" : "#fff",
            }}
            className="card-login"
          >
            LOGIN
          </a>
        </div>

        {signup && (
          <>
            <input
              type="text"
              className="signupEmail card-comp"
              placeholder="Email"
              value={signupEmail}
              onChange={handleSignupEmail}
              autoComplete="off"
              style={{
                width: "70%",
                margin: "15px",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
                height: "32px",
                color: "black",
              }}
            />
            <input
              type="password"
              className="signupPassword card-comp"
              placeholder="Password"
              value={signupPassword}
              onChange={handleSignupPassword}
              autoComplete="off"
              style={{
                width: "70%",
                margin: "15px",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
                height: "32px",
                color: "black",
              }}
            />
            <br />
            <button
              className="signup-btn"
              onClick={handleSignup}
              style={{
                borderRadius: "5px",
                width: "25%",
                height: "36px",
                border: "none",
                background: "#1976d2",
                cursor: 'pointer'
              }}
            >
              SIGNUP
            </button>
            <br />
          </>
        )}

        {login && (
          <>
            <input
              type="text"
              className="LoginEmail card-comp"
              value={loginEmail}
              onChange={handleLoginEmail}
              placeholder="Email"
              autoComplete="off"
              style={{
                width: "70%",
                margin: "15px",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
                height: "32px",
                color: "black",
              }}
            />
            <input
              type="password"
              className="LoginPassword card-comp"
              value={loginPassword}
              placeholder="Password"
              onChange={handleLoginPassword}
              autoComplete="off"
              style={{
                width: "70%",
                margin: "15px",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
                height: "32px",
                color: "black",
              }}
            />
            <button
              className="login-btn"
              onClick={handleLogin}
              style={{
                borderRadius: "5px",
                width: "25%",
                height: "36px",
                border: "none",
                background: "#1976d2",
                cursor: 'pointer'
              }}
            >
              LOGIN
            </button>
            <br />
            <a
              style={{
                color: "Highlight",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/studentforgotpassword")}
            >
              Forgot Password
            </a>
            <p style={{ margin: "4px 0px" }}>Login Credentials for trial</p>
            <p style={{ margin: "4px 0px" }}>
              Email: <b>stud1@gmail.com</b> & Password: <b>stud123</b>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
