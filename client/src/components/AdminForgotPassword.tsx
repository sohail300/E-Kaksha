import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseURL } from "../utils/config.js";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sentemail, setSentemail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentotp] = useState("");
  const [password, setPassword] = useState("");
  const [showchangepasswordContainer, setShowchangepasssword] = useState(false);

  const api = axios.create({
    baseURL,
  });

  async function sendOtp() {
    const response = await api.post(
      "/admin/sendotp",
      {
        email,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    console.log(response.data.otp);
    setSentotp(response.data.otp);
    console.log(response.data.email);
    setSentemail(response.data.email);
  }

  async function verifyOtp() {
    if (sentOtp.length !== 0 && sentOtp.toString() == otp) {
      setShowchangepasssword(true);
    } else {
      alert(`OTP doesn't match`);
    }
  }

  async function changePassword() {
    const response = await api.post(
      "/admin/changepassword",
      {
        sentemail,
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
      <h1 style={{ color: "#fff" }}>Forgot Password</h1>
      <div className="card">
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Email"
            variant="outlined"
            className="card-component"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            size="small"
            style={{ margin: "16px" }}
          />
          <Button
            variant="contained"
            style={{ marginLeft: "16px" }}
            onClick={() => sendOtp()}
          >
            SEND OTP
          </Button>
        </div>

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
            onClick={() => verifyOtp()}
          >
            VERIFY OTP
          </Button>
        </div>
        {showchangepasswordContainer && (
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
      </div>
    </div>
  );
};

export default ForgotPassword;
