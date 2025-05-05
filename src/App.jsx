import React from "react";
import routes from "./routes";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar/>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<WrapElement route={route} />}
          />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}
function WrapElement({ route }) {
  return <>{route.page}</>;
}
export default App;
