import React from 'react';

export const CampaignEmptyState = () => {
  return (
    <div className="mx-0 my-4 md:mx-4">
      <div className="block p-4 bg-white shadow-lg rounded-lg" style={{ maxWidth: 400, minHeight: 200 }}>
        <div className="text-lg font-bold text-gray-darkest mb-6">
          <span className="skeleton-box h-4 w-full inline-block"></span>
          <span className="skeleton-box h-3 w-1/4 inline-block"></span>
          <span className="skeleton-box h-3 w-1/3 ml-2 inline-block"></span>
          <span className="skeleton-box h-3 w-1/5 ml-2 inline-block"></span>
        </div>
        <div className="text-lg font-bold text-gray-darkest mb-6">
          <span className="skeleton-box h-4 w-full inline-block rounded-full"></span>
          <div className="flex justify-between mt-1">
            <span className="skeleton-box h-2 w-1/5 inline-block"></span>
            <span className="skeleton-box h-2 w-1/5 inline-block"></span>
          </div>
        </div>
        <div className="text-lg font-bold text-gray-darkest flex justify-end">
          <span className="skeleton-box h-10 w-2/5 inline-block rounded-lg"></span>
        </div>
      </div>
    </div>
  );
};
