import VerifiedIcon from "@mui/icons-material/Verified";
import imagepath from "../assets/images/notebook.png";
import "./PaymentSuccess.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const successStyle = {
    margin: '10px auto',
    marginBottom: '30px',
    fontSize: '28px',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#2ecc71',
  };

  return (
        <div className="main-container">
          <img
            src={imagepath}
            alt=""
            style={{ height: "30vh", display: "block", margin: "30px auto" }}
          />
          <VerifiedIcon
            className="animated-element"
            fontSize="large"
            style={{ display: "block", margin: "0px auto", color: '#2ecc71' }}
          />
          <h1 style={successStyle}>Payment successful!</h1>
          <Button
            variant="contained"
            onClick={() => navigate("/purchasedcourse")}
          >
            View Purchased Courses
          </Button>
        </div>
  );
};

export default PaymentSuccess;
