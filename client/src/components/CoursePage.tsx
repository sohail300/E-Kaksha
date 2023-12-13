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
import Loader from "./Loader";

function CoursePage() {
  const [course, setCourse] = useState({});
  const [userid, setUserid] = useState("");
  const [checked, setChecked] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [giveReview, setgiveReview] = useState(false);
  const [bought, setBought] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const api = axios.create({
    baseURL,
  });

  // UseEffect Functions
  async function callFunc() {
    const response = await api.get(`/course/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    });
    setCourse(response.data.course);
  }

  async function getId() {
    const response = await api.get("/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setUserid(response.data.id);
  }

  async function getReviews() {
    const response = await api.get(`/course/review/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response.data.reviews);
    setReviews(response.data.reviews);
  }

  async function hasBought() {
    const response = await api.post(
      "user/hasbought",
      {
        id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data.result);
    setBought(response.data.result);
    setIsLoading(false);
  }

  useEffect(() => {
    callFunc();
    getId();
    getReviews();
    hasBought();
  }, []);

  // Payment succeeds -> 4242 4242 4242 4242
  // Payment requires authentication -> 4000 0025 0000 3155
  // Payment is declined -> 4000 0000 0000 9995

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

    const resp = await api.post(`/course/buy/${id}`, null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(resp.data);
    window.location.href = response.data.url;
  }

  async function wishlist() {
    const response = await api.post(`/course/wishlist/${id}`, null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response.data);
  }

  function calcRating() {
    let rating = 0;
    const length = reviews.length;
    reviews.forEach((item) => {
      console.log(typeof item.rating);
      console.log(typeof rating);
      rating = rating + item.rating;
      console.log(rating);
    });
    console.log(rating / length);
    return rating / length;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
            <p style={{ fontWeight: "bold", fontSize: "24px" }}>
              {course.title}
            </p>
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
                  value={calcRating()}
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
              {bought ? (
                <Button
                  variant="contained"
                  style={{ margin: "16px 24px 0px 0px" }}
                  onClick={() => setgiveReview(true)}
                >
                  Give Review
                </Button>
              ) : (
                <>
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
                    onClick={wishlist}
                  >
                    Add to Wishlist
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ width: "100vw", display: "flex" }}>
        <div style={{ width: "70%" }}>
          {checked ? <Syllabus /> : <ViewReviews reviews={reviews} />}
        </div>
        <div
          style={{ marginRight: "16px", width: "30%" }}
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
