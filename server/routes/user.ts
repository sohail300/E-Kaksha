import { User, Admin, Course } from "../db/model";
import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { authenticate, secretKey } from "../middleware/auth";

const router = express.Router();

const signupInput = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(30)
    .email("Please enter a valid email."),
  password: z.string().min(6, { message: "Minimum 6 characters." }).max(20),
});

// User routes

router.post("/signup", async (req, res) => {
  try {
    const parsedInput = signupInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).send("User already Exists");
    } else {
      const obj = {
        email: email,
        password: password,
      };

      const newUser = new User(obj);
      await newUser.save();
      console.log("Admin saved");

      const token = jwt.sign({ id: newUser._id, role: "user" }, secretKey, {
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
    const parsedInput = signupInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const user = await User.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ id: user._id, role: "user" }, secretKey, {
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

router.get("/purchasedcourses", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).populate("purchasedCourses");
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
