// // src/context/JobContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const JobContext = createContext();

// export const JobProvider = ({ children }) => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get('http://localhost:3500/jobListings');
//         setJobs(res.data); // assuming res.data is an array of jobs
//         console.log(res.data);
//       } catch (err) {
//         console.error('Failed to fetch jobs:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   return (
//     <JobContext.Provider value={{ jobs, loading }}>
//       {children}
//     </JobContext.Provider>
//   );
// };


// src/context/JobContext.js
import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);

 
  

  // 🆕 State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:3500/jobListings');
        setJobs(res.data); // assuming res.data is an array of jobs
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);



  // 🧠 Filtered + Searched Jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Apply search
    if (searchQuery) {
      result = result.filter(job =>
        job["job-tile"].toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filter
    if (filterType) {
      result = result.filter(job =>
        job["work-type"].toLowerCase() === filterType.toLowerCase()
      );
    }

    return result;
  }, [jobs, searchQuery, filterType]);
   //Pagination logic
  const indexOfLastJob = curentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentPage = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);;
  console.log(currentPage);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);  

  return (
    <JobContext.Provider value={{
      jobs: 
      filteredJobs,
      loading,
      searchQuery,
      setSearchQuery,
      filterType,
      setFilterType,
      curentPage,
      setCurrentPage,
      jobsPerPage,
      setJobsPerPage,
      currentPage,
      totalPages
    }}>
      {children}
    </JobContext.Provider>
  );
};