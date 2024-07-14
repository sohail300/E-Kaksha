import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/student";
import courseRoute from "./routes/course";
import { connectDB } from "./db/conn";
import { authenticate } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.use("/student", userRoute);
app.use("/course", courseRoute);

app.get("/", (req, res) => {
  console.log("Healthy Server");
  res.send("Healthy Server");
});

app.get("/me", authenticate, (req, res) => {
  const id = req.headers["id"];
  return res.status(200).json({ success: true, id });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
