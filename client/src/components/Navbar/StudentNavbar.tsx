import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/config.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { currUserState } from "../../store/atoms/admin.js";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isUserLoggedInState } from "../../store/atoms/user.js";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const [describe, setDescribe] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const setCurrUser = useSetRecoilState(currUserState);
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  const api = axios.create({
    baseURL,
  });

  async function submitContact() {
    const reponse = await api.post(
      "/student/contact",
      { describe },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(reponse);
    alert("Submitted!");
  }

  return (
    <nav className="fixed top-0 w-full p-2 z-10 md:p-4 shadow-md bg-gray-800 text-white">
      <div className="mx-auto flex flex-row md:flex-row justify-between items-center px-10">
        <div
          className="cursor-pointer text-3xl font-bold"
          onClick={() => navigate("/")}
        >
          E-Kaksha
        </div>

        <>
          <div className="flex justify-around items-center text-xl w-1/4">
            <Link
              to={"/student/purchased-courses"}
              className="px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-200"
              onClick={() => setAnchorEl(null)}
            >
              Purchased Courses
            </Link>
            <MenuIcon
              fontSize="large"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
              className=" cursor-pointer text-white ml-4 mr-12 mb-0 mt-0"
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => {
                setAnchorEl(null);
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/student/profile");
                  setAnchorEl(null);
                }}
                className=" text-center"
              >
                <PersonIcon className=" mr-2" />
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/all-courses");
                  setAnchorEl(null);
                }}
              >
                <AutoStoriesIcon className=" mr-2" />
                All Courses
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/student/wishlist");
                  setAnchorEl(null);
                }}
              >
                <FavoriteIcon className=" mr-2" />
                Wishlist
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/student/contact");
                  setAnchorEl(null);
                }}
              >
                <ContactPageIcon className=" mr-2" />
                Contact Us
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.setItem("token", null);
                  navigate("/");
                  setCurrUser(null);
                  setIsUserLoggedIn(false);
                }}
              >
                <LogoutIcon className=" mr-2" />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </>
      </div>
    </nav>
  );
};

export default StudentNavbar;
