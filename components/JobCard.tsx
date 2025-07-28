'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../types/types';


type Props = {
  job: Job;
  index: number;
};

export default function JobCard({ job, index }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/job/${job.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="hover:shadow-md hover:bg-blue-50 cursor-pointer border border-gray-200 rounded-2xl flex flex-row p-5 gap-5 mb-5 transition-all duration-200"
    >
      {/* Avatar / Company Logo */}
      <div className="flex-shrink-0">
        <img
          src={job.logoUrl || `/job${index + 1}.png`} // fallback to dummy if no logoUrl
          alt={`Logo of ${job.orgName}`}
          className="h-12 w-12 object-cover rounded-full bg-white"
        />
      </div>

      {/* Job Info */}
      <div className="flex-grow">
        {/* Job Title */}
        <div className="text-lg font-semibold text-gray-900">{job.title}</div>

        {/* Company + Location */}
        <div className="text-sm text-gray-500">
          {job.orgName}
          {job.location.length > 0 && <span className="mx-1">•</span>}
          {job.location[0]}
        </div>

        {/* Description */}
        <div className="text-sm text-gray-700 mt-2 line-clamp-2">{job.description}</div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {job.categories[0] && (
            <span className="border border-blue-600 text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition">
              {job.categories[0]}
            </span>
          )}

          {job.categories[1] && (
            <span className="border-2 border-red-600 text-red-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-600 hover:text-white transition">
              {job.categories[1]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
