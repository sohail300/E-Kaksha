import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";

const sampleCourses = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the basics of React and build your first app",
    price: 49.99,
    imagelink: "/api/placeholder/400/320",
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into advanced JavaScript features and patterns",
    price: 79.99,
    imagelink: "/api/placeholder/400/320",
  },
];

const CourseListingCMS = () => {
  const [courses, setCourses] = useState(sampleCourses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
              Course Management
            </h1>
            <div className="mb-8">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md inline-flex items-center transition duration-150 ease-in-out transform hover:scale-105">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>Add New Course</span>
              </button>
            </div>
            <ul className="space-y-6">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
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
                              ${course.price}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
                          <PencilIcon className="w-6 h-6" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out">
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
  );
};

export default CourseListingCMS;
