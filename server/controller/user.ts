import { User, Contact, Review } from "../db/model";
import bcrypt from "bcrypt";
import { signupInput } from "@sohail60/common";
import { transporter } from "../utils/transporter";
import otpGenerator from "otp-generator";
import { secretKey } from "../middleware/auth";
import jwt from "jsonwebtoken";
import z from "zod";

const saltRounds = 10;

export const userSignup = async (req, res) => {
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
      return res.status(403).json({ msg: "User already Exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const obj = {
        email: email,
        password: hashedPassword,
      };

      const newUser = new User(obj);
      await newUser.save();

      const token = jwt.sign({ id: newUser._id, role: "user" }, secretKey, {
        expiresIn: "1h",
      });

      return res.status(201).json({ token: token });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const userLogin = async (req, res) => {
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
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user._id, role: "user" }, secretKey, {
          expiresIn: "1h",
        });
        return res.status(200).json({ token: token });
      } else {
        return res.status(403).json({ msg: "Invalid Credentials" });
      }
    } else {
      return res.status(403).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id);
    const email = user.email;
    if (!user) {
      return res.status(403).send("User doesnt exist");
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
      user.otp = otp;
      await user.save();
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

    const user = await User.findById(id);
    const { otp } = req.body;

    if (!user) {
      return res.status(403).send("User doesnt exist");
    } else {
      const savedOTP = user.otp;
      if (savedOTP && savedOTP == otp) {
        user.otp = null;
        await user.save();
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
    const user = await User.findById(id);
    const password = parsedInput.data.password;

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ msg: "Password Changed!" });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const getPurchasedCourses = async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).populate("purchasedCourses");
    if (user) {
      res.status(200).json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      return res.status(401).json({ msg: "User doesnt exist" });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const getWishlistCourses = async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).populate("wishlist");
    if (user) {
      res.status(200).json({ wishlist: user.wishlist || [] });
    } else {
      return res.status(401).json({ msg: "User doesnt exist" });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const getProfile = async (req, res) => {
  try {
    const id = req.headers["id"];
    console.log(id)

    const user = await User.findById(id);
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const profile = async (req, res) => {
  try {
    const id = req.headers["id"];
    const name = req.body.name;

    const user = await User.findById(id);
    user.name = name;
    await user.save();
    return res.status(201).json({ msg: "Updated!" });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const profilePhoto = async (req, res) => {
  try {
    const id = req.headers["id"];
    console.log(id);
    const url = req.body.downloadURL;

    const user = await User.findById(id);
    user.photoUrl = url;
    await user.save();
    return res.status(201).json({ msg: "Updated!" });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.headers["id"];

    const deletedUser = await User.findByIdAndDelete(id);
    const deletedReview = await Review.findOneAndDelete({ userid: id });
    const deletedContact = await Contact.findOneAndDelete({ userid: id });
    return res.status(201).json({ msg: "Deleted!" });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const hasBought = async (req, res) => {
  try {
    const id = req.headers["id"];
    const courseid = req.body.id;

    const user = await User.findById(id);

    const purchased = user.purchasedCourses;

    const result = purchased.includes(courseid);
    return res.status(200).json({ flag: result });
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};

export const changeEmail = async (req, res) => {
  try {
    const id = req.headers["id"];
    const newEmail = req.body.newEmail;
    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({ msg: "User doesnt exist" });
    } else {
      user.email = newEmail;
      await user.save();

      return res.status(200).json({ msg: "Email Changed!" });
    }
  } catch (err) {
    return res.status(500).json({ "Internal Error": err });
  }
};
