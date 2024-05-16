import express from "express";
import dotenv from "dotenv";
import { authenticate, secretKey } from "../middleware/auth";
import {
  adminLogin,
  adminSignup,
  changeEmail,
  changePassword,
  deleteUser,
  getContacts,
  getProfile,
  postCourse,
  profile,
  profilePhoto,
  sendOTP,
  verifyOTP,
} from "../controller/admin";

const router = express.Router();

dotenv.config();

router.post("/signup", adminSignup);

// type LoginParams= z.infer<typeof loginInput>
router.post("/login", adminLogin);

router.post("/course", authenticate, postCourse);

router.get("/contact", authenticate, getContacts);

router.get("/profile", authenticate, getProfile);

router.put("/profile", authenticate, profile);

router.put("/profile/photo", authenticate, profilePhoto);

router.delete("/delete", authenticate, deleteUser);

router.get("/sendotp", authenticate, sendOTP);

router.post("/verifyotp", authenticate, verifyOTP);

router.put("/change-password", authenticate, changePassword);

router.put("/change-email", authenticate, changeEmail);

export default router;