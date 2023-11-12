import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import imagepath from "../images/notebook.png";
import "./PaymentSuccess.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Email = () => {
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
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
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
      </body>
    </html>
  );
};

export default Email;
