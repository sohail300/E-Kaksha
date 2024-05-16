import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseURL } from "../utils/config.js";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showchangepassword, setShowchangepassword] = useState(false);
  const [showchangepasswordContainer] = useState(true);

  const api = axios.create({
    baseURL,
  });

  async function sendOTP() {
    const response = await api.get("/admin/sendotp", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response.data);
  }

  async function verifyOTP() {
    const response = await api.post("/admin/verifyotp", {
      otp
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if(response.data.flag){
      setShowchangepassword(true);
    }
    console.log(response.data);
  }

  async function changePassword() {
    const response = await api.post(
      "/admin/change-password",
      {
        password,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    navigate("/admin");
  }

  return (
    <div className="reg-container">
          <h1
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "10px",
              fontSize: "40px",
              color: "#000",
              width: "100vw",
              fontFamily: "Manrope, Helvetica, sans-serif, Arial",
            }}
          >
            Forgot Password
          </h1>
      <div className="card">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            style={{ marginLeft: "16px" }}
            onClick={() => sendOTP()}
          >
            SEND OTP
          </Button>
        </div>

        {showchangepasswordContainer && (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="OTP"
                variant="outlined"
                className="card-component"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoComplete="off"
                size="small"
                style={{ margin: "16px" }}
              />
              <Button
                variant="contained"
                style={{ marginLeft: "16px" }}
                onClick={() => verifyOTP()}
              >
                VERIFY OTP
              </Button>
            </div>
            {showchangepassword && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  className="card-component"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  size="small"
                  style={{ margin: "16px" }}
                />
                <Button
                  variant="contained"
                  style={{ marginLeft: "16px" }}
                  onClick={() => changePassword()}
                >
                  CHANGE PASSWORD
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
