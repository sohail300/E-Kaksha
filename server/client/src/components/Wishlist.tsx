import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Cards from "./Cards.js";
import { baseURL } from "../utils/config.js";
import axios from "axios";
import CardSkeleton from "./CardSkeleton.js";

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
      <h1
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "0px",
          fontSize: "48px",
          color: "#000",
          width: "100vw",
          fontFamily: "Manrope, Helvetica, sans-serif, Arial",
        }}
      >
        Wishlist
      </h1>

      <div
        style={{
          position: "absolute",
          top: "108px",
          right: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          id="standard-basic"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearch}
          style={{
            color: "#000",
            outline: "none",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        />
        <SearchIcon
          fontSize="large"
          style={{ color: "#000", cursor: "pointer", marginLeft: "16px" }}
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
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
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
    </>
  );
};

export default Wishlist;
