import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/config.js";
import DoughnutComp from "./DoughnutComp.js";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const CourseCompletion = () => {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const api = axios.create({
    baseURL,
  });

  useEffect(() => {
    if (completed === total && total !== 0) {
      setIsComplete(true);
    }
  }, []);

  async function getCert() {
    const response = await api.get("/course/completion/certificate", {
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
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: "55%"
        }}
      >
        <DoughnutComp completed={completed} total={total} />
        <p style={{ textAlign: "center" }}>
          You have completed <b>{completed}</b> out of <b>{total}</b> modules.
        </p>

        {isComplete ? (
          <Button variant="contained" onClick={getCert}>
            Get Completion Certificate
          </Button>
        ) : (
          <Tooltip title="Complete the course to get a certificate" >
            <span>
            <Button variant="contained" onClick={getCert} disabled>
              Get Completion Certificate
            </Button>
            </span>
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default CourseCompletion;
