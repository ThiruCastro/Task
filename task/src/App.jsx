// src/App.js
import React from 'react';
import { JobProvider } from './context/JobContext';
import JobList from './components/JobList';
import FilterSelect from './components/FilterSelect';
import SearchInput from './components/SearchInput';

import './assets/style/index.css';

function App() {
  return (
    <JobProvider>
      <div className="app-container">
        <h1>Job Listings Dashboard</h1>
        <SearchInput />
        <FilterSelect />
        <JobList />
      </div>
    </JobProvider>
  );
}

export default App;