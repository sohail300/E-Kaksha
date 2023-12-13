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
import { baseURL } from "./config.js";
import Loader from "./Loader.js";

const Profile = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [toDelete, setTodelete] = useState(false);
  const [deleteText, setDeletetext] = useState("");
  const [isLoading, setIsLoading]= useState(true);

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
    const response = await api.get("user/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setName(response.data.user.name);
    setEmail(response.data.user.email);
    setMobile(response.data.user.mobile);
    setPassword(response.data.user.password);
    setPhotourl(response.data.user.photoUrl);
    setId(response.data.user._id);
    setIsLoading(false);
    console.log(response.data);

  }

  useEffect(() => {
    getUser();
  });

  async function updateName() {
    const response = await api.put(
      "user/profile",
      {
        name,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
  }

  async function deleteAccount() {
    if (deleteText !== "Delete Account") {
      alert("Input right text");
    } else {
      const response = await api.delete("user/delete", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
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
          "user/profile/photo",
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
      }
    );
  }

  return (
    <>
    { isLoading ? 
    <Loader/> :
      <div
        style={{
          // border: "2px solid red",
          width: "100vw",
          height: "80vh",
          display: "flex",
        }}
      >
        <div
          style={{
            //   border: "2px solid red",
            width: "35vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={photourl} alt="photo"  style={{ width: "16vw", height: "60vh", borderRadius:"10px"}}/>
          <Button
            style={{ marginTop: "40px" }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload
            <VisuallyHiddenInput type="file" onChange={handleUpload} />
          </Button>
        </div>
        <div
          style={{
            //   border: "2px solid red",
            width: "65vw",
            height: "80vh",
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
            <Button variant="contained" onClick={updateName}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <Button variant="contained">UPDATE</Button>
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
              label="Mobile Number"
              variant="outlined"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              autoComplete="off"
            />

            <Button variant="contained">UPDATE</Button>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />

            <Button variant="contained">UPDATE</Button>
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
    }


      {toDelete && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            // height: "30vh",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
            zIndex: "1",
          }}
        >
          <span style={{ textAlign: "justify" }}>
            All your details, reviews will be deleted. If you have purchased any
            course, that will be deleted too and no refund will be provided.
            Type <b>"Delete Account"</b> in the input field below to delete your
            account.
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
            onClick={deleteAccount}
            style={{
              textAlign: "center",
              alignSelf: "center",
              backgroundColor: "#DC3545",
            }}
          >
            DELETE ACCOUNT
          </Button>
        </div>
      )}
    </>
  );
};

export default Profile;
