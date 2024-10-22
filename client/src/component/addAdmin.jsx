import React, { useState } from "react";
import { setAdmin } from "../utils/ApiRoutes";
import axios from "axios";

const AddAdmin = () => {
  // State to store the input email
  const [email, setEmail] = useState("");
  // State to store any error messages
  const [error, setError] = useState("");
  // State to store success message after a successful admin addition
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    // Check if email input is empty and set an error message if so
    if (email === "") {
      setError("Email is required");
      return;
    }

    // Data object containing the email to be sent to the API
    const data = {
      email,
    };

    try {
      // Send a POST request to the setAdmin API with the email data
      const res = await axios.post(setAdmin, data, { withCredentials: true });

      // Check the response status, if false set error message, otherwise clear error and display success message
      if (res.data.status === false) {
        setError(res.data.msg); // Display error message from the server response
      } else {
        setEmail(""); // Clear email input
        setError(""); // Clear any existing error messages
        setMessage("Member status changed to admin successfully"); // Set success message
      }
    } catch (error) {
      // Catch and log any errors that occur during the API request
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      {/* Title of the form */}
      <div className="mb-4">
        <h1 className="text-center font-bold text-2xl">Add Admin</h1>
      </div>

      {/* Email input field */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
        />
      </div>

      {/* Display error message if it exists */}
      {error && <p className="text-red-500 text-xl italic">{error}</p>}

      {/* Display success message if it exists */}
      {message && (
        <p className="text-green-500 text-xl italic">{message}</p>
      )}

      {/* Submit button to trigger handleSubmit function */}
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            handleSubmit(); // Call handleSubmit when the button is clicked
          }}
        >
          Add Admin
        </button>
      </div>
    </div>
  );
};

export default AddAdmin;
