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
  // const [requirement, setRequirement] = useState([""]);
  // const [who, setWho] = useState([""]);
  // const [requirementCount, setRequirementCount] = useState(1);
  // const [whoCount, setWhoCount] = useState(1);

  // const inputStyle = {
  //   width: "100%",
  //   margin: "8px 0px",
  //   border: "1px solid grey"
  // };

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

          {/* <div style={{ width: "70%", marginBottom: "20px" }}>
            <h3 style={{ textAlign: "left", margin: "4px" }}>Requirements</h3>
            <div id="requirements-div" style={{ height: "100%" }}>
              <input
                type="text"
                className="card-component requirements-component"
                style={inputStyle}
                autoComplete="off"
                value={requirement[0]}
                onChange={(e)=>{
                  let currArray=[...requirement];
                  currArray[0]=e.target.value;
                  setRequirement(currArray)}
                }
              />
            </div>
            <span
              style={{
                textAlign: "right",
                color: "#1b77d2",
                display: "flex",
                justifyContent: "end",
                cursor: "pointer",
                marginTop: "8px",
              }}
              id="requirements-add-btn"
              onClick={() => {
                const parent = document.getElementById("requirements-div");
                const item = document.createElement("input");
                item.classList.add("card-component");
                item.classList.add("requirements-component");
                item.style.width="100%";
                item.style.border="1px solid grey";
                item.style.margin="8px 0px";
                item.setAttribute('idnumber', ''+requirementCount);
                setRequirementCount(requirementCount+1);
                console.log(item.getAttribute('idnumber'))
                const CurrId=item.getAttribute('idnumber');
                let CurrText;
                console.log(requirement[CurrId])
                if(requirement[CurrId]===undefined){
                  CurrText='';
                }
                item.value=CurrText;
                parent.appendChild(item); 
                item.onchange= function(e){
                const tempArray=[...requirement];
                tempArray[CurrId]=(e.target as HTMLInputElement).value;
                setRequirement(tempArray);
                console.log(requirement);
              }
              }}
            >
              <AddCircleOutlineIcon style={{ marginRight: "4px" }} />
              Add more
            </span>
          </div> */}

          {/* <div style={{ width: "70%", marginBottom: "20px" }}>
            <h3 style={{ textAlign: "left", margin: "4px" }}>
              For whom this course is
            </h3>
            <div id="whom-div">
            <input
                type="text"
                className="card-component whom-component"
                style={inputStyle}
                autoComplete="off"
              />
            </div>
            <span
              style={{
                textAlign: "right",
                color: "#1b77d2",
                display: "flex",
                justifyContent: "end",
                cursor: "pointer",
                marginTop: "8px"
              }}
              id="whom-add-btn" onClick={() => {
                const parent = document.getElementById("whom-div");
                const item = document.createElement("input");
                item.classList.add("card-component");
                item.classList.add("whom-component");
                item.style.width="100%";
                item.style.border="1px solid grey";
                item.style.margin="8px 0px";
                item.setAttribute('idnumber', ''+whoCount);
                setWhoCount(whoCount+1);
                console.log(item.getAttribute('idnumber'))
                const CurrId=item.getAttribute('idnumber');
                let CurrText;
                if(who[CurrId]===undefined){
                  CurrText='';
                }
                item.value=CurrText;
                parent.appendChild(item); 
                item.onchange= function(e){
                const tempArray=[...requirement];
                tempArray[CurrId]=(e.target as HTMLInputElement).value;
                setWho(tempArray);
                console.log(requirement);
                console.log(item);
                parent.appendChild(item);
                }
              }}
            >
              <AddCircleOutlineIcon style={{ marginRight: "4px" }} />
              Add more
            </span>
          </div> */}
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
