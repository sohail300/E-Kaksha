import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { baseURL } from "../utils/config";

const AddCourses = () => {
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
      <div
        id="addcourse-div"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          marginTop: "0px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "30px",
            fontSize: "40px",
            color: "#000",
            width: "100vw",
            fontFamily: "Manrope, Helvetica, sans-serif, Arial",
          }}
        >
          Add Course
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "40px",
            marginBottom: "40px",
            width: "30%",
            backdropFilter: "blur(2px) saturate(120%)",
            WebkitBackdropFilter: "blur(2px) saturate(100%)",
            backgroundColor: "rgba(251, 251, 251, 1)",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3) ",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
          }}
        >
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
          <button
            className="button card-component"
            onClick={Addcoursefunc}
            style={{
              borderRadius: "5px",
              width: "25%",
              fontFamily: "Archivo, Helvetica, sans-serif, Arial",
              height: "36px",
              border: "none",
              marginTop: "0px",
              background: "#e91965",
              color: "#fff",
              cursor: 'pointer'
            }}
          >
            Add Course
          </button>
          <br />
        </div>
      </div>
    </>
  );
};

export default AddCourses;
