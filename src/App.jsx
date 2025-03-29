import React, { useState } from "react";
import JobList from "./components/JobPortal";
import JobCreationForm from "./components/JobCreationForm";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchFilters from "./components/SearchFilters";
import JobPortal from "./components/JobPortal";

function App() {
  const [jobs, setJobs] = useState([]);
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  const handleAddJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: Date.now() }]);
    setIsCreatingJob(false);
  };

  return (
    <>
      <Navbar />
      <SearchFilters />
      
        
       
        
      

      
        {isCreatingJob ? (
          <JobCreationForm onAddJob={handleAddJob} />
        ) : (
          <JobPortal jobs={jobs} />
        )}
      

      
    </>
  );
}

export default App;
