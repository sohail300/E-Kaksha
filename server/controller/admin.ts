import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { loginInput } from "../zodTypes/loginInput";
import { Admin, Course } from "../db/model";
import dotenv from "dotenv";
import { emailInput } from "../zodTypes/emailInput";
import { adminForgotPasswordMailer } from "../utils/adminForgotPasswordMailer";
import { verifyOtpInput } from "../zodTypes/verifyOtpInput";
import { courseInput } from "../zodTypes/courseInput";
import { uploadPhoto } from "../utils/uploadPhoto";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export async function adminMe(req: Request, res: Response) {
  try {
    const id = req.headers["id"];
    const role = req.headers["role"];

    if (role === "admin") {
      return res.status(200).json({ id, role });
    } else {
      return res.status(400).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
}

export const adminRegister = async (req: Request, res: Response) => {
  try {
    const parsedInput = loginInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
        success: false,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const admin = await Admin.findOne({ email: email });

    if (admin) {
      return res
        .status(403)
        .json({ msg: "User already exists", success: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const obj = {
        email,
        password: hashedPassword,
      };

      const newAdmin = new Admin(obj);
      await newAdmin.save();

      return res.status(200).json({ id: newAdmin._id, success: true });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err, success: false });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const parsedInput = loginInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
        success: false,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      const match = await bcrypt.compare(password, admin.password);

      if (match) {
        const token = jwt.sign({ id: admin._id, role: "admin" }, secretKey, {
          expiresIn: "3h",
        });
        console.log(token);
        return res.status(200).json({ token, success: true });
      } else {
        return res
          .status(403)
          .json({ msg: "Invalid Credentials", success: false });
      }
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const sendToken = async (req: Request, res: Response) => {
  try {
    const parsedInput = emailInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error.issues[0].message,
        success: false,
      });
    }

    const { email } = parsedInput.data;

    const admin = await Admin.findOne({ email });
    console.log(admin);

    if (!admin) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      await adminForgotPasswordMailer(res, email);
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const parsedInput = verifyOtpInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error.issues[0].message,
        success: false,
      });
    }

    const { email, token, password } = parsedInput.data;

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist", success: false });
    } else {
      if (
        user.forgotPasswordToken === token &&
        user.forgotPasswordTokenExpiryDate !== null &&
        user.forgotPasswordTokenExpiryDate.getTime() >= Date.now()
      ) {
        user.forgotPasswordToken = null;
        user.forgotPasswordTokenExpiryDate = null;

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res
          .status(200)
          .json({ msg: "Password changed successfully", success: true });
      } else {
        return res.status(200).json({ msg: "Invalid Token", success: false });
      }
    }
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const postCourse = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const file = req.file;
    console.log(file);

    const sectionsData = JSON.parse(req.body.sections);

    const parsedInput = courseInput.safeParse({
      ...req.body,
      sections: sectionsData,
      image: file,
    });

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
        success: false,
      });
    }

    const {
      title,
      description,
      price,
      image,
      duration,
      resource,
      priceid,
      sections,
    } = parsedInput.data;

    const course = await Course.findOne({ title });

    if (course) {
      return res
        .status(400)
        .json({ msg: "Course already exists", success: false });
    } else {
      const downloadURL = await uploadPhoto(title, image, "courseThumbnails/");
      console.log(downloadURL);

      const obj = {
        title,
        description,
        price,
        imagelink: downloadURL,
        duration,
        resource,
        priceid,
        sections,
      };

      const newCourse = new Course(obj);
      await newCourse.save();

      return res
        .status(201)
        .json({ msg: "Course created successfully", success: true });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err, success: false });
  }
};

export const editCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);
    console.log(req.body);
    const file = req.file;
    console.log(file);

    const sectionsData = JSON.parse(req.body.sections);

    const parsedInput = courseInput.safeParse({
      ...req.body,
      sections: sectionsData,
      image: file,
    });

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
        success: false,
      });
    }

    const {
      title,
      description,
      price,
      image,
      duration,
      resource,
      priceid,
      sections,
    } = parsedInput.data;

    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(400)
        .json({ msg: "Course doesn't exist", success: false });
    } else {
      const downloadURL = await uploadPhoto(title, image, "courseThumbnails/");
      console.log(downloadURL);

      const obj = {
        title,
        description,
        price,
        imagelink: downloadURL,
        duration,
        resource,
        priceid,
        sections,
      };

      const newCourse = new Course(obj);
      await newCourse.save();

      return res
        .status(201)
        .json({ msg: "Course updated successfully", success: true });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err, success: false });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.query.courseId;

    const course = await Course.deleteOne({ _id: courseId });

    console.log(course);
    return res
      .status(201)
      .json({ msg: "Course deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err, success: false });
  }
};
