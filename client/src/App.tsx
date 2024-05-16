import "./App.css";
import Appbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import StudentLogin from "./pages/student/Login";
import StudentRegister from "./pages/student/Register";
import AllCourses from "./pages/AllCourses";
import Purchasedcourse from "./pages/student/PurchasedCourses";
import Wishlist from "./pages/student/Wishlist";
import CoursePage from "./pages/CoursePage";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import PaymentCancelled from "./pages/student/PaymentCancelled";
import StudentForgotPassword from "./pages/student/StudentForgotPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import StudentProfile from "./pages/student/Profile";
import Contact from "./pages/student/SubmitContact";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route
              path="/student/purchased-courses"
              element={<Purchasedcourse />}
            />
            <Route path="/student/wishlist" element={<Wishlist />} />
            <Route path="/student/contact" element={<Contact />} />
            <Route
              path="/student/payment/success/"
              element={<PaymentSuccess />}
            />
            <Route
              path="/student/payment/cancelled"
              element={<PaymentCancelled />}
            />
            <Route
              path="/student/forgot-password"
              element={<StudentForgotPassword />}
            />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
