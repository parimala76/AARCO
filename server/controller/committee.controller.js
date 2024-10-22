import Committee from "../model/committe.model.js";

const getCommittee = async (req, res) => {
  try {
    const committee = await Committee.find();
    res.json({ committee: committee, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

const createCommittee = async (req, res) => {
  const { name, email, order, contact, image } = req.body;

  const committee = new Committee({
    name,
    email,
    order: order || 10,
    contact: contact || "",
    image: image || "",
  });

  try {
    const newCommittee = await committee.save();
    res.json({ newCommittee, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const deleteCommittee = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.json({ message: "Id is required", status: false });
  }
  try {
    await Committee.findByIdAndDelete(_id);
    res.json({ message: "Committee deleted", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

export { getCommittee, createCommittee, deleteCommittee };
