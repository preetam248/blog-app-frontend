import AxiosInstance from "."

const getAllBlogs = async () => {
    return await AxiosInstance.get("/blog/all");
}

const addBlog = async (data) => {
    return await AxiosInstance.post("/blog/create", data, {
        headers: {
            "Content-Type": "multipart/formData",
        }
    })
}

const deleteBlog = async (id) => {
    return await AxiosInstance.delete(`blog/delete/${id}`);
}

const getUserBlogs = async () => {
    return await AxiosInstance.get("blog/user/blogs");
}

export { getAllBlogs, addBlog, deleteBlog, getUserBlogs };