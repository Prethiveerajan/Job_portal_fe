

import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import JobPortal from "./components/JobPortal/JobPortal";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import ResetPassword from "./pages/ResetPassword";
import axiosInstance from "./utils/axiosInstance";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

  const [jobs, setJobs] = useState([]);

  // Fetch jobs from API on initial render
  useEffect(() => {
    axiosInstance.get("/api/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Function to handle job addition dynamically
  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar onJobAdded={handleJobAdded} />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <JobPortal jobs={jobs} onJobAdded={handleJobAdded} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;