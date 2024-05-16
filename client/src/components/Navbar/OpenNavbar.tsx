import { Link, useNavigate } from "react-router-dom";

const OpenNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full p-2 z-10 md:p-4 shadow-md bg-gray-800 text-white">
      <div className="mx-auto flex flex-row md:flex-row justify-between items-center px-10">
        <div
          className="cursor-pointer text-3xl font-bold"
          onClick={() => navigate("/")}
        >
          E-Kaksha
        </div>

        <>
          <div className="flex justify-between items-center text-xl w-1/5">
            <Link
              to={"/student/login"}
              className="px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200"
            >
              Student
            </Link>
            <Link
              to={"/all-courses"}
              className="px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200"
            >
              All Courses
            </Link>
          </div>
        </>
      </div>
    </nav>
  );
};

export default OpenNavbar;
