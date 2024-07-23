import mongoose from "mongoose";

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

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiryDate: Date,
  piublishedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imagelink: String,
  duration: Number,
  resource: Number,
  priceid: String,
  sections: [
    {
      title: String,
      resources: String,
      videos: [
        {
          name: String,
          link: String,
          completed: Boolean,
        },
      ],
    },
  ],
});

const reviewSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseid: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  rating: Number,
  comment: String,
});

// MongoDB Models
export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Review = mongoose.model("Review", reviewSchema);
