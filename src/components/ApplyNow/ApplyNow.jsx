// // import React, { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import "./ApplyNow.css";
// // import axiosInstance from "../../utils/axiosInstance";

// // const DEGREES = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA", "PhD"];

// // function ApplyNow({ job, onClose, onApplicationSubmitted }) {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm();

// //   const [resumeFile, setResumeFile] = useState(null);

// //   const onSubmit = async (data) => {
// //     const formData = new FormData();
// //     formData.append("name", data.name);
// //     formData.append("education", data.education);
// //     formData.append("degree", data.degree);
// //     formData.append("resume", resumeFile);
// //     // if (!job || !job._id) {
// //     //   console.error("Error: Job data is undefined or missing '_id'", job);
// //     //   return;
// //     // }
// //     // formData.append("jobId", job._id);
  
// //     try {
// //       const response = await axiosInstance.post("/api/applications/submit", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       console.log("Application submitted successfully:", response.data);
// //       onApplicationSubmitted(response.data);
// //       onClose();
// //     } catch (error) {
// //       console.error("Error submitting application:", error.response ? error.response.data : error.message);
// //     }
  
  
// //   };

// //   return (
// //     <div className="modal-overlay">
// //       <div className="modal-content">
// //         <h2 className="modal-title">Apply {job?.jobTitle}</h2>
  

// //         <form onSubmit={handleSubmit(onSubmit)} className="apply-form">
// //           <div className="form-group">
// //             <label>Full Name</label>
// //             <input {...register("name", { required: "Full Name is required" })} placeholder="Enter full name" />
// //             {errors.name && <span className="error">{errors.name.message}</span>}
// //           </div>

// //           <div className="form-group">
// //             <label>Education</label>
// //             <input {...register("education", { required: "Education is required" })} placeholder="Enter your highest qualification" />
// //             {errors.education && <span className="error">{errors.education.message}</span>}
// //           </div>

// //           <div className="form-group">
// //             <label>Degree</label>
// //             <select {...register("degree", { required: "Degree is required" })}>
// //               <option value="">Select Degree</option>
// //               {DEGREES.map((deg) => (
// //                 <option key={deg} value={deg}>{deg}</option>
// //               ))}
// //             </select>
// //             {errors.degree && <span className="error">{errors.degree.message}</span>}
// //           </div>

// //           <div className="form-group">
// //             <label>Upload Resume (PDF only)</label>
// //             <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} required />
// //           </div>

// //           <div className="form-buttons">
// //             <button type="submit" className="publish">Submit ↓</button>
// //             <button type="button" className="close-btn" onClick={onClose}>Close</button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ApplyNow;


// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import "./ApplyNow.css";
// import axiosInstance from "../../utils/axiosInstance";

// const DEGREES = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA", "PhD"];

// function ApplyNow({ job, onClose, onApplicationSubmitted }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [resumeFile, setResumeFile] = useState(null);

//   const onSubmit = async (data) => {
//     // Validate the file is selected
//     if (!resumeFile) {
//       alert("Please upload your resume.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("education", data.education);
//     formData.append("degree", data.degree);
//     formData.append("resume", resumeFile); // Attach the resume
  
//     try {
//       const response = await axiosInstance.post("/api/applications/submit", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       console.log("Application submitted successfully:", response.data);
//       onApplicationSubmitted(response.data);
//       alert("Your application has been successfully submitted!");
//       onClose();
//     } catch (error) {
      
//     }
//   };
  
  


//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2 className="modal-title">Apply {job?.jobTitle}</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="apply-form">
//           <div className="form-group">
//             <label>Full Name</label>
//             <input
//               {...register("name", { required: "Full Name is required" })}
//               placeholder="Enter full name"
//             />
//             {errors.name && <span className="error">{errors.name.message}</span>}
//           </div>

//           <div className="form-group">
//             <label>Education</label>
//             <input
//               {...register("education", { required: "Education is required" })}
//               placeholder="Enter your highest qualification"
//             />
//             {errors.education && <span className="error">{errors.education.message}</span>}
//           </div>

//           <div className="form-group">
//             <label>Degree</label>
//             <select {...register("degree", { required: "Degree is required" })}>
//               <option value="">Select Degree</option>
//               {DEGREES.map((deg) => (
//                 <option key={deg} value={deg}>
//                   {deg}
//                 </option>
//               ))}
//             </select>
//             {errors.degree && <span className="error">{errors.degree.message}</span>}
//           </div>

//           <div className="form-group">
//             <label>Upload Resume (PDF only)</label>
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={(e) => setResumeFile(e.target.files[0])}
//               required
//             />
//           </div>

//           <div className="form-buttons">
//             <button type="submit" className="publish">
//               Submit ↓
//             </button>
//             <button type="button" className="close-btn" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ApplyNow;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import "./ApplyNow.css";
// import axiosInstance from "../../utils/axiosInstance";

// const DEGREES = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA", "PhD"];

// function ApplyNow({ job, onClose, onApplicationSubmitted }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [resumeFile, setResumeFile] = useState(null);

//   const onSubmit = async (data) => {
//     // Validate the file is selected
//     if (!resumeFile) {
//       alert("Please upload your resume.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("education", data.education);
//     formData.append("degree", data.degree);
//     formData.append("resume", resumeFile); // Attach the resume

//     try {
//       const response = await axiosInstance.post("/api/applications/submit", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Application submitted successfully:", response.data);
//       onApplicationSubmitted(response.data);
//       alert("Your application has been successfully submitted!");
//       onClose(); // Close the modal after submission
//     } catch (error) {
//       console.error("Error submitting application:", error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="modal-overlay"> {/* Apply the correct class name */}
//       <div className="modal-content"> {/* Apply the correct class name */}
//         <h2 className="modal-title">Apply {job?.jobTitle}</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="apply-form">
//           <div className="form-group">
//             <label>Full Name</label>
//             <input
//               {...register("name", { required: "Full Name is required" })}
//               placeholder="Enter full name"
//             />
//             {errors.name && <span className="error">{errors.name.message}</span>}
//           </div>

//           <div className="form-group">
//             <label>Education</label>
//             <input
//               {...register("education", { required: "Education is required" })}
//               placeholder="Enter your highest qualification"
//             />
//             {errors.education && <span className="error">{errors.education.message}</span>}
//           </div>

//           <div className="form-group">
//             <label>Degree</label>
//             <select {...register("degree", { required: "Degree is required" })}>
//               <option value="">Select Degree</option>
//               {DEGREES.map((deg) => (
//                 <option key={deg} value={deg}>
//                   {deg}
//                 </option>
//               ))}
//             </select>
//             {errors.degree && <span className="error">{errors.degree.message}</span>}
//           </div>

//           <div className="form-group">
//             <label>Upload Resume (PDF only)</label>
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={(e) => setResumeFile(e.target.files[0])}
//               required
//             />
//           </div>

//           <div className="form-buttons">
//             <button type="submit" className="publish">
//               Submit ↓
//             </button>
//             <button type="button" className="close-btn" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ApplyNow;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./ApplyNow.css";
import axiosInstance from "../../utils/axiosInstance";

const DEGREES = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA", "PhD"];

function ApplyNow({ job, onClose, onApplicationSubmitted }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resumeFile, setResumeFile] = useState(null);

  const onSubmit = async (data) => {
    // Validate the file is selected
    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("education", data.education);
    formData.append("degree", data.degree);
    formData.append("resume", resumeFile); // Attach the resume

    try {
      const response = await axiosInstance.post("/api/applications/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Application submitted successfully:", response.data);
      onApplicationSubmitted(response.data);
      alert("Your application has been successfully submitted!");
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting application:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Apply for {job?.jobTitle}</h2>
          {/* <button className="close-btn" onClick={onClose}>X</button> */}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="apply-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              {...register("name", { required: "Full Name is required" })}
              placeholder="Enter full name"
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label>Education</label>
            <input
              {...register("education", { required: "Education is required" })}
              placeholder="Enter your highest qualification"
            />
            {errors.education && <span className="error">{errors.education.message}</span>}
          </div>

          <div className="form-group">
            <label>Degree</label>
            <select {...register("degree", { required: "Degree is required" })}>
              <option value="">Select Degree</option>
              {DEGREES.map((deg) => (
                <option key={deg} value={deg}>
                  {deg}
                </option>
              ))}
            </select>
            {errors.degree && <span className="error">{errors.degree.message}</span>}
          </div>

          <div className="form-group">
            <label>Upload Resume (PDF only)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="publish">
              Submit ↓
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyNow;
