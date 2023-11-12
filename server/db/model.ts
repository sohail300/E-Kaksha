import mongoose from "mongoose";

// MongoDB Schema
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
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

// MongoDB Models
export const Admin = mongoose.model("Admin", adminSchema);
export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
