import { useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { api } from "../utils/config";
import Loader from "../components/Shimmer/Loader";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CourseCMS } from "../types/interfaces";

const CourseListingCMS = () => {
  const [courseArray, setCoursearray] = useState<CourseCMS[]>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function getCourses() {
    setIsLoading(true);
    try {
      const response = await api.get("/course/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setCoursearray(response.data.allCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      setIsLoading(true);
      const response = await api.delete(`/admin/deleteCourse?courseId=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(response);
      if (response) {
        alert("Course has been deleted!");
      } else {
        alert("Course has not been deleted!");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      getCourses();
    }
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
    getProfile();
    getCourses();
  }, []);

  if (isLoading) {
    <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
                Course Management
              </h1>
              <div className="mb-8">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md inline-flex items-center transition duration-150 ease-in-out transform hover:scale-105"
                  onClick={() => navigate("/course/post")}
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  <span>Add New Course</span>
                </button>
              </div>
              <ul className="space-y-6">
                {courseArray?.map((course) => (
                  <li
                    key={course._id}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center space-x-6 cursor-pointer"
                          onClick={() => navigate(`/course/${course._id}`)}
                        >
                          <img
                            className="h-24 w-24 rounded-lg object-cover shadow-md"
                            src={course.imagelink}
                            alt={course.title}
                          />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {course.title}
                            </h3>
                            <p className="text-gray-600 mb-2">
                              {course.description}
                            </p>
                            <p className="text-gray-600">
                              Price:{" "}
                              <span className="font-semibold text-indigo-600">
                                ₹{course.price}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
                            onClick={() =>
                              navigate(`/course/edit/${course._id}`)
                            }
                          >
                            <PencilIcon className="w-6 h-6" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                            onClick={() => handleDelete(course._id)}
                          >
                            <TrashIcon className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseListingCMS;
