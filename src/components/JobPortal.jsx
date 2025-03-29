// import React, { useState, useEffect } from "react";
// import {
//   FaBriefcase,
//   FaMapMarkerAlt,
//   FaRupeeSign,
//   FaClock,
//   FaEllipsisV,
// } from "react-icons/fa";
// import "./JobPortal.css"; // Import the CSS file

// const companyLogos = {
//   Amazon: "https://logo.clearbit.com/amazon.com",
//   Microsoft: "https://logo.clearbit.com/microsoft.com",
//   Google: "https://logo.clearbit.com/google.com",
//   Swiggy: "https://logo.clearbit.com/swiggy.com",
//   Infosys: "https://logo.clearbit.com/infosys.com",
//   Default: "https://logo.clearbit.com/google.com",
// };

// function JobPortal() {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(null); // Track which menu is open

//   useEffect(() => {
//     fetch("http://localhost:5000/api/jobs")
//       .then((response) => response.json())
//       .then((data) => setJobs(data))
//       .catch((error) => console.error("Error fetching jobs:", error));
//   }, []);

//   const handleDelete = async (jobId) => {
//     try {
//       await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
//         method: "DELETE",
//       });
//       setJobs(jobs.filter((job) => job._id !== jobId)); // Remove from UI
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   const handleEdit = (job) => {
//     setSelectedJob(job);
//     setShowEditForm(true);
//     setMenuOpen(null); // Close the menu
//   };

//   return (
//     <div className="container">
//       <div className="jobs">
//         {jobs.map((job, index) => {
//           const companyLogo =
//             companyLogos[job.companyName] || companyLogos.Default;

//           return (
//             <div key={index} className="card">
//               <div className="card-top">
//                 <img src={companyLogo} alt={job.companyName} />

//                 {/* Static Time Placeholder */}
//                 <span className="time-badge">
//                   <FaClock /> 24 hours ago
//                 </span>

//                 {/* Three-dot menu */}
//                 <div className="menu-container">
//                   <FaEllipsisV
//                     className="menu-icon"
//                     onClick={() =>
//                       setMenuOpen(menuOpen === index ? null : index)
//                     }
//                   />
//                   {menuOpen === index && (
//                     <div className="menu-dropdown">
//                       <button onClick={() => handleEdit(job)}>Edit</button>
//                       <button onClick={() => handleDelete(job._id)}>
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Job Title */}
//               <h3>{job.jobTitle}</h3>

//               {/* Job Details */}
//               <div className="job-details">
//                 <span>
//                   <FaBriefcase /> 1-3 yr Exp
//                 </span>
//                 <span>
//                   <FaMapMarkerAlt /> {job.location}
//                 </span>
//                 <span>
//                   <FaRupeeSign /> {job.salaryMin} - {job.salaryMax} LPA
//                 </span>
//               </div>

//               {/* Job Description */}
//               <ul className="job-description">
//                 <li>{job.jobDescription.slice(0, 100)}...</li>
//               </ul>

//               {/* Apply Button */}
//               <div className="apply-btn">Apply Now</div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Edit Form */}
//       {showEditForm && (
//         <EditJobForm
//           job={selectedJob}
//           setShowEditForm={setShowEditForm}
//           setJobs={setJobs}
//         />
//       )}
//     </div>
//   );
// }

// export default JobPortal;

// import React, { useState, useEffect } from "react";
// import SearchFilter from "./SearchFilters"; // Import search filter
// import {
//   FaBriefcase,
//   FaMapMarkerAlt,
//   FaRupeeSign,
//   FaClock,
//   FaEllipsisV,
// } from "react-icons/fa";
// import "./JobPortal.css";

// const companyLogos = {
//   Amazon: "https://logo.clearbit.com/amazon.com",
//   Microsoft: "https://logo.clearbit.com/microsoft.com",
//   Google: "https://logo.clearbit.com/google.com",
//   Swiggy: "https://logo.clearbit.com/swiggy.com",
//   Infosys: "https://logo.clearbit.com/infosys.com",
//   Default: "https://logo.clearbit.com/google.com",
// };

// function JobPortal() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered jobs
//   const [menuOpen, setMenuOpen] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/jobs")
//       .then((response) => response.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data); // Initialize with all jobs
//       })
//       .catch((error) => console.error("Error fetching jobs:", error));
//   }, []);

//   // Function to apply filters
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
//     <div className="container">
//       {/* Search & Filters */}
//       <SearchFilter onFilterChange={handleFilterChange} />

//       <div className="jobs">
//         {filteredJobs.map((job, index) => {
//           const companyLogo =
//             companyLogos[job.companyName] || companyLogos.Default;

//           return (
//             <div key={index} className="card">
//               <div className="card-top">
//                 <div className="logo-title-container">
//                   <img
//                     src={companyLogo}
//                     alt={job.companyName}
//                     className="company-logo"
//                   />
//                   <h3 className="job-title">{job.jobTitle}</h3>
//                 </div>

//                 {/* Time Badge & Three-dot Menu */}
//                 <div className="time-menu-container">
//                   <span className="time-badge">
//                     <FaClock /> 24 hours ago
//                   </span>
//                   {/* <div className="menu-container">
//                     <FaEllipsisV
//                       className="menu-icon"
//                       onClick={() =>
//                         setMenuOpen(menuOpen === index ? null : index)
//                       }
//                     />
//                     {menuOpen === index && (
//                       <div className="menu-dropdown">
//                         <button>Edit</button>
//                         <button>Delete</button>
//                       </div>
//                     )}
//                   </div> */}

//                   <div className="menu-container">
//                     <FaEllipsisV
//                       className="menu-icon"
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent event bubbling
//                         setMenuOpen(menuOpen === index ? null : index);
//                       }}
//                     />
//                     {menuOpen === index && (
//                       <div className="menu-dropdown">
//                         <button onClick={() => console.log("Edit Clicked")}>
//                           Edit
//                         </button>
//                         <button onClick={() => console.log("Delete Clicked")}>
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="job-details">
//                 <span>
//                   <FaBriefcase /> {job.experience || "1-3 yr"} Exp
//                 </span>
//                 <span>
//                   <FaMapMarkerAlt /> {job.location}
//                 </span>
//                 <span>
//                   <FaRupeeSign />
//                   {job.salaryMax} LPA
//                 </span>
//               </div>

//               <ul className="job-description">
//                 <li>{job.jobDescription.slice(0, 100)}...</li>
//               </ul>

//               <div className="apply-btn">Apply Now</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default JobPortal;

import React, { useState, useEffect } from "react";
import SearchFilter from "./SearchFilters"; // Import search filter
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaClock,
  FaEllipsisV,
} from "react-icons/fa";
import "./JobPortal.css";

const companyLogos = {
  Amazon: "https://logo.clearbit.com/amazon.com",
  Microsoft: "https://logo.clearbit.com/microsoft.com",
  Google: "https://logo.clearbit.com/google.com",
  Swiggy: "https://logo.clearbit.com/swiggy.com",
  Infosys: "https://logo.clearbit.com/infosys.com",
  Default: "https://logo.clearbit.com/google.com",
};

function JobPortal() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered jobs
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data); // Initialize with all jobs
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Function to apply filters
  const handleFilterChange = ({ searchTerm, location, jobType, salary }) => {
    const filtered = jobs.filter((job) => {
      return (
        (searchTerm === "" ||
          job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (location === "" || job.location === location) &&
        (jobType === "" || job.jobType === jobType) &&
        job.salaryMin >= salary
      );
    });

    setFilteredJobs(filtered);
  };

  // DELETE job function
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      // Remove from UI after successful deletion
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      setFilteredJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      setMenuOpen(null); // Close the menu after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // EDIT job function
  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowEditForm(true);
    setMenuOpen(null); // Close the menu
  };

  return (
    <div className="container">
      {/* Search & Filters */}
      <SearchFilter onFilterChange={handleFilterChange} />

      <div className="jobs">
        {filteredJobs.map((job, index) => {
          const companyLogo =
            companyLogos[job.companyName] || companyLogos.Default;

          return (
            <div key={index} className="card">
              <div className="card-top">
                <div className="logo-title-container">
                  <img
                    src={companyLogo}
                    alt={job.companyName}
                    className="company-logo"
                  />
                  <h3 className="job-title">{job.jobTitle}</h3>
                </div>

                {/* Time Badge & Three-dot Menu */}
                <div className="time-menu-container">
                  <span className="time-badge">
                    <FaClock /> 24 hours ago
                  </span>
                  <div className="menu-container">
                    <FaEllipsisV
                      className="menu-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        setMenuOpen(menuOpen === index ? null : index);
                      }}
                    />
                    {menuOpen === index && (
                      <div className="menu-dropdown">
                        <button onClick={() => handleEdit(job)}>Edit</button>
                        <button onClick={() => handleDelete(job._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="job-details">
                <span>
                  <FaBriefcase /> {job.experience || "1-3 yr"} Exp
                </span>
                <span>
                  <FaMapMarkerAlt /> {job.location}
                </span>
                <span>
                  <FaRupeeSign />
                  {job.salaryMax} LPA
                </span>
              </div>

              <ul className="job-description">
                <li>{job.jobDescription.slice(0, 100)}...</li>
              </ul>

              <div className="apply-btn">Apply Now</div>
            </div>
          );
        })}
      </div>

      {/* Edit Job Modal */}
      {showEditForm && selectedJob && (
        <div className="edit-modal">
          <h3>Edit Job</h3>
          <input
            type="text"
            value={selectedJob.jobTitle}
            onChange={(e) =>
              setSelectedJob({ ...selectedJob, jobTitle: e.target.value })
            }
          />
          <textarea
            value={selectedJob.jobDescription}
            onChange={(e) =>
              setSelectedJob({ ...selectedJob, jobDescription: e.target.value })
            }
          />
          <button onClick={() => setShowEditForm(false)}>Cancel</button>
          <button onClick={() => console.log("Save job changes")}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default JobPortal;

