import { z } from "zod";
import { emailInput } from "../zodTypes/emailInput";
import { transporter } from "./transporter";
import { emailInputType } from "../zodTypes/signupInput";
import { uuid } from "uuidv4";
import { User } from "../db/model";

export async function forgotPasswordMailer(
  email: z.infer<typeof emailInputType>
) {
  try {
    const token = uuid();

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
                                <h1 style="margin: 1rem 0">Reset Password</h1>
                                <p style="padding-bottom: 16px">Please use the button below to reset your password.</p>
                                <p style="padding-bottom: 16px">
                                  <a href="${process.env.FRONTEND_URL}+"/reset-password/"+${token}+"?email="+${email}" target="_blank"
                                  style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0; text-decoration:none;">Reset Password
                                  </a>
                                </p>
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

    transporter
      .sendMail(mailOptions)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    const user = await User.findOne({ email });

    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpiryDate = new Date(Date.now() + 3600000);
    await user.save();

    console.log("Email sent:");
  } catch (error) {
    console.log("Error occured:", error);
  }
}
