import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import {
  adminLogin,
  adminMe,
  adminRegister,
  deleteCourse,
  editCourse,
  postCourse,
  sendToken,
  verifyToken,
} from "../controller/admin";
import multer from "multer";

const router = express.Router();

// Create the Multer instance
const upload = multer();

router.get("/me", authenticate, adminMe);
router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.post("/postCourse", authenticate, upload.single("image"), postCourse);
router.put(
  "/editCourse/:courseId",
  authenticate,
  upload.single("image"),
  editCourse
);
router.delete("/deleteCourse", authenticate, deleteCourse);
// Forgot Password
router.post("/send-token", sendToken);
router.post("/verify-token", verifyToken);

export default router;
