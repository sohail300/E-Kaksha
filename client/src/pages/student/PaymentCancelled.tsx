import CancelIcon from "@mui/icons-material/Cancel";
import imagepath from "../../assets/images/notebook.png";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6 px-24 bg-white rounded w-full pt-28 h-screen">
      <h1 className="text-center text-5xl font-bold text-red-500 mb-4">
        Payment Cancelled!
      </h1>
      <img src={imagepath} alt="image" className="h-80 my-8" />

      <button
        className="bg-gray-800 text-white px-4 py-2 font-medium rounded-md hover:bg-gray-900 mt-8"
        onClick={() => navigate("/")}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default PaymentCanceled;
