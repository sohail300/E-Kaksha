import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/config.js";
import DoughnutComp from "../DoughnutComp.js";
import Tooltip from "@mui/material/Tooltip";

const CourseCompletion = () => {
  const [completed] = useState(0);
  const [total] = useState(0);
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
      <h3 className="text-left text-2xl font-medium mb-4">Course Completion</h3>
      <div className="flex flex-col items-center justify-between h-72 w-full">
        <DoughnutComp completed={completed} total={total} />
        <p className="text-center">
          You have completed <b>{completed}</b> out of <b>{total}</b> modules.
        </p>

        <Tooltip title="Complete the course to get a certificate">
          <span>
            <button
              className={`px-4 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-900 ${
                isComplete && "disabled"
              }`}
              onClick={() => getCert()}
            >
              Get Completion Certificate
            </button>
          </span>
        </Tooltip>
      </div>
    </>
  );
};

export default CourseCompletion;
