import { User, Admin, Course, Review } from "../db/model";
import express from "express";
import { Types } from "mongoose";
import mongoose from "mongoose";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import { z } from "zod";
import Stripe from "stripe";
import { authenticate, secretKey } from "../middleware/auth";

const router = express.Router();

router.get("/all", async (req, res) => {
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

router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);

    const obj = {
      course,
    };
    return res.status(200).json(obj);
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.post("/buy/:courseId", authenticate, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);
    const id = req.headers["id"];
    console.log(id);

    const course = await Course.findById(courseId);
    if (course) {
      const user = await User.findById(id);
      console.log("in");

      if (user) {
        const courseIdObject = new Types.ObjectId(courseId);
        
        user.wishlist = user.wishlist.filter(
          (item) => {
            return !(item.equals(courseIdObject));
          }
        );
        console.log(user.wishlist);
        
        if(!(user.purchasedCourses.includes(courseIdObject))){
          user.purchasedCourses.push(courseIdObject);
        }
        console.log(user.purchasedCourses);
        
        await user.save();
        console.log("Saved");
        res.status(201).send("Updated");
      } else {
        return res.status(401).send("User doesn't exist");
      }
    } else {
      return res.status(401).send("Course doesnt exist");
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

const stripeInstance = new Stripe(process.env.STRIPE_API_KEY);

router.post("/checkout", authenticate, async (req, res) => {
  const PRICE_ID = req.body.priceid;
  const courseid = req.body.id;

  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        price: PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}payment/success/${courseid}`,
    cancel_url: `${process.env.FRONTEND_URL}payment/canceled/`,
  });

  // console.log("3");
  // console.log(session.url);
  return res.json({ url: session.url });
  // res.redirect(303, session.url);
});

const reviewInput = z.object({
  comment: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(800),
});

router.post("/wishlist/:courseId", authenticate, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);
    const course = await Course.findById(courseId);
    const id = req.headers["id"];
    console.log(id);
    if (course) {
      const user = await User.findById(id);

      if (user) {
        const courseIdObject = new Types.ObjectId(courseId);
        
        if (user.wishlist.includes(courseIdObject)) {
          return res.status(401).send("Course already in wishlist");
        } else {
          user.wishlist.push(courseIdObject);
          await user.save();
          console.log("Saved");
          res.status(201).send("Updated");
        }
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

router.get("/completion/certificate", authenticate, async (req, res) => {
  console.log("1");

  try {
    const name = "Mr. John Wick";
    let pdf = fs.readFileSync("resources/certificate.pdf");
    console.log("1");

    const pdfDoc = await PDFDocument.load(pdf);
    const page = pdfDoc.getPage(0);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const size = 18;

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
    res.setHeader("Content-Length", savedPdf.length);

    return res.write(savedPdf, "binary");
    // res.end(null, "binary");
    // res.send(savedPdf);
    // return res.json({msg:"Sent!"})
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.post("/review", authenticate, async (req, res) => {
  try {
    let comment = req.body.comment;
    const parsedInput = reviewInput.safeParse({ comment });

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const userid = req.body.userid;
    const courseid = req.body.courseid;
    const rating = req.body.ratingValue;
    comment = parsedInput.data.comment;

    const user = await User.findById(userid);

    const obj = { userid, courseid, rating, comment };

    const newReview = new Review(obj);
    await newReview.save();
    console.log("Review Saved");
    return res.json({ msg: "Review Saved!" });
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.get("/review/:id", async (req, res) => {
  try {
    const courseid = req.params.id;
    const reviewArray = await Review.find({ courseid });
    let reviews = [];

    reviews = await Promise.all(
      reviewArray.map(async (item) => {
        const userid = item.userid;
        const user = await User.findById(userid);

        const obj = {
          comment: item.comment,
          rating: item.rating,
          username: user.name,
          photoUrl: user.photoUrl,
        };
        return obj;
      })
    );
    return res.status(201).json({ reviews });
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

export default router;
