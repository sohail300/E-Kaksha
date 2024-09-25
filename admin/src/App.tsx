import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import CourseListingCMS from "./pages/CourseListingCMS";
import AddCourseForm from "./pages/PostCourse";
import AdminChangePassword from "./pages/ChangePassword";
import AdminForgotPassword from "./pages/ForgotPassword";
import CoursePage from "./pages/CoursePage";
import EditCourseForm from "./pages/EditCourse";
import CourseLearn from "./pages/CourseLearn";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<AdminForgotPassword />} path="/forgot-password" />
        <Route
          element={<AdminChangePassword />}
          path="/change-password/:token"
        />
        <Route element={<CourseListingCMS />} path="/cms" />
        <Route element={<CoursePage />} path="/course/:id" />
        <Route element={<AddCourseForm />} path="/course/post" />
        <Route element={<EditCourseForm />} path="/course/edit/:id" />
        <Route element={<CourseLearn />} path="/courselearn/:id" />
      </Routes>
    </>
  );
}

export default App;
