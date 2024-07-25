import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "@mui/icons-material";
import Cards from "../../components/Cards.js";
import CardSkeleton from "../../components/Shimmer/CardSkeleton.js";
import { api } from "../../utils/config.js";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlistArray, setWishlistarray] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function getWishlist() {
    setIsLoading(true);
    try {
      const response = await api.get("/student/wishlist", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setWishlistarray(response.data.wishlist);
      setFilteredList(response.data.wishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getProfile() {
    try {
      await api.get("/student/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      navigate("/student/login");
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
    getWishlist();
  }, []);

  function handleSearch(e) {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText);
    const tempList = wishlistArray.filter((list) =>
      list.title.toLowerCase().includes(searchText)
    );
    setFilteredList(tempList);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 py-12 pt-24 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-12"
        >
          <h1 className="text-4xl sm:text-4xl font-bold text-teal-800 mb-6 sm:mb-0">
            Your Wishlist
          </h1>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 bg-white text-teal-900 placeholder-teal-400 text-sm sm:text-base"
              placeholder="Search courses"
              value={search}
              onChange={handleSearch}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400" />
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredList.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Cards
                  id={item._id}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  imagelink={item.imagelink}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredList.length === 0 && !isLoading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center text-2xl text-teal-700 mt-12"
          >
            No courses in your wishlist. Add some courses first.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
