import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchTips } from "../api/api"; // Adjust your API endpoint
import { useEffect } from "react";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import { useInView } from "react-intersection-observer";

function Contact() {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tips"],
    queryFn: fetchTips, // Fetch paginated data
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  });

  //  { infinite scrolling by javascript }

  // const handleScroll = () => {
  //   // Adjust the scroll trigger condition
  //   const isBottom =
  //     window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100; // 100px margin
  //   if (isBottom && hasNextPage) {
  //     fetchNextPage();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasNextPage]);




  // {!// infinite scroll by react-intersection-observer}
  const { ref, inView } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);


// loading
  if (isLoading) return <SkeletonLoader />;
// error
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <p className="text-2xl font-bold text-white">
          Something went wrong. Please try again!
        </p>
      </div>
    );

  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {/* Header */}
        <h1 className="mb-12 text-5xl font-bold tracking-wide text-center text-indigo-600 md:text-7xl dark:text-indigo-400 drop-shadow-lg">
          Daily Dose of Tips
        </h1>

        {data?.pages?.map((page, index) => {
          return (
            <ul
              key={index}
              className="grid w-full grid-cols-1 gap-8 mt-7 max-w-7xl sm:grid-cols-2 lg:grid-cols-3"
            >
              {page?.data?.map((item) => (
                <li
                  key={item?.id}
                  className="relative p-6 transition-transform transform shadow-xl bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-xl hover:shadow-2xl hover:scale-105"
                >
                  {/* Icon */}
                  <div className="flex items-center mb-4">
                    <div className="text-4xl text-purple-600 dark:text-purple-400">
                      {item?.icon}
                    </div>
                    <h2 className="ml-3 text-lg font-bold text-gray-800 md:text-xl dark:text-gray-100">
                      {item?.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-gray-600 transition-all duration-300 ease-in-out md:text-base dark:text-gray-300 hover:scale-105">
                    {item?.body}
                  </p>

                  {/* Category Badge */}
                  {item?.category && (
                    <div className="absolute flex justify-center mb-2 bottom-2 right-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full shadow-md bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-700">
                        {item?.category}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
      {/* Fetching Next Page Loader */}
      <div ref={ref}>{isFetchingNextPage && <SkeletonLoader />}</div>
    </>
  );
}

export default Contact;
