import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import imagepath from "../assets/images/notebook.png";
import "./PaymentCanceled.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Email = () => {
    const navigate=useNavigate();

    const cancelStyle = {
      margin: '10px auto',
      marginBottom: '30px',
      fontSize: '28px',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      color: '#f32013 ',
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
          <CancelIcon
            className="animated-element"
            fontSize="large"
            style={{ display: "block", margin: "0px auto", color: '#f32013' }}
          />
          <h1 style={cancelStyle}>Payment Canceled!</h1>
          <Button variant="contained" onClick={()=> navigate('/')}>
            Go to Home Page
          </Button>
        </div>
      </body>
    </html>
  );
};

export default Email;
