import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import MemberList from "./pages/memberpage";
import RetireList from "./pages/retire";
import News from "./pages/news";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Downloads from "./pages/downloads";
import CommitteeList from "./pages/commitee";
import Gallery from "./pages/gallery";
import { verify } from "./utils/ApiRoutes.js"; // Importing the API route for verifying admin status
import axios from "axios"; // Axios is used for making HTTP requests

const App = () => {
  // State to track if the user is an admin
  const [isadmin, setadmin] = useState(false);

  // State to track if the user is logged in
  const [isLogin, setIsLogin] = useState(false);

  // Function to handle admin verification through an API call
  const handleadminvrification = async () => {
    try {
      // Make an API call to verify the user's admin status using the verify endpoint
      const response = await axios.get(verify, { withCredentials: true });

      if (response.data.success) {
        // If the verification is successful and the user has admin status, update the state
        if (response.data.decoded.status === "admin") {
          setadmin(true); // Set `isadmin` to true if the user is an admin
        }
        setIsLogin(true); // Set `isLogin` to true to indicate the user is logged in
      }
    } catch (error) {
      // Log any errors that occur during the API request
      console.error("Error during admin verification:", error);
    }
  };

  // useEffect hook to verify admin status when the component mounts or when `isLogin` changes
  useEffect(() => {
    handleadminvrification(); // Trigger the admin verification function
  }, [isLogin]); // Re-run the effect if the login status changes

  return (
    // Router to manage the different routes/pages of the application
    <Router>
      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <Home
              admin={isadmin} // Pass the `isadmin` state to the Home component
              isLogin={isLogin} // Pass the `isLogin` state to the Home component
              setadmin={setadmin} // Allow Home component to modify admin state
              setIsLogin={setIsLogin} // Allow Home component to modify login state
            />
          }
        />

        {/* Member list page route, accessible only if the user is logged in */}
        <Route
          path="/members"
          element={<MemberList isadmin={isadmin} isLogin={isLogin} />}
        />

        {/* News page route, accessible only if the user is logged in */}
        <Route
          path="/news"
          element={<News isadmin={isadmin} isLogin={isLogin} />}
        />

        {/* Retire list page route, accessible only if the user is logged in */}
        <Route
          path="/retire"
          element={<RetireList isadmin={isadmin} isLogin={isLogin} />}
        />

        {/* Login page route, used to handle login functionality */}
        <Route
          path="/login"
          element={
            <Login
              admin={isadmin} // Pass the `isadmin` state to the Login component
              isLogin={isLogin} // Pass the `isLogin` state to the Login component
              setadmin={setadmin} // Allow Login component to modify admin state
              setIsLogin={setIsLogin} // Allow Login component to modify login state
            />
          }
        />

        {/* Admin dashboard route, accessible only if the user is logged in and an admin */}
        <Route
          path="/admin"
          element={<Admin admin={isadmin} isLogin={isLogin} />}
        />

        {/* Downloads page route, accessible only if the user is logged in */}
        <Route
          path="/downloads"
          element={<Downloads isadmin={isadmin} isLogin={isLogin} />}
        />

        {/* Committee page route, accessible only if the user is logged in */}
        <Route
          path="/committee"
          element={<CommitteeList isAdmin={isadmin} isLogin={isLogin} />}
        />

        {/* Gallery page route, accessible only if the user is logged in */}
        <Route
          path="/gallery"
          element={<Gallery isadmin={isadmin} isLogin={isLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
