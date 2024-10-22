import News from "../model/news.model.js";

const getNews = async (req, res) => {
  try {
    // Fetch all news from the database
    const news = await News.find();

    // Return the news data with a success status
    return res.status(200).json({ news, status: true });
  } catch (error) {
    console.error(`Get news error: ${error.message}`);

    // Return a server error status with an error message
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, content, date } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    // Create a new news object
    const news = new News({
      title,
      content,
      date,
    });

    // Save the news object to the database
    await news.save();

    // Return a success status with a success message
    return res.status(201).json({ msg: "News created successfully" });
  } catch (error) {
    console.error(`Create news error: ${error.message}`);

    // Return a server error status with an error message
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    // Find the news by ID
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ msg: "News not found" });
    }

    // Update the news object
    news.title = title;
    news.content = content;

    // Save the updated news object
    await news.save();

    // Return a success status with a success message
    return res.status(200).json({ msg: "News updated successfully" });
  } catch (error) {
    console.error(`Update news error: ${error.message}`);

    // Return a server error status with an error message
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { _id } = req.body;

    // Find the news by ID and delete it
    await News.findByIdAndDelete(_id);

    // Return a success status with a success message
    return res.json({ msg: "News deleted successfully", status: true });
  } catch (error) {
    console.error(`Delete news error: ${error.message}`);

    // Return a server error status with an error message
    return res.json({ msg: "Internal server error", status: false });
  }
};

export { getNews, createNews, updateNews, deleteNews };
