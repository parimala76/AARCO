import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit number
};

// Function to send OTP email

const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail's built-in settings
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Recipient's email
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP. Please try again.");
  }
};

export { generateOTP, sendOTPEmail };
