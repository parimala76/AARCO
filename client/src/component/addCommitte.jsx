import React, { useState } from "react";
import axios from "axios";
import { createCommitteeRoute } from "../utils/ApiRoutes"; // Import the correct API route

// Cloudinary configuration
const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
const cloudinaryUploadPreset = "aarcodev";

const AddCommitteeMember = () => {
  // State hooks for form fields and messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState(null);
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errormsg, setErrormsg] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Validate selected image
    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setImage(selectedImage);
      setErrors((prevErrors) => ({ ...prevErrors, image: "" })); // Clear image errors
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Please select a valid image file.",
      }));
      setImage(null);
    }
  };

  // Validate form fields
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    // Check if name is at least 3 characters
    if (name.length < 3) {
      tempErrors.name = "Name should be at least 3 characters long.";
      isValid = false;
    }

    // Check if email is provided
    if (!email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    }

    setErrors(tempErrors); // Update errors state
    return isValid; // Return validation status
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate fields before submitting
    if (handleValidation()) {
      try {
        let imageUrl = "";

        // Upload image to Cloudinary if selected
        if (image) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", cloudinaryUploadPreset);

          const cloudinaryResponse = await axios.post(cloudinaryUploadUrl, formData);
          imageUrl = cloudinaryResponse.data.secure_url; // Get the secure URL
        }

        // Prepare data to send to the backend
        const memberData = {
          name,
          email,
          order: order || 10, // Default order to 10 if not provided
          image: imageUrl || "", // Use image URL or empty string
          contact,
        };

        // Post the data to the backend
        const response = await axios.post(createCommitteeRoute, memberData, {
          withCredentials: true,
        });

        // Handle response from the backend
        if (response.data.status === true) {
          // Clear form fields on success
          setName("");
          setEmail("");
          setOrder("");
          setContact("");
          setImage(null);
          setErrors({});
          setMessage("Committee member added successfully!");
        } else {
          setErrormsg(response.data.message); // Set error message
        }
      } catch (error) {
        console.error("An error occurred:", error); // Log error
        setErrormsg("An error occurred. Please try again."); // Display error message
      }

      // Clear messages after 2 seconds
      setTimeout(() => {
        setMessage("");
        setErrormsg("");
      }, 3000);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Add Committee Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name input */}
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter member's name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Image upload */}
        <div>
          <label htmlFor="image" className="block mb-1">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter member's email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Contact input */}
        <div>
          <label htmlFor="contact" className="block mb-1">Contact</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter contact number"
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
        </div>

        {/* Order input */}
        <div>
          <label htmlFor="order" className="block mb-1">Order</label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter order number"
          />
          {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
        </div>

        {/* Display messages */}
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

export default AddCommitteeMember;
