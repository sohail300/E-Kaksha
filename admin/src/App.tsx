import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Navbar from "./components/Navbar";
import CourseListingCMS from "./pages/CourseListingCMS";
import AddCourseForm from "./pages/PostCourse";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<CourseListingCMS />} path="/cms" />
        <Route element={<AddCourseForm />} path="/post" />
      </Routes>
    </>
  );
}

export default App;
