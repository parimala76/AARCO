import Member from "../model/member.model.js";
import { generateOTP, sendOTPEmail } from "../services/otpService.js";
import { addMinutes, isAfter } from "date-fns";
import { generateJWT } from "../utils/generatejwt.js";
const loginorSinup = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return res.json({ msg: "Email is required", status: false });
    }

    const otp = generateOTP();
    const otpExpiry = addMinutes(new Date(), 10); // OTP valid for 10 minutes

    // Find user or create a new user and store OTP and expiration
    let user = await Member.findOne({ email });
    if (!user) {
      user = new Member({ email });
    }

    // Temporarily store OTP and expiration time (adjust storage logic as needed)
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send the OTP to the user's email
    await sendOTPEmail(email, otp);

    return res.json({
      msg: "OTP sent successfully. Check your email.",
      status: true,
    });
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    return res.json({ msg: "Internal server error", status: false });
  }
};
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await Member.findOne({ email });

    // Check if the user exists and if OTP matches and is not expired
    if (!user || user.otp !== otp || isAfter(new Date(), user.otpExpiry)) {
      return res.json({ msg: "Invalid or expired OTP", status: false });
    }

    // Clear OTP and expiration after successful verification
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = generateJWT(user);
    res.cookie("token", token, {
      httpOnly: true, // Helps prevent XSS attacks by making the cookie inaccessible via JavaScript
      secure: true, // Ensures the cookie is only sent over HTTPS
      sameSite: "none", // Allows the cookie to be sent in cross-site requests (Netlify frontend to Render backend)
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days (in milliseconds)
    });

    return res.json({
      msg: "OTP verified successfully. You are logged in!",
      status: true,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const changeMemberStatusToAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return res.status(400).json({ msg: "Email is required", status: false });
    }

    // Find the member by email
    const member = await Member.findOne({ email });
    if (!member) {
      return res.json({ msg: "Member not found", status: false });
    }

    // Check if the member is already an admin
    if (member.status === "admin") {
      return res.json({ msg: "User is already an admin", status: false });
    }

    // Change the status to admin
    member.status = "admin";
    await member.save();

    return res.json({
      msg: "Member status changed to admin successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error changing member status:", error.message);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ msg: "Logged out successfully", status: true });
  } catch (error) {
    console.error("Logout error:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

export { loginorSinup, verifyOTP, changeMemberStatusToAdmin, logout };
