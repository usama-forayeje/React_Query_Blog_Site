import { useEffect, useState } from "react";
import {  fetchPostNormal } from "../api/api";

function Contact() {
  const [post, setPost] = useState([]);
  const [isLoading , setIsLoading ] = useState(true)
  const [isError , setIsError ] = useState(false)

  const getPostData = async () => {
    try {
      const res = await fetchPostNormal();
      res.status === 200 ? setPost(res.data) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Call getPostData when component mounts
  useEffect(() => {
    getPostData();
  }, []);

if (isLoading) return <p>Loading...</p>
if (isError) return <p>Something error</p>

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
       With UseState and Effect  Contact Posts
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {post.map((item) => (
          <li
            key={item?.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-all">
              {item?.title}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              {item?.body}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all">
              Read More
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contact;
