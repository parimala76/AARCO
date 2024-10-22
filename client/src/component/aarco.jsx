import React from "react";

const AboutAARCO = () => {
  return (
    // Main section for "About AARCO" with a gradient background and padding
    <section
      id="about-aarco"
      className="mb-12 pb-12 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title of the section */}
        <h2 className="text-4xl font-bold mb-8 text-blue-600 text-center font-serif">
          About AARCO
        </h2>

        {/* Subsection for "Who We Are" */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-blue-500">
            Who We Are
          </h3>
          <p className="text-gray-700 leading-relaxed">
            The Association of Atomic Energy Officers (AARCO) is a service
            association of scientific officers employed at the Indira Gandhi
            Center For Atomic Research. We are registered under the Registration
            of Service Association and broadly consist of all officer members of
            IGCAR, Department of Atomic Energy, Government of India.
          </p>
        </div>

        {/* Subsection for "Our Structure" */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-blue-500">
            Our Structure
          </h3>
          <ul className="space-y-4 text-gray-700">
            {/* List of structural points describing AARCO's governance */}
            <li className="flex items-start">
              <span className="arrow mr-2 mt-1 flex-shrink-0"></span>
              <span>
                AARCO's office bearers are elected by the General Body
              </span>
            </li>
            <li className="flex items-start">
              <span className="arrow mr-2 mt-1 flex-shrink-0"></span>
              <span>
                Elected members constitute the Central Executive of the
                Association
              </span>
            </li>
            <li className="flex items-start">
              <span className="arrow mr-2 mt-1 flex-shrink-0"></span>
              <span>
                We operate according to the constitution of the Association
              </span>
            </li>
            <li className="flex items-start">
              <span className="arrow mr-2 mt-1 flex-shrink-0"></span>
              <span>
                Our goal is to serve and represent the interests of atomic
                energy officers
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutAARCO;
