// src/components/SearchInput.js
import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

const SearchInput = () => {
  const { searchQuery, setSearchQuery} = useContext(JobContext);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by title or company"
      value={searchQuery}
      onChange={handleSearch}
      className="search-input"
    />
  );
};

export default SearchInput;