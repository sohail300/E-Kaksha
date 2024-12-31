// import { useEffect, useState } from "react";
import { useState } from "react";
import { api } from "../../utils/config.js";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
// import DoughnutComp from "../DoughnutComp.js";
// import Tooltip from "@mui/material/Tooltip";

const CourseCompletion = ({ courseId }: { courseId: string }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  // const [completed] = useState(0);
  // const [total] = useState(0);
  // const [isComplete, setIsComplete] = useState(false);

  // useEffect(() => {
  //   if (completed === total && total !== 0) {
  //     setIsComplete(true);
  //   }
  // }, []);

  async function getCert() {
    console.log("running");
    try {
      setIsSubmiting(true);

      const response = await api.post(
        "/student/has-bought",
        { courseid: courseId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("response1", response);

      if (response.data.success) {
        const _response = await api.get("/course/completion/certificate", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          responseType: "blob", // Ensure binary data is returned
        });
        console.log("response2", _response);

        // Create a blob from the binary data
        const blob = new Blob([_response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Create a link and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Certificate.pdf"); // Set the download filename
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        toast.error("You haven't bought the course");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <>
      {/* <h3 className="text-left text-2xl font-medium mb-4">Course Completion</h3>
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
      </div> */}

      <button
        className={`flex flex-row justify-center items-center w-full px-4 py-2 my-4 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-900`}
        onClick={() => getCert()}
      >
        {isSubmiting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" color="#fff" />
        )}
        <span>Get Completion Certificate</span>
      </button>
    </>
  );
};

export default CourseCompletion;
