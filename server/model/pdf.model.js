import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Pdf = mongoose.model("Pdf", pdfSchema);

export default Pdf;
