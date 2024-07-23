import express from "express";
import { authenticate } from "../middleware/auth";
import {
  adminLogin,
  postCourse,
  sendToken,
  verifyToken,
} from "../controller/admin";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/postCourse", authenticate, postCourse);

// Forgot Password
router.post("/send-token", sendToken);
router.post("/verify-token", verifyToken);

export default router;
