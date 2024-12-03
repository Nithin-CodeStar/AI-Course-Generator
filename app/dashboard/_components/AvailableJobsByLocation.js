"use client"; // Enable client-side functionality for interactivity

import React, { useState, useEffect } from "react";
import { fetchJobs, fetchSalaryRange } from "../../../configs/jobsApi";


const AvailableJobsByLocation = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = "Atlanta"; // Location to fetch jobs for

  // Fetch random jobs for the specified location
  const fetchJobsByLocation = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchJobs({ location: "Atlanta", query: "Software Developer" }); // Fetch jobs without a specific query
      setJobs(data.jobs || []);
    } catch (err) {
      setError("Failed to fetch jobs for Atlanta. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsByLocation();
  }, []); // Fetch jobs when the component mounts

  return (
    <div className="container mx-auto p-4">

      {loading && <p className="text-center text-gray-500">Loading jobs...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded shadow-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Employment Type: {job.employmentType || "N/A"}
                </p>
              </div>
              <div className="mt-4">
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
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default AvailableJobsByLocation;
