import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  forgotPasswordToken: {
    type: String,
    require: false,
  },
  forgotPasswordTokenExpiryDate: {
    type: Date,
    require: false,
  },
  photoUrl: {
    type: String,
    require: false,
  },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  forgotPasswordToken: {
    type: String,
    require: false,
  },
  forgotPasswordTokenExpiryDate: {
    type: Date,
    require: false,
  },
  publishedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  imagelink: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  resource: {
    type: Number,
    require: true,
  },
  priceid: {
    type: String,
    require: true,
  },
  sections: [
    {
      title: {
        type: String,
        require: true,
      },
      resources: {
        type: String,
        require: true,
      },
      videos: [
        {
          name: {
            type: String,
            require: true,
          },
          link: {
            type: String,
            require: true,
          },
        },
      ],
    },
  ],
});

const reviewSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseid: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  rating: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
});

// MongoDB Models
export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Review = mongoose.model("Review", reviewSchema);
