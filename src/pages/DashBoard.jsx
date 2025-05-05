import React, { useContext, useEffect, useState } from "react";
import { addBlog, deleteBlog, getAllBlogs, getUserBlogs } from "../api_managers/blogApi";
import toast from "react-hot-toast";
import { StoreContext } from "../context/StoreContext";
function DashBoard() {
  const { setAllBlogs } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserBlogs();
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
        
      } catch (error) {
        console.log(error);
      }
    })();
  },[])
  
  const onChangeHandler = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  const fileHandler = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", formData.image);
    try {
      const res = await addBlog(data);
      console.log("res", res);
      toast.success(res.data.message);
      setFormData({
        title: "",
        category: "",
        description: "",
        image: null
      });
      if (res.data.blog) {
        setBlogs((prev) => ([...prev, res.data.blog]));
      } else {
        const response = await getAllBlogs();
        setBlogs(response.data.blogs);
      }
      const response = await getAllBlogs();
      setAllBlogs(response.data.blogs);
    } catch (error) {
      toast.error(error.message);
    } finally {
        setLoading(false);
        setActiveTab("list")
    }
  };

  const removeBlog = async (blogId) => {
    try {
      const res = await deleteBlog(blogId);
      toast.success(res.data.message);
      setBlogs(blogs.filter((b) => b._id !== blogId));
      const response = await getAllBlogs();
      setAllBlogs(response.data.blogs);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-auto">
      {/* side bar */}
      <div className="w-full md:w-64 bg-gray-800 text-white p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-6 text-white">Dashboard</h2>
        <button
          className={`w-full text-left py-2 px-4 mb-2 rounded ${
            activeTab === "post" ? "bg-orange-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("post")}
        >
          Post a blog
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeTab === "list" ? "bg-orange-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("list")}
        >
          List of Blogs
        </button>
      </div>

      <div className="flex-1 p-6">
        {activeTab === "post" ? (
          <div>
            <h2 className="text-xl font-bold">Post a new blog</h2>
            <div className="mt-8">
              <form
                onSubmit={submitHandler}
                className="w-full md:w-1/2 flex flex-col gap-4"
              >
                <input
                  name="title"
                  value={formData.title}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Title"
                  required
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />
                <input
                  name="category"
                  value={formData.category}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Category"
                  required
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Description"
                  required
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />

                <div>
                  <label htmlFor="">Choose Image</label>
                  <input
                    onChange={fileHandler}
                    type="file"
                    accept="image/*"
                    required
                    className="border border-gray-300 rounded-md p-2 outline-none w-full"
                  />
                </div>
                <button className="bg-black text-white w-full rounded-full border-none cursor-pointer py-2">
                  {loading ? "Loading.." : "Post Blog"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-4 h-auto">
            <h2 className="text-xl font-semibold mb-4">List of Blogs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Category: {blog.category}
                      </p>
                      <button
                        onClick={() => removeBlog(blog._id)}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No blogs available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
