import { User, Admin, Course, Contact, Review } from "../db/model";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";
import storage from "../db/firebase";
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

router.get("/wishlist", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).populate("wishlist");
    if (user) {
      res.status(200).json({ wishlist: user.wishlist || [] });
    } else {
      return res.status(401).send("User doesnt exist");
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

const reviewInput = z.object({
  description: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(100),
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];

    const description = req.body.describe;

    const user = await User.findById(id);

    const obj = {
      userid: id,
      description: description,
      username: user.name,
      email: user.email,
      mobile: user.mobile,
    };

    const newReview = new Review(obj);
    await newReview.save();

    console.log("Review Saved!");
    return res.status(201).json({ msg: "Review Saved!" });
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.get("/profile", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];
    console.log(id);

    const user = await User.findById(id);
    console.log("Sent!");
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.put("/profile", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];
    const name = req.body.name;

    const user = await User.findById(id);
    user.name = name;
    await user.save();
    console.log("Updated!");
    return res.status(201).json({ msg: "Updated!" });
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.put("/profile/photo", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];
    console.log(id);
    const url=req.body.downloadURL;
    
    const user=await User.findById(id);
    user.photoUrl=url;
    await user.save();
    console.log("Updated!")
    return res.status(201).json({msg:"Updated!"})
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});


router.delete("/delete", authenticate, async (req, res) => {
  try {
    const id = req.headers["id"];
    console.log(id);

    const deletedUser = await User.findByIdAndDelete(id);
    console.log(deletedUser);
    const deletedReview = await Review.findOneAndDelete({ userid: id });
    console.log(deletedReview);
    const deletedContact = await Contact.findOneAndDelete({ userid: id });
    console.log(deletedContact);
    return res.status(201).json({ msg: "Deleted!" });
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
});

router.post('/hasbought', authenticate, async (req,res) => {
  try{ 
    const id=req.headers["id"];
    const courseid=req.body.id;

    const user=await User.findById(id);

    const purchased=user.purchasedCourses;

    const result=purchased.includes(courseid);
    return res.status(200).json({result});
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
})

export default router;
