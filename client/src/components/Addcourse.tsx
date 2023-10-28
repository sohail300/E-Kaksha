import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "./config.js";
import "./Addcourse.css";

const Addcourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagelink, setImagelink] = useState("");

  const api = axios.create({
    baseURL,
  });

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handlePrice(e) {
    setPrice(e.target.value);
  }

  function handleImagelink(e) {
    setImagelink(e.target.value);
  }

  async function Addcoursefunc() {

    const data = await api.post(
      "/admin/courses",
      {
        title: title,
        description: description,
        price: price,
        linkImage: imagelink,
        published: true,
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
          <input
            id="title"
            placeholder="Title"
            className="card-component"
            value={title}
            onChange={handleTitle}
          />
          <br />
          <input
            id="description"
            placeholder="Description"
            className="card-component"
            value={description}
            onChange={handleDescription}
          />
          <br />
          <input
            id="price"
            placeholder="Price"
            className="card-component"
            value={price}
            onChange={handlePrice}
          />
          <br />
          <input
            id="imagelink"
            placeholder="Image Link"
            className="card-component"
            value={imagelink}
            onChange={handleImagelink}
          />
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
