import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Icon for the back button
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import axios from "axios"; // HTTP client for making requests to the API
import { MdDelete } from "react-icons/md"; // Icon for delete functionality
import Footer from "../component/footer"; // Footer component, adjust import path as needed
import { getNewsRoute, DeleteNewsRoute } from "../utils/ApiRoutes"; // API routes for fetching and deleting news

const NewsUpdates = ({ isadmin, isLogin }) => {
  const [newsItem, setNewsItem] = useState([]); // State to hold news items
  const navigate = useNavigate(); // Used to navigate between routes

  // Handle the back button click to navigate to the home page
  const handleBackClick = () => {
    navigate("/");
  };

  // Function to format the date from the news item in DD/MM/YYYY format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // en-GB formats the date as DD/MM/YYYY
  };

  // Fetch all news from the API
  const getAllNews = async () => {
    try {
      const response = await axios.get(getNewsRoute); // Fetch news from the API
      const data = response.data.news; // Extract the news data from the response
      setNewsItem(data); // Update the state with the fetched news
    } catch (error) {
      console.error("Failed to fetch news:", error); // Log any errors during the fetch
    }
  };

  // Delete a news item based on its ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(DeleteNewsRoute, {
        data: { _id: id }, // Pass the news item ID to the API for deletion
        withCredentials: true, // Send credentials (e.g., cookies) with the request
      });
      getAllNews(); // Refresh the list of news items after deletion
    } catch (error) {
      console.error("Failed to delete news:", error); // Log any errors during deletion
    }
  };

  // Fetch all news when the component first renders
  useEffect(() => {
    getAllNews();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={handleBackClick} // Navigate back to the home page on click
      >
        <FaArrowLeft className="text-white text-2xl" /> {/* Back icon */}
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8 mb-8 flex-grow">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{ fontFamily: "Playfair Display, serif" }} // Custom font style
        >
          News & Updates
        </h2>

        {/* News Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {newsItem.length > 0 ? ( // Check if there are any news items
            newsItem.map((item) => (
              <div
                key={item._id} // Use the unique ID of each news item
                className="bg-white relative rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                {isadmin && ( // Show delete icon if user is an admin
                  <MdDelete
                    className="text-red-800 absolute text-xl top-4 right-4 cursor-pointer"
                    onClick={() => handleDelete(item._id)} // Call handleDelete on click
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      {formatDate(item.date)} {/* Display formatted date */}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {item.title} {/* News item title */}
                  </h3>
                  <p className="text-gray-600">{item.content}</p> {/* News content */}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-3xl font-bold text-red-500">
              No news available {/* Message when no news items are available */}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer isLogin={isLogin} /> {/* Render Footer component */}
    </div>
  );
};

export default NewsUpdates;
