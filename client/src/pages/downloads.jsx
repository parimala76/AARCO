import React, { useEffect, useState } from "react";
// Importing necessary libraries and hooks from React, axios for API calls, 
// and icon components from react-icons for UI elements.

import { FaArrowLeft } from "react-icons/fa"; // Left arrow icon for the back button
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { MdDelete } from "react-icons/md"; // Delete icon for admin functionality

import { getPdfRoute, deletePdfRoute } from "../utils/ApiRoutes.js"; 
// Importing API routes for fetching and deleting PDF files

import axios from "axios"; // For making HTTP requests
import Footer from "../component/footer.jsx"; // Footer component

const Downloads = ({ isadmin, isLogin }) => {
  // The `Downloads` component accepts two props: 
  // `isadmin` to check if the user is an admin and 
  // `isLogin` to check if the user is logged in.

  const navigate = useNavigate(); 
  // The `useNavigate` hook is used to navigate programmatically between routes.

  const [pdfFiles, setPdfFiles] = useState([]); 
  // A state variable to store the list of PDF files.

  const fetchPdfFiles = async () => {
    // Function to fetch PDF files from the server
    try {
      const response = await axios.get(getPdfRoute);
      // Making a GET request to fetch PDFs

      const data = response.data.pdf;
      // Extracting the PDF data from the response

      setPdfFiles(data);
      // Setting the fetched PDF files in the state
    } catch (error) {
      console.error("Error fetching Pdf Files:", error);
      // Logging errors in case the fetch request fails
    }
  };

  const deletePdfFile = async (_id) => {
    // Function to delete a PDF file by its ID
    try {
      const response = await axios.delete(deletePdfRoute, {
        data: { _id },
        withCredentials: true,
        // Sending the file ID (_id) and ensuring credentials are included in the request
      });

      fetchPdfFiles(); 
      // Re-fetching the PDF files after deletion to update the UI
    } catch (error) {
      console.error("Error deleting Pdf File:", error);
      // Logging errors in case the delete request fails
    }
  };

  useEffect(() => {
    fetchPdfFiles(); 
    // Fetch the PDF files when the component is mounted
  }, []);

  return (
    <>
      {/* Back button */}
      <div
        className="bg-blue-900 inline-flex w-full items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {/* On click, the user is navigated back to the home page */}
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* PDF Download Section */}
      <div className="container mx-auto p-6 pb-80">
        <h1 className="text-3xl font-bold mb-6">Download PDF Notices</h1>

        {pdfFiles.length > 0 ? (
          // If there are PDF files available, display them in a list
          <ul className="list-disc pl-5 space-y-4">
            {pdfFiles.map((file) => (
              <li key={file._id} className="text-lg relative">
                {/* Each PDF file is rendered with a link to download */}
                <a
                  href={file.link}
                  download
                  className={`text-blue-500 hover:underline absolute ${
                    isadmin ? `left-8` : ``
                  }`}
                >
                  {file.title}
                </a>

                {isadmin && (
                  // If the user is an admin, display a delete icon
                  <MdDelete
                    className={`text-red-600 absolute text-xl top-1 left-1 cursor-pointer ${
                      isadmin ? `left-1` : ``
                    }`}
                    onClick={() => deletePdfFile(file._id)}
                    // On clicking the delete icon, the corresponding PDF is deleted
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          // If there are no PDFs available, display a message
          <div className="text-2xl text-center font-bold text-red-500 mt-6 mb-80">
            No PDFs available
          </div>
        )}
      </div>

      {/* Footer */}
      <div>
        <Footer isLogin={isLogin} />
        {/* Passing `isLogin` prop to the Footer component */}
      </div>
    </>
  );
};

export default Downloads;
