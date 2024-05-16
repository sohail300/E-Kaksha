import express from "express";
import { z } from "zod";
import { authenticate, secretKey } from "../middleware/auth";
import {
  changeEmail,
  changePassword,
  deleteUser,
  getProfile,
  getPurchasedCourses,
  getWishlistCourses,
  hasBought,
  profile,
  profilePhoto,
  sendOTP,
  userLogin,
  userSignup,
  verifyOTP,
} from "../controller/user";
import { Review, User } from "../db/model";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/purchasedcourses", authenticate, getPurchasedCourses);

router.get("/wishlist", authenticate, getWishlistCourses);

const reviewInput = z.object({
  description: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(100),
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];
    const description = req.body.describe;
    const user = await User.findById(id);

    const obj = {
      userid: id,
      description: description,
      username: user.name,
      email: user.email,
    };

    const newReview = new Review(obj);
    await newReview.save();

    console.log("Review Saved!");
    return res.status(201).json({ msg: "Review Saved!" });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
});

router.get("/profile", authenticate, getProfile);

router.put("/profile", authenticate, profile);

router.put("/profile/photo", authenticate, profilePhoto);

router.delete("/delete", authenticate, deleteUser);

router.post("/has-bought", authenticate, hasBought);

router.get("/sendotp", authenticate, sendOTP);

router.post("/verifyotp", authenticate, verifyOTP);

router.put("/change-password", authenticate, changePassword);

router.put("/change-email", authenticate, changeEmail);

export default router;
