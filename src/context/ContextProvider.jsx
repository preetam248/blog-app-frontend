import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../api_managers/blogApi";

import { StoreContext } from "./StoreContext.js";

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    storedUser && setUser(storedUser);
  }, []);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await getAllBlogs();
        console.log(response);
        setAllBlogs(response.data.blogs);
      } catch (e) {
        console.log("Error while fetch all blogs", e);
      }
    };
    loadBlogs();
  }, []);

  const loginUser = (user, token) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const contextValue = {
    user,
    allBlogs,
    loginUser,
    logoutUser,
    setAllBlogs,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default ContextProvider;
