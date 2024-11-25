import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchTips } from "../api/api"; // Adjust your API endpoint

function Contact() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tips"],
    queryFn: fetchTips, // API call to get data
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <p className="text-2xl font-bold text-white">Something went wrong. Please try again!</p>
      </div>
    );

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen flex flex-col items-center">
      {/* Header */}
      <motion.h1
        className="text-5xl md:text-7xl  text-center font-bold text-indigo-600 dark:text-indigo-400  mb-12 tracking-wide drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Daily Dose of Tips
      </motion.h1>

      {/* Tips List */}
      <motion.ul
        className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {data?.map((item, index) => (
          <motion.li
            key={item?.id}
            className="relative bg-gradient-to-r  from-gray-100 via-white to-gray-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Icon */}
            <div className="flex items-center mb-4">
              <motion.div
                className="text-4xl text-purple-600 dark:text-purple-400"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                {item?.icon}
              </motion.div>
              <h2 className="text-lg md:text-xl font-bold ml-3 text-gray-800 dark:text-gray-100">
                {item?.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out mb-4">
              {item?.body}
            </p>

            {/* Category Badge */}
            {item?.category && (
              <div className="absolute bottom-2 right-4 mb-2 flex justify-center">
                <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-700 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                  {item?.category}
                </span>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default Contact;
