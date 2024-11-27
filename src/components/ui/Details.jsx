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
        navigate("/"); 
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
        <p className="text-2xl text-blue-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-red-600">
          Error: {error.message || "Something went wrong!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="relative max-w-2xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">
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
        <div className="absolute flex space-x-4 top-6 right-6">
          <button
            onClick={handleEdit}
            className="p-2 text-white transition-transform transform bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:scale-105"
            title="Edit Post"
          >
            <Edit className="text-lg" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-white transition-transform transform bg-red-600 rounded-full shadow-md hover:bg-red-700 hover:scale-105"
            title="Delete Post"
          >
            <Trash2 className="text-lg" />
          </button>
        </div>

        <NavLink
          to="/"
          className="inline-block px-6 py-2 mt-6 text-lg font-medium text-white transition duration-300 bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
}

export default Details;
