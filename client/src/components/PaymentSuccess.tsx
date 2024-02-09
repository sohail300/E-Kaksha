import VerifiedIcon from "@mui/icons-material/Verified";
import imagepath from "../assets/images/notebook.png";
import "./PaymentSuccess.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseURL } from "../utils/config.js";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  const successStyle = {
    margin: "10px auto",
    marginBottom: "30px",
    fontSize: "28px",
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#2ecc71",
  };

  const api = axios.create({
    baseURL,
  });

  async function buyCourse() {
    console.log(id);
    const response = await api.post(`/course/buy/${id}`, null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log("inside payment success");
    console.log(response.data);
    navigate("/purchasedcourse");
  }

  useEffect(() => {
    // buyCourse();
  }, []);

  return (
    <div className="main-container">
      <img
        src={imagepath}
        alt="photo"
        style={{ height: "30vh", display: "block", margin: "30px auto" }}
      />
      <VerifiedIcon
        className="animated-element"
        fontSize="large"
        style={{ display: "block", margin: "0px auto", color: "#2ecc71" }}
      />
      <h1 style={successStyle}>Payment successful!</h1>
      <Button variant="contained" onClick={() => buyCourse()}>
        View Purchased Courses
      </Button>
    </div>
  );
};

export default PaymentSuccess;
