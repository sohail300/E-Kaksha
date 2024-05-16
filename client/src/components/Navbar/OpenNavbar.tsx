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
    navigate("/all-courses");
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
      <div
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontSize: "24px",
          height: "50px",
          textAlign: "center",
          width: "40%",
        }}
      >
        <a
          onClick={openStudent}
          style={{
            padding: "4px 20px",
            borderRadius: "5px",
            fontFamily: "Manrope, sans-serif",
            backgroundColor: "#1976d2",
            color: "white",
            cursor: "pointer",
          }}
        >
          Student
        </a>
        <a
          onClick={openAllcourses}
          style={{
            padding: "4px 20px",
            borderRadius: "5px",
            fontFamily: "Manrope, sans-serif",
            backgroundColor: "#1976d2",
            color: "white",
            cursor: "pointer",
          }}
        >
          All Courses
        </a>
      </div>
    </nav>
  );
};

export default OpenNavbar;
