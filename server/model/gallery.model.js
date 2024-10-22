import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  image: {
    type: String,
    default: "",
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
