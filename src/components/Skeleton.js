import React from 'react';

const Skeleton = ({ count = 1, type = 'card' }) => {
  if (type === 'card') {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-square bg-gray-200 dark:bg-slate-700 animate-pulse" />
            <div className="p-3 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'banner') {
    return (
      <div className="w-full h-64 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
    );
  }

  return null;
};

export default Skeleton;
