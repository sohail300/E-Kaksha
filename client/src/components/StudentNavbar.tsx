import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/config.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import { currUserState } from "../store/atoms/admin.js";
import { useSetRecoilState,useRecoilValue } from "recoil";
import { isUserLoggedInState } from "../store/atoms/user.js";
import { showContact } from "../store/atoms/course.js";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const [describe, setDescribe] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const setCurrUser = useSetRecoilState(currUserState);
  // const currIsUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsUserLoggedIn = useSetRecoilState(isUserLoggedInState);
  const currShowContact = useRecoilValue(showContact);
  const setShowContact = useSetRecoilState(showContact);

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
    setShowContact(true);
    setAnchorEl(null);
    console.log(currShowContact)
  }
  
  function logout() {
    localStorage.setItem("token", null);
    navigate("/");
    setCurrUser(null);
    setAnchorEl(null);
    setIsUserLoggedIn(false);
  }

  async function submitContact() {
    const reponse = await api.post(
      "user/contact",
      { describe },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    console.log(reponse.data);
    alert("Submitted!");
    setShowContact(false);
    console.log(currShowContact)
  }

  async function closeContact() {
    setShowContact(false);
  }

  return (
    <>
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
        <div className="student-nav-links nav-links">
          <a onClick={openPurchasedcourses} className="navlink-btn student">
            My Courses
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

      {currShowContact && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            height: "30vh",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
            zIndex: "1"
          }}
        >

          <div >
            <DisabledByDefaultIcon style={{position:"absolute", right:"12px",cursor:"pointer", color:"#DC3545"}} onClick={closeContact}/>
          </div>
          <span style={{ display: "flex", alignSelf: "center" }}>
            Mail at <a href="mailto:sohailatwork10@gmail.com" style={{cursor:"pointer", color:"#0000EE", textDecoration:"none", marginLeft: "6px"}}>sohailatwork10@gmail.com</a>
          </span>
          <span style={{ display: "flex", alignSelf: "center", color:"#464646" }}>
            ---------------------OR---------------------
            </span>
          <TextareaAutosize
            minRows={5}
            placeholder="Comments Here..."
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
            style={{ backgroundColor: "#fff", width: "99%", color: "#000" }}
          />
          <Button
            variant="contained"
            onClick={submitContact}
            style={{ textAlign: "center", alignSelf: "center" }}
          >
            Submit
          </Button>
        </div>
      )}
    </>
  );
};

export default StudentNavbar;
