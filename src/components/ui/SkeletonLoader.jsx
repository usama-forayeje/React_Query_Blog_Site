function SkeletonLoader() {
    return (
      <div className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        
  
        {/* Skeleton Cards */}
        <div className="grid w-full grid-cols-1 gap-8 mt-7 max-w-7xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="relative p-6 transition-transform transform shadow-lg bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-xl hover:shadow-2xl hover:scale-105 animate-pulse"
            >
              {/* Thumbnail Skeleton */}
              <div className="w-full h-48 mb-3 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
  
              {/* Title Skeleton */}
              <div className="w-4/5 h-6 mb-1 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
  
              {/* Description Skeleton */}
              <div className="w-11/12 h-4 mb-3 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
  
              {/* Category Skeleton */}
              <div className="absolute flex justify-center mb-1 bottom-2 right-4">
                <div className="inline-block px-3 py-1 rounded-full shadow-md from-gray-200 to-gray-300 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default SkeletonLoader;
  