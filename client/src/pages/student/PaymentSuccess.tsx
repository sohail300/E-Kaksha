import VerifiedIcon from "@mui/icons-material/Verified";
import imagepath from "../assets/images/notebook.png";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseURL } from "../../utils/config.js";
import { useEffect } from "react";

const PaymentSuccess = () => {
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

  const growAnimation = {
    animationName: "grow",
    animationDuration: "1s",
    animationTimingFunction: "ease-in-out",
  };

  const styles = {
    body: {
      backgroundColor: "#cecece",
    },
    mainContainer: {
      backgroundColor: "#fff",
      height: "100vh",
      maxWidth: "500px",
      margin: "0 auto",
      padding: "25px",
    },
  };

  const api = axios.create({
    baseURL,
  });

  async function buyCourse() {
    const response = await api.post(`/course/buy/${id}`, null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    navigate("/student/purchased-courses");
  }

  useEffect(() => {
    // buyCourse();
  }, []);

  return (
    <div style={styles.body}>
      {/* <div style={styles.mainContainer}>
        <img
          src={imagepath}
          alt="photo"
          style={{ height: "30vh", display: "block", margin: "30px auto" }}
        />
        <VerifiedIcon
          className="animated-element"
          fontSize="large"
          style={{
            display: "block",
            margin: "0px auto",
            color: "#2ecc71",
            ...growAnimation,
          }}
        />
        <h1 style={successStyle}>Payment successful!</h1>
        <Button variant="contained" onClick={() => buyCourse()}>
          View Purchased Courses
        </Button>
      </div> */}
    </div>
  );
};

export default PaymentSuccess;
