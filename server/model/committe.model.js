import mongoose from "mongoose";

const committeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 10,
  },
  contact: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});

const Committee = mongoose.model("committee", committeeSchema);

export default Committee; // Exporting the model Committee
