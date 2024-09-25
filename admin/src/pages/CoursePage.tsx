// Payment succeeds -> 4242 4242 4242 4242 (USA)
// Payment succeeds -> 4000 0035 6000 0008 (India)
// Payment requires authentication -> 4000 0025 0000 3155
// Payment is declined -> 4000 0000 0000 9995

import { useNavigate, useParams } from "react-router-dom";
import CourseDetails from "../components/CoursePage/CourseDetails";
import Switch from "@mui/material/Switch";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { api } from "../utils/config.js";
import { useEffect, useState } from "react";
import ViewReviews from "../components/CoursePage/ViewReviews";
import Syllabus from "../components/CoursePage/Syllabus.js";
import Loader from "../components/Shimmer/Loader";
import Navbar from "../components/Navbar.js";
import { CoursePageInterface, Review } from "../types/interfaces.js";

function CoursePage() {
  const [course, setCourse] = useState<CoursePageInterface>({
    title: "",
    description: "",
    price: "",
    imagelink: "",
    duration: "",
    resource: "",
    sections: [
      {
        title: "",
        resources: "",
        videos: [
          {
            name: "",
            link: "",
          },
        ],
      },
    ],
  });

  const [checked, setChecked] = useState(true);
  const [reviews, setReviews] = useState<Review[]>();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  // UseEffect Functions
  async function callFunc() {
    try {
      const response = await api.get(`/course/id/${id}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      });
      setCourse(response.data.course);
    } catch (error) {
      console.log(error);
    }
  }

  async function getReviews() {
    const response = await api.get(`/course/review/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setReviews(response.data.reviews);
  }

  async function getProfile() {
    try {
      await api.get("/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      navigate("/");
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        await Promise.all([callFunc(), getReviews()]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    getProfile();
  }, []);

  function calcRating() {
    let rating = 0;
    const length = reviews?.length || 1;
    reviews?.forEach((item) => {
      rating = rating + item.rating;
    });
    return rating / length;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="bg-white rounded w-full pt-20">
        <div className="bg-gray-800 py-8 px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row">
            <img
              className="w-full sm:w-2/5 rounded-lg object-contain mb-6 sm:mb-0"
              src={course.imagelink}
              alt="image"
            />
            <div className="flex flex-col items-start justify-between w-full sm:px-8 text-white">
              <p className="text-2xl font-medium mb-4 sm:mb-0">
                {course.title}
              </p>
              <p className="mb-4 sm:mb-0">
                Price:
                <span className="font-semibold text-green-400 ml-2">
                  ₹{course.price}
                </span>
              </p>
              <p className="mt-4 text-justify mb-6 sm:mb-0">
                {course.description}
              </p>
              <div className="mb-4 sm:mb-0">
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
              </div>
              <div className="flex mt-4 sm:mt-4">
                <button
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200 mr-4"
                  onClick={() => navigate(`/courselearn/${id}`)}
                >
                  Watch Videos
                </button>
              </div>
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="mr-4">Reviews</div>
                <Switch
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="mr-4"
                />
                <div>Syllabus</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row px-4 md:px-8 py-4">
          <div className="w-full lg:w-3/4">
            {checked ? (
              <Syllabus syllabus={course.sections} />
            ) : (
              <ViewReviews reviews={reviews} />
            )}
          </div>
          <div className="w-full lg:w-1/4 lg:ml-4 mt-4 lg:mt-0 rounded-lg bg-gray-300 p-4 px-6 sticky h-fit top-24">
            <h2 className="text-left text-2xl font-medium ml-4">Details</h2>
            <CourseDetails
              duration={course.duration}
              resources={course.resource}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CoursePage;
