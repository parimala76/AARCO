import React, { useEffect, useState } from "react";
import defaultImg from "../images/default.jpeg"; // Default image to display if member image is missing
import { FaArrowLeft } from "react-icons/fa"; // Importing back arrow icon
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { MdDelete } from "react-icons/md"; // Importing delete icon
import axios from "axios"; // Axios for making HTTP requests
import Footer from "../component/footer"; // Footer component
import { getRetrimentRoute, deleteRetrimentRoute } from "../utils/ApiRoutes"; // API routes for fetching and deleting members

const RetireList = ({ isadmin, isLogin }) => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [members, setMembers] = useState([]); // State to hold retired members list
  const [error, setError] = useState(""); // State to hold error messages

  // Function to fetch retired members from the server
  const fetchMembers = async () => {
    try {
      const response = await axios.get(getRetrimentRoute, {
        withCredentials: true, // Ensures that cookies are sent along with the request for authentication
      });
      if (response.data.status) {
        setMembers(response.data.retirments); // If data is received, update the state with the members' data
      } else {
        setError("No members found."); // If no members are found, set an appropriate error message
      }
    } catch (error) {
      console.error("Error fetching members:", error); // Log any error that occurs during the API call
      setError("An error occurred while fetching members."); // Display error message in UI
    }
  };

  // Function to delete a retired member
  const handledelete = async (_id) => {
    try {
      const response = await axios.delete(deleteRetrimentRoute, {
        data: { _id }, // Send the member ID in the request body to delete the specific member
        withCredentials: true, // Ensures that cookies are sent along with the request for authentication
      });
      fetchMembers(); // After deleting, refresh the members list
    } catch (error) {
      console.error("Error deleting member:", error); // Log any error that occurs during the delete action
      setError("An error occurred while deleting member."); // Display error message in UI
    }
  };

  // useEffect hook to fetch members when the component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  // Function to handle back button click and navigate to the previous page
  const handleBackClick = () => {
    navigate("/");
  };

  // If there's an error, display the error message on the screen
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-2xl">{error}</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Icon Section */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={handleBackClick}
      >
        <FaArrowLeft className="text-white text-2xl" /> {/* Arrow Icon */}
        <span className="ml-2 text-white text-lg hover:underline">Back</span> {/* Back text */}
      </div>

      {/* Title Section */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-5xl font-bold text-center text-blue-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Retired Members {/* Title text */}
        </h2>
      </div>

      {/* Member List Section */}
      <div
        className={`container mx-auto px-4 mb-16 ${
          members.length === 0 ? `pb-72` : `pb-14`
        }`} // Adjusts padding based on the presence of members
      >
        {members.length > 0 ? ( // If there are members, map through the list and display each member
          members.map((member) => (
            <div
              key={member._id} // Unique key for each list item
              className="bg-white relative rounded-lg shadow-lg overflow-hidden mb-8 flex flex-col md:flex-row p-6 transition-transform duration-300 hover:scale-105"
            >
              {/* Admin Order Display */}
              {isadmin && (
                <div className="absolute top-4 right-14 bg-blue-900 text-white px-2 py-1 rounded-full">
                  order : {member.order || 10} {/* Show member's order or default to 10 */}
                </div>
              )}
              {/* Admin Delete Button */}
              {isadmin && (
                <MdDelete
                  className="text-red-800 absolute text-xl top-5 right-4 cursor-pointer w-5 h-5"
                  onClick={() => handledelete(member._id)} // Delete function on click
                />
              )}

              {/* Member Image Section */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center items-center">
                <img
                  src={member.image || defaultImg} // If no image is provided, display default image
                  alt={member.name}
                  className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-lg border-4 border-blue-400 shadow-md"
                />
              </div>

              {/* Member Info Section */}
              <div className="w-full md:w-2/3 flex flex-col justify-center md:pl-6">
                <h3 className="text-4xl font-semibold text-gray-800 text-center md:text-left">
                  {member.name} {/* Member's name */}
                </h3>
                <h3 className="text-lg text-gray-800 text-center md:text-left">
                  mail : {member.email} {/* Member's email */}
                </h3>
                <h3 className="text-lg mb-2 text-gray-800 text-center md:text-left">
                  Contact : {member.contact} {/* Member's contact */}
                </h3>
                {/* Words of Wisdom Section */}
                {member.content && (
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-semibold text-blue-600 mb-2">
                      words of wisdom
                    </h4>
                  </div>
                )}
                <p className="text-lg text-gray-600 leading-relaxed">
                  {member.content} {/* Member's content */}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-semibold">Active From:</span>{" "}
                  {member.date} {/* Member's active date */}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-3xl font-bold text-red-500">
            No retired members available {/* Message if no members are found */}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <Footer isLogin={isLogin} /> {/* Footer component */}
    </div>
  );
};

export default RetireList;
