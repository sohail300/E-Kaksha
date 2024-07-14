import imagepath from "../../assets/images/notebook.png";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500 mb-4 sm:mb-6">
          Payment Successful!
        </h1>
        <div className="flex justify-center">
          <img
            src={imagepath}
            alt="image"
            className="h-40 sm:h-60 md:h-80 my-4 sm:my-6 md:my-8 object-contain"
          />
        </div>
        <button
          className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 mt-4 sm:mt-6 md:mt-8 transition duration-300 ease-in-out"
          onClick={() => navigate("/student/purchased-courses")}
        >
          View Purchased Courses
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
