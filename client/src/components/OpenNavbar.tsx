import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const OpenNavbar = () => {
  const navigate = useNavigate();

  function openAdmin() {
    navigate("/admin");
  }

  function openStudent() {
    navigate("/student");
  }

  function openAllcourses() {
    navigate("/allcourse");
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
        <a onClick={openAdmin} className="navlink-btn admin">
          Admin
        </a>
        <a onClick={openStudent} className="navlink-btn student">
          Student
        </a>
        <a onClick={openAllcourses} className="navlink-btn student">
          All Courses
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
      </div>
    </nav>
  );
};

export default OpenNavbar;
