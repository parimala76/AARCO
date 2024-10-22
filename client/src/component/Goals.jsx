import React from "react";

const Goals = () => {
  return (
    <section id="goals" className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Our Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <h3 className="text-xl font-semibold mb-4">
              Safeguard Common Interests
            </h3>
            <p>
              The Association aims to safeguard and promote the common interests
              of all members through constitutional means.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <h3 className="text-xl font-semibold mb-4">Foster Camaraderie</h3>
            <p>
              We strive to foster a spirit of camaraderie and good fellowship
              amongst members and similar service associations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <h3 className="text-xl font-semibold mb-4">
              Espouse Member Causes
            </h3>
            <p>
              It is our paramount duty to espouse the cause of our members
              without bias based on caste, colour, region, religion, or similar
              considerations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <h3 className="text-xl font-semibold mb-4">
              Address Selective Victimisation
            </h3>
            <p>
              The Association will address issues involving selective
              victimisation or policies that impact the general principles we
              stand for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;
