// Payment succeeds -> 4242 4242 4242 4242 (USA)
// Payment succeeds -> 4000 0035 6000 0008 (India)
// Payment requires authentication -> 4000 0025 0000 3155
// Payment is declined -> 4000 0000 0000 9995

import CourseDetails from "../components/CoursePage/CourseDetails.js";
import Switch from "@mui/material/Switch";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { api } from "../utils/config.js";
import { useEffect, useState } from "react";
import ViewReviews from "../components/CoursePage/ViewReviews.js";
import CourseCompletion from "../components/CoursePage/CourseCompletion.js";
import Syllabus from "../components/CoursePage/Syllabus.js";
import Loader from "../components/Shimmer/Loader.js";
import GiveReview from "../components/CoursePage/GiveReview.js";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

function CoursePage() {
  interface Sections {
    title: string;
    resources: string;
    videos: [
      {
        name: string;
        link: string;
      }
    ];
  }

  interface Course {
    title: string;
    description: string;
    price: number;
    imagelink: string;
    duration: number;
    resource: number;
    sections: [Sections];
  }

  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    price: 0,
    imagelink: "",
    duration: 0,
    resource: 0,
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
  const [reviews, setReviews] = useState([]);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigate = useNavigate();

  const [bought, setBought] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { id } = useParams();

  // UseEffect Functions
  async function callFunc() {
    try {
      const response = await api.get(`/course/id/${id}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data.course.sections);
      setCourse(response.data.course);
    } catch (error) {
      console.log(error);
    }
  }

  async function hasBought() {
    try {
      const response = await api.post(
        "/student/has-bought",
        { courseid: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBought(response.data.success);
    } catch (error) {
      console.log(error);
    }
  }

  async function hasWishlisted() {
    try {
      const response = await api.post(
        "/student/has-wishlisted",
        { courseid: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setWishlisted(response.data.success);
    } catch (error) {
      console.log(error);
    }
  }

  async function getReviews() {
    try {
      const response = await api.get(`/course/review/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        await Promise.all([
          callFunc(),
          hasBought(),
          hasWishlisted(),
          getReviews(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Other Functions
  async function checkout() {
    try {
      const response = await api.get("/student/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response) {
        const courseId = id;
        const response = await api.get(`/course/buy/${courseId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log("inside checkout");
        console.log(response.data);
        window.location.href = response.data.url;
      }
    } catch (error) {
      navigate("/student/login");
    }
  }

  async function wishlist() {
    try {
      setIsSubmiting(true);

      const response = await api.get("/student/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response) {
        const response = await api.post(`/course/wishlist/${id}`, null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response) {
          hasWishlisted();
        }
      }
    } catch (error) {
      navigate("/student/login");
    } finally {
      setIsSubmiting(false);
    }
  }

  async function removeWishlist() {
    try {
      setIsSubmiting(true);

      const response = await api.post(`/course/remove-wishlist/${id}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response) {
        hasWishlisted();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  }

  function calcRating() {
    let rating = 0;
    const length = reviews.length;
    reviews.forEach((item) => {
      rating = rating + item.rating;
    });
    return rating / length;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="  bg-white rounded w-full pt-20">
      <div className="bg-gray-800 py-8 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row">
          <img
            className="w-full sm:w-2/5 rounded-lg object-contain mb-6 sm:mb-0"
            src={course.imagelink}
            alt="image"
          />
          <div className="flex flex-col items-start justify-between w-full sm:px-8 text-white">
            <p className="text-2xl font-medium mb-4 sm:mb-0">{course.title}</p>
            <p className="mb-4 sm:mb-0">
              Price:
              <span className="font-semibold text-green-400 ml-2">
                ₹{course.price}
              </span>
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
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="mr-4">Reviews</div>
              <Switch
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mr-4"
              />
              <div>Syllabus</div>
            </div>
            <p className="mt-4 text-justify mb-6 sm:mb-0">
              {course.description}
            </p>

            <div className="flex mt-4 sm:mt-8">
              {bought ? (
                <>
                  <button
                    className="w-full sm:w-auto px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200 mr-4"
                    onClick={() => navigate(`/courselearn/${id}`)}
                  >
                    Watch Videos
                  </button>

                  <button
                    className="w-full sm:w-auto px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200"
                    onClick={() => setShowReviewModal(true)}
                  >
                    Give Review
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full sm:w-auto px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200 mr-4 sm:mr-6"
                    onClick={() => checkout()}
                  >
                    Buy Course
                  </button>
                  {wishlisted ? (
                    <button
                      className="flex flex-row justify-center items-center w-full sm:w-auto px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200"
                      onClick={() => removeWishlist()}
                    >
                      {isSubmiting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      <span>Remove from Wishlist</span>
                    </button>
                  ) : (
                    <button
                      className="flex flex-row justify-center items-center w-full sm:w-auto px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200"
                      disabled={isSubmiting}
                      onClick={() => wishlist()}
                    >
                      {isSubmiting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      <span>Add to Wishlist</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row px-4 md:px-8 py-4">
        <div className="w-full lg:w-3/4">
          {checked ? (
            <Syllabus syllabus={course.sections} />
          ) : (
            <ViewReviews reviews={reviews} className="flex flex-col" />
          )}
        </div>
        <div className="w-full lg:w-1/4 lg:ml-4 mt-4 lg:mt-0 rounded-lg bg-gray-300 p-4 px-6 sticky h-fit top-24">
          <h2 className="text-left text-2xl font-medium ml-4">Details</h2>
          <CourseDetails
            duration={course.duration}
            resources={course.resource}
          />
          <CourseCompletion courseId={id} />
        </div>
      </div>
      {showReviewModal && (
        <GiveReview
          courseid={id}
          onClose={() => setShowReviewModal(false)}
          getReviews={getReviews}
        />
      )}
    </div>
  );
}

export default CoursePage;
