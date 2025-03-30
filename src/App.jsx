
// // import React, { useState, useEffect, useRef } from "react";
// // import JobPortal from "./components/JobPortal/JobPortal";
// // import JobCreationForm from "./components/JobCreationForm/JobCreationForm";
// // import Navbar from "./components/Navbar/Navbar";
// // import "./App.css";

// // function App() {
// //   const [isCreatingJob, setIsCreatingJob] = useState(false);
// //   const [hiddenJobs, setHiddenJobs] = useState(new Set()); // Track hidden job cards
// //   const navbarRef = useRef(null);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (navbarRef.current) {
// //         const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
// //         const jobCards = document.querySelectorAll(".job-card");

// //         const newHiddenJobs = new Set();
// //         jobCards.forEach((card) => {
// //           const jobTop = card.getBoundingClientRect().top;
// //           if (jobTop < navbarBottom) {
// //             newHiddenJobs.add(card.id);
// //           }
// //         });

// //         setHiddenJobs(newHiddenJobs);
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   return (
// //     <>
// //       {/* Sticky Navbar */}
// //       <div ref={navbarRef}>
// //         <Navbar />
// //       </div>

// //       {/* Job Listings or Job Creation Form */}
// //       <div className="content-container">
// //         {isCreatingJob ? (
// //           <JobCreationForm />
// //         ) : (
// //           <JobPortal hiddenJobs={hiddenJobs} />
// //         )}
// //       </div>
// //     </>
// //   );
// // }

// // export default App;

// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Navbar from "./components/Navbar/Navbar";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import ForgotPassword from "./pages/ForgotPassword";
// // import JobPortal from "./components/JobPortal/JobPortal";
// // import AuthProvider from "./context/AuthContext";

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Navbar />
// //         <Routes>
// //           <Route path="/" element={<JobPortal />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />
// //           <Route path="/forgot-password" element={<ForgotPassword />} />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;

// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// // import Navbar from "./components/Navbar/Navbar";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import ForgotPassword from "./pages/ForgotPassword";
// // import JobPortal from "./components/JobPortal/JobPortal";
// // import AuthProvider from "./context/AuthContext";

// // const AppContent = () => {
// //   const location = useLocation();
// //   const hideNavbarRoutes = ["/login", "/signup", "/forgot-password"];

// //   return (
// //     <>
// //       {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
// //       <Routes>
// //         <Route path="/" element={<JobPortal />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/signup" element={<Signup />} />
// //         <Route path="/forgot-password" element={<ForgotPassword />} />
// //       </Routes>
// //     </>
// //   );
// // };

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <AppContent />
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;


// import React, { useContext } from "react";  // ✅ Add useContext
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";
// import JobPortal from "./components/JobPortal/JobPortal";
// import AuthProvider, { AuthContext } from "./context/AuthContext";  // ✅ Import AuthContext
// import ResetPassword from "./pages/ResetPassword";

// const AppContent = () => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const location = useLocation();
//   const hideNavbarRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

//   return (
//     <>
//       {!hideNavbarRoutes.some(route => location.pathname.startsWith(route)) && isAuthenticated && <Navbar />}
//       <Routes>
//         <Route path="/" element={<JobPortal />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />  {/* ✅ Add ResetPassword Route */}
//       </Routes>
//     </>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

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

  // If not authenticated, redirect to login page
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
