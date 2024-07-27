import { User, Course, Review } from "../db/model";
import { Types } from "mongoose";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import Stripe from "stripe";
import { reviewInput } from "../zodTypes/reviewInput";
import mongoose from "mongoose";
import { Request, Response } from "express";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().select(
      "title description price imagelink boughtCount"
    );

    if (courses) {
      return res
        .status(200)
        .json({ msg: "All Courses", success: true, allCourses: courses });
    } else {
      return res.status(200).json({ msg: "No courses found", success: false });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (course) {
      return res.status(200).json({ msg: "Course", success: true, course });
    } else {
      return res.status(200).json({ msg: "No course found", success: false });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

const stripeInstance = new Stripe(process.env.STRIPE_API_KEY);

export const buyCourse = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    console.log(id);
    const user = await User.findById(id);

    const { courseId } = req.params;
    console.log(courseId);

    const course = await Course.findById(courseId);
    const priceid = course.priceid;
    console.log(priceid);

    const courseIdObject = new Types.ObjectId(courseId);
    if (user.purchasedCourses.includes(courseIdObject)) {
      return res
        .status(403)
        .json({ msg: "Course already bought", success: false });
    }

    if (course) {
      if (user) {
        const customer = await stripeInstance.customers.create({
          metadata: {
            userid: id as string,
            priceid,
          },
        });

        const session = await stripeInstance.checkout.sessions.create({
          line_items: [
            {
              price: priceid,
              quantity: 1,
            },
          ],
          mode: "payment",
          customer: customer.id,
          success_url: `${process.env.FRONTEND_URL}/payment/success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment/canceled`,
        });

        console.log(session.url);

        // res.redirect(303, session.url);

        return res.status(200).json({ url: session.url, success: true });
      } else {
        return res
          .status(403)
          .json({ msg: "User doesnt exist", success: false });
      }
    } else {
      return res
        .status(403)
        .json({ msg: "Course doesnt exist", success: false });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const webhookStripe = async (req: Request, res: Response) => {
  try {
    const event = req.body;

    // payment_intent.requires_action
    // payment_intent.created
    // payment_intent.succeeded
    // charge.succeeded
    // checkout.session.completed
    // customer.created
    // customer.updated

    // Handle the event
    switch (event.type) {
      case "payment_intent.requires_action":
        console.log("requires_action");
        break;

      case "charge.created":
        console.log("created");
        break;

      case "payment_intent.succeeded":
        console.log("succeeded");
        break;

      case "charge.succeeded":
        console.log("chargesucceeded");
        break;

      case "customer.created":
        console.log("customerCreated");
        break;

      case "customer.updated":
        console.log("customerUpdated");
        const customerUpdated = event.data.object;

        const { userid, priceid } = customerUpdated.metadata;

        const course = await Course.findOne({ priceid });
        const user = await User.findOne({ _id: userid });

        if (course) {
          if (!user.purchasedCourses.includes(course._id)) {
            user.purchasedCourses.push(course._id);
          }

          if (user.wishlist.includes(course._id)) {
            const result = await User.findByIdAndUpdate(userid, {
              $pull: { wishlist: course._id },
            });
          }

          const count = course.boughtCount;
          course.boughtCount = count + 1;
          await course.save();
          await user.save();
          console.log(user.purchasedCourses);
        } else {
          return res
            .status(403)
            .json({ msg: "Course doesnt exist", success: false });
        }
        console.log("customerUpdated2");
        break;

      case "checkout.session.completed":
        console.log("completed");
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    const id = req.headers["id"];

    if (course) {
      const user = await User.findById(id);

      if (user) {
        const courseIdObject = new Types.ObjectId(courseId);

        if (user.wishlist.includes(courseIdObject)) {
          return res
            .status(401)
            .json({ msg: "Course already exists in wishlist", success: false });
        } else {
          user.wishlist.push(courseIdObject);
          await user.save();
          return res
            .status(200)
            .json({ msg: "Course added to wishlist", success: true });
        }
      } else {
        return res
          .status(403)
          .json({ msg: "User doesnt exist", success: false });
      }
    } else {
      return res
        .status(403)
        .json({ msg: "Course doesnt exist", success: false });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    const id = req.headers["id"];

    if (course) {
      const user = await User.findById(id);

      if (user) {
        const courseIdObject = new Types.ObjectId(courseId);

        if (!user.wishlist.includes(courseIdObject)) {
          return res
            .status(401)
            .json({ msg: "Course not present in wishlist", success: false });
        } else {
          const result = await User.findByIdAndUpdate(id, {
            $pull: { wishlist: courseIdObject },
          });
          return res
            .status(200)
            .json({ msg: "Course removed from wishlist", success: true });
        }
      } else {
        return res
          .status(403)
          .json({ msg: "User doesnt exist", success: false });
      }
    } else {
      return res
        .status(403)
        .json({ msg: "Course doesnt exist", success: false });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const getCertificate = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id);
    const name = user.name;

    let pdf = fs.readFileSync("utils/certificate.pdf");
    const pdfDoc = await PDFDocument.load(pdf);
    const page = pdfDoc.getPage(0);

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const w = page.getWidth() / 2;
    page.drawText(name, {
      x: w - 40,
      y: 290,
      color: rgb(0, 0, 0),
      size: 20,
      font: helveticaFont,
    });

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const paddedYear = year.toString().padStart(2, "0");
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
    const fullDate = `${paddedDay}-${paddedMonth}-${paddedYear}`;

    page.drawText(fullDate, {
      x: 586,
      y: 150,
      color: rgb(0, 0, 0),
      size: 16,
      font: helveticaFont,
    });

    const savedPdf = await pdfDoc.save();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${name}_Certificate.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", savedPdf.length);

    return res.write(savedPdf, "binary");
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const giveReview = async (req: Request, res: Response) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id);

    const parsedInput = reviewInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error.issues[0].message,
        success: false,
      });
    }

    const { comment, rating, courseid } = parsedInput.data;

    if (user) {
      const courseIdObject = new mongoose.Types.ObjectId(courseid);

      const course = await Course.findById(courseIdObject);

      if (course) {
        const obj = {
          userid: id,
          courseid,
          comment,
          rating,
        };
        const newReview = new Review(obj);
        await newReview.save();

        return res.status(201).json({ msg: "Review saved", success: true });
      } else {
        return res
          .status(403)
          .json({ msg: "Course doesnt exist", success: false });
      }
    } else {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const courseid = req.params.id;
    const reviews = await Review.find({ courseid })
      .populate({
        path: "userid",
        select: "name photoUrl -_id",
      })
      .select("rating comment -_id");

    if (reviews) {
      return res.status(200).json({ msg: "Reviews", success: true, reviews });
    } else {
      return res.status(200).json({ msg: "No reviews found", success: false });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};
