import mongoose, { mongo } from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiryDate: Date,
  photoUrl: String,
  publishedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiryDate: Date,
  photoUrl: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imagelink: String,
  duration: Number,
  resource: Number,
  priceid: String,
});

const reviewSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseid: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  rating: Number,
  comment: String,
});

const contactSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String,
});

// MongoDB Models
export const Admin = mongoose.model("Admin", adminSchema);
export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Review = mongoose.model("Review", reviewSchema);
export const Contact = mongoose.model("Contact", contactSchema);
