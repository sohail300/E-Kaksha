import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { currUserState } from "../store/atoms/admin";
import { useRecoilValue, useSetRecoilState } from "recoil";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const setCurrUser = useSetRecoilState(currUserState);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function openAllcourses() {
    navigate("/allcourse");
    setAnchorEl(null);
  }

  function openProfile() {
    navigate("/profile");
    setAnchorEl(null);
  }

  function openPurchasedcourses() {
    navigate("/purchasedcourse");
    setAnchorEl(null);
  }

  function openWishlist() {
    navigate("/wishlist");
    setAnchorEl(null);
  }

  function openContact() {
    navigate("/contact");
    setAnchorEl(null);
  }

  function logout() {
    localStorage.setItem("token", null);
    setCurrUser(null);
    navigate("/");
    setAnchorEl(null);
  }

  return (
    <nav className="navbar">
      <p
        className="logo"
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      >
        E-Kaksha
      </p>
      <div className="nav-links">
        <a onClick={openPurchasedcourses} className="navlink-btn student">
          My Courses
        </a>
        <div
          className="navlink-btn student"
          style={{
            backgroundColor: "#464647",
            display: "flex",
            justifyContent: "center",
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
            variant="standard"
            placeholder="Search..."
            fullWidth={false}
          />
        </div>
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
  );
};

export default StudentNavbar;
