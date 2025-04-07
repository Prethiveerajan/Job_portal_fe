

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import JobCreationForm from "../JobCreationForm/JobCreationForm";

function Navbar({ onJobAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 50);
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
          <div className="navbar-logo">
            <img src="/img/logo.png" alt="Logo" />
          </div>

          <nav className="navbar-nav">
            {["Home", "Find Jobs", "Find Talents", "About us", "Testimonials"].map((item, index) => (
              <a key={index} href="#">
                {item}
              </a>
            ))}
          </nav>

          <div className="create-jobs-container">
            <button className="create-jobs-btn" onClick={() => setShowModal(true)}>
              Create Jobs
            </button>
          </div>
        </header>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <JobCreationForm
              onJobAdded={(newJob) => {
                onJobAdded(newJob); // Update JobPortal dynamically
                setShowModal(false); // Close the modal
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
