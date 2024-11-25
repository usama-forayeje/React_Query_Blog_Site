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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800">
        <p className="text-xl font-semibold text-white">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800">
        <p className="text-xl font-semibold text-red-500">Something went wrong!</p>
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800 dark:bg-gradient-to-bl dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 min-h-screen flex flex-col items-center">
      <motion.h1
        className="text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Amazing & Cute Tips
      </motion.h1>

      <motion.ul
        className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {data?.map((item, index) => (
          <motion.li
            key={item?.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all flex flex-col relative bg-gradient-to-r from-purple-100 via-pink-100 to-red-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center mb-4">
              {/* Display the icon directly from the database */}
              <span className="text-3xl">{item?.icon}</span>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 ml-2 text-shadow-md group-hover:text-white">
                {item?.title}
              </h2>
            </div>

            {/* Render the description with cool styling */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-all transform hover:scale-105 hover:text-gray-800 dark:hover:text-white duration-300 ease-in-out">
              {item?.body}
            </p>

            <div className="flex justify-between items-center mt-auto">
              {/* Category fixed position */}
              {item?.category && (
                <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-700 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                  {item?.category}
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default Contact;
