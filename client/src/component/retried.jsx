import React from "react";
import defaultImg from "../images/default.jpeg"; // Replace with the relevant image file
import { useNavigate } from "react-router-dom";

const RetiredSection = () => {
  const navigate = useNavigate();

  const handleAllRetiredMembers = () => {
    navigate("/retire");
  };

  return (
    <section
      id="retired-section"
      className="mb-12 bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center"
    >
      {/* Image Section */}
      <div className="md:w-1/2 mb-6 md:mb-0 flex flex-col items-center">
        <img
          src={defaultImg}
          alt="Retired Members"
          className="w-2/4 h-auto max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl object-cover rounded-lg border-4 border-blue-400 shadow-md"
        />
        {/* 'See All Retired Members' button */}
        <button
          onClick={handleAllRetiredMembers}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          See all Retired Members
        </button>
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 pl-0 md:pl-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">
          Honoring Our Retired Members
        </h2>
        <div className="sliding-text">
          <p className="text-lg mb-4 text-justify leading-relaxed">
            The Association of Atomic Energy Officers celebrates the invaluable
            contributions of those who have dedicated their careers to advancing
            atomic energy research and innovation. Their efforts have played a
            vital role in shaping the industry, ensuring safety, and driving
            progress in the field.
          </p>
          <p className="text-lg mb-4 text-justify leading-relaxed">
            We honor their expertise, commitment, and leadership, which have
            left an enduring legacy. These exceptional individuals exemplify the
            highest standards of professionalism and have made significant
            impacts through their work.
          </p>
          <p className="text-lg mb-4 text-justify leading-relaxed">
            Join us in recognizing their achievements and exploring the stories
            of these remarkable professionals who have devoted their lives to
            the advancement of atomic energy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RetiredSection;
