import React from "react"; // Importing React to define and use components
import { FaArrowLeft } from "react-icons/fa"; // Importing 'FaArrowLeft' icon for back navigation
import { useNavigate } from "react-router-dom"; // Hook to navigate between different routes
import Footer from "../component/footer"; // Importing Footer component
import pdfFile from "../pdf/ec.pdf"; // Importing the PDF file to display

const MemberList = ({ isLogin }) => {
  // Define the MemberList component with isLogin prop (to pass login status to Footer)
  
  const navigate = useNavigate(); // Initialize navigate function to handle routing

  // Function to handle the back button click, which navigates to the home page
  const handleBackClick = () => {
    navigate("/"); // Navigating to the homepage
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back button section */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={handleBackClick} // Handle back navigation on click
      >
        <FaArrowLeft className="text-white text-2xl" /> {/* Back icon */}
        <span className="ml-2 text-white text-lg hover:underline">Back</span> {/* Back text with hover effect */}
      </div>

      {/* Title section */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-5xl font-bold text-center text-blue-900"
          style={{ fontFamily: "Playfair Display, serif" }} // Apply custom font family
        >
          Our Members PDF {/* Heading text */}
        </h2>
      </div>

      {/* PDF Display section */}
      <div className="container mx-auto px-4 mb-8 flex-grow">
        {/* Responsive iframe container for embedding the PDF */}
        <div className="relative w-full h-96 sm:h-[600px] overflow-hidden shadow-md rounded-lg">
          <iframe
            src={`${pdfFile}#toolbar=0&navpanes=0&scrollbar=0`} // Embedding the PDF file in the iframe, disabling unnecessary tools
            className="absolute top-0 left-0 w-full h-full border-none" // Full-screen iframe with no border
            title="Members PDF" // Title for the iframe
            style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)" }} // Add subtle box-shadow for better appearance
          ></iframe>
        </div>

        {/* Fallback download link for browsers that don't support inline PDF viewing */}
        <div className="text-center mt-4">
          <p>If PDF is not available on this browser. No worries, you can,</p> {/* Fallback message */}
          <a
            href={pdfFile} // Link to the PDF file
            download="Members.pdf" // Set the downloaded file name
            className="text-blue-900 underline" // Styling the download link
            target="_blank" // Open the link in a new tab
            rel="noopener noreferrer" // Ensures security by preventing the new page from accessing the window object
          >
            Click to Download PDF {/* Download link text */}
          </a>
        </div>
      </div>

      {/* Footer section */}
      <Footer isLogin={isLogin} /> {/* Render Footer component and pass isLogin prop */}
    </div>
  );
};

export default MemberList; // Export the MemberList component for use in other parts of the app
