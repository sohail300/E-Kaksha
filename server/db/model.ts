import mongoose, { mongo } from "mongoose";

// MongoDB Schema
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  mobile: Number,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imagelink: String,
  duration: Number,
  resource: Number,
  priceid: String
});

const reviewSchema= new mongoose.Schema({
  userid: String,
  courseid: String,
  username: String,
  rating: Number,
  comment: String
})

// MongoDB Models
export const Admin = mongoose.model("Admin", adminSchema);
export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Review = mongoose.model("Review", reviewSchema);
