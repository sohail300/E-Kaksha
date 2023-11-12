import { User, Admin, Course } from "../db/model";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import { z } from "zod";
import Stripe from 'stripe';
import cors from 'cors';
import { authenticate, secretKey } from "../middleware/auth";

const router = express.Router();
const app = express();
dotenv.config();
router.use(cors({
  origin: ["https://checkout.stripe.com"],
}));

const signupInput = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(30)
    .email("Please enter a valid email."),
  password: z.string().min(6, { message: "Minimum 6 characters." }).max(20),
});

// User routes

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

    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).send("User already Exists");
    } else {
      const obj = {
        email: email,
        password: password,
      };

      const newUser = new User(obj);
      await newUser.save();
      console.log("Admin saved");

      const token = jwt.sign({ id: newUser._id, role: "user" }, secretKey, {
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

    const user = await User.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ id: user._id, role: "user" }, secretKey, {
        expiresIn: "1h",
      });
      console.log(token);
      return res.status(201).json(token);
    } else {
      return res.status(403).send("Invalid credentials");
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.get("/courses", authenticate, async (req, res) => {
  try {
    const courses = await Course.find();

    const obj = {
      course: courses,
    };

    return res.status(200).send(obj);
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.post("/courses/:courseId", authenticate, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);
    const course = await Course.findById(courseId);
    const id = req.headers["id"];
    console.log(id);
    if (course) {
      const user = await User.findById(id);

      if (user) {
        user.purchasedCourses.push(new mongoose.Types.ObjectId(courseId));
        await user.save();
        console.log("User saved");
        res.status(201).send("Updated");
      } else {
        return res.status(401).send("User doesnt exist");
      }
    } else {
      return res.status(401).send("Course doesnt exist");
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.get("/purchasedcourses", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).populate("purchasedCourses");
    if (user) {
      res.status(200).json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      return res.status(401).send("User doesnt exist");
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.get("/certificate", authenticate, async (req, res) => {
  try {
    const name = "Mr. John Wick";
    let pdf = fs.readFileSync("resources/certificate.pdf");

    const pdfDoc = await PDFDocument.load(pdf);
    const page = pdfDoc.getPage(0);

    // const textWidth = (await page.getFont().widthOfTextAtSize(name, 12)) / 3; // Adjust for your font size
    // const pageWidth = page.getSize().width;
    // const xPosition = (pageWidth - textWidth) / 2;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica); // or another standard font

    // Set the font size
    const size = 18; // Adjust the font size as needed

    page.drawText(name, { x: 340, y: 290, color: rgb(0, 0, 0) });

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const paddedYear = year.toString().padStart(2, "0");
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");

    const fullDate = `${paddedDay}-${paddedMonth}-${paddedYear}`;
    page.drawText(fullDate, { x: 582, y: 150, size, color: rgb(0, 0, 0) });

    const savedPdf = await pdfDoc.save();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${name}_Certificate.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", savedPdf.length); // Set the Content-Length header

    return res.write(savedPdf, "binary");
    // res.end(null, "binary");
    // // res.send(savedPdf);
    // return res.json({msg:"Sent!"})
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

const stripeInstance = new Stripe(process.env.STRIPE_API_KEY);

router.post('/checkout', async (req, res) => {
  const PRICE_ID=req.body.priceid;
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}payment/success/`,
    cancel_url: `${process.env.FRONTEND_URL}payment/canceled/`,
  });
  console.log(session.url)
  // res.redirect(303, session.url);
  return res.json({url:session.url});
})
export default router;
