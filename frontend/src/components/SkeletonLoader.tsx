const SkeletonLoader = () => (
  <div className="flex flex-col md:flex-row min-h-screen p-6 animate-pulse">
    {/* Sidebar Skeleton */}
    <div className="w-full md:w-1/4 bg-gray-100 rounded-lg h-126"></div>
    
    {/* Main Content Skeleton */}
    <div className="flex-1 space-y-6 mt-6 md:mt-0 px-6">
      <div className="h-10 bg-gray-100 rounded"></div>
      <div className="h-96 bg-gray-100 rounded-lg"></div>
      <div className="h-10 bg-gray-100 rounded-lg"></div>
    </div>
  </div>
);

export default SkeletonLoader;
