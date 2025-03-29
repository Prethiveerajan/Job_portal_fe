

import React, { useState } from "react";
import "./Navbar.css"; // Import Navbar styles
import JobCreationForm from "./JobCreationForm"; // Import Job Creation Form

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="navbar">
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
