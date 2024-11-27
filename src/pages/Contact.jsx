import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchTips } from "../api/api"; // Adjust your API endpoint

function Contact() {
  const { data, isLoading, isError } = useInfiniteQuery({
    queryKey: ["tips"],
    queryFn: fetchTips, // Fetch paginated data
    getNextPageParam: (lastPage, allPages) => {
     return lastPage.length === 10 ? allPages.length : undefined
    }
  });
  console.log(data); // Check the structure of data

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xl font-extrabold text-white animate-pulse">Fetching Amazing Tips...</p>
        </motion.div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <p className="text-2xl font-bold text-white">Something went wrong. Please try again!</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.h1
        className="mb-12 text-5xl font-bold tracking-wide text-center text-indigo-600 md:text-7xl dark:text-indigo-400 drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Daily Dose of Tips
      </motion.h1>

      {data?.pages?.map((page, index) => {
        console.log("Page:", page); // Check page data

        return (
          <motion.ul
            key={index}
            className="grid w-full grid-cols-1 gap-8 max-w-7xl sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {page?.data?.map((item, idx) => (
              <motion.li
                key={item?.id}
                className="relative p-6 transition-transform transform shadow-xl bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-xl hover:shadow-2xl hover:scale-105"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
              >
                {/* Icon */}
                <div className="flex items-center mb-4">
                  <motion.div
                    className="text-4xl text-purple-600 dark:text-purple-400"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {item?.icon}
                  </motion.div>
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
              </motion.li>
            ))}
          </motion.ul>
        );
      })}
    </div>
  );
}

export default Contact;
