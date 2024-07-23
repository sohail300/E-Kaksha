import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/student";
import courseRoute from "./routes/course";
import adminRoute from "./routes/admin";
import { connectDB } from "./db/conn";
import { authenticate } from "./middleware/auth";
import { Course } from "./db/model";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.use("/student", userRoute);
app.use("/course", courseRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  console.log("Healthy Server");
  res.send("Healthy Server");
});

app.post("/post", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    console.log(req.body);
    await newCourse.save();

    return res
      .status(201)
      .json({ msg: "Course created successfully", courseId: newCourse.id });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
});

app.get("/me", authenticate, (req, res) => {
  const id = req.headers["id"];
  return res.status(200).json({ success: true, id });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
