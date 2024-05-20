import { useParams } from "react-router-dom";
import CourseDetails from "../components/CoursePage/CourseDetails.js";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { baseURL } from "../utils/config.js";
import { useEffect, useState } from "react";
import GiveReview from "../components/CoursePage/GiveReview.js";
import ViewReviews from "../components/CoursePage/ViewReviews.js";
import CourseCompletion from "../components/CoursePage/CourseCompletion.js";
import Syllabus from "../components/CoursePage/Syllabus.js";
import Loader from "../components/Shimmer/Loader.js";
import { giveReview } from "../store/atoms/course.js";
import { isUserLoggedInState } from "../store/atoms/user.js";
import { useRecoilValue, useSetRecoilState } from "recoil";

function CoursePage() {
  interface Course {
    title: string;
    description: string;
    price: number;
    imagelink: string;
    duration: number;
    resource: number;
    priceid: string;
  }

  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    price: 0,
    imagelink: "",
    duration: 0,
    resource: 0,
    priceid: "",
  });

  const [userid, setUserid] = useState("");
  const [checked, setChecked] = useState(true);
  const [reviews, setReviews] = useState([]);
  const currGiveReview = useRecoilValue(giveReview);
  const currIsUserLoggedIn = useRecoilValue(isUserLoggedInState);
  // const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  const [bought, setBought] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const navigate = useNavigate();

  const { id } = useParams();

  const api = axios.create({
    baseURL,
  });

  // UseEffect Functions
  async function callFunc() {
    const response = await api.get(`/course/id/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    });
    setCourse(response.data.course);
    setIsLoading(false);
  }

  async function getId() {
    const response = await api.get("/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setUserid(response.data.id);
    console.log(currIsUserLoggedIn);
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
      "/student/has-bought",
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
      "/course/checkout",
      {
        priceid,
        id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log("inside checkout");
    console.log(response.data);
    window.location.href = response.data.url;
  }

  async function wishlist() {
    // console.log(currIsUserLoggedIn);
    // if (!currIsUserLoggedIn) {
    // navigate("/student");
    // } else {
    const response = await api.post(`/course/wishlist/${id}`, null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response.data);
    // }
  }

  function calcRating() {
    let rating = 0;
    const length = reviews.length;
    reviews.forEach((item) => {
      rating = rating + item.rating;
    });
    return rating / length;
  }

  return (
    <div className="  bg-white rounded w-full pt-20">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex bg-gray-800 py-8 px-8">
          <img
            className="w-2/5 rounded-lg object-contain"
            src={course.imagelink}
            alt="image"
          />
          <div className="flex flex-col items-start justify-between w-full px-8 text-white">
            <p className="text-2xl font-medium">{course.title}</p>
            <p>
              Price:
              <span className=" font-semibold text-green-400 ml-2">
                ₹{course.price}
              </span>
            </p>
            <Rating
              value={calcRating()}
              precision={0.5}
              emptyIcon={
                <StarIcon
                  className="text-opacity-20 text-white"
                  fontSize="inherit"
                />
              }
              readOnly
            />
            <div className="flex items-center mt-4">
              <div className="mr-4">Reviews</div>
              <Switch
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mr-4"
              />
              <div>Syllabus</div>
            </div>
            <p className="mt-4 text-justify">{course.description}</p>
            <div className="flex mt-8">
              {bought ? (
                <button className="px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200">
                  Give Review
                </button>
              ) : (
                <>
                  <button
                    className="px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200 mr-6"
                    onClick={() => checkout()}
                  >
                    Buy Course
                  </button>

                  <button
                    className="px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200"
                    onClick={() => wishlist()}
                  >
                    Add to Wishlist
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex px-16 py-4">
        <div className="w-full">
          {checked ? (
            <Syllabus />
          ) : (
            <ViewReviews reviews={reviews} className="flex flex-col" />
          )}
        </div>
        <div className="w-fit rounded-lg bg-gray-300 p-4 px-6 sticky h-fit top-24">
          <h2 className="text-left text-2xl font-medium ml-4">Details</h2>
          <CourseDetails
            duration={course.duration}
            resources={course.resource}
          />
          <CourseCompletion />
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
