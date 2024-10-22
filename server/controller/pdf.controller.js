import Pdf from "../model/pdf.model.js";

const getPdf = async (req, res) => {
  try {
    const pdf = await Pdf.find();
    res.json({ pdf: pdf, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

const createPdf = async (req, res) => {
  const { title, link } = req.body;
  if (!title || !link) {
    return res.json({ message: "Title and link is required", status: false });
  }
  const pdf = new Pdf({
    title: title,
    link: link,
  });

  try {
    const newPdf = await pdf.save();
    res.json({ msg: "pdf is saved", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const deletePdf = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.json({ message: "Id is required", status: false });
  }
  try {
    await Pdf.findByIdAndDelete(_id);
    res.json({ message: "Pdf deleted", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

export { getPdf, createPdf, deletePdf };
