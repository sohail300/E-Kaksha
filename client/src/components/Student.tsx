import "./Admin.css";
import "./Student.css";
import { useState } from "react";
// import { useNavigate } from 'react-router-dom'
import { baseURL } from "./config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { currUserState } from "../store/atoms/admin";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isUserLoggedInState } from "../store/atoms/user";

const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(true);
  const [login, setLogin] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userSignupfontcolor, setUsersignupfontcolor] = useState("#fff");
  const [userSignupbgcolor, setUsersignupbgcolor] = useState("#1976d2");
  const [userLoginfontcolor, setUserloginfontcolor] = useState("#1976d2");
  const [userLoginbgcolor, setUserloginbgcolor] = useState("#fff");

  const setCurrUser = useSetRecoilState(currUserState);
  const currUser = useRecoilValue(currUserState);

  const currIsUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  const api = axios.create({
    baseURL,
  });

  function enableLogin() {
    setSignup(false);
    setLogin(true);
    setUserloginfontcolor("#fff");
    setUserloginbgcolor("#1976d2");
    setUsersignupfontcolor("#1976d2");
    setUsersignupbgcolor("#fff");
  }

  function enableSignup() {
    setSignup(true);
    setLogin(false);
    setUserloginfontcolor("#1976d2");
    setUserloginbgcolor("#fff");
    setUsersignupfontcolor("#fff");
    setUsersignupbgcolor("#1976d2");
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
    console.log(loginPassword);
    const response = await api.post("/user/login", {
      email: loginEmail,
      password: loginPassword,
    });
    localStorage.setItem("token", response.data);
    setCurrUser("user");
    setIsUserLoggedIn(true);
    console.log(currUser);
    console.log(isUserLoggedInState);
    console.log(currIsUserLoggedIn);
    navigate("/allcourse");
  }

  return (
    <div className="reg-container user-section">
      <h1 style={{ color: "#fff" }}>Student Login</h1>

      <div className="card">
        <div className="reg-option">
          <a
            onClick={enableSignup}
            style={{
              color: userSignupfontcolor,
              backgroundColor: userSignupbgcolor,
            }}
            className="card-signup"
          >
            SIGNUP
          </a>
          <a
            onClick={enableLogin}
            style={{
              color: userLoginfontcolor,
              backgroundColor: userLoginbgcolor,
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
            />
            <input
              type="password"
              className="signupPassword card-comp"
              placeholder="Password"
              value={signupPassword}
              onChange={handleSignupPassword}
              autoComplete="off"
            />
            <br />
            <button className="signup-btn" onClick={handleSignup}>
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
            />
            <input
              type="password"
              className="LoginPassword card-comp"
              value={loginPassword}
              placeholder="Password"
              onChange={handleLoginPassword}
              autoComplete="off"
            />
            {/* <br /> */}
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
