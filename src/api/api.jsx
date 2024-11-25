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
const fetchTips = async () => {
  try {
    const res = await api.get("/tips", {
    });
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching paginated tips:", error.message);
    return [];
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
const updatePost = async (id, isFavorite) => {
    try {
      // এখানে isFavorite এর মান টগল হবে (true/false)
      const res = await api.patch(`/posts/${id}`, { isFavorite });
      return res.status === 200;
    } catch (error) {
      console.error("Error updating post:", error.message);
      return false;
    }
  };


 const toggleFavoritePost = async (id) => {
    const response = await fetch(`/api/posts/${id}/toggleFavorite`, {
      method: "PATCH",
    });
    return response.json();
  };
  

export { fetchPost, fetchPostNormal, fetchWithId, deletePost,toggleFavoritePost ,updatePost, fetchTips};
export default api;
