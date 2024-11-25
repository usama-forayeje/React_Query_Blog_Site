import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchWithId } from "../../api/api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

function Details() {
    const navigate = useNavigate();

    const queryClint = useQueryClient()
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchWithId(id),
  });



  //! Mutation Funtion to delete data
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onError: (err) => {
      console.error("Failed to delete:", err.response?.data || err.message);
    },
    onSuccess: () => {
        console.log("Post deleted successfully!");
        queryClint.invalidateQueries(["posts"]);
        navigate("/"); // হোমে রিডাইরেক্ট
    },
  });

  const handleEdit = () => {
    alert("Edit functionality coming soon!");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      deleteMutation.mutate(id, {
        onError: (err) => console.error("Delete failed:", err.response?.data || err.message),
        onSuccess: () => console.log("Post deleted successfully!"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-blue-600 text-2xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-2xl">
          Error: {error.message || "Something went wrong!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Post Details
        </h1>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ID:
            </span>{" "}
            {data.id}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Title:
            </span>{" "}
            {data.title}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Body:
            </span>{" "}
            {data.body}
          </p>
        </div>

        {/* Edit and Delete Icons */}
        <div className="absolute top-6 right-6 flex space-x-4">
          <button
            onClick={handleEdit}
            className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            title="Edit Post"
          >
            <Edit className="text-lg" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
            title="Delete Post"
          >
            <Trash2 className="text-lg" />
          </button>
        </div>

        <NavLink
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
}

export default Details;
