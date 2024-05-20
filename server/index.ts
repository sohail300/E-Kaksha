import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/student";
import courseRoute from "./routes/course";
import { connectDB } from "./db/conn";
import { authenticate, secretKey } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.use("/student", userRoute);
app.use("/course", courseRoute);

app.get("/", (req, res) => {
  console.log("Root Page");
  res.send("Root Page");
});

app.get("/me", authenticate, (req, res) => {
  const id = req.headers["id"];
  const role = req.headers["role"];
  return res.status(200).json({ msg: "Profile", success: true, id, role });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
