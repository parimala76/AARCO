import React, { useEffect } from "react"; // Import necessary libraries and hooks from React
import Navbar from "./Navbar"; // Import Navbar component
import Header from "./header"; // Import Header component
import Goals from "./Goals"; // Import Goals component
import AboutAARCO from "./aarco"; // Import About AARCO component
import Marquee from "./marqueue"; // Import Marquee component for scrolling text/graphics

// Import additional components used on the homepage
import PresidentMessage from "./presidentMessage"; // Import President's message component
import Footer from "./footer"; // Import Footer component
import RetiredCarousel from "./retried"; // Import Carousel for retired members
import HomeImage from "./homeimage"; // Import Home Image component for displaying images

// Main Home component, responsible for rendering the entire homepage
const Home = ({ admin, isLogin, setadmin, setIsLogin }) => {
  return (
    <div className="font-sans text-gray-900">
      {/* Render the Navbar with props for admin status and login state */}
      <Navbar
        admin={admin}
        isLogin={isLogin}
        setadmin={setadmin}
        setIsLogin={setIsLogin}
      />

      {/* Render the Header component */}
      <Header />

      {/* Render the Marquee component for any scrolling content */}
      <Marquee />

      {/* Main content section */}
      <main className="container mx-auto px-4 py-6 pt-20">
        {/* Add padding-top to account for fixed navbar */}
        <PresidentMessage id="president-message" /> {/* President's message section */}
        <Goals id="goals" /> {/* Organizational goals section */}
        <AboutAARCO id="about-aarco" /> {/* About AARCO section */}
        <RetiredCarousel id="retired-carousel" /> {/* Carousel for retired members */}
        <HomeImage /> {/* Home image section */}
      </main>

      {/* Render the Footer component */}
      <Footer isLogin={isLogin} /> {/* Footer takes in the login state */}
    </div>
  );
};

export default Home; // Export the Home component to be used in other parts of the application
