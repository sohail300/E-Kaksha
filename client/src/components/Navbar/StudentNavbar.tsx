import { useNavigate } from "react-router-dom";
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
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import { currUserState } from "../../store/atoms/admin.js";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isUserLoggedInState } from "../../store/atoms/user.js";
import { showContact } from "../../store/atoms/course.js";

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function openAllcourses() {
    navigate("/all-courses");
    setAnchorEl(null);
  }

  function openProfile() {
    navigate("/profile");
    setAnchorEl(null);
  }

  function openPurchasedcourses() {
    navigate("/student/purchased-courses");
    setAnchorEl(null);
  }

  function openWishlist() {
    navigate("/student/wishlist");
    setAnchorEl(null);
  }

  function openContact() {
    navigate("/student/contact");
    setAnchorEl(null);
  }

  function logout() {
    localStorage.setItem("token", null);
    navigate("/");
    setCurrUser(null);
    setIsUserLoggedIn(false);
  }

  async function submitContact() {
    const reponse = await api.post(
      "/user/contact",
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
    <>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          color: "black",
          margin: "0px",
          padding: "0px",
          width: "100vw",
          position: "sticky",
          top: "0px",
          zIndex: "10",
          boxSizing: "border-box",
          backdropFilter: "blur(2px) saturate(130%)",
          backgroundColor: "#262726",
        }}
      >
        <p
          className="logo"
          onClick={() => {
            navigate("/");
          }}
          style={{
            fontFamily: "Clash Display, Helvetica, Arial, sans-serif",
            fontWeight: "500",
            color: "#1976d2",
            fontSize: "28px",
            margin: "15px",
            marginLeft: "24px",
            cursor: "pointer",
          }}
        >
          E-Kaksha
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          <a
            onClick={openPurchasedcourses}
            style={{
              padding: "4px 20px",
              borderRadius: "5px",
              fontFamily: "Manrope, sans-serif",
              backgroundColor: "#1976d2",
              color: "white",
              cursor: "pointer",
            }}
          >
            Purchased Courses
          </a>

          <MenuIcon
            fontSize="large"
            onClick={handleClick}
            style={{
              color: "#fff",
              margin: "0px 48px 0px 16px",
              cursor: "pointer",
            }}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            style={{
              fontFamily: "Manrope, Helvetica, sans-serif, Arial",
            }}
          >
            <MenuItem onClick={openProfile} style={{ textAlign: "center" }}>
              <PersonIcon style={{ marginRight: "8px" }} />
              Profile
            </MenuItem>
            <MenuItem onClick={openAllcourses}>
              <AutoStoriesIcon style={{ marginRight: "8px" }} />
              All Courses
            </MenuItem>
            <MenuItem onClick={openWishlist}>
              <FavoriteIcon style={{ marginRight: "8px" }} />
              Wishlist
            </MenuItem>
            <MenuItem onClick={openContact}>
              <ContactPageIcon style={{ marginRight: "8px" }} />
              Contact Us
            </MenuItem>
            <MenuItem onClick={logout}>
              <LogoutIcon style={{ marginRight: "8px" }} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default StudentNavbar;
