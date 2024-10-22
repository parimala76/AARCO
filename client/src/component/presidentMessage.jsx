import React from 'react';
import defaultimg from '../images/default.jpeg';
import ig1 from "../images/gallery/1.jpg";
const PresidentMessage = () => {
  return (
    <section id="president-message" className="mb-12 bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
      {/* Image Section */}
      <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
        <img
          src={ig1}
          alt="President Message"
          className="w-2/4 h-auto max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl object-cover rounded-lg border-4 border-blue-400 shadow-md"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 pl-0 md:pl-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">
          President/Secretary Message
        </h2>
        <div className="sliding-text">
          <p className="text-lg mb-4 text-justify leading-relaxed">
            Welcome to our event! We are thrilled to have you join us for an exciting and enriching experience. Our team has worked tirelessly to ensure that every detail is perfect, and we are committed to providing you with a memorable experience.
          </p>
          <p className="text-lg mb-4 text-justify leading-relaxed">
            This event is a testament to our dedication and passion for [Your Field/Industry]. We have an incredible lineup of speakers, sessions, and activities designed to inspire, educate, and engage all attendees.
          </p>
          <p className="text-lg mb-4 text-justify leading-relaxed">
            We look forward to your participation and hope that you leave with new insights, valuable connections, and a sense of accomplishment. Thank you for being a part of this journey with us!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PresidentMessage;
