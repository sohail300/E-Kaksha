import "./App.css";
import Appbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import StudentLogin from "./pages/student/Login";
import StudentRegister from "./pages/student/Register";
import AllCourses from "./pages/AllCourses";
import Purchasedcourse from "./pages/student/PurchasedCourses";
import Wishlist from "./pages/student/Wishlist";
import CoursePage from "./pages/CoursePage";
import CourseLearn from "./pages/CourseLearnPage";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import PaymentCancelled from "./pages/student/PaymentCancelled";
import StudentForgotPassword from "./pages/student/StudentForgotPassword";
import StudentChangePassword from "./pages/student/StudentChangePassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentProfile from "./pages/student/Profile";

function App() {
  return (
    <>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/courselearn/:id" element={<CourseLearn />} />
          <Route
            path="/student/purchased-courses"
            element={<Purchasedcourse />}
          />
          <Route path="/student/wishlist" element={<Wishlist />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/canceled" element={<PaymentCancelled />} />
          <Route
            path="/student/forgot-password"
            element={<StudentForgotPassword />}
          />
          <Route
            path="/reset-password/:token"
            element={<StudentChangePassword />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
