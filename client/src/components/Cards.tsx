import { useNavigate } from "react-router-dom";

const Cards = ({ id, title, description, price, imagelink }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden border-gray-500 border">
      <img
        className="w-full object-cover rounded-t-lg"
        src={imagelink}
        alt="image link"
      />
      <div className="p-4 flex flex-col bg-gray-200 ">
        <div className="flex justify-between mb-2">
          <span className="text-lg font-bold text-black">{title}</span>
          <span className="text-green">Price: ₹{price}</span>
        </div>
        <div className="text-justify overflow-y-auto h-40 scrollbar-thin scrollbar-thumb-gray-200">
          {description}
        </div>
        <button
          className="purchase-btn mt-auto bg-blue-500 text-white rounded-md px-4 py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => navigate(`/course/${id}`)}
        >
          View Course
        </button>
      </div>
    </div>
  );
};

export default Cards;
