// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import "./JobCreationForm.css"; // Keep existing styles

// const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
// const LOCATIONS = ["Bangalore", "Chennai", "Hyderabad", "Delhi", "Remote"];

// function JobCreationForm({ onJobAdded }) {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();

//   const [draft, setDraft] = useState(null);

//   const handleSaveDraft = (data) => {
//     setDraft(data);
//     console.log("Draft Saved:", data);
//     alert("Draft saved successfully!");
//   };

//   const onSubmit = (data) => {
//     fetch("http://localhost:5000/api/jobs/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((newJob) => {
//         onJobAdded(newJob);
//       })
//       .catch((error) => console.error("Error adding job:", error));
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="job-form">
//       <h2 className="modal-title">Create Job Opening</h2>

//       <div className="form-row">
//         <div className="form-group">
//           <label>Job Title</label>
//           <input
//             {...register("jobTitle", { required: "Job Title is required" })}
//           />
//           {errors.jobTitle && (
//             <p className="error">{errors.jobTitle.message}</p>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Company Name</label>
//           <input
//             {...register("companyName", {
//               required: "Company Name is required",
//             })}
//           />
//           {errors.companyName && (
//             <p className="error">{errors.companyName.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="form-row">
//         <div className="form-group">
//           <label>Location</label>
//           <Controller
//             name="location"
//             control={control}
//             rules={{ required: "Location is required" }}
//             render={({ field }) => (
//               <select {...field}>
//                 <option value="">Choose Preferred Location</option>
//                 {LOCATIONS.map((loc) => (
//                   <option key={loc} value={loc}>
//                     {loc}
//                   </option>
//                 ))}
//               </select>
//             )}
//           />
//           {errors.location && (
//             <p className="error">{errors.location.message}</p>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Job Type</label>
//           <Controller
//             name="jobType"
//             control={control}
//             rules={{ required: "Job Type is required" }}
//             render={({ field }) => (
//               <select {...field}>
//                 <option value="">Select Job Type</option>
//                 {JOB_TYPES.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             )}
//           />
//           {errors.jobType && <p className="error">{errors.jobType.message}</p>}
//         </div>
//       </div>

//       <div className="form-row">
//         <div className="form-group salary-input">
//           <label>Salary Range</label>
//           <div className="salary-fields">
//             <input
//               type="number"
//               {...register("salaryMin", {
//                 required: "Minimum salary is required",
//               })}
//               placeholder="↓↑ ₹ 0"
//             />
           
//             <input
//               type="number"
//               {...register("salaryMax", {
//                 required: "Maximum salary is required",
//               })}
//               placeholder="↓↑ ₹ 12,00,000"
//             />
//           </div>
//           {errors.salaryMin && (
//             <p className="error">{errors.salaryMin.message}</p>
//           )}
//           {errors.salaryMax && (
//             <p className="error">{errors.salaryMax.message}</p>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Application Deadline</label>
//           <input
//             type="date"
//             {...register("applicationDeadline", {
//               required: "Application Deadline is required",
//             })}
//           />
//           {errors.applicationDeadline && (
//             <p className="error">{errors.applicationDeadline.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="form-group">
//         <label>Job Description</label>
//         <textarea
//           {...register("jobDescription", {
//             required: "Job Description is required",
//           })}
//           placeholder="Please share a description to let the candidate know more about the job"
//         />
//         {errors.jobDescription && (
//           <p className="error">{errors.jobDescription.message}</p>
//         )}
//       </div>

//       <div className="form-buttons">
//         <button
//           type="button"
//           className="save-draft"
//           onClick={handleSubmit(handleSaveDraft)}
//         >
//           Save Draft »
//         </button>
//         <button type="submit" className="publish">
//           Publish »
//         </button>
//       </div>
//     </form>
//   );
// }

// export default JobCreationForm;
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./JobCreationForm.css"; // Keep existing styles

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const LOCATIONS = ["Bangalore", "Chennai", "Hyderabad", "Delhi", "Remote"];

function JobCreationForm({ onJobAdded }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [placeholders, setPlaceholders] = useState({
    jobTitle: "Enter job title",
    companyName: "Enter company name",
    salaryMin: "↓↑ ₹ 0",
    salaryMax: "↓↑ ₹ 12,00,000",
    jobDescription: "Please describe the job role",
  });

  const handleSaveDraft = (data) => {
    setPlaceholders((prev) => ({
      ...prev,
      jobTitle: data.jobTitle ? prev.jobTitle : "⚠ Required: Job Title",
      companyName: data.companyName ? prev.companyName : "⚠ Required: Company Name",
      salaryMin: data.salaryMin ? prev.salaryMin : "⚠ Required: ↓↑ ₹ Min Salary",
      salaryMax: data.salaryMax ? prev.salaryMax : "⚠ Required: ↓↑ ₹ Max Salary",
      jobDescription: data.jobDescription ? prev.jobDescription : "⚠ Required: Describe the job",
    }));

    if (Object.values(data).some((val) => !val)) return;

    console.log("Draft Saved:", data);
    alert("Draft saved successfully!");
  };

  const onSubmit = (data) => {
    setPlaceholders((prev) => ({
      ...prev,
      jobTitle: data.jobTitle ? prev.jobTitle : "⚠ Required: Job Title",
      companyName: data.companyName ? prev.companyName : "⚠ Required: Company Name",
      salaryMin: data.salaryMin ? prev.salaryMin : "⚠ Required: ↓↑ ₹ Min Salary",
      salaryMax: data.salaryMax ? prev.salaryMax : "⚠ Required: ↓↑ ₹ Max Salary",
      jobDescription: data.jobDescription ? prev.jobDescription : "⚠ Required: Describe the job",
    }));

    if (Object.values(data).some((val) => !val)) return;

    fetch("http://localhost:5000/api/jobs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((newJob) => {
        onJobAdded(newJob);
      })
      .catch((error) => console.error("Error adding job:", error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="job-form">
      <h2 className="modal-title">Create Job Opening</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Job Title</label>
          <input
            {...register("jobTitle", { required: "Job Title is required" })}
            placeholder={placeholders.jobTitle}
          />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            {...register("companyName", { required: "Company Name is required" })}
            placeholder={placeholders.companyName}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Location</label>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Choose Preferred Location</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="form-group">
          <label>Job Type</label>
          <Controller
            name="jobType"
            control={control}
            rules={{ required: "Job Type is required" }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select Job Type</option>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group salary-input">
          <label>Salary Range</label>
          <div className="salary-fields">
            <input
              type="number"
              {...register("salaryMin", { required: "Minimum salary is required" })}
              placeholder={placeholders.salaryMin}
            />
            <input
              type="number"
              {...register("salaryMax", { required: "Maximum salary is required" })}
              placeholder={placeholders.salaryMax}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Application Deadline</label>
          <input
            type="date"
            {...register("applicationDeadline", {
              required: "Application Deadline is required",
            })}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Job Description</label>
        <textarea
          {...register("jobDescription", { required: "Job Description is required" })}
          placeholder={placeholders.jobDescription}
        />
      </div>

      <div className="form-buttons">
        <button
          type="button"
          className="save-draft"
          onClick={handleSubmit(handleSaveDraft)}
        >
          Save Draft ↓
        </button>
        <button type="submit" className="publish">
          Publish ↓
        </button>
      </div>
    </form>
  );
}

export default JobCreationForm;
