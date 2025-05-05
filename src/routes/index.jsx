import About from "../pages/About.jsx";
import Blogs from "../pages/Blogs.jsx";
import Contact from "../pages/Contact.jsx";
import DashBoard from "../pages/DashBoard.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import SingleBlog from "../pages/SingleBlog.jsx";


const routes = [
    {
        path: "/",
        page: <Home/>
    },
    {
        path: "/register",
        page: <Signup/>
    },
    {
        path: "/login",
        page: <Login/>
    },
    {
        path: "/blogs",
        page: <Blogs/>
    },
    {
        path: "/about",
        page: <About/>
    },
    {
        path: "/contact",
        page: <Contact/>
    },
    {
        path: "/dashboard",
        page: <DashBoard/>
    },
    {
        path: "/blog/:id",
        page: <SingleBlog/>
    },
]

export default routes;