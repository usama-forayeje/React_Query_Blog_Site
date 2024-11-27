import axios from "axios";

 const api = axios.create({
  baseURL: "http://localhost:4000",
});

const fetchPost = async (currentPage) => {
  try {
    const res = await api.get(`/posts`, {
      params: {
        _start: currentPage,
        _limit: 4,
      },
    });
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching paginated posts:", error.message);
    return [];
  }
};


const fetchTips = async ({ pageParam = 1 }) => {
  try {
    const res = await api.get(
      `/tips?_limit=9&_page=${pageParam}`
    );
    return {
      data: res.data, // Current page data
    };
  } catch (error) {
    console.error("Error fetching paginated tips:", error.message);
    return { data: [] }; // Return empty data in case of error
  }
};



const fetchPostNormal = async () => {
  try {
    const res = await api.get("/posts");
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching all posts:", error.message);
    return [];
  }
};

const fetchWithId = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.error("Error fetching post by ID:", error.message);
    return null;
  }
};

const deletePost = async (id) => {
  try {
    const res = await api.delete(`/posts/${id}`);
    return res.status === 200 ? true : false;
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return false;
  }
};


export { fetchPost, fetchPostNormal, fetchWithId, deletePost , fetchTips};
export default api;
