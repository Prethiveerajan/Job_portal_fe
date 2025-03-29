

import React, { useState } from "react";
import "./SearchFilter.css";
import { FaSearch, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const SearchFilter = ({ onFilterChange }) => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState(50000);

  // Handle input changes and send updates to parent
  const handleChange = () => {
    onFilterChange({ searchTerm, location, jobType, salary });
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter-wrapper">
        {/* Search Box */}
        <div className="search-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleChange();
            }}
          />
        </div>

        <div className="divider"></div> {/* Vertical Separator */}

        {/* Preferred Location - Dropdown */}
        <div className="search-dropdown">
          <FaMapMarkerAlt className="dropdown-icon" />
          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              handleChange();
            }}
          >
            <option value="">Preferred Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        <div className="divider"></div> {/* Vertical Separator */}

        {/* Job Type - Dropdown */}
        <div className="search-dropdown">
          <FaUsers className="dropdown-icon" />
          <select
            value={jobType}
            onChange={(e) => {
              setJobType(e.target.value);
              handleChange();
            }}
          >
            <option value="">Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="divider"></div> {/* Vertical Separator */}

        {/* Salary Range */}
        <div className="salary-filter">
          <span className="salary-label">Salary Per Month</span>
          <div className="slider-container">
            <input
              type="range"
              min="50000"
              max="80000"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                handleChange();
              }}
            />
            <span className="salary-range">₹{salary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
