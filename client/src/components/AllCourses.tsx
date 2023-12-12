import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./AllCourses.css";
import CardSkeleton from "./CardSkeleton";
import Cards from "./Cards.js";
import { baseURL } from "./config.js";
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
  },[]);

  function handleSearch(e) {
    const searchText = e.target.value;
    setSearch(searchText);
    const tempList = courseArray.filter((list) =>
      list.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(tempList);
  }

  return (
    <>
      <main style={{ height: "100vh" }}>
        <h1 id="allcourse-heading" style={{ color: "#000" }}>
          All courses
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

        {/* <div style={{color:"#000"}}>Loading...</div> */}
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
          <div id="allcourse-div">
            {filteredList.map((item, index) => {
              return (
                <>
                  <Cards
                    key={index}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    imagelink={item.imagelink}
                  />
                </>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
};

export default Allcourse;
