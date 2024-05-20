import express from "express";
import { authenticate } from "../middleware/auth";
import {
  changeName,
  deleteUser,
  getProfile,
  getPurchasedCourses,
  getWishlistCourses,
  hasBought,
  profilePhoto,
  sendToken,
  studentLogin,
  studentSignup,
  verifyToken,
} from "../controller/student";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

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

router.post("/has-bought", authenticate, hasBought);

router.post("/send-token", sendToken);

router.post("/verify-token", verifyToken);

router.put("/change-name", authenticate, changeName);

export default router;
