import { signupInput } from "@sohail60/common";
import { secretKey } from "../middleware/auth";
import { z } from "zod";
import { Admin, Course, Contact, Review } from "../db/model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../utils/transporter";
import otpGenerator from "otp-generator";

const saltRounds = 10;

export const adminSignup = async (req, res) => {
  try {
    const parsedInput = signupInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const user = await Admin.findOne({ email });

    if (user) {
      return res.status(403).json({ msg: "User already Exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const obj = {
        email: email,
        password: hashedPassword,
      };
      const newAdmin = new Admin(obj);
      await newAdmin.save();

      const token = jwt.sign({ id: newAdmin._id, role: "admin" }, secretKey, {
        expiresIn: "3h",
      });

      return res.status(201).json({ token: token });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const parsedInput = signupInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(403).json({ msg: "User doesnt exist" });
    } else {
      const match = await bcrypt.compare(password, admin.password);

      if (match) {
        const token = jwt.sign({ id: admin._id, role: "admin" }, secretKey, {
          expiresIn: "3h",
        });
        return res.status(200).json(token);
      } else {
        return res.status(403).json({ msg: "Invalid Credentials" });
      }
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const id = req.headers["id"];
    const admin = await Admin.findById(id);
    const email = admin.email;

    if (!admin) {
      return res.status(403).json({ msg: "User doesnt exist" });
    } else {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const mailOptions = {
        from: `"E-Kaksha" <ekaksha2001@gmail.com>`,
        to: `${email}`,
        subject: "OTP Verification",
        html: `<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
        <table role="presentation"
          style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
          <tbody>
            <tr>
              <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                  <tbody>
                    <tr>
                      <td style="padding: 40px 0px 0px;">
    
                        <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                          <div style="color: rgb(0, 0, 0); text-align: left;">
                            <h1 style="margin: 1rem 0">Verification code</h1>
                            <p style="padding-bottom: 16px">Please use the verification code below to change your password.</p>
                            <p style="padding-bottom: 16px"><strong style="font-size: 130%">${otp}</strong></p>
                            <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                            <p style="padding-bottom: 16px">Thanks,<br>E-Kaksha Team</p>
                          </div>
                        </div>
                        <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                          <p style="padding-bottom: 16px">Made with ♥ by Sohail</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      `,
      };

      const info = await transporter.sendMail(mailOptions);
      admin.otp = otp;
      await admin.save();
      console.log("Message sent:", info.messageId);

      return res.status(200).json({ msg: "OTP Sent!" });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const id = req.headers["id"];

    const admin = await Admin.findById(id);
    const { otp } = req.body;

    if (!admin) {
      return res.status(403).send("Admin doesnt exist");
    } else {
      const savedOTP = admin.otp;
      if (savedOTP && savedOTP == otp) {
        admin.otp = null;
        await admin.save();
        return res
          .status(200)
          .json({ msg: "OTP verified successfully", flag: true });
      } else {
        return res.status(400).json({ msg: "Invalid OTP" });
      }
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

const passwordInput = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters." }).max(20),
});

export const changePassword = async (req, res) => {
  try {
    const parsedInput = passwordInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const id = req.headers["id"];
    const admin = await Admin.findById(id);
    const password = parsedInput.data.password;

    if (!admin) {
      return res.status(403).json({ msg: "Admin doesnt exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      admin.password = hashedPassword;
      await admin.save();
      return res.status(200).json({ msg: "Password Changed!" });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const getProfile = async (req, res) => {
  try {
    const id = req.headers["id"];
    console.log(id)
    const admin = await Admin.findById(id);
    return res.status(200).json({ admin: admin });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const profile = async (req, res) => {
  try {
    const id = req.headers["id"];
    const name = req.body.name;

    const admin = await Admin.findById(id);
    admin.name = name;
    await admin.save();
    return res.status(201).json({ msg: "Updated!" });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const profilePhoto = async (req, res) => {
  try {
    const id = req.headers["id"];
    const url = req.body.downloadURL;

    const admin = await Admin.findById(id);
    admin.photoUrl = url;
    await admin.save();
    return res.status(201).json({ msg: "Updated!" });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.headers["id"];

    const deletedUser = await Admin.findByIdAndDelete(id);
    const deletedReview = await Review.findOneAndDelete({ userid: id });
    const deletedContact = await Contact.findOneAndDelete({ userid: id });
    return res.status(201).json({ msg: "Deleted!" });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const changeEmail = async (req, res) => {
  try {
    const id = req.headers["id"];
    const newEmail = req.body.newEmail;
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(403).json({ msg: "Admin doesnt exist" });
    } else {
      admin.email = newEmail;
      await admin.save();

      return res.status(200).json({ msg: "Email Changed!" });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const postCourse = async (req, res) => {
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
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({ contacts: contacts });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};
