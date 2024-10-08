import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const OpenNavbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full p-2 md:p-4 shadow-md bg-gray-800 text-white z-50">
      <div className="mx-auto flex flex-wrap justify-between items-center px-4 md:px-10">
        <div
          className="cursor-pointer text-2xl md:text-3xl font-bold"
          onClick={() => navigate("/")}
        >
          E-Kaksha
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } md:max-h-screen md:opacity-100 overflow-hidden transition-all duration-300 ease-in-out w-full md:flex md:w-auto md:items-center`}
        >
          <div className="flex flex-col md:flex-row justify-end items-end md:items-center text-base md:text-xl">
            <Link
              to={""}
              onClick={() => {
                window.location.href = "http://admin.e-kaksha.heysohail.me/";
              }}
              className="px-4 py-2 text-white font-medium hover:text-gray-300 my-2 md:border-white md:border rounded-md md:my-0 md:mx-2 transition duration-300"
            >
              Admin
            </Link>
            <Link
              to={"/student/login"}
              className="px-4 py-2 text-white font-medium hover:text-gray-300 my-2 md:border-white md:border rounded-md md:my-0 md:mx-2 transition duration-300"
            >
              Student
            </Link>
            <Link
              to={"/all-courses"}
              className="px-4 py-2 text-white font-medium hover:text-gray-300 my-2 md:border-white md:border rounded-md md:my-0 md:mx-2 transition duration-300"
            >
              All Courses
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OpenNavbar;
