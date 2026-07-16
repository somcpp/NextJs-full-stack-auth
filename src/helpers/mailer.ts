import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: any) => {
  try {
    const hashedToken = await bcryptjs.hash(
      userId.toString(),
      10
    );

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry:
            Date.now() + 3600000,
        }
      );
    }

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken:
            hashedToken,
          forgotPasswordTokenExpiry:
            Date.now() + 3600000,
        }
      );
    }

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass:
            process.env
              .GOOGLE_APP_PASSWORD,
        },
      });

    const actionUrl = `${process.env.DOMAIN}/${
  emailType === "VERIFY" ? "verifyEmail" : "resetpassword"
}?token=${encodeURIComponent(hashedToken)}`;

const mailOptions = {
  from: process.env.USER,
  to: email,
  subject: emailType === "VERIFY" ? "Verify your email" : "Reset Password",
  // Plain text fallback for simple email clients & spam protection
  text: `Please verify your email or reset your password by copying and pasting this link into your browser: ${actionUrl}`, 
  html: `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h2>
      <p>Thank you for registering. Please click the button below to complete the process:</p>
      <p style="margin: 24px 0;">
        <a href="${actionUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          ${emailType === "VERIFY" ? "Verify Email Address" : "Reset Password"}
        </a>
      </p>
      <p style="font-size: 12px; color: #666;">
        If the button above doesn't work, copy and paste this URL into your browser:<br>
        <a href="${actionUrl}">${actionUrl}</a>
      </p>
    </div>
  `,
};

    const mailResponse =
      await transporter.sendMail(
        mailOptions
      );

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};