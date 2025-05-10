import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

const JobList = () => {
  const { jobs, loading,currentPage,totalPages,setCurrentPage } = useContext(JobContext);
   
  if (loading) return <p>Loading jobs...</p>;
  if (!jobs.length) return <p>No job listings found.</p>;
  const pagenate=(page)=>setCurrentPage(page);

  return (
    <div className="job-list">
      {currentPage.map(job => (
        <div key={job.id} className="job-card">
          <h2>{job["job-tile"]}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Date Posted:</strong> {job["Date-Posted"]}</p>
          <p><strong>Remote/On-site:</strong> {job["Remote/On-site"]}</p>
          <p><strong>Work Type:</strong> {job["work-type"]}</p>
        </div>
      ))}
      <div>
        <button onClick={( )=>pagenate(1)}>First</button>
        {new Array(totalPages).fill(null).map((_, index) => (
          <button className={currentPage===index+1?"active":""}key={index} onClick={() => pagenate(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={( )=>pagenate(totalPages)}>Last</button>

      </div>
    </div>
  );
};

export default JobList;