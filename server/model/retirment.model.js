import mongoose from "mongoose";

const RetirmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  order: {
    type: Number,
    required: true,
    default: 10,
  },
});

const Retirment = mongoose.model("Retirment", RetirmentSchema);

export default Retirment; // Exporting the model MemberShip
