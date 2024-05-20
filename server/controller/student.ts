import { User, Contact, Review, Course } from "../db/model";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import { transporter } from "../utils/transporter";
import { secretKey } from "../middleware/auth";
import jwt from "jsonwebtoken";
import z from "zod";
import { apiResponse } from "../types/apiResponse";
import { Request, Response } from "express";
import { signupInput } from "../zodTypes/signupInput";
import { forgotPasswordMailer } from "../utils/forgotPasswordMailer";
import { passwordInput } from "../zodTypes/passwordInput";
import { nameInput } from "../zodTypes/nameInput";
import { reviewInput } from "../zodTypes/reviewInput";
import { loginInput } from "../zodTypes/loginInput";
import mongoose from "mongoose";
import axios from "axios";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";
import storage from "../db/firebase";
import { emailInput } from "../zodTypes/emailInput";
import { verifyOtpInput } from "../zodTypes/verifyOtpInput";

export const studentSignup = async (req: Request, res: Response) => {
  try {
    const parsedInput = signupInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error.issues[0].message,
        success: false,
      });
    }

    const { name, email, password } = parsedInput.data;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(403)
        .json({ msg: "User already Exists", success: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const obj = {
        name,
        email,
        password: hashedPassword,
      };

      const newUser = new User(obj);
      await newUser.save();

      const token = jwt.sign({ id: newUser._id, role: "user" }, secretKey, {
        expiresIn: "2h",
      });

      return res
        .status(201)
        .json({ msg: "User registered", success: true, token });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const studentLogin = async (req: Request, res: Response) => {
  try {
    const parsedInput = loginInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error.issues[0].message,
        success: false,
      });
    }

    const { email, password } = parsedInput.data;

    const user = await User.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user._id, role: "user" }, secretKey, {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ msg: "User logged in", success: true, token: token });
      } else {
        return res
          .status(403)
          .json({ msg: "Invalid Credentials", success: false });
      }
    } else {
      return res
        .status(403)
        .json({ msg: "Invalid Credentials", success: false });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const getPurchasedCourses = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).populate("purchasedCourses");

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      return res.status(200).json({
        msg: "Purchased courses",
        success: true,
        purchasedCourses: user.purchasedCourses || [],
      });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const getWishlistCourses = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).populate("wishlist");

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      return res.status(200).json({
        msg: "Wishlist courses",
        success: true,
        wishlist: user.wishlist || [],
      });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).select("name email photoUrl -_id");

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      return res.status(200).json({
        msg: "User profile",
        success: true,
        user,
      });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const profilePhoto = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    console.log(id);
    const user = await User.findById(id);

    const file = req.file;
    console.log(file);

    const storageRef = ref(storage, "images/" + id);

    const contentType = "image/png";
    const uploadTask: UploadTask = uploadBytesResumable(
      storageRef,
      file.buffer,
      { contentType }
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        console.log("File uploaded successfully");
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        user.photoUrl = downloadURL;
        await user.save();
        return res
          .status(201)
          .json({ msg: "Profile photo updated", success: true });
      }
    );
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      const deletedUser = await User.findByIdAndDelete(id);
      const deletedReview = await Review.deleteMany({ userid: id });

      return res.status(201).json({ msg: "User deleted", success: true });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

//TODO Will this require the auth middleware or not
export const hasBought = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    const { courseid } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      const purchasedCourses = user.purchasedCourses;
      const success = purchasedCourses.includes(courseid);

      return res.status(200).json({ msg: "Email sent", success });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const sendToken = async (req: Request, res: Response) => {
  try {
    const parsedInput = emailInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error.issues[0].message,
        success: false,
      });
    }

    const { email } = parsedInput.data;

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      await forgotPasswordMailer(email);

      return res.status(500).json({ msg: "Email sent", success: true });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const parsedInput = verifyOtpInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error.issues[0].message,
        success: false,
      });
    }

    const { email, token, password } = parsedInput.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      if (
        user.forgotPasswordToken === token &&
        user.forgotPasswordTokenExpiryDate !== null &&
        user.forgotPasswordTokenExpiryDate.getTime() >= Date.now()
      ) {
        user.forgotPasswordToken = null;
        user.forgotPasswordTokenExpiryDate = null;

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res
          .status(200)
          .json({ msg: "Password changed successfully", success: true });
      } else {
        return res.status(200).json({ msg: "Invalid Token", success: false });
      }
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const changeName = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id);

    const parsedInput = nameInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error.issues[0].message,
        success: false,
      });
    }

    const { name } = parsedInput.data;

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      user.name = name;
      await user.save();
      return res.status(200).json({ msg: "Name changed", success: true });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};
