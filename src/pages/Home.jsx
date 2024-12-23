import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPost,  } from "../api/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Edit,  Trash } from "lucide-react"; // Importing Lucide icons
import { motion } from "framer-motion"; // For animations

function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const queryClient = useQueryClient();
  const postsPerPage = 4;

  // Fetch posts data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPost(currentPage),
    placeholderData: keepPreviousData,
  });

  // Mutation to delete a post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      console.log("Post deleted successfully!");
      queryClient.setQueryData(["posts", currentPage], (currPosts) =>
        currPosts.filter((post) => post.id !== id)
      );
    },
  });


  // Handle pagination
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - postsPerPage);
  };

  const handleNext = () => {
    if (data?.length === postsPerPage)
      setCurrentPage(currentPage + postsPerPage);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <p className="text-blue-600 text-2xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <p className="text-red-600 text-2xl">
          Error: {error.message || "Something went wrong!"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-blue-300 dark:to-green-300 mb-8">
        Discover Amazing Posts
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((item) => (
          <li
            key={item?.id}
            className="relative bg-white w-[270px] h-[270px] dark:bg-gray-800 rounded-2xl shadow-lg mx-auto overflow-hidden group hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-all duration-300">
                {item?.title.length > 50
                  ? item?.title.slice(0, 50) + "..."
                  : item?.title}
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm line-clamp-4">
                {item?.body}
              </p>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="absolute top-2 right-2 flex space-x-3">
              <motion.button
                onClick={() => console.log(`Edit post with id: ${item?.id}`)} // Handle Edit here
                className="text-blue-500 hover:text-blue-700"
                whileHover={{ scale: 1.1 }}
              >
                <Edit size={22} />
              </motion.button>
              <motion.button
                onClick={() => deleteMutation.mutate(item?.id)} // Call Delete handler
                className="text-red-500 hover:text-red-700"
                whileHover={{ scale: 1.1 }}
              >
                <Trash size={22} />
              </motion.button>
            </div>

            {/* Read More Button */}
            <NavLink
              to={`/contact/${item?.id}`}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-transform"
            >
              Read More
            </NavLink>

          
          </li>
        ))}
      </ul>

      {/* Pagination Section */}
      <div className="flex justify-center items-center mt-10 space-x-6">
        <motion.button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-6 py-3 rounded-full shadow-lg ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
          whileHover={{ scale: 1.1 }}
        >
          Prev
        </motion.button>
        <p className="text-lg font-bold text-indigo-600 dark:text-teal-300">
          Page {currentPage / postsPerPage + 1}
        </p>
        <motion.button
          onClick={handleNext}
          disabled={data?.length < postsPerPage}
          className={`px-6 py-3 rounded-full shadow-lg ${
            data?.length < postsPerPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
          whileHover={{ scale: 1.1 }}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}

export default Home;
