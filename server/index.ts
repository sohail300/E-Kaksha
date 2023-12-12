import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adminRoute from "./routes/admin";
import userRoute from "./routes/user";
import courseRoute from "./routes/course";
import { connectDB } from "./db/conn";
import { authenticate, secretKey } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/course", courseRoute);

app.get("/", (req, res) => {
  res.send("Root Page");
});

app.get("/me",authenticate, (req,res) => {
  console.log('in me')
  const id = req.headers["id"];
  const role = req.headers["role"];
  res.json({id,role});
  // res.send("sent")
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
