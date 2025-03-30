
// import React, { useState, useEffect } from "react";
// import "./Navbar.css";
// import JobCreationForm from "./JobCreationForm";

// function Navbar() {
//   const [showModal, setShowModal] = useState(false);
//   const [hiddenJobs, setHiddenJobs] = useState(new Set());

//   useEffect(() => {
//     const handleScroll = () => {
//       const navbar = document.querySelector(".navbar");
//       if (!navbar) return;

//       const navbarBottom = navbar.getBoundingClientRect().bottom;
//       const jobCards = document.querySelectorAll(".job-card");

//       const newHiddenJobs = new Set();
//       jobCards.forEach((card) => {
//         const jobTop = card.getBoundingClientRect().top;
//         if (jobTop < navbarBottom) {
//           newHiddenJobs.add(card.id);
//         }
//       });

//       setHiddenJobs(newHiddenJobs);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <header className="navbar">
//         {/* Logo */}
//         <div className="navbar-logo">
//           <img src="/img/logo.png" alt="Logo" />
//         </div>

//         {/* Navigation Links */}
//         <nav className="navbar-nav">
//           {["Home", "Find Jobs", "Find Talents", "About us", "Testimonials"].map(
//             (item, index) => (
//               <a key={index} href="#">
//                 {item}
//               </a>
//             )
//           )}
//         </nav>

//         {/* Create Jobs Button */}
//         <div className="create-jobs-container">
//           <button className="create-jobs-btn" onClick={() => setShowModal(true)}>
//             Create Jobs
//           </button>
//         </div>
//       </header>

//       {/* Job Creation Modal */}
//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={() => setShowModal(false)}>✖</button>
//             <JobCreationForm onAddJob={(data) => console.log("Job Added:", data)} />
//           </div>
//         </div>
//       )}

//       {/* Apply Hidden Class to Job Cards */}
//       <style>
//         {`
//           ${[...hiddenJobs].map((id) => `#${id} { opacity: 0; transform: translateY(-20px); transition: opacity 0.3s ease-out, transform 0.3s ease-out; pointer-events: none; }`).join("\n")}
//         `}
//       </style>
//     </>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import JobCreationForm from "./JobCreationForm";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 50); // 🚀 Faster disappearance (50px scroll)

      setNavbarOpacity(newOpacity);
      setNavbarVisible(newOpacity > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {navbarVisible && (
        <header className="navbar" style={{ opacity: navbarOpacity }}>
          {/* Logo */}
          <div className="navbar-logo">
            <img src="/img/logo.png" alt="Logo" />
          </div>

          {/* Navigation Links */}
          <nav className="navbar-nav">
            {["Home", "Find Jobs", "Find Talents", "About us", "Testimonials"].map(
              (item, index) => (
                <a key={index} href="#">
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Create Jobs Button */}
          <div className="create-jobs-container">
            <button className="create-jobs-btn" onClick={() => setShowModal(true)}>
              Create Jobs
            </button>
          </div>
        </header>
      )}

      {/* Job Creation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✖</button>
            <JobCreationForm onAddJob={(data) => console.log("Job Added:", data)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
