import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API calls
import { addRetrimentRoute } from "../utils/ApiRoutes"; // Import the API route for adding retirement member

const AddRetirement = () => {
  // State variables for form inputs and validation errors
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [order, setOrder] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const navigate = useNavigate(); // Navigation hook for redirecting after form submission

  // Cloudinary configuration for image upload
  const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
  const cloudinaryUploadPreset = "aarcodev";

  // Function to handle form validation
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!name) {
      tempErrors.name = "Name is required."; // Name field validation
      isValid = false;
    }

    if (!email) {
      tempErrors.email = "Email is required."; // Email field validation
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid; // Return whether the form is valid or not
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (handleValidation()) {
      try {
        let imageUrl = "";
        // If an image is selected, upload it to Cloudinary
        if (image) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", cloudinaryUploadPreset);
          const cloudinaryResponse = await axios.post(cloudinaryUploadUrl, formData);
          imageUrl = cloudinaryResponse.data.secure_url; // Get the uploaded image URL
        }

        // Data object to be sent to the backend
        const memberData = {
          name,
          image: imageUrl || "",
          email,
          date,
          contact,
          order,
          content,
        };

        // API call to add the retirement member data
        const response = await axios.post(addRetrimentRoute, memberData, {
          withCredentials: true,
        });

        // Handle response status
        if (response.data.status === false) {
          setErrormsg("Error adding member."); // Display error message on failure
          setTimeout(() => {
            setErrormsg("");
          }, 2000); // Clear the error message after 2 seconds
        } else if (response.data.status === true) {
          setMessage("Member added successfully!"); // Show success message
          setTimeout(() => {
            setMessage("");
          }, 2000); // Clear the success message after 2 seconds
          // Clear form fields
          setName("");
          setImage(null);
          setEmail("");
          setContact("");
          setDate("");
          setOrder("");
          setContent("");
        }
      } catch (error) {
        setErrormsg("Error adding member."); // Handle API call failure
        setTimeout(() => {
          setErrormsg("");
        }, 2000);
      }
    }
  };

  // Image change handler to capture the file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the selected image file
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Retired Member</h2>
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Image upload field */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Contact field */}
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">
            Contact
          </label>
          <input
            type="number"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Contact number"
          />
        </div>

        {/* Date field */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Date of Working
          </label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="dd/mm/yyyy - dd/mm/yyyy"
          />
        </div>

        {/* Order field */}
        <div className="mb-4">
          <label htmlFor="order" className="block text-gray-700 font-bold mb-2">
            Order
          </label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter order number"
          />
        </div>

        {/* Content field */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="6"
            placeholder="Enter content"
          />
        </div>

        {/* Success and error messages */}
        {message && <p className="text-green-500 text-sm mt-1">{message}</p>}
        {errormsg && <p className="text-red-500 text-sm mt-1">{errormsg}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRetirement;
