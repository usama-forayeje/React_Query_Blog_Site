import axios from "axios";


const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json",
      }
})

 const fetchPost = async (currentPage) => {
    const res = await api.get(`/posts?_start=${currentPage}&_limit=4`)
    return res.status === 200 ? res.data : [];
}
 const fetchPostNormal =  () => {
   return  api.get("/posts")
}
 const fetchWithId = async (id) => {
    try {
       const res = await  api.get(`/posts/${id}`)
       return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
        
    }
   
}

const deletePost = (id ) => {
    return api.delete(`/posts/${id}`)
}

export {fetchPost, fetchPostNormal,fetchWithId , deletePost,}