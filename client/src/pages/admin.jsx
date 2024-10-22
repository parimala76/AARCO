import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AddNews from "../component/addNews";
import AddRetirment from "../component/addRetirment";
import AddAdmin from "../component/addAdmin";
import AddCommitteMember from "../component/addCommitte.jsx";
import AddGalary from "../component/addGalary";
import AddPdf from "../component/addPdf.jsx";

const Admin = ({ admin, isLogin }) => {
  const navigate = useNavigate();

  // Redirects the user to the home page if they are not logged in or not an admin
  useEffect(() => {
    if (!admin || !isLogin) {
      navigate("/");
    }
  }, [admin, isLogin, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button to navigate to the home page */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {/* Back Arrow Icon */}
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Admin Dashboard Main Content */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Admin Dashboard
        </h2>

        {/* Grid layout to display various admin components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Each card contains a different form or functionality for the admin */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddAdmin /> {/* Form to add a new admin */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddNews /> {/* Form to add news content */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddCommitteMember /> {/* Form to add committee members */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddRetirment /> {/* Form to manage retirements */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddGalary /> {/* Form to add images to the gallery */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddPdf /> {/* Form to upload PDF documents */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
