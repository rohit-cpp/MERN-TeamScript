import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/sonner";
import { useLoadUserQuery } from "./store/api/authApi";
const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return (
    <>
      {isLoading ? (
        <h1 className="text-5xl text-center mt-30 font-medium text-cyan-800">
          Loading... Please wait
        </h1>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Custom>
      <App />
      <Toaster />
    </Custom>
    <Toaster />
  </Provider>
);
