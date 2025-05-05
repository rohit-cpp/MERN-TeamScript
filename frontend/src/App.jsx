import React from "react";
import Login from "./pages/auth/login";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/HomePage/Home";

const App = () => {
  return (
    <div>
      <div>
        <Home />
        {/* <Login /> */}
      </div>
    </div>
  );
};

export default App;
