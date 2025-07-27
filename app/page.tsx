'use client'; // ✅ must be the first line

import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { Job } from '../types';

type SortOption = 'relevance' | 'date';

export default function JobList() {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://akil-backend.onrender.com/opportunities/search");
        const data = await res.json();
        console.log("Full API response:", JSON.stringify(data, null, 2));

        setJobs(data?.data ?? []); // ✅ prevent undefined issues
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="mx-auto pt-10" style={{ maxWidth: '919px' }}>
      {/* Header */}
      <div className="flex justify-between items-end mb-10 px-5">
        <div>
          <h1 className="font-bold text-3xl text-gray-900">Opportunities</h1>
          <p className="text-sm text-gray-500">
            Showing {jobs?.length ?? 0} results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
          >
            <option value="relevance">Most relevant</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-7 px-5">
        {loading && <p className="text-sm text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {!loading && !error && jobs.map((job, i) => (
          <JobCard key={i} job={job} index={i} />
        ))}
      </div>
    </div>
  );
}