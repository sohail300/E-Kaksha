import { User, Admin, Course, Contact } from "../db/model";
import bcrypt from "bcrypt";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { authenticate, secretKey } from "../middleware/auth";

const saltRounds = 10;
const router = express.Router();

dotenv.config();

const signupInput = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(30)
    .email("Please enter a valid email."),
  password: z.string().min(6, { message: "Minimum 6 characters." }).max(20),
});

// Admin routes
router.post("/signup", async (req, res) => {
  try {
    const parsedInput = signupInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const user = await Admin.findOne({ email });

    if (user) {
      return res.status(403).send("User already Exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const obj = {
        email: email,
        password: hashedPassword,
      };
      const newAdmin = new Admin(obj);
      await newAdmin.save();
      console.log("Admin saved");

      const token = jwt.sign({ id: newAdmin._id, role: "admin" }, secretKey, {
        expiresIn: "1h",
      });

      return res.status(201).json(token);
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const parsedInput = signupInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(403).send("User doesnt exist");
    } else {
      const match = await bcrypt.compare(password, admin.password);

      if (match) {
        const token = jwt.sign({ id: admin._id, role: "admin" }, secretKey, {
          expiresIn: "1h",
        });
        return res.status(200).json(token);
      } else {
        return res.status(403).send("Invalid Credentials");
      }
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

function generateOtp() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post("/sendotp", async (req, res) => {
  const email = req.body.email;
  const admin = Admin.findOne({ email: email });

  if (!admin) {
    return res.status(403).send("User doesnt exist");
  } else {
    const otp = generateOtp();
    const info = await transporter.sendMail({
      from: `"E-Kaksha" <ekaksha2001@gmail.com>`,
      to: `${email}`,
      subject: "OTP Verification",
      html: `Your <b>E-Kaksha</b> verification code is: <b>${otp}</b>`,
    });
    console.log("Message sent:", info.messageId);
    console.log("1");
    res.status(200).json({ email: email, otp: otp });
  }
});

const passwordInput = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters." }).max(20),
});

router.post("/changepassword", async (req, res) => {
  const parsedInput = passwordInput.safeParse(req.body);

  if (parsedInput.success === false) {
    return res.status(411).json({
      msg: parsedInput.error,
    });
  }

  const email = req.body.sentemail;
  const password = parsedInput.data.password;

  const admin = await Admin.findOne({ email: email });

  if (!admin) {
    return res.status(403).send("User doesnt exist");
  } else {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    admin.password = hashedPassword;
    await admin.save();
    return res.status(200).send("Password Changed!");
  }
});

router.post("/course", authenticate, async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    console.log(req.body);
    await newCourse.save();

    return res
      .status(201)
      .send({ message: "Course created successfully", courseId: newCourse.id });
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.get("/contact", authenticate, async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log("Done!");
    return res.status(200).json({ contact: contacts });
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

export default router;
