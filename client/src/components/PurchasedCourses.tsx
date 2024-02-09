import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./PurchasedCourses.css";
import Cards from "./Cards.tsx";
import CardSkeleton from "./CardSkeleton.tsx";
import { baseURL } from "../utils/config.js";
import axios from "axios";

const Purchasedcourse = () => {
  const [purchasedcourseArray, setPurchasedcoursearray] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const api = axios.create({
    baseURL,
  });

  async function getPurchased() {
    const response = await api.get("/user/purchasedcourses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setPurchasedcoursearray(response.data.purchasedCourses);
    setFilteredList(response.data.purchasedCourses);
    setIsLoading(false);
  }

  useEffect(() => {
    getPurchased();
  },[]);

  function handleSearch(e) {
    const searchText = e.target.value;
    setSearch(searchText);
    const tempList = purchasedcourseArray.filter((list) =>
      list.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(tempList);
  }

  return (
    <>
      <h1 id="purchasedcourse-heading" style={{ color: "#000" }}>
        My Courses
      </h1>
      <div
        className="navlink-btn student"
        style={{
          backgroundColor: "#464647",
          position: "absolute",
          top: "108px",
          right: "20px",
          width: "20%",
          display: "flex",
          justifySelf: "end",
          alignSelf: "self-end",
          alignItems: "center",
        }}
      >
        <SearchIcon
          fontSize="large"
          style={{ color: "#fff", margin: "0px 16px", cursor: "pointer" }}
        />
        <TextField
          id="standard-basic"
          label=""
          variant="outlined"
          placeholder="Search..."
          fullWidth={false}
          size="small"
          value={search}
          onChange={handleSearch}
        />
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "100vw",
            margin: "0px",
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div id="purchasedcourse-div">
          {filteredList.map((item, index) => {
            return (
              <Cards
                key={index}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                imagelink={item.imagelink}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Purchasedcourse;
