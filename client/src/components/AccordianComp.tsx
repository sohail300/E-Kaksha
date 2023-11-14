// import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const AccordianComp = () => {
  return (
    <Accordion style={{ margin: "16px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Front-End Web Development</Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textDecoration: "underline",
          color: "blue",
        }}
      >
        <Typography style={{ cursor: "pointer", marginBottom: "8px" }}>
          Lecture 1
        </Typography>
        <Typography style={{ cursor: "pointer", marginBottom: "8px" }}>
          Lecture 2
        </Typography>
        <Typography style={{ cursor: "pointer", marginBottom: "8px" }}>
          Lecture 3
        </Typography>
        <Typography style={{ cursor: "pointer", marginBottom: "8px" }}>
          Lecture 4
        </Typography>
        <Typography style={{ cursor: "pointer", marginBottom: "8px" }}>
          Lecture 5
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};


export default AccordianComp;
