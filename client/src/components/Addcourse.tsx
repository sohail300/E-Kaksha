import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { baseURL } from "./config.js";
import "./AddCourse.css";

const Addcourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagelink, setImagelink] = useState("");
  const [duration, setDuration] = useState("");
  const [resource, setResource] = useState("");
  const [priceid, setPriceid] = useState("");

  const api = axios.create({
    baseURL,
  });

  async function Addcoursefunc() {
    const data = await api.post(
      "/admin/course",
      {
        title,
        description,
        price,
        imagelink,
        duration,
        resource,
        priceid,
        // requirement,
        // who
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    navigate("/allcourse");
  }

  return (
    <>
      <div id="addcourse-div">
        <h1>Add Course</h1>
        <div id="card">
          <TextField
            label="Title"
            variant="outlined"
            id="title"
            className="card-component"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            autoComplete="off"
            style={{ marginBottom: "40px" }}
          />

          <TextField
            label="Description"
            variant="outlined"
            id="description"
            className="card-component"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            autoComplete="off"
            style={{ marginBottom: "40px" }}
          />

          <TextField
            label="Price"
            variant="outlined"
            id="price"
            className="card-component"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            size="small"
            autoComplete="off"
            style={{ marginBottom: "40px" }}
          />

          <TextField
            label="Image Link"
            variant="outlined"
            id="imagelink"
            className="card-component"
            value={imagelink}
            onChange={(e) => setImagelink(e.target.value)}
            size="small"
            autoComplete="off"
            style={{ marginBottom: "40px" }}
          />

          <TextField
            label="Price Id"
            variant="outlined"
            id="priceid"
            className="card-component"
            value={priceid}
            onChange={(e) => setPriceid(e.target.value)}
            size="small"
            autoComplete="off"
            style={{ marginBottom: "40px" }}
          />

          <div style={{ display: "flex", justifyContent: "left" }}>
            <TextField
              variant="outlined"
              id="duration"
              className="card-component"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              autoComplete="off"
              style={{
                marginBottom: "40px",
                marginRight: "20px",
                width: "64px",
              }}
              size="small"
            />
            <p>hour course</p>
          </div>

          <div style={{ display: "flex", justifyContent: "left" }}>
            <TextField
              variant="outlined"
              id="resources"
              className="card-component"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              size="small"
              autoComplete="off"
              style={{
                marginBottom: "40px",
                marginRight: "20px",
                marginLeft: "0px",
                width: "64px",
              }}
            />
            <p>resources to download</p>
          </div>
          <br />
          <button className="button card-component" onClick={Addcoursefunc}>
            Add Course
          </button>
          <br />
        </div>
      </div>
    </>
  );
};

export default Addcourse;
