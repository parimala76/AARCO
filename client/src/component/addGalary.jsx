import React, { useState } from "react";
import axios from "axios";
import { gallery } from "../utils/ApiRoutes"; // Import the gallery API route

// Cloudinary configuration
const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
const cloudinaryUploadPreset = "aarcodev";

const AddGallery = () => {
  // State hooks for managing image upload and error/success messages
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errormsg, setErrormsg] = useState("");

  // Handle image file selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Validate that the selected file is an image
    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setImage(selectedImage); // Set the selected image
      setErrors({ ...errors, image: "" }); // Clear any previous errors
    } else {
      // Set error message if the selected file is not a valid image
      setErrors({ ...errors, image: "Please select a valid image file." });
      setImage(null); // Reset image state
    }
  };

  // Validate form inputs before submission
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    // Check if an image has been selected
    if (!image) {
      tempErrors.image = "Please enter an image";
      isValid = false; // Set validity to false if no image
    }

    setErrors(tempErrors); // Update error state
    return isValid; // Return validation status
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (handleValidation()) { // Only submit if validation passes
      try {
        let imageUrl = ""; // Initialize image URL

        // Upload image to Cloudinary if an image is selected
        if (image) {
          const formData = new FormData();
          formData.append("file", image); // Append the image file to FormData
          formData.append("upload_preset", cloudinaryUploadPreset); // Append the upload preset

          // Send the image to Cloudinary for upload
          const cloudinaryResponse = await axios.post(cloudinaryUploadUrl, formData);
          imageUrl = cloudinaryResponse.data.secure_url; // Get the secure URL of the uploaded image
        }

        // Post the image URL to the backend gallery API
        const response = await axios.post(gallery, { image: imageUrl }, { withCredentials: true });

        // Handle response from the backend
        if (response.data.status === true) {
          // Clear state if the image is successfully added
          setImage("");
          setErrors({});
          setMessage("Gallery image added successfully!"); // Success message
          setTimeout(() => {
            setMessage(""); // Clear the message after 2 seconds
          }, 2000);
        } else {
          // Set error message from response
          setErrormsg(response.data.message);
          setTimeout(() => {
            setErrormsg(""); // Clear the message after 2 seconds
          }, 2000);
        }
      } catch (error) {
        console.error("An error occurred:", error); // Log any errors
        setErrormsg("An error occurred. Please try again."); // Display a generic error message
        setTimeout(() => {
          setErrormsg(""); // Clear the error message after 2 seconds
        }, 2000);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Add Gallery Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image upload input */}
        <div>
          <label htmlFor="image" className="block mb-1">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange} // Handle image selection
            className="w-full p-2 border rounded"
            accept="image/*" // Accept only image files
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>} {/* Display image error */}
        </div>

        {/* Display success or error messages */}
        {message && <p className="text-green-500 text-sm mt-1">{message}</p>}
        {errormsg && <p className="text-red-500 text-sm mt-1">{errormsg}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddGallery; // Export the component
