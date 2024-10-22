import React from "react";
import logos from "../images/logo.png";

const Header = () => {
  return (
    <header
      id="header"
      className="bg-gradient-to-r from-blue-99 to-white text-blue-900 pt-10 md:py-6 px-4 shadow-lg overflow-hidden mt-10 md:mt-20"
    >
      <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-center">
        {/* Text Section */}
        <div className="text-center lg:mt-16 mb-8 md:mb-12 lg:mb-0 lg:w-2/3">
          <div className="inline-block">
            <h1 className="text-4xl md:text-5xl lg:text-4xl xl:text-6xl font-bold mb-2 animate-slide-right">
              Association of Atomic Research Centre OfficersKalpakkam
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-end space-y-6 md:space-y-0 md:space-x-8 text-base md:text-xl"></div>
        </div>

        {/* Logo Section */}
        <div className="flex-shrink-0 lg:w-1/3 flex justify-center items-center animate-slide-up">
          <img
            src={logos}
            alt="AARCO Logo"
            className="w-32 md:w-48 lg:w-56 xl:w-64 h-28 md:h-44 lg:h-52 xl:h-60 object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <style>
        {`
          @keyframes slideRight {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideLeft {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-right {
            animation: slideRight 1s ease-out forwards;
          }
          .animate-slide-left {
            animation: slideLeft 1s ease-out forwards;
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          .animate-slide-up {
            animation: slideUp 1s ease-out forwards;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
