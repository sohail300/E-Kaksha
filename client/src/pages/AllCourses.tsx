import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import CardSkeleton from "../components/Shimmer/CardSkeleton.js";
import Cards from "../components/Cards.js";
import { baseURL } from "../utils/config.js";
import axios from "axios";

const Allcourse = () => {
  const [courseArray, setCoursearray] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const api = axios.create({
    baseURL,
  });

  async function getCourses() {
    const response = await api.get("/course/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setCoursearray(response.data.course);
    setFilteredList(response.data.course);
    setIsLoading(false);
  }

  useEffect(() => {
    getCourses();
  }, []);

  function handleSearch(e) {
    const searchText = e.target.value;
    setSearch(searchText);
    const tempList = courseArray.filter((list) =>
      list.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(tempList);
  }

  return (
    <div className=" p-6 px-24 bg-white rounded w-full pt-28">
      <div className=" flex flex-row justify-between items-center">
        <div className="text-black ">Logged in as user</div>

        <h1 className="text-5xl font-bold text-black ">All courses</h1>

        <div className=" flex items-center justify-end">
          <input
            type="text"
            className="outline-none w-2/5 border-black rounded-md px-3 py-2 text-black border bg-white"
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          <SearchIcon
            className="ml-4 text-black cursor-pointer "
            fontSize="large"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 border mt-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-8">
          {filteredList.map((item, index) => (
            <Cards
              key={index}
              id={item._id}
              title={item.title}
              description={item.description}
              price={item.price}
              imagelink={item.imagelink}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Allcourse;
