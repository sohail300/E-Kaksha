import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { currUserState } from "../store/atoms/admin";
import { useSetRecoilState } from "recoil";

const AdminNavbar = () => {
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
    navigate("/all-courses");
    setAnchorEl(null);
  }

  function openAddcourses() {
    navigate("/addcourse");
    setAnchorEl(null);
  }

  function openProfile() {
    navigate("/admin-profile");
    setAnchorEl(null);
  }

  function openContactInfo() {
    navigate("/contact");
    setAnchorEl(null);
  }

  function logout() {
    localStorage.setItem("token", null);
    navigate("/");
    setCurrUser(null);
    setAnchorEl(null);
  }

  return (
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
          <MenuItem onClick={openAddcourses}>
            <AddCircleOutlineIcon style={{ marginRight: "8px" }} />
            Add Courses
          </MenuItem>
          <MenuItem onClick={openContactInfo}>
            <ContactPageIcon style={{ marginRight: "8px" }} />
            Contact Info
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

export default AdminNavbar;
