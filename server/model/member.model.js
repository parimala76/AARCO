import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["member", "admin"], // Only allows "member" or "admin"
    default: "member", // Sets default value to "member"
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
});

const Member = mongoose.model("member", memberSchema);

export default Member; // Exporting the model Member
