import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
const Navbar = () => {
  const { user, logoutUser } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <nav className="bg-white p-4 sticky top-0">
      <div className="flex container mx-auto justify-between items-center">
        {/* logo */}
        <div className="flex gap-2 items-center">
          <Link to={"/"}>
            <img
              className="w-16"
              src={
                "https://t3.ftcdn.net/jpg/03/46/02/76/360_F_346027654_YDrGwzbKjUqSKGvEXIrrCtbLhXXECEyb.jpg"
              }
              alt=""
            />
          </Link>
          <p className="hidden sm:block text-2xl">
            Draftly <span className="font-bold text-2xl">Blog</span>
          </p>
        </div>

        {/* center content */}
        <ul className="hidden sm:flex gap-5 text-xl font-normal justify-center items-center text-gray-700">
          <Link
            to="/"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Contact
          </Link>
        </ul>

        {user ? (
          <div className="flex gap-2">
            <div>
              <img
                src={JSON.parse(localStorage.getItem("user")).image}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <Link
              to={"/dashboard"}
              className="bg-black px-6 py-2 rounded-full text-white"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                logoutUser(), navigate("/login");
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-orange-600 duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="bg-orange-500 text-white px-8 py-2 rounded-full cursor-pointer hover:bg-orange-600 duration-300"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
