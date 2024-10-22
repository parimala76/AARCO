import React, { useEffect, useState } from "react";
import defaultImg from "../images/default.jpeg"; // Default image for committee members
import { FaArrowLeft } from "react-icons/fa"; // Back icon from react-icons
import { MdDelete } from "react-icons/md"; // Delete icon from react-icons
import { getCommitteeRoute, deleteCommitteeRoute } from "../utils/ApiRoutes"; // API routes for fetching and deleting committee members
import { useNavigate } from "react-router-dom"; // React router for navigation
import axios from "axios"; // Axios for making HTTP requests
import Footer from "../component/footer"; // Footer component

const CommitteeList = ({ isAdmin, isLogin }) => {
  // Hooks for managing component state
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate the user
  const [members, setMembers] = useState([]); // State to store the list of committee members
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to handle and display errors

  // Function to fetch committee members from the API
  const fetchMembers = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(getCommitteeRoute, {
        withCredentials: true, // Send cookies with request for authentication
      });

      // If the API returns a success status, update the members state with data
      if (response.data.status) {
        setMembers(response.data.committee);
      }
    } catch (error) {
      console.error("Error fetching committee members:", error);
      setError("An error occurred while fetching the committee members."); // Set error message if API request fails
    } finally {
      setLoading(false); // Set loading to false after data is fetched (or error occurs)
    }
  };

  // Function to handle member deletion
  const handleDelete = async (_id) => {
    try {
      // Send delete request to the API with the member ID
      await axios.delete(deleteCommitteeRoute, {
        data: { _id }, // Send member ID in the request body
        withCredentials: true, // Send cookies with request for authentication
      });
      fetchMembers(); // Refresh the list of members after deletion
    } catch (error) {
      console.error("Error deleting member:", error); // Log error if deletion fails
    }
  };

  // useEffect to fetch committee members on component mount
  useEffect(() => {
    fetchMembers(); // Fetch the members when the component mounts
  }, []);

  // Function to navigate back to the home page
  const handleBackClick = () => {
    navigate("/"); // Navigate back to the home page
  };

  // If there's an error, display it to the user
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-2xl">{error}</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back button to return to the previous page */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={handleBackClick}
      >
        {/* Icon for the back button */}
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Page title */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-5xl font-bold text-center text-blue-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Our Committee Members
        </h2>
      </div>

      {/* Loading indicator while the data is being fetched */}
      {loading && <div className="text-center text-2xl">Loading...</div>}

      {/* Member cards */}
      <div
        className={`container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8 text-center ${
          members.length === 0 ? `pb-72` : `pb-14`
        }`}
      >
        {/* Render each member if data is available and loading is complete */}
        {!loading && members.length > 0
          ? members.map((member) => (
              <div
                key={member._id} // Unique key for each member
                className="bg-white relative rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                {/* Admin controls for deleting a member */}
                {isAdmin && (
                  <>
                    {/* Display member order */}
                    <div className="absolute top-4 left-4 bg-blue-900 text-white px-2 py-1 rounded-full z-10">
                      {member.order || 10}
                    </div>
                    {/* Delete icon, visible only to admins */}
                    <MdDelete
                      className="text-red-800 absolute text-xl top-4 right-4 cursor-pointer z-10"
                      onClick={() => handleDelete(member._id)} // Call delete function on click
                      aria-label="Delete Member"
                    />
                  </>
                )}

                {/* Member image or default if image is not available */}
                <div className="w-full h-60 flex items-center justify-center bg-gray-100 overflow-hidden">
                  <img
                    src={member.image || defaultImg} // Use default image if member image is not provided
                    alt={member.name || "Member Image"}
                    className="w-56 h-56 rounded-lg object-contain"
                  />
                </div>

                {/* Member details */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                    {member.name}
                  </h3>
                  <h4 className="text-xl text-gray-600 mb-4">{member.email}</h4>
                  {/* Display member contact if available */}
                  {member.contact && (
                    <p className="text-gray-600 mb-2">
                      Contact: {member.contact}
                    </p>
                  )}
                </div>
              </div>
            ))
          : !loading && (
              <div className="text-center text-3xl font-bold text-red-500">
                No members available {/* Message when no members are found */}
              </div>
            )}
      </div>

      {/* Footer component */}
      <Footer isLogin={isLogin} />
    </div>
  );
};

export default CommitteeList;
