import React, { useState } from "react"; // Importing React and useState hook to manage state in the component.
import { addPdfRoute } from "../utils/ApiRoutes"; // Importing API route for adding a PDF.
import axios from "axios"; // Importing Axios for HTTP requests.

const AddPdf = () => {
  // Defining state variables using the useState hook:
  // title: Holds the value of the title input.
  // link: Holds the value of the link input.
  // errors: Holds validation error messages for title and link inputs.
  // message: Success message to display when a PDF is added successfully.
  // errormsg: Error message to display if the PDF submission fails.
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errormsg, setErrormsg] = useState("");

  // Function to handle form submission:
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submit behavior (page reload).

    const validationErrors = {};
    // Input validation: checks if title and link fields are not empty.
    if (!title) validationErrors.title = "Title is required.";
    if (!link) validationErrors.link = "Link is required.";

    // If there are validation errors, update the state and return without proceeding.
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, attempt to submit the form data to the backend.
    try {
      const response = await axios.post(
        addPdfRoute, // API endpoint for adding a PDF.
        { title: title, link: link }, // Sending the title and link data in the request body.
        { withCredentials: true } // Sends credentials (cookies) along with the request for user authentication.
      );

      // If the request succeeds, reset the form fields and display a success message.
      setTitle("");
      setLink("");
      setErrors({});
      setMessage("PDF added successfully");
      setTimeout(() => {
        setMessage(""); // Hide the success message after 2 seconds.
      }, 2000);
    } catch (error) {
      // If an error occurs (e.g., network error, server error), log the error and display an error message.
      console.error("Error adding news:", error);
      setErrormsg("Error adding news. Please try again later.");
      setTimeout(() => {
        setErrormsg(""); // Hide the error message after 2 seconds.
      }, 2000);
    }
  };

  // JSX to render the form:
  return (
    <>
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        {/* Container for the form with padding, max width, and styling */}
        <h2 className="text-2xl font-bold mb-5">Add PDF</h2>
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Updates the title state on input change.
              className="w-full p-3 border rounded"
              placeholder="Enter PDF title"
            />
            {/* Display validation error for title if it exists */}
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Link input field */}
          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-gray-700 font-bold mb-2"
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)} // Updates the link state on input change.
              className="w-full p-3 border rounded"
              placeholder="Enter PDF link"
            />
            {/* Display validation error for link if it exists */}
            {errors.link && (
              <p className="text-red-500 text-sm">{errors.link}</p>
            )}
          </div>

          {/* Success and error messages */}
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

export default AddPdf;
