import express from "express";
import { authenticate } from "../middleware/auth";
import {
  addToWishlist,
  buyCourse,
  getAllCourses,
  getCertificate,
  getCourse,
  getReviews,
  giveReview,
  removeFromWishlist,
  webhookStripe,
} from "../controller/course";

const router = express.Router();

router.get("/all", getAllCourses);

router.get("/id/:id", getCourse);

router.post("/wishlist/:courseId", authenticate, addToWishlist);

router.post("/remove-wishlist/:courseId", authenticate, removeFromWishlist);

router.get("/completion/certificate", authenticate, getCertificate);

router.post("/review", authenticate, giveReview);

router.get("/review/:id", getReviews);

router.get("/buy/:courseId", authenticate, buyCourse);

router.post("/webhook", webhookStripe);

export default router;
