'use client';

import { useGetJobsQuery } from '../../services/jobsApi';
import JobCard from '../../components/JobCard';

export default function JobList() {
  const { data, error, isLoading } = useGetJobsQuery();

  const jobs = data?.data ?? [];

  return (
    <div className="mx-auto pt-10" style={{ maxWidth: '919px' }}>
      <div className="flex justify-between items-end mb-10 px-5">
        <div>
          <h1 className="font-bold text-3xl text-gray-900">Opportunities</h1>
          <p className="text-sm text-gray-500">Showing {jobs.length} results</p>
        </div>
      </div>

      <div className="space-y-7 px-5">
        {isLoading && <p className="text-sm text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-sm text-red-500 text-center">Failed to load jobs</p>}
        {!isLoading && !error && jobs.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} />
        ))}
      </div>
    </div>
  );
}
