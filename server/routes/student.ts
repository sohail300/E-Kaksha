import express from "express";
import { authenticate } from "../middleware/auth";
import {
  changeName,
  deleteUser,
  getProfile,
  getPurchasedCourses,
  getWishlistCourses,
  hasBought,
  hasWishlisted,
  profilePhoto,
  sendToken,
  studentLogin,
  studentMe,
  studentSignup,
  verifyToken,
} from "../controller/student";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get("/me", authenticate, studentMe);

router.post("/signup", studentSignup);

router.post("/login", studentLogin);

router.get("/purchased-courses", authenticate, getPurchasedCourses);

router.get("/wishlist", authenticate, getWishlistCourses);

router.get("/profile", authenticate, getProfile);

router.post(
  "/profile/photo",
  authenticate,
  upload.single("file"),
  profilePhoto
);

router.delete("/delete", authenticate, deleteUser);

router.put("/change-name", authenticate, changeName);

router.post("/has-bought", authenticate, hasBought);

router.post("/has-wishlisted", authenticate, hasWishlisted);

// Forgot Password
router.post("/send-token", sendToken);

router.post("/verify-token", verifyToken);

export default router;
