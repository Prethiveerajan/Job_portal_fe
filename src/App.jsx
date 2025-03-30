
// import React, { useState } from "react";
// import JobPortal from "./components/JobPortal";
// import JobCreationForm from "./components/JobCreationForm";
// import Navbar from "./components/Navbar";
// import "./App.css";

// function App() {
//   const [isCreatingJob, setIsCreatingJob] = useState(false);

//   return (
//     <>
//       {/* Sticky Navbar */}
//       <Navbar />

//       {/* Job Listings or Job Creation Form */}
//       <div className="content-container">
//         {isCreatingJob ? (
//           <JobCreationForm />
//         ) : (
//           <JobPortal />
//         )}
//       </div>
//     </>
//   );
// }

// export default App;


import React, { useState, useEffect, useRef } from "react";
import JobPortal from "./components/JobPortal";
import JobCreationForm from "./components/JobCreationForm";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [hiddenJobs, setHiddenJobs] = useState(new Set()); // Track hidden job cards
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
        const jobCards = document.querySelectorAll(".job-card");

        const newHiddenJobs = new Set();
        jobCards.forEach((card) => {
          const jobTop = card.getBoundingClientRect().top;
          if (jobTop < navbarBottom) {
            newHiddenJobs.add(card.id);
          }
        });

        setHiddenJobs(newHiddenJobs);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Navbar */}
      <div ref={navbarRef}>
        <Navbar />
      </div>

      {/* Job Listings or Job Creation Form */}
      <div className="content-container">
        {isCreatingJob ? (
          <JobCreationForm />
        ) : (
          <JobPortal hiddenJobs={hiddenJobs} />
        )}
      </div>
    </>
  );
}

export default App;
