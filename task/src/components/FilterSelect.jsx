// src/components/FilterSelect.js
import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

const FilterSelect = () => {
  const { filterType, setFilterType,setcurrentPage} = useContext(JobContext);

  const handleFilter = (e) => {
    setFilterType(e.target.value);
    setcurrentPage(1); // Reset to the first page when filter changes
  };

  return (
    <select value={filterType} onChange={handleFilter} className="filter-select">
      <option value="">All Types</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Remote">Remote</option>
    </select>
  );
};

export default FilterSelect;