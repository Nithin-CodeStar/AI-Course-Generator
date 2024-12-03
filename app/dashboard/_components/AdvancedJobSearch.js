"use client"; // Enable Client Component for interactivity

import React, { useState } from "react";
import { fetchJobs, fetchSalaryRange } from "../../../configs/jobsApi";

const jobTitleSuggestions = [
  "Computer Networks",
  "Machine Learning",
  "Data Science",
  "Parallel Algorithms",
  "Data Structures",
  "Mobile Applications",
  // Undergraduate Courses
  "Computer Science",
  "Information Technology",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Aerospace Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Environmental Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Political Science",
  "Psychology",
  "Sociology",
  "English Literature",
  "Philosophy",
  "History",
  "Business Administration",
  "Accounting",
  "Marketing",
  "Finance",
  "Journalism",
  "Education",

  // Master's Courses
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Big Data Analytics",
  "Software Engineering",
  "Embedded Systems",
  "Robotics",
  "Cloud Computing",
  "Blockchain Technology",
  "Parallel Algorithms",
  "Human-Computer Interaction",
  "Web Development",
  "Mobile Applications",
  "Network Security",
  "Data Structures and Algorithms",
  "Business Analytics",
  "Public Administration",
  "Supply Chain Management",
  "Digital Marketing",
  "International Business",
  "Entrepreneurship",
  "Health Informatics",
  "Bioinformatics",
];

const stateSuggestions = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];


const AdvancedJobSearch = () => {
  const [searchParams, setSearchParams] = useState({ query: "", location: "" });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));

    if (name === "query" && value) {
      setShowJobDropdown(true);
    } else if (name === "location" && value) {
      setShowLocationDropdown(true);
    } else {
      setShowJobDropdown(false);
      setShowLocationDropdown(false);
    }
  };

  const handleDropdownSelect = (name, value) => {
    setSearchParams((prev) => ({ ...prev, [name]: value }));
    if (name === "query") {
      setShowJobDropdown(false);
    } else if (name === "location") {
      setShowLocationDropdown(false);
    }
  };

  const searchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchJobs(searchParams);
      setJobs(data.jobs || []);
      setNextPage(data.nextPage || null);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreJobs = async () => {
    if (!nextPage) return;
    setLoading(true);
    try {
      const data = await fetchJobs({ ...searchParams, nextPage });
      setJobs((prev) => [...prev, ...data.jobs]);
      setNextPage(data.nextPage || null);
    } catch (err) {
      setError("Failed to load more jobs.");
    } finally {
      setLoading(false);
    }
  };

  const getSalary = async (jobTitle) => {
    try {
      const data = await fetchSalaryRange({ jobTitle, countryCode: "US" });
      return data.yearlySalary?.median
        ? `$${data.yearlySalary.median.toFixed(2)} / year`
        : "N/A";
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Advanced Job Search</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            name="query"
            placeholder="Job title or keyword"
            value={searchParams.query}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          {showJobDropdown && (
            <ul className="absolute bg-white border w-full max-h-40 overflow-auto z-10 rounded shadow-md">
              {jobTitleSuggestions
                .filter((title) =>
                  title.toLowerCase().includes(searchParams.query.toLowerCase())
                )
                .map((title, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleDropdownSelect("query", title)}
                  >
                    {title}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={searchParams.location}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          {showLocationDropdown && (
            <ul className="absolute bg-white border w-full max-h-40 overflow-auto z-10 rounded shadow-md">
              {stateSuggestions
                .filter((state) =>
                  state.toLowerCase().includes(searchParams.location.toLowerCase())
                )
                .map((state, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleDropdownSelect("location", state)}
                  >
                    {state}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <button
        onClick={searchJobs}
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {loading ? "Searching..." : "Search Jobs"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex flex-col gap-6 mt-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded shadow-lg p-4 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
              <p className="text-sm text-gray-400 mt-2">
                Employment Type: {job.employmentType || "N/A"}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Salary: {getSalary(job.title)}
              </p>
            </div>
            <div>
              <a
                href={job.jobProviders[0]?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {nextPage && (
        <button
          onClick={loadMoreJobs}
          disabled={loading}
          className="bg-green-500 text-white py-2 px-4 rounded mt-6 hover:bg-green-600"
        >
          Load More Jobs
        </button>
      )}
    </div>
  );
};

export default AdvancedJobSearch;
