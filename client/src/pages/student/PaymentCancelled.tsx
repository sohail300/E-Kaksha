import imagepath from "../../assets/images/notebook.png";
import { useNavigate } from "react-router-dom";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 mb-4 sm:mb-6">
        Payment Cancelled!
      </h1>
      <div className="flex justify-center">
        <img
          src={imagepath}
          alt="Cancelled payment"
          className="h-40 sm:h-60 md:h-80 my-4 sm:my-6 md:my-8 object-contain"
        />
      </div>
      <button
        className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 mt-4 sm:mt-6 md:mt-8 transition duration-300 ease-in-out"
        onClick={() => navigate("/")}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default PaymentCanceled;
