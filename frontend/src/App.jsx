import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Home from "./pages/HomePage/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSuggestions from "./pages/admin/AdminSuggestions";
import AdminAi from "./pages/admin/AdminAi";
import AdminRecent from "./pages/admin/AdminRecent";
import AdminComment from "./pages/admin/AdminComment";
import Profile from "./pages/profilePage/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "", // default landing content
        element: (
          <div className="flex-1 p-6 mt-16 md:mt-1">
            <h1 className="text-5xl font-semibold text-gray-700">
              Welcome to the Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Select an option from the menu to manage your workspace.
            </p>
          </div>
        ),
      },
      {
        path: "documents",
        element: <AdminDocuments />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "suggestions",
        element: <AdminSuggestions />,
      },
      {
        path: "ai",
        element: <AdminAi />,
      },
      {
        path: "recent",
        element: <AdminRecent />,
      },
      {
        path: "comments",
        element: <AdminComment />,
      },
    ],
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
};

export default App;
