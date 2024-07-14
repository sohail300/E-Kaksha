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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const open = Boolean(anchorEl);
  const setCurrUser = useSetRecoilState(currUserState);
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);

  const api = axios.create({
    baseURL,
  });

  async function submitContact() {
    const response = await api.post(
      "/student/contact",
      { describe },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    alert("Submitted!");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full p-2 z-10 md:p-4 shadow-md bg-gray-800 text-white">
      <div className="mx-auto flex flex-wrap justify-between items-center px-4 md:px-10">
        <div
          className="cursor-pointer text-2xl md:text-3xl font-bold"
          onClick={() => navigate("/")}
        >
          E-Kaksha
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMenu}
        >
          <MenuIcon fontSize="large" />
        </button>

        <div
          className={`${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } md:max-h-screen md:opacity-100 overflow-hidden transition-all duration-300 ease-in-out w-full md:flex md:w-auto md:items-center`}
        >
          <div className="flex flex-col md:flex-row justify-end items-end md:items-center text-base md:text-xl">
            <MenuIcon
              fontSize="large"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
              className="cursor-pointer text-white my-2 md:my-0 md:ml-4"
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
                  setIsMenuOpen(false);
                }}
              >
                <PersonIcon className="mr-2" />
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/student/purchased-courses");
                  setAnchorEl(null);
                  setIsMenuOpen(false);
                }}
              >
                <AutoStoriesIcon className="mr-2" />
                Purchased Courses
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/all-courses");
                  setAnchorEl(null);
                  setIsMenuOpen(false);
                }}
              >
                <AutoStoriesIcon className="mr-2" />
                All Courses
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/student/wishlist");
                  setAnchorEl(null);
                  setIsMenuOpen(false);
                }}
              >
                <FavoriteIcon className="mr-2" />
                Wishlist
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.setItem("token", null);
                  navigate("/");
                  setCurrUser(null);
                  setIsUserLoggedIn(false);
                  setIsMenuOpen(false);
                }}
              >
                <LogoutIcon className="mr-2" />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
