// import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const AccordianComp = ({ title, contentArray }) => {
  return (
    <Accordion style={{ margin: "16px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
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
        {contentArray.map((item) => {
          return (
            <Typography style={{ cursor: "pointer", marginBottom: "8px" }}>
              {item}
            </Typography>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordianComp;
