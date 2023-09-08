import { User, Admin, Course } from "../db/model";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { authenticate, secretKey } from "../middleware/auth";

const router = express.Router();

// User routes

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).send("Invalid Credentails");
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(403).send("User already Exists");
    } else {
      const obj = {
        username: username,
        password: password,
      };
      const newUser = new User(obj);
      await newUser.save();
      console.log("Admin saved");

      // const secretKey = 'mysecretkey';
      // const payload = { userId: '12345', role: 'admin' };
      // const options = { expiresIn: '1h' };
      // const token = jwt.sign(payload, secretKey, options);

      const token = jwt.sign({ username, role: "user" }, secretKey, {
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
    console.log("inside login");

    const { username, password } = req.body;
    // console.log("username: "+username)
    // console.log("password: "+password)

    const user = await User.findOne({ username, password });
    // console.log("user: "+user)

    if (user) {
      const token = jwt.sign({ username, role: "user" }, secretKey, {
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
    const course = await Course.findById(courseId);
    const username = req.headers["username"];
    if (course) {
      const user = await User.findOne({ username: username });

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

router.get("/purchasedCourses", authenticate, async (req, res) => {
  try {
    const username = req.headers["username"];
    const user = await User.findOne({ username: username }).populate(
      "purchasedCourses"
    );
    if (user) {
      res.status(200).json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      return res.status(401).send("User doesnt exist");
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

export default router;
