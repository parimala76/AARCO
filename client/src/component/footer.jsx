import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = ({ isLogin }) => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Login", action: () => navigate("/login") },
    { name: "News & Update", action: () => navigate("/news") },
    { name: "Downloads", action: () => navigate("/downloads") },
    { name: "Members", action: () => navigate("/members") },
    { name: "Committee", action: () => navigate("/committee") },
    { name: "Gallery", action: () => navigate("/gallery") },
  ];

  return (
    <footer className="bg-blue-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Quick Links */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <div
                    onClick={link.action}
                    className="text-blue-600 cursor-pointer hover:text-blue-800 transition duration-300"
                  >
                    {link.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">
              Contact Information
            </h3>
            {/* Mr. Ravi Islavath President 
            RPG/IGCAR; 
            Ph 26981/87302
            ris@igcar.gov.in 
            Mob: 9043624906 */}
            <p className="text-blue-700 mb-1">Mr. Ravi Islavath </p>

            <p className="text-blue-700 mb-1">President</p>
            <p className="text-blue-700 mb-1">Mob: 9043624906</p>
            <a
              href="mailto:epfooa@gmail.com"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              ris@igcar.gov.in
            </a>
          </div>

          {/* Get in Touch */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">
              Get in Touch
            </h3>
            {isLogin ? (
              <div>
                <p className="text-blue-700 mb-4">
                  For inquiries or assistance, feel free to contact us:
                </p>

                <a
                  href="mailto:epfooa@gmail.com"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                  <Mail className="mr-2" size={20} />
                  Contact via Email
                </a>
              </div>
            ) : (
              <div>
                <p
                  className="text-blue-700 text-xl mb-1 underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Please signUp/Login to get in touch
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        {/* Inplace of {new Date().getFullYear()} write the year of establishment of AARCO */}
        <div className="mt-6 text-center text-blue-700">
          <p>&copy; {new Date().getFullYear()} AARCO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
