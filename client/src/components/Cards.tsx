import { useNavigate } from "react-router-dom";

const Cards = ({ id, title, description, price, imagelink }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg shadow-lg overflow-hidden border-2 border-purple-300 flex flex-col h-full transform transition duration-300 hover:scale-105">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={imagelink} alt={title} />
        <div className="absolute top-0 right-0 bg-[#1f2937] text-white px-3 py-1 rounded-bl-lg">
          ₹{price}
        </div>
      </div>
      <div className="p-4 flex flex-col bg-gradient-to-br from-purple-50 to-pink-50 flex-grow">
        <h2 className="text-xl font-bold text-[#1f2937] mb-2">{title}</h2>
        <div className="text-justify overflow-y-auto h-32 sm:h-40 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-purple-100 mb-4 text-sm sm:text-base text-gray-700">
          {description}
        </div>
        <button
          className="mt-auto bg-[#1f2937] text-white rounded-full px-6 py-2 font-medium hover:bg-[#374151] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1f2937] text-sm sm:text-base transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={() => navigate(`/course/${id}`)}
        >
          Explore Course
        </button>
      </div>
    </div>
  );
};

export default Cards;
