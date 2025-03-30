// import React, { useState } from "react";
// import JobList from "./components/JobPortal";
// import JobCreationForm from "./components/JobCreationForm";
// import "./App.css";
// import Navbar from "./components/Navbar";
// import SearchFilters from "./components/SearchFilters";
// import JobPortal from "./components/JobPortal";

// function App() {
//   const [jobs, setJobs] = useState([]);
//   const [isCreatingJob, setIsCreatingJob] = useState(false);

//   const handleAddJob = (newJob) => {
//     setJobs([...jobs, { ...newJob, id: Date.now() }]);
//     setIsCreatingJob(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <SearchFilters />

//       <div className="job-portal-container">
//         {isCreatingJob ? (
//           <JobCreationForm onAddJob={handleAddJob} />
//         ) : (
//           <JobPortal jobs={jobs} />
//         )}
//       </div>
//     </>
//   );
// }

// export default App;

// import React, { useState, useEffect, useRef } from "react";
// import JobPortal from "./components/JobPortal";
// import JobCreationForm from "./components/JobCreationForm";
// import Navbar from "./components/Navbar";
// import SearchFilters from "./components/SearchFilters";
// import "./App.css";

// function App() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered jobs
//   const [isCreatingJob, setIsCreatingJob] = useState(false);
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [isSearchVisible, setIsSearchVisible] = useState(true);

//   const headerRef = useRef(null);
//   const jobPortalRef = useRef(null);

//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       const scrollY = window.scrollY;

//       // Hide Navbar & SearchFilters when scrolling down, show on scroll up
//       if (scrollY > lastScrollY) {
//         setIsHeaderVisible(false);
//       } else {
//         setIsHeaderVisible(true);
//       }
//       lastScrollY = scrollY;

//       // Hide SearchFilters when JobPortal moves past it
//       if (headerRef.current && jobPortalRef.current) {
//         const headerBottom = headerRef.current.getBoundingClientRect().bottom;
//         const jobTop = jobPortalRef.current.getBoundingClientRect().top;

//         if (jobTop < headerBottom) {
//           setIsSearchVisible(false);
//         } else {
//           setIsSearchVisible(true);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleAddJob = (newJob) => {
//     setJobs([...jobs, { ...newJob, id: Date.now() }]);
//     setFilteredJobs([...jobs, { ...newJob, id: Date.now() }]); // Update filtered jobs
//     setIsCreatingJob(false);
//   };

//   // Handle search filtering
//   const handleFilterChange = ({ searchTerm, location, jobType, salary }) => {
//     const filtered = jobs.filter((job) => {
//       return (
//         (searchTerm === "" ||
//           job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
//         (location === "" || job.location === location) &&
//         (jobType === "" || job.jobType === jobType) &&
//         job.salaryMin >= salary
//       );
//     });

//     setFilteredJobs(filtered);
//   };

//   return (
//     <>
//       {/* Sticky Navbar + SearchFilters */}
//       <div ref={headerRef} className={`header-container ${isHeaderVisible ? "visible" : "hidden"}`}>
//         <Navbar />
//         {/* {isSearchVisible && <SearchFilters onFilterChange={handleFilterChange} />} */}
//       </div>

//       {/* Job Listings or Job Creation Form */}
//       <div className="content-container" ref={jobPortalRef}>
//         {isCreatingJob ? (
//           <JobCreationForm onAddJob={handleAddJob} />
//         ) : (
//           <JobPortal jobs={filteredJobs} />
//         )}
//       </div>
//     </>
//   );
// }

// export default App;


import React, { useState } from "react";
import JobPortal from "./components/JobPortal";
import JobCreationForm from "./components/JobCreationForm";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  return (
    <>
      {/* Sticky Navbar */}
      <Navbar />

      {/* Job Listings or Job Creation Form */}
      <div className="content-container">
        {isCreatingJob ? (
          <JobCreationForm />
        ) : (
          <JobPortal />
        )}
      </div>
    </>
  );
}

export default App;
