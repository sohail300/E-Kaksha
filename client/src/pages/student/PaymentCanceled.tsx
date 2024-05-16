import CancelIcon from "@mui/icons-material/Cancel";
import imagepath from "../assets/images/notebook.png";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#cecece" }}>
      {/* <div
        style={{
          backgroundColor: "#fff",
          height: "100vh",
          maxWidth: "500px",
          margin: "0 auto",
          padding: "25px",
        }}
      >
        <img
          src={imagepath}
          alt=""
          style={{
            height: "30vh",
            display: "block",
            margin: "30px auto",
          }}
        />
        <CancelIcon
          className="animated-element"
          fontSize="large"
          style={{
            display: "block",
            margin: "0 auto",
            color: "#f32013",
            animationName: "grow",
            animationDuration: "1s",
            animationTimingFunction: "ease-in-out",
          }}
        />
        <h1
          style={{
            margin: "10px auto",
            marginBottom: "30px",
            fontSize: "28px",
            fontFamily: "Roboto",
            fontWeight: "bold",
            color: "#f32013",
          }}
        >
          Payment Canceled!
        </h1>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          style={{ marginBottom: "30px" }}
        >
          Go to Home Page
        </Button>
      </div> */}
    </div>
  );
};

export default PaymentCanceled;
