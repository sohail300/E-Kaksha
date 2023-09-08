import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";

import adminRoute from "./routes/admin.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./db/conn.js";
import { authenticate, secretKey } from "./middleware/auth";

const app = express();

// app.use(cors({
//   origin: 'https://e-kaksha.vercel.app/'
// }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.use("/admin", adminRoute);
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
