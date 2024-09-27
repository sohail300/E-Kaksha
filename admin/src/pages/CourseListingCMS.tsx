import { useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { api } from "../utils/config";
import Loader from "../components/Shimmer/Loader";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CourseCMS } from "../types/interfaces";
import { toast } from "react-toastify";

const CourseListingCMS = () => {
  const [courseArray, setCoursearray] = useState<CourseCMS[]>();
  const [adminId, setAdminId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleDelete = (id: string) => {
    onDelete(id);
    setIsOpen(false);
  };

  async function onDelete(id: string) {
    try {
      console.log(adminId);

      setIsLoading(true);

      if (adminId !== "66f36c0e9126145e73fdbc75") {
        toast.error(
          "You cannot delete a course from this account as this account is for showcase purpose. Make a different account of you own to delete courses."
        );
        return;
      }

      const response = await api.delete(`/admin/deleteCourse?courseId=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(response);
      if (response) {
        toast.success("Course has been deleted!");
      } else {
        toast.error("Course has not been deleted!");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      getCourses();
      setIsLoading(false);
    }
  }

  async function getProfile() {
    try {
      const response = await api.get("/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAdminId(response.data.id);
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
        <div className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8">
                Course Management
              </h1>
              <div className="mb-6 sm:mb-8">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-md inline-flex items-center transition duration-150 ease-in-out transform hover:scale-105"
                  onClick={() => navigate("/course/post")}
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  <span>Add New Course</span>
                </button>
              </div>
              <ul className="space-y-4 sm:space-y-6">
                {courseArray?.map((course) => (
                  <li
                    key={course._id}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div
                          className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 cursor-pointer mb-4 sm:mb-0"
                          onClick={() => navigate(`/course/${course._id}`)}
                        >
                          <img
                            className="h-24 w-24 rounded-lg object-cover shadow-md mb-4 sm:mb-0"
                            src={course.imagelink}
                            alt={course.title}
                          />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {course.title}
                            </h3>
                            <p className="text-gray-600 mb-2 text-justify">
                              {course.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:space-x-4">
                              <p className="text-gray-600 mb-2 sm:mb-0">
                                Price:{" "}
                                <span className="font-semibold text-indigo-600">
                                  ₹{course.price}
                                </span>
                              </p>
                              {/* <p className="text-gray-600">
                                Bought by:{" "}
                                <span className="font-semibold text-indigo-600">
                                  {course.boughtCount}
                                </span>
                              </p> */}
                            </div>
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

                          <div>
                            <button
                              onClick={() => setIsOpen(true)}
                              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <TrashIcon className="w-6 h-6 text-red-600" />
                            </button>

                            {isOpen && (
                              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                                <div className="bg-white p-4 sm:p-6 rounded-lg max-w-sm sm:max-w-md w-full">
                                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4">
                                    <h2 className="text-lg font-semibold mb-2">
                                      Are you absolutely sure?
                                    </h2>
                                    <p className="text-sm sm:text-base">
                                      This action cannot be undone. This will
                                      permanently delete the course and remove
                                      the data from our servers.
                                    </p>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      onClick={() => setIsOpen(false)}
                                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors text-sm sm:text-base"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleDelete(course._id)}
                                      className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
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
