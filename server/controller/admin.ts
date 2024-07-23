import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { Request, Response } from "express";
import { loginInput } from "../zodTypes/loginInput";
import { Admin, Course } from "../db/model";
import dotenv from "dotenv";
import { passwordInput } from "../zodTypes/passwordInput";
import { emailInput } from "../zodTypes/emailInput";
import { forgotPasswordMailer } from "../utils/forgotPasswordMailer";
import { adminForgotPasswordMailer } from "../utils/adminForgotPasswordMailer";
import { verifyOtpInput } from "../zodTypes/verifyOtpInput";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const parsedInput = loginInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(403).json({ msg: "User doesnt exist" });
    } else {
      const match = await bcrypt.compare(password, admin.password);

      if (match) {
        const token = jwt.sign({ id: admin._id, role: "admin" }, secretKey, {
          expiresIn: "3h",
        });
        return res.status(200).json(token);
      } else {
        return res.status(403).json({ msg: "Invalid Credentials" });
      }
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
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

    const admin = await Admin.findOne({ email });
    console.log(admin);

    if (!admin) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      await adminForgotPasswordMailer(res, email);
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

    const user = await Admin.findOne({ email });

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

export const postCourse = async (req: Request, res: Response) => {
  try {
    const newCourse = new Course(req.body);
    console.log(req.body);
    await newCourse.save();

    return res
      .status(201)
      .json({ msg: "Course created successfully", courseId: newCourse.id });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};
