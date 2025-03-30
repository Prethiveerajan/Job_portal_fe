

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import JobPortal from "./components/JobPortal/JobPortal";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import ResetPassword from "./pages/ResetPassword";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children; // Allow access if authenticated
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

  return (
    <>
      {!hideNavbarRoutes.some(route => location.pathname.startsWith(route)) && <Navbar />}
      <Routes>
        {/* Protected route for JobPortal */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <JobPortal />
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
