import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./Wishlist.css";
import Cards from "./Cards";
import { baseURL } from "./config.js";
import axios from "axios";
import CardSkeleton from "./CardSkeleton";

const Wishlist = () => {
  const [wishlistArray, setWishlistarray] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const api = axios.create({
    baseURL,
  });

  async function getWishlist() {
    const response = await api.get("/user/wishlist", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setWishlistarray(response.data.wishlist);
    setFilteredList(response.data.wishlist);
    setIsLoading(false);
  }

  useEffect(() => {
    getWishlist();
  }, []);

  function handleSearch(e) {
    const searchText = e.target.value;
    setSearch(searchText);
    const tempList = wishlistArray.filter((list) =>
      list.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(tempList);
  }

  return (
    <>
      <h1 id="wishlist-heading" style={{ color: "#000" }}>
        Wishlist courses
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
        <div id="wishlist-div">
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

export default Wishlist;
