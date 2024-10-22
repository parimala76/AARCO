import React, { useState } from "react";
import { addNewsRoute } from "../utils/ApiRoutes"; // Importing the API route for adding news
import { useNavigate } from "react-router-dom"; // Used to navigate programmatically after adding news
import axios from "axios"; // Axios is used for making HTTP requests

const addNews = () => {
  // State hooks to manage form fields and errors
  const [title, setTitle] = useState(""); // State to hold the news title
  const [content, setContent] = useState(""); // State to hold the news content
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [message, setMessage] = useState(""); // State to show success message
  const [errormsg, setErrormsg] = useState(""); // State to show error message
  const navigate = useNavigate(); // Allows redirection/navigation programmatically

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validation checks for required fields
    const validationErrors = {};
    if (!title) validationErrors.title = "Title is required."; // Title validation
    if (!content) validationErrors.content = "Content is required."; // Content validation
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // If validation errors exist, set them and prevent submission
      return;
    }

    // Proceed to send the form data to the backend if validation passes
    try {
      const response = axios.post(
        addNewsRoute, // Backend route for adding news
        { title, content }, // Sending the title and content in the request body
        { withCredentials: true } // Ensures cookies are sent with the request (if needed for authentication)
      );

      // After successful news addition, clear the form and set success message
      setTitle(""); // Clear the title field
      setContent(""); // Clear the content field
      setErrors({}); // Clear the error messages
      setMessage("News added successfully"); // Show success message
      setTimeout(() => {
        setMessage(""); // Hide the success message after 2 seconds
      }, 2000);
    } catch (error) {
      // Handle any error that occurs during the HTTP request
      console.error("Error adding news:", error); // Log the error for debugging
      setErrormsg("Error adding news. Please try again later."); // Show error message
      setTimeout(() => {
        setErrormsg(""); // Hide the error message after 2 seconds
      }, 2000);
    }
  };

  return (
    <>
      {/* Container for the Add News form */}
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-5">Add News</h2>
        {/* Form to add news */}
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title} // Binds title input to state
              onChange={(e) => setTitle(e.target.value)} // Updates title state when user types
              className="w-full p-3 border rounded"
              placeholder="Enter news title" // Placeholder for input field
            />
            {/* Show validation error for title if it exists */}
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Content input field (textarea) */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content} // Binds content textarea to state
              onChange={(e) => setContent(e.target.value)} // Updates content state when user types
              className="w-full p-3 border rounded resize-none h-18"
              placeholder="Enter news content" // Placeholder for textarea
            ></textarea>
            {/* Show validation error for content if it exists */}
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>

          {/* Display success or error messages */}
          {message && <p className="text-green-500 text-sm pb-2">{message}</p>}
          {errormsg && <p className="text-red-500 text-sm pb-2">{errormsg}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default addNews; // Exporting the component for use in other parts of the app
