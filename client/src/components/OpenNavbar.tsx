import { useNavigate } from "react-router-dom";

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
      </div>
    </nav>
  );
};

export default OpenNavbar;
