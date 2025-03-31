// // import React, { useState, useEffect, useRef } from "react";
// // import SearchFilter from "../SearchFilters/SearchFilters";
// // import {
// //   FaBriefcase,
// //   FaMapMarkerAlt,
// //   FaRupeeSign,
// //   FaClock,
// //   FaEllipsisV,
// // } from "react-icons/fa";
// // import "./JobPortal.css";
// // import axiosInstance from "../../utils/axiosInstance";

// // const companyLogos = {
// //   Amazon: "https://logo.clearbit.com/amazon.com",
// //   Microsoft: "https://logo.clearbit.com/microsoft.com",
// //   Google: "https://logo.clearbit.com/google.com",
// //   Swiggy: "https://logo.clearbit.com/swiggy.com",
// //   Infosys: "https://logo.clearbit.com/infosys.com",
// //   Default: "https://logo.clearbit.com/google.com",
// // };

// // function JobPortal() {
// //   const [jobs, setJobs] = useState([]);
// //   const [filteredJobs, setFilteredJobs] = useState([]);
// //   const [menuOpen, setMenuOpen] = useState(null);
// //   const [selectedJob, setSelectedJob] = useState(null);
// //   const [showEditForm, setShowEditForm] = useState(false);
// //   const [isSearchVisible, setIsSearchVisible] = useState(true);
// //   const lastScrollY = useRef(window.scrollY);

// //   useEffect(() => {
// //     axiosInstance.get("/api/jobs")
// //       .then((response) => {
// //         setJobs(response.data);
// //         setFilteredJobs(response.data);
// //       })
// //       .catch((error) => console.error("Error fetching jobs:", error));
// //   }, []);

// //   // ✅ Hide search filter on scroll down, show on scroll up
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (window.scrollY > lastScrollY.current) {
// //         setIsSearchVisible(false);
// //       } else {
// //         setIsSearchVisible(true);
// //       }
// //       lastScrollY.current = window.scrollY;
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const handleFilterChange = ({ searchTerm, location, jobType, salary }) => {
// //     const filtered = jobs.filter((job) => {
// //       return (
// //         (searchTerm === "" || job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
// //         (location === "" || job.location === location) &&
// //         (jobType === "" || job.jobType === jobType) &&
// //         job.salaryMin >= salary
// //       );
// //     });

// //     setFilteredJobs(filtered);
// //   };

// //   // ✅ Handle Delete
// //   const handleDelete = async (jobId) => {
// //     try {
// //       await axiosInstance.delete(`/api/jobs/${jobId}`);

// //       // ✅ Remove from state after successful delete
// //       setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
// //       setFilteredJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

// //       setMenuOpen(null);
// //       alert("Job deleted successfully!");
// //     } catch (error) {
// //       console.error("Error deleting job:", error);
// //       alert("Failed to delete job.");
// //     }
// //   };

// //   // ✅ Handle Edit
// //   const handleEdit = (job) => {
// //     setSelectedJob({ ...job }); // Clone job for editing
// //     setShowEditForm(true);
// //     setMenuOpen(null);
// //   };

// //   // ✅ Save Edited Job
// //   const handleSaveEdit = async () => {
// //     try {
// //       const response = await axiosInstance.put(`/api/jobs/${selectedJob._id}`, selectedJob);

// //       // ✅ Update state with the modified job
// //       setJobs((prevJobs) =>
// //         prevJobs.map((job) => (job._id === selectedJob._id ? response.data : job))
// //       );
// //       setFilteredJobs((prevJobs) =>
// //         prevJobs.map((job) => (job._id === selectedJob._id ? response.data : job))
// //       );

// //       setShowEditForm(false);
// //       alert("Job updated successfully!");
// //     } catch (error) {
// //       console.error("Error updating job:", error);
// //       alert("Failed to update job.");
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       {/* ✅ Hide SearchFilter when scrolling down */}
// //       {isSearchVisible && <SearchFilter onFilterChange={handleFilterChange} />}

// //       <div className="jobs">
// //         {filteredJobs.map((job, index) => {
// //           const companyLogo = companyLogos[job.companyName] || companyLogos.Default;
// //           return (
// //             <div key={index} className="card">
// //               <div className="card-top">
// //                 <div className="logo-title-container">
// //                   <img src={companyLogo} alt={job.companyName} className="company-logo" />
// //                   <h3 className="job-title">{job.jobTitle}</h3>
// //                 </div>
// //                 <div className="time-menu-container">
// //                   <span className="time-badge">
// //                     <FaClock /> 24 hours ago
// //                   </span>
// //                   <div className="menu-container">
// //                     <FaEllipsisV
// //                       className="menu-icon"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         setMenuOpen(menuOpen === index ? null : index);
// //                       }}
// //                     />
// //                     {menuOpen === index && (
// //                       <div className="menu-dropdown">
// //                         <button onClick={() => handleEdit(job)}>Edit</button>
// //                         <button onClick={() => handleDelete(job._id)}>Delete</button>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="job-details">
// //                 <span>
// //                   <FaBriefcase /> {job.experience || "1-3 yr"} Exp
// //                 </span>
// //                 <span>
// //                   <FaMapMarkerAlt /> {job.location}
// //                 </span>
// //                 <span>
// //                   <FaRupeeSign />
// //                   {job.salaryMax} LPA
// //                 </span>
// //               </div>
// //               <ul className="job-description">
// //                 <li>{job.jobDescription ? job.jobDescription.slice(0, 100) + "..." : "No description available"}</li>
// //               </ul>
// //               <div className="apply-btn">Apply Now</div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* ✅ Edit Job Modal */}
// //       {showEditForm && selectedJob && (
// //         <div className="edit-modal">
// //           <h3>Edit Job</h3>
// //           <input
// //             type="text"
// //             value={selectedJob.jobTitle}
// //             onChange={(e) =>
// //               setSelectedJob({ ...selectedJob, jobTitle: e.target.value })
// //             }
// //           />
// //           <textarea
// //             value={selectedJob.jobDescription}
// //             onChange={(e) =>
// //               setSelectedJob({ ...selectedJob, jobDescription: e.target.value })
// //             }
// //           />
// //           <button onClick={() => setShowEditForm(false)}>Cancel</button>
// //           <button onClick={handleSaveEdit}>Save</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default JobPortal;

// import React, { useState, useEffect, useRef } from "react";
// import SearchFilter from "../SearchFilters/SearchFilters";
// import { FaBriefcase, FaMapMarkerAlt, FaRupeeSign, FaClock, FaEllipsisV } from "react-icons/fa";
// import "./JobPortal.css";
// import axiosInstance from "../../utils/axiosInstance";

// const companyLogos = {
//   Amazon: "https://logo.clearbit.com/amazon.com",
//   Microsoft: "https://logo.clearbit.com/microsoft.com",
//   Google: "https://logo.clearbit.com/google.com",
//   Swiggy: "https://logo.clearbit.com/swiggy.com",
//   Infosys: "https://logo.clearbit.com/infosys.com",
//   Default: "https://logo.clearbit.com/google.com",
// };

// function JobPortal({ jobs, onJobAdded }) {
//   const [filteredJobs, setFilteredJobs] = useState(jobs);
//   const [menuOpen, setMenuOpen] = useState(null);
//   const [isSearchVisible, setIsSearchVisible] = useState(true);
//   const lastScrollY = useRef(window.scrollY);

//   useEffect(() => {
//     setFilteredJobs(jobs); // Update displayed jobs when new job is added
//   }, [jobs]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY.current) {
//         setIsSearchVisible(false);
//       } else {
//         setIsSearchVisible(true);
//       }
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleDelete = async (jobId) => {
//     try {
//       await axiosInstance.delete(`/api/jobs/${jobId}`);
//       onJobAdded(jobs.filter((job) => job._id !== jobId)); // Remove job from state
//       setMenuOpen(null);
//       alert("Job deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting job:", error);
//       alert("Failed to delete job.");
//     }
//   };

//   return (
//     <div className="container">
//       {isSearchVisible && <SearchFilter />}

//       <div className="jobs">
//         {filteredJobs.map((job, index) => {
//           const companyLogo = companyLogos[job.companyName] || companyLogos.Default;
//           return (
//             <div key={index} className="card">
//               <div className="card-top">
//                 <div className="logo-title-container">
//                   <img src={companyLogo} alt={job.companyName} className="company-logo" />
//                   <h3 className="job-title">{job.jobTitle}</h3>
//                 </div>
//                 <div className="time-menu-container">
//                   <span className="time-badge">
//                     <FaClock /> 24 hours ago
//                   </span>
//                   <div className="menu-container">
//                     <FaEllipsisV
//                       className="menu-icon"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setMenuOpen(menuOpen === index ? null : index);
//                       }}
//                     />
//                     {menuOpen === index && (
//                       <div className="menu-dropdown">
//                         <button onClick={() => handleDelete(job._id)}>Delete</button>
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
//                 <li>{job.jobDescription ? job.jobDescription.slice(0, 100) + "..." : "No description available"}</li>
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

// import React, { useState, useEffect, useRef } from "react";
// import SearchFilter from "../SearchFilters/SearchFilters";
// import ApplyNow from "../ApplyNow/ApplyNow";
// import { FaBriefcase, FaMapMarkerAlt, FaRupeeSign, FaClock, FaEllipsisV } from "react-icons/fa";
// import "./JobPortal.css";
// import axiosInstance from "../../utils/axiosInstance";

// const companyLogos = {
//   Amazon: "https://logo.clearbit.com/amazon.com",
//   Microsoft: "https://logo.clearbit.com/microsoft.com",
//   Google: "https://logo.clearbit.com/google.com",
//   Swiggy: "https://logo.clearbit.com/swiggy.com",
//   Infosys: "https://logo.clearbit.com/infosys.com",
//   Default: "https://logo.clearbit.com/google.com",
// };

// function JobPortal({ jobs }) {
//   const [filteredJobs, setFilteredJobs] = useState(jobs);
//   const [menuOpen, setMenuOpen] = useState(null);
//   const [isSearchVisible, setIsSearchVisible] = useState(true);
//   const [selectedJob, setSelectedJob] = useState(null); // For modal
//   const lastScrollY = useRef(window.scrollY);

//   useEffect(() => {
//     setFilteredJobs(jobs); // Update displayed jobs when new jobs are added
//   }, [jobs]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSearchVisible(window.scrollY <= lastScrollY.current);
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="container">
//       {isSearchVisible && <SearchFilter />}

//       <div className="jobs">
//         {filteredJobs.map((job, index) => {
//           const companyLogo = companyLogos[job.companyName] || companyLogos.Default;
//           return (
//             <div key={index} className="card">
//               <div className="card-top">
//                 <div className="logo-title-container">
//                   <img src={companyLogo} alt={job.companyName} className="company-logo" />
//                   <h3 className="job-title">{job.jobTitle}</h3>
//                 </div>
//                 <div className="time-menu-container">
//                   <span className="time-badge">
//                     <FaClock /> 24 hours ago
//                   </span>
//                   <div className="menu-container">
//                     <FaEllipsisV
//                       className="menu-icon"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setMenuOpen(menuOpen === index ? null : index);
//                       }}
//                     />
//                     {menuOpen === index && (
//                       <div className="menu-dropdown">
//                         <button onClick={() => console.log("Edit Job")}>Edit</button>
//                         <button onClick={() => console.log("Delete Job")}>Delete</button>
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
//                 <li>{job.jobDescription ? job.jobDescription.slice(0, 100) + "..." : "No description available"}</li>
//               </ul>
//               <button className="apply-btn" onClick={() => setSelectedJob(job)}>Apply Now</button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Apply Now Modal */}
//       {selectedJob && (
//         <div className="apply-modal-overlay">
//           <div className="apply-modal">
//             <div className="modal-header">
//               <h2 className="modal-title">Apply for {selectedJob.jobTitle}</h2>
//               <button className="close-btn" onClick={() => setSelectedJob(null)}>✖</button>
//             </div>
//             <ApplyNow onApplicationSubmitted={() => setSelectedJob(null)} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobPortal;

// import React, { useState, useEffect, useRef } from "react";
// import SearchFilter from "../SearchFilters/SearchFilters";
// import ApplyNow from "../ApplyNow/ApplyNow";
// import {
//   FaBriefcase,
//   FaMapMarkerAlt,
//   FaRupeeSign,
//   FaClock,
//   FaEllipsisV,
// } from "react-icons/fa";
// import "./JobPortal.css";
// import axiosInstance from "../../utils/axiosInstance";

// const companyLogos = {
//   Amazon: "https://logo.clearbit.com/amazon.com",
//   Microsoft: "https://logo.clearbit.com/microsoft.com",
//   Google: "https://logo.clearbit.com/google.com",
//   Swiggy: "https://logo.clearbit.com/swiggy.com",
//   Infosys: "https://logo.clearbit.com/infosys.com",
//   Default: "https://logo.clearbit.com/google.com",
// };

// function JobPortal({ jobs }) {
//   const [filteredJobs, setFilteredJobs] = useState(jobs);
//   const [menuOpen, setMenuOpen] = useState(null);
//   const [isSearchVisible, setIsSearchVisible] = useState(true);
//   const [selectedJob, setSelectedJob] = useState(null); // For modal
//   const lastScrollY = useRef(window.scrollY);

//   useEffect(() => {
//     setFilteredJobs(jobs); // Update displayed jobs when new jobs are added
//   }, [jobs]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSearchVisible(window.scrollY <= lastScrollY.current);
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
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

//   // ✅ Handle Delete
//   const handleDelete = async (jobId) => {
//     try {
//       await axiosInstance.delete(`/api/jobs/${jobId}`);

//       // ✅ Remove from state after successful delete
//       setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
//       setFilteredJobs((prevJobs) =>
//         prevJobs.filter((job) => job._id !== jobId)
//       );

//       setMenuOpen(null);
//       alert("Job deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting job:", error);
//       alert("Failed to delete job.");
//     }
//   };

//   // ✅ Handle Edit
//   const handleEdit = (job) => {
//     setSelectedJob({ ...job }); // Clone job for editing
//     setShowEditForm(true);
//     setMenuOpen(null);
//   };

//   // ✅ Save Edited Job
//   const handleSaveEdit = async () => {
//     try {
//       const response = await axiosInstance.put(
//         `/api/jobs/${selectedJob._id}`,
//         selectedJob
//       );

//       // ✅ Update state with the modified job
//       setJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job._id === selectedJob._id ? response.data : job
//         )
//       );
//       setFilteredJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job._id === selectedJob._id ? response.data : job
//         )
//       );

//       setShowEditForm(false);
//       alert("Job updated successfully!");
//     } catch (error) {
//       console.error("Error updating job:", error);
//       alert("Failed to update job.");
//     }
//   };

//   return (
//     <div className="container">
//       {isSearchVisible && <SearchFilter />}

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
//                 <div className="time-menu-container">
//                   <span className="time-badge">
//                     <FaClock /> 24 hours ago
//                   </span>
//                   <div className="menu-container">
//                     <FaEllipsisV
//                       className="menu-icon"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setMenuOpen(menuOpen === index ? null : index);
//                       }}
//                     />
//                     {menuOpen === index && (
//                       <div className="menu-dropdown">
//                         {/* <button onClick={() => console.log("Edit Job")}>Edit</button>
//                         <button onClick={() => console.log("Delete Job")}>Delete</button> */}
//                         <button onClick={() => handleEdit(job)}>Edit</button>
//                         // //{" "}
//                         <button onClick={() => handleDelete(job._id)}>
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
//                 <li>
//                   {job.jobDescription
//                     ? job.jobDescription.slice(0, 100) + "..."
//                     : "No description available"}
//                 </li>
//               </ul>
//               <button className="apply-btn" onClick={() => setSelectedJob(job)}>
//                 Apply Now
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Apply Now Modal */}
//       {selectedJob && (
//         <div className="apply-modal-overlay">
//           <div className="apply-modal">
//             <div className="modal-header">
//               <h2 className="modal-title">Apply for {selectedJob.jobTitle}</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setSelectedJob(null)}
//               >
//                 ✖
//               </button>
//             </div>
//             {/* Pass the selected job to ApplyNow */}
//             <ApplyNow
//               job={selectedJob}
//               onClose={() => setSelectedJob(null)}
//               onApplicationSubmitted={() => setSelectedJob(null)} // Close modal after submission
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobPortal;


// import React, { useState, useEffect, useRef } from "react";
// import SearchFilter from "../SearchFilters/SearchFilters";
// import ApplyNow from "../ApplyNow/ApplyNow";
// import {
//   FaBriefcase,
//   FaMapMarkerAlt,
//   FaRupeeSign,
//   FaClock,
//   FaEllipsisV,
// } from "react-icons/fa";
// import "./JobPortal.css";
// import axiosInstance from "../../utils/axiosInstance";

// const companyLogos = {
//   Amazon: "https://logo.clearbit.com/amazon.com",
//   Microsoft: "https://logo.clearbit.com/microsoft.com",
//   Google: "https://logo.clearbit.com/google.com",
//   Swiggy: "https://logo.clearbit.com/swiggy.com",
//   Infosys: "https://logo.clearbit.com/infosys.com",
//   Default: "https://logo.clearbit.com/google.com",
// };

// function JobPortal({ jobs }) {
//   const [filteredJobs, setFilteredJobs] = useState(jobs);
//   const [menuOpen, setMenuOpen] = useState(null);
//   const [isSearchVisible, setIsSearchVisible] = useState(true);
//   const [selectedJob, setSelectedJob] = useState(null); // For modal
//   const lastScrollY = useRef(window.scrollY);

//   useEffect(() => {
//     setFilteredJobs(jobs); // Update displayed jobs when new jobs are added
//   }, [jobs]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSearchVisible(window.scrollY <= lastScrollY.current);
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

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

//   // ✅ Handle Delete
//   const handleDelete = async (jobId) => {
//     try {
//       await axiosInstance.delete(`/api/jobs/${jobId}`);

//       // ✅ Remove from state after successful delete
//       setFilteredJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

//       setMenuOpen(null);
//       alert("Job deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting job:", error);
//       alert("Failed to delete job.");
//     }
//   };

//   // ✅ Handle Edit
//   const handleEdit = (job) => {
//     setSelectedJob({ ...job }); // Clone job for editing
//     setMenuOpen(null);
//   };

//   // ✅ Save Edited Job
//   const handleSaveEdit = async () => {
//     try {
//       const response = await axiosInstance.put(
//         `/api/jobs/${selectedJob._id}`,
//         selectedJob
//       );

//       // ✅ Update state with the modified job
//       setFilteredJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job._id === selectedJob._id ? response.data : job
//         )
//       );

//       setSelectedJob(null);
//       alert("Job updated successfully!");
//     } catch (error) {
//       console.error("Error updating job:", error);
//       alert("Failed to update job.");
//     }
//   };

//   return (
//     <div className="container">
//       {isSearchVisible && <SearchFilter onFilterChange={handleFilterChange} />}

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
//                 <div className="time-menu-container">
//                   <span className="time-badge">
//                     <FaClock /> 24 hours ago
//                   </span>
//                   <div className="menu-container">
//                     <FaEllipsisV
//                       className="menu-icon"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setMenuOpen(menuOpen === index ? null : index);
//                       }}
//                     />
//                     {menuOpen === index && (
//                       <div className="menu-dropdown">
//                         <button onClick={() => handleEdit(job)}>Edit</button>
//                         <button onClick={() => handleDelete(job._id)}>
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
//                 <li>
//                   {job.jobDescription
//                     ? job.jobDescription.slice(0, 100) + "..."
//                     : "No description available"}
//                 </li>
//               </ul>
//               <button className="apply-btn" onClick={() => setSelectedJob(job)}>
//                 Apply Now
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Apply Now Modal */}
//       {selectedJob && (
//         <div className="apply-modal-overlay">
//           <div className="apply-modal">
//             <div className="modal-header">
//               <h2 className="modal-title">Apply for {selectedJob.jobTitle}</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setSelectedJob(null)}
//               >
//                 ✖
//               </button>
//             </div>
//             <ApplyNow
//               job={selectedJob}
//               onClose={() => setSelectedJob(null)}
//               onApplicationSubmitted={() => setSelectedJob(null)} // Close modal after submission
//             />
//           </div>
//         </div>
//       )}

//       {/* Edit Job Modal */}
//       {selectedJob && (
//         <div className="edit-modal-overlay">
//           <div className="edit-modal">
//             <div className="modal-header">
//               <h2 className="modal-title">Edit Job</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setSelectedJob(null)}
//               >
//                 ✖
//               </button>
//             </div>
//             <div className="edit-form">
//               {/* Implement your job editing form here */}
//               <input
//                 type="text"
//                 value={selectedJob.jobTitle}
//                 onChange={(e) =>
//                   setSelectedJob({ ...selectedJob, jobTitle: e.target.value })
//                 }
//               />
//               <button onClick={handleSaveEdit}>Save Changes</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobPortal;


import React, { useState, useEffect, useRef } from "react";
import SearchFilter from "../SearchFilters/SearchFilters";
import ApplyNow from "../ApplyNow/ApplyNow";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaClock,
  FaEllipsisV,
} from "react-icons/fa";
import "./JobPortal.css";
import axiosInstance from "../../utils/axiosInstance";

const companyLogos = {
  Amazon: "https://logo.clearbit.com/amazon.com",
  Microsoft: "https://logo.clearbit.com/microsoft.com",
  Google: "https://logo.clearbit.com/google.com",
  Swiggy: "https://logo.clearbit.com/swiggy.com",
  Infosys: "https://logo.clearbit.com/infosys.com",
  Default: "https://logo.clearbit.com/google.com",
};

function JobPortal({ jobs }) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [menuOpen, setMenuOpen] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null); // For modal
  const [editJob, setEditJob] = useState(null); // For editing the job
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    setFilteredJobs(jobs); // Update displayed jobs when new jobs are added
  }, [jobs]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSearchVisible(window.scrollY <= lastScrollY.current);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // ✅ Handle Delete
  const handleDelete = async (jobId) => {
    try {
      await axiosInstance.delete(`/api/jobs/${jobId}`);

      // ✅ Remove from state after successful delete
      setFilteredJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      setMenuOpen(null);
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };

  // ✅ Handle Edit
  const handleEdit = (job) => {
    setEditJob({ ...job }); // Set the selected job for editing
    setMenuOpen(null);
  };

  // ✅ Save Edited Job
  const handleSaveEdit = async () => {
    try {
      const response = await axiosInstance.put(
        `/api/jobs/${editJob._id}`,
        editJob
      );

      // ✅ Update state with the modified job
      setFilteredJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === editJob._id ? response.data : job
        )
      );

      setEditJob(null); // Close the edit modal
      alert("Job updated successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job.");
    }
  };

  return (
    <div className="container">
      {isSearchVisible && <SearchFilter onFilterChange={handleFilterChange} />}

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
                <div className="time-menu-container">
                  <span className="time-badge">
                    <FaClock /> 24 hours ago
                  </span>
                  <div className="menu-container">
                    <FaEllipsisV
                      className="menu-icon"
                      onClick={(e) => {
                        e.stopPropagation();
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
                <li>
                  {job.jobDescription
                    ? job.jobDescription.slice(0, 100) + "..."
                    : "No description available"}
                </li>
              </ul>
              <button className="apply-btn" onClick={() => setSelectedJob(job)}>
                Apply Now
              </button>
            </div>
          );
        })}
      </div>

      {/* Apply Now Modal */}
      {selectedJob && (
        <div className="apply-modal-overlay">
          <div className="apply-modal">
            <div className="modal-header">
              <h2 className="modal-title">Apply for {selectedJob.jobTitle}</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedJob(null)}
              >
                ✖
              </button>
            </div>
            <ApplyNow
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              onApplicationSubmitted={() => setSelectedJob(null)} // Close modal after submission
            />
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editJob && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h2 className="modal-title">Edit Job</h2>
              <button
                className="close-btn"
                onClick={() => setEditJob(null)} // Close the modal
              >
                ✖
              </button>
            </div>
            <div className="edit-form">
              <div>
                <label>Job Title:</label>
                <input
                  type="text"
                  value={editJob.jobTitle}
                  onChange={(e) =>
                    setEditJob({ ...editJob, jobTitle: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Job Description:</label>
                <textarea
                  value={editJob.jobDescription}
                  onChange={(e) =>
                    setEditJob({ ...editJob, jobDescription: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  value={editJob.location}
                  onChange={(e) =>
                    setEditJob({ ...editJob, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Salary (LPA):</label>
                <input
                  type="number"
                  value={editJob.salaryMax}
                  onChange={(e) =>
                    setEditJob({ ...editJob, salaryMax: e.target.value })
                  }
                />
              </div>
              <button onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobPortal;
