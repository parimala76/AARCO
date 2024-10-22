import Gallery from "../model/gallery.model.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();

    res.json({ gallery: gallery, status: true });
  } catch (error) {
    res.json({ message: "Server Error", status: false });
  }
};

export const addGallery = async (req, res) => {
  const { image } = req.body;
  const newGallery = new Gallery({ image });
  try {
    await newGallery.save();
    res.json({ message: "Gallery added successfully", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

export const deleteGallery = async (req, res) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      return res.json({ message: "Gallery not found", status: false });
    }
    await Gallery.findByIdAndDelete(_id);
    res.json({ message: "Gallery deleted successfully", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
