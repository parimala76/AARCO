import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail's built-in settings
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

export default transporter;
