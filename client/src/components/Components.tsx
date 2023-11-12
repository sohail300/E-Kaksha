// import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from "@mui/icons-material/Download";
import LanguageIcon from "@mui/icons-material/Language";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
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

const Course = (props) => {
  return (
    <div>
      <h3 style={{ textAlign: "left", margin: "4px 12px" }}>
        This course includes:
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AccessTimeIcon style={{ marginRight: "8px", marginBottom: "8px" }} />
          {props.duration} hour course
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DownloadIcon style={{ marginRight: "8px", marginBottom: "8px" }} />
          {props.resources} resources for download
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LanguageIcon style={{ marginRight: "8px", marginBottom: "8px" }} />
          Access via mobile devices and TV
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CardMembershipIcon
            style={{ marginRight: "8px", marginBottom: "8px" }}
          />
          Certificate of completion
        </div>
      </div>
    </div>
  );
};

export { AccordianComp, Course };
