import { useEffect, useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";
import storage from "../firebase.js";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseURL } from "../utils/config.js";
import Loader from "./Loader.js";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [toDelete, setTodelete] = useState(false);
  const [deleteText, setDeletetext] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const [showchangepassword, setShowchangepasssword] = useState(false);
  const [showchangepasswordContainer, setShowchangepassswordContainer] =
    useState(false);
  const [showchangeemail, setShowchangeemail] = useState(false);
  const [showchangeemailContainer, setShowchangeemailContainer] =
    useState(false);
  const [newEmail, setNewEmail] = useState("");

  const navigate = useNavigate();

  const api = axios.create({
    baseURL,
  });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  async function getUser() {
    const response = await api.get("/admin/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setName(response.data.admin.name);
    setEmail(response.data.admin.email);
    setPassword("********");
    setPhotourl(response.data.admin.photoUrl);
    setId(response.data.admin._id);
    setIsLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  async function updateName() {
    const response = await api.put(
      "/admin/profile",
      {
        name,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    getUser();
  }

  async function sendOtp() {
    const response = await api.get("/admin/sendotp", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  async function verifyOtp() {
    const response = await api.post(
      "/admin/verifyotp",
      {
        otp,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.data.flag) {
      setShowchangeemail(true);
      setShowchangepasssword(true);
    }
  }

  async function changePassword() {
    const response = await api.put(
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
    setOtp("");
    setPassword("********");
    setShowchangepasssword(false);
    setShowchangepassswordContainer(false);
    getUser();
  }

  async function changeEmail() {
    const response = await api.put(
      "/admin/change-email",
      {
        newEmail,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setOtp("");
    setNewEmail("");
    setShowchangeemail(false);
    setShowchangeemailContainer(false);
    getUser();
  }

  async function deleteAccount() {
    if (deleteText !== "Delete Account") {
      alert("Input right text");
    } else {
      const response = await api.delete("/admin/delete", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      localStorage.setItem("token", null);
      navigate("/");
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    const storageRef = ref(storage, "images/" + id);
    console.log(file.name);
    let downloadURL;

    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        console.log("File uploaded successfully");
        // Get the uploaded file's URL
        downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        const response = await api.put(
          "/admin/profile/photo",
          {
            downloadURL,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        getUser();
      }
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
            Profile
          </h1>
          <div
            style={{
              width: "100vw",
              height: "70vh",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={photourl}
                alt="photo"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Button
                style={{ marginTop: "40px" }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => handleUpload(e)}
                />
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "30vw",
                }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
                <Button variant="contained" onClick={() => updateName()}>
                  UPDATE
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "30vw",
                }}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
                <Button
                  variant="contained"
                  onClick={() => setShowchangeemailContainer(true)}
                >
                  CHANGE EMAIL
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "30vw",
                }}
              >
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  disabled
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />

                <Button
                  variant="contained"
                  onClick={() => setShowchangepassswordContainer(true)}
                >
                  CHANGE PASSWORD
                </Button>
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "#DC3545", width: "30vw" }}
                onClick={() => setTodelete(true)}
              >
                DELETE ACCOUNT
              </Button>
            </div>
          </div>
        </>
      )}

      {toDelete && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Grayish background with some transparency
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "30%",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              zIndex: "2",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#DC3545",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => {
                setTodelete(false);
              }}
            >
              <CloseIcon />
            </div>

            <span style={{ textAlign: "justify" }}>
              All your details, reviews will be deleted. If you have purchased
              any course, that will be deleted too and no refund will be
              provided. Type <b>"Delete Account"</b> in the input field below to
              delete your account.
            </span>
            <TextField
              variant="outlined"
              label="Input"
              value={deleteText}
              onChange={(e) => setDeletetext(e.target.value)}
              size="small"
              autoComplete="off"
              style={{ margin: "32px 0px" }}
            />
            <Button
              variant="contained"
              onClick={() => deleteAccount()}
              style={{
                alignSelf: "center",
                backgroundColor: "#DC3545",
              }}
            >
              DELETE ACCOUNT
            </Button>
          </div>
        </div>
      )}

      {showchangepasswordContainer && (
        <>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Grayish background with some transparency
              zIndex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "8px",
                borderRadius: "8px",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{ marginLeft: "16px" }}
                  onClick={() => sendOtp()}
                >
                  SEND OTP
                </Button>
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#DC3545",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setShowchangepassswordContainer(false);
                  }}
                >
                  <CloseIcon />
                </div>
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
              {showchangepassword && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="password"
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
        </>
      )}

      {showchangeemailContainer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Grayish background with some transparency
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "8px",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                style={{ marginLeft: "16px" }}
                onClick={() => sendOtp()}
              >
                SEND OTP
              </Button>
              <div
                style={{
                  cursor: "pointer",
                  backgroundColor: "#DC3545",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => {
                  setShowchangeemailContainer(false);
                }}
              >
                <CloseIcon />
              </div>
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
            {showchangeemail && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  className="card-component"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  autoComplete="off"
                  size="small"
                  style={{ margin: "16px" }}
                />
                <Button
                  variant="contained"
                  style={{ marginLeft: "16px" }}
                  onClick={() => changeEmail()}
                >
                  CHANGE EMAIL
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
