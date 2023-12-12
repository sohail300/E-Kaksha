import mongoose, { mongo } from "mongoose";

// MongoDB Schema
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  mobile: Number,
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
  priceid: String
});

const reviewSchema= new mongoose.Schema({
  userid: String,
  courseid: String,
  username: String,
  rating: Number,
  comment: String,
  photoUrl: String,
})

const contactSchema= new mongoose.Schema({
  userid: String,
  username: String,
  email: String,
  mobile: Number,
  description: String,
  photoUrl: String,
})

// MongoDB Models
export const Admin = mongoose.model("Admin", adminSchema);
export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Review = mongoose.model("Review", reviewSchema);
export const Contact = mongoose.model("Contact", contactSchema);
