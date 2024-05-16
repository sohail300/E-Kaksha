import axios from "axios";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { baseURL } from "../../utils/config.js";
import { giveReview } from "../../store/atoms/course.js";
import { useSetRecoilState } from "recoil";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

const GiveReview = ({ userid, courseid }) => {
  const [ratingValue, setRatingvalue] = useState(0);
  const [comment, setComment] = useState("");
  const setGetReview = useSetRecoilState(giveReview);

  const api = axios.create({
    baseURL,
  });

  async function submitReview() {
    // const courseid=course.id;
    const response = await api.post(
      "/course/review",
      {
        userid,
        courseid,
        ratingValue,
        comment,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    setGetReview(false);
    alert("Review Submitted!");
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        height: "30vh",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start",
      }}
    >
      <div>
        <DisabledByDefaultIcon
          style={{
            position: "absolute",
            right: "12px",
            cursor: "pointer",
            color: "#DC3545",
          }}
          onClick={() => setGetReview(false)}
        />
      </div>
      <span style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "8px" }}>Rating:</span>{" "}
        <Rating
          name="simple-controlled"
          value={ratingValue}
          precision={0.5}
          emptyIcon={
            <StarIcon
              style={{ opacity: 0.2, color: "#161616" }}
              fontSize="inherit"
            />
          }
          onChange={(_event, newValue) => {
            setRatingvalue(newValue);
          }}
        />
      </span>
      <TextareaAutosize
        minRows={5}
        placeholder="Comments Here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ backgroundColor: "#fff", width: "99%", color: "#000" }}
      />
      <Button
        variant="contained"
        onClick={submitReview}
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        Submit
      </Button>
    </div>
  );
};

export default GiveReview;
