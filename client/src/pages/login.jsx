import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { loginorSinupRoute, verifyotp, verify } from "../utils/ApiRoutes.js"; // Importing required API routes
import axios from "axios"; // Importing Axios for making API calls

// Login component handles the user authentication process (OTP generation and verification)
const Login = ({ isLogin, setAdmin, setIsLogin }) => {
  // State variables for handling input, loading state, and form errors
  const [email, setEmail] = useState(""); // To store the user's email
  const [otp, setOtp] = useState(""); // To store the OTP entered by the user
  const [loading, setLoading] = useState(false); // To track loading state during API requests
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the OTP was sent
  const [message, setMessage] = useState(""); // Displays success or error messages
  const [errors, setErrors] = useState({}); // Stores form validation errors
  const navigate = useNavigate(); // Hook to navigate between routes

  // Function to validate email format and ensure fields are filled
  const validateForm = () => {
    const newErrors = {}; // Object to hold validation errors
    if (!email) newErrors.email = "Email is required"; // Check if email is not empty
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email format is invalid"; // Basic regex to check email format
    return newErrors; // Return errors object
  };

  // Function to request OTP by making a POST request to the server
  const handleOtp = async (event) => {
    event.preventDefault();
    const formErrors = validateForm(); // Validate the form
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors if found
      return;
    }
    setErrors({}); // Clear any previous errors
    setLoading(true); // Set loading state
    try {
      const response = await axios.post(loginorSinupRoute, { email }); // Send email to the server to request OTP
      if (response.data.status) {
        setIsLoggedIn(true); // OTP request successful, set state to allow OTP entry
        setMessage(response.data.msg); // Set success message
        setTimeout(() => {
          setMessage(""); // Clear message after 2 seconds
        }, 2000);
      } else {
        setErrors({ login: response.data.message }); // Handle failure to send OTP
      }
    } catch (error) {
      console.error("Error during login:", error); // Log errors for debugging
      setErrors({ general: "An error occurred. Please try again." }); // General error message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function to verify if the logged-in user is an admin
  const verifyAdmin = async () => {
    try {
      const response = await axios.get(verify, { withCredentials: true }); // Send request to verify admin status
      if (response.data.success && response.data.decoded.status === "admin") {
        setAdmin(true); // Set admin status if verified
      }
    } catch (error) {
      console.error("Error during admin verification:", error); // Log error if verification fails
    }
  };

  // Function to handle OTP verification and login process
  const handleLogin = async () => {
    const formErrors = validateForm(); // Validate email again
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set errors if form validation fails
      return;
    }
    if (!otp || otp.length < 6) {
      setErrors({ otp: "OTP must be 6 digits long" }); // Ensure OTP length is correct
      return;
    }
    try {
      const response = await axios.post(
        verifyotp, // Send OTP and email to the server for verification
        { email, otp },
        { withCredentials: true }
      );
      if (response.data.status) {
        setMessage("Login successful!"); // If successful, display message
        verifyAdmin(); // Verify if the user is an admin
        setIsLogin(true); // Set login state to true
        navigate("/"); // Redirect to the home page after login
      } else {
        setErrors({ otp: response.data.msg || "OTP verification failed" }); // Handle OTP verification failure
      }
    } catch (error) {
      console.error("Error during OTP verification:", error); // Log error
      setErrors({
        general: "An error occurred while verifying OTP. Please try again.",
      }); // Display general error message
    }
  };

  // Function to handle form submission, either OTP request or login
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      handleLogin(event); // If OTP is already sent, handle login
    } else {
      handleOtp(event); // Else, handle OTP request
    }
  };

  // Redirect to home if the user is already logged in
  useEffect(() => {
    if (isLogin) {
      navigate("/"); // If logged in, redirect to the home page
    }
  }, [isLogin, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button to go back to the previous page */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Title for the Login/SignUp Page */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Login/SignUp
        </h2>
      </div>

      {/* Login Form */}
      <div className="container mx-auto px-4 flex justify-center items-center flex-grow">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full p-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* OTP Field, shown only after email is verified */}
            {isLoggedIn && (
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="otp"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter your OTP"
                  className={`w-full p-3 border ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
              </div>
            )}

            {/* Error and Success Messages */}
            {errors.general && (
              <p className="text-red-500 text-sm mb-4">{errors.general}</p>
            )}
            {message && (
              <p className="text-green-500 text-sm mb-4">{message}</p>
            )}

            {/* Submit Button */}
            {!loading ? (
              <button
                type="submit"
                className="w-full bg-blue-900 text-xl text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                {isLoggedIn ? "Login/SignUp" : "Generate OTP"}
              </button>
            ) : (
              <button
                className="w-full bg-slate-500 text-xl text-white py-3 rounded-lg"
                disabled
              >
                Generating OTP...
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
