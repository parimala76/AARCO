import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const News = mongoose.model("News", newsSchema);

export default News;
