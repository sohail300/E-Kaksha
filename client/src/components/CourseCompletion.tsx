import axios from "axios";
import { baseURL } from "./config.js";
import DoughnutComp from "./DoughnutComp.jsx";
import Button from "@mui/material/Button";

const CourseCompletion = () => {
  const api = axios.create({
    baseURL,
  });

  async function getCert() {
    const response = await api.get("course/completion/certificate", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response.data);
  }

  return (
    <>
      <h3 style={{ textAlign: "left", margin: "4px 12px" }}>
        Course Completion
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DoughnutComp />
        <p style={{ textAlign: "center" }}>
          You have completed 15 out of 25 modules.
        </p>
        <Button variant="contained" onClick={getCert}>
          Get Completion Certificate
        </Button>
      </div>
    </>
  );
};

export default CourseCompletion;
