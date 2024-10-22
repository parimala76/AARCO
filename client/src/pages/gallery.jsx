import React, { useEffect, useState } from "react"; // Importing React and essential hooks
import { FaArrowLeft } from "react-icons/fa"; // Importing the 'FaArrowLeft' icon for navigation
import { useNavigate } from "react-router-dom"; // Hook to programmatically navigate between routes
import { MdDelete } from "react-icons/md"; // Importing the 'MdDelete' icon for delete functionality
import axios from "axios"; // Axios library for making API requests

import { gallery } from "../utils/ApiRoutes.js"; // Importing the API route for gallery data
import Footer from "../component/footer.jsx"; // Importing Footer component

const Gallery = ({ isadmin, isLogin }) => {
  // Component props: isadmin (to check if the user is an admin) and isLogin (to pass login status to Footer)
  
  const navigate = useNavigate(); // Initialize navigate function for routing

  // Define state variables
  const [images, setImages] = useState([]); // State for storing gallery images
  const [loading, setLoading] = useState(true); // State for tracking loading status

  // Function to fetch images from the server
  const handlegetImages = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(gallery); // Make a GET request to the gallery API

      if (response.data.status) {
        // Check if the response is successful
        setImages(response.data.gallery); // If successful, update the state with the fetched gallery images
      }
    } catch (error) {
      // Catch and handle any errors during the API call
      console.error("Error fetching images:", error); // Log the error to the console
    } finally {
      setLoading(false); // Set loading to false after fetching is complete, whether successful or not
    }
  };

  // Function to delete an image by its ID
  const handleDeleteImage = async (_id) => {
    try {
      // Make a DELETE request to the gallery API to delete an image
      const response = await axios.delete(gallery, {
        data: { _id }, // Pass the image ID to the server
        withCredentials: true, // Include credentials (like cookies) with the request
      });

      if (response.data.status) {
        // If the delete request is successful
        handlegetImages(); // Refresh the gallery images list
      }
    } catch (error) {
      // Catch and handle any errors during the delete operation
      console.error("Error deleting image:", error); // Log the error to the console
    }
  };

  // UseEffect hook to fetch the gallery images when the component first mounts
  useEffect(() => {
    handlegetImages(); // Fetch gallery images on component mount
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {/* Back button to navigate to the homepage */}
      <div
        className="bg-blue-900 inline-flex w-full items-center p-4 cursor-pointer"
        onClick={() => navigate("/")} // Navigate back to the home route on click
      >
        <FaArrowLeft className="text-white text-2xl" /> {/* Back icon */}
        <span className="ml-2 text-white text-lg hover:underline">Back</span> {/* Back text with hover effect */}
      </div>

      {/* Main gallery content */}
      <div className="w-full max-w-6xl mx-auto mt-12 px-4 ">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Gallery
        </h2> {/* Title for the gallery */}

        {/* Grid layout to display images */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${
            images.length === 0 ? `pb-80` : `pb-20` // Adjust padding based on whether there are images or not
          }`}
        >
          {images.length > 0 ? (
            // If there are images, map through them and display each one
            images.map((image) => (
              <div
                key={image._id} // Unique key for each image
                className="relative overflow-hidden rounded-lg border border-gray-300 shadow-md transition-transform transform hover:scale-105"
              >
                {/* If the user is an admin, show the delete icon */}
                {isadmin && (
                  <MdDelete
                    className="text-red-600 absolute text-xl top-4 right-4 cursor-pointer bg-white rounded-full"
                    onClick={() => handleDeleteImage(image._id)} // Delete image on click
                  />
                )}

                {/* Display the image */}
                <img
                  src={image.image} // Image source from the API
                  className="w-full h-full object-cover rounded-lg" // Style the image
                />
              </div>
            ))
          ) : (
            // If there are no images, display a "No images available" message
            <div className="text-2xl text-center font-bold text-red-500 mt-6 -mb-72">
              No images available
            </div>
          )}
        </div>
      </div>

      {/* Footer section */}
      <div className="pt-6">
        <Footer isLogin={isLogin} /> {/* Render Footer and pass isLogin prop */}
      </div>
    </>
  );
};

export default Gallery; // Export the Gallery component
