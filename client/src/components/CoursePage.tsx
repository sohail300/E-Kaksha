import { useParams } from "react-router-dom";
import CourseDetails from "./CourseDetails";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { baseURL } from "./config.js";
import { useEffect, useState } from "react";
import GiveReview from "./GiveReview";
import ViewReviews from "./ViewReviews";
import CourseCompletion from "./CourseCompletion";
import Syllabus from "./Syllabus";

function CoursePage() {
  const [course, setCourse] = useState({});
  const [userid, setUserid] = useState("");
  const [checked, setChecked] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [giveReview, setgiveReview] = useState(false);

  const { id } = useParams();

  const api = axios.create({
    baseURL,
  });

  // UseEffect Functions
  async function callFunc() {
    const response = await api.get(`course/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    });
    setCourse(response.data.course);
  }

  async function getId() {
    const response = await api.get("/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setUserid(response.data.id);
  }

  async function getReviews() {
    const response = await api.get(`course/review/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setReviews(response.data.reviews);
  }

  useEffect(() => {
    callFunc();
    getId();
    getReviews();
  }, []);

  // Other Functions
  async function checkout() {
    const priceid = course.priceid;
    const response = await api.post(
      "course/checkout",
      {
        priceid,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("item"),
        },
      }
    );

    window.location.href = response.data.url;
  }

  return (
    <>
      <div
        style={{
          background: "#161616",
          width: "99vw",
          height: "50vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          src={course.imagelink}
          alt=""
          style={{ margin: "16px 80px 16px 80px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            color: "#fff",
            width: "700px",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>{course.title}</p>
          <div className="sharethis-sticky-share-buttons"></div>
          <p>
            Price:{" "}
            <span style={{ color: "#00ff00", fontWeight: "bold" }}>
              ₹{course.price}
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>{course.description}</p>
          <span>
            <span style={{ marginRight: "40px" }}>
              <Rating
                value={3.4}
                precision={0.5}
                emptyIcon={
                  <StarIcon
                    style={{ opacity: 0.2, color: "#fff" }}
                    fontSize="inherit"
                  />
                }
                readOnly
              />
            </span>
            <span>Reviews</span>
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>Syllabus</span>
          </span>
          <div>
            <Button
              variant="contained"
              style={{ margin: "16px 24px 0px 0px" }}
              onClick={checkout}
            >
              Buy Course
            </Button>
            <Button
              variant="contained"
              style={{ margin: "16px 24px 0px 0px" }}
              onClick={() => setgiveReview(true)}
            >
              Give Review
            </Button>
          </div>
        </div>
      </div>

      <div style={{ width: "100vw", display: "flex" }}>
        <div style={{ width: "70%" }}>
          {checked ? <ViewReviews reviews={reviews} /> : <Syllabus />}
        </div>
        <div
          style={{ marginRight: "16px", border: "2px solid red", width: "30%" }}
        >
          <h2 style={{ textAlign: "start", marginLeft: "16px" }}>Details</h2>
          <CourseDetails
            duration={course.duration}
            resources={course.resource}
          />
          <CourseCompletion />
        </div>
      </div>

      {giveReview && <GiveReview userid={userid} courseid={id} />}
    </>
  );
}

export default CoursePage;
