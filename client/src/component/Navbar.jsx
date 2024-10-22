import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll"; // Scroll link for smooth scrolling to sections
import { useNavigate } from "react-router-dom"; // For navigation between routes
import { Menu, X } from "lucide-react"; // Optional icons for mobile menu toggle (hamburger and close icons)
import { logoutRoute } from "../utils/ApiRoutes.js"; // API route for logout
import axios from "axios"; // HTTP client for making API requests

// Navbar component
const Navbar = ({ isLogin, admin, setadmin, setIsLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle mobile menu open/close
  const navigate = useNavigate(); // Hook to handle navigation

  // Toggle function for mobile menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Switches the menu open/close state
  };

  // Navigation functions for different pages
  const handleLoginClick = () => {
    navigate("/login"); // Navigates to the login page
  };
  const handleNewsClick = () => {
    navigate("/news"); // Navigates to the news page
  };
  const handleDownloadClick = () => {
    navigate("/downloads"); // Navigates to the downloads page
  };
  const handleCClick = () => {
    navigate("/committee"); // Navigates to the committee page
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        logoutRoute,
        {},
        { withCredentials: true }
      ); // API request to log out

      if (response.data.status) {
        setIsLogin(false); // Update state to reflect logged-out status
        setadmin(false); // Update admin state
        navigate("/"); // Redirect to the homepage
      }
    } catch (error) {
      console.log("Error during logout:", error); // Log any errors
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-blue-900 py-3 shadow-md z-50">
      {/* Navbar container */}
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div>
          <p className="text-xl font-semibold">ARRCO</p>
          <p className="text-sm">Employees' IGCAR, Govt. of India</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Navigation buttons for desktop view */}
          <button
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
            onClick={handleNewsClick}
          >
            News & Updates
          </button>

          <div
            className="text-lg font-semibold cursor-pointer"
            onClick={() => navigate("/members")}
          >
            Members
          </div>

          {/* Scroll link to smooth scroll to the 'about-aarco' section */}
          <ScrollLink
            to="about-aarco"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            About
          </ScrollLink>

          {/* Navigation links */}
          <div
            onClick={() => navigate("/retire")}
            className="block py-2 px-4 font-semibold text-lg cursor-pointer"
          >
            Retirement
          </div>

          <div
            onClick={handleCClick}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Committee
          </div>

          <div
            onClick={() => navigate("/gallery")}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Gallery
          </div>

          <div
            onClick={handleDownloadClick}
            className="text-lg font-semibold cursor-pointer"
          >
            Downloads
          </div>

          {/* Conditionally render Login and Admin buttons */}
          {!isLogin && !admin && (
            <div
              onClick={handleLoginClick}
              className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Login
            </div>
          )}

          {admin && (
            <div
              onClick={() => navigate("/admin")}
              className="text-lg font-semibold underline cursor-pointer"
            >
              Admin
            </div>
          )}

          {isLogin && (
            <div className="text-lg cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle (hamburger icon) */}
        <div className="lg:hidden flex items-center">
          <button onClick={handleMenuToggle} className="text-2xl">
            {/* Toggle between menu and close icons based on the state */}
            {isMenuOpen ? (
              <X className="w-6 h-6" /> // Close icon when menu is open
            ) : (
              <Menu className="w-6 h-6" /> // Hamburger menu icon when closed
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-100`}
      >
        {/* Mobile menu items */}
        <button
          className="block py-2 px-4 text-lg cursor-pointer"
          onClick={handleNewsClick}
        >
          News & Updates
        </button>

        <div
          className="block py-2 px-4 text-lg cursor-pointer"
          onClick={() => navigate("/members")}
        >
          Members
        </div>

        {/* Scroll link to smooth scroll to the 'about-aarco' section on mobile */}
        <ScrollLink
          to="about-aarco"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-lg cursor-pointer"
          onClick={handleMenuToggle} // Closes the menu on click
        >
          About
        </ScrollLink>

        {/* Additional mobile navigation links */}
        <div
          onClick={() => navigate("/retire")}
          className="block py-2 px-4 text-lg cursor-pointer"
        >
          Retirement
        </div>

        <div
          onClick={handleCClick}
          className="block py-2 px-4 text-lg cursor-pointer"
        >
          Committee
        </div>

        <div
          onClick={() => navigate("/gallery")}
          className="block py-2 px-4 text-lg cursor-pointer"
        >
          Gallery
        </div>

        <div
          onClick={handleDownloadClick}
          className="block py-2 px-4 text-lg cursor-pointer"
        >
          Downloads
        </div>

        {/* Conditionally render Login button for mobile */}
        {!isLogin && !admin && (
          <div
            onClick={handleLoginClick}
            className="block py-2 ml-2 px-4 bg-blue-500 text-white w-fit cursor-pointer rounded-md"
          >
            Login
          </div>
        )}

        {admin && (
          <div
            onClick={() => navigate("/admin")}
            className="block py-2 px-4 text-lg font-semibold underline cursor-pointer"
          >
            Admin
          </div>
        )}

        {/* Logout button for mobile */}
        {isLogin && (
          <div
            className="block p-4 text-lg cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; // Export the Navbar component
