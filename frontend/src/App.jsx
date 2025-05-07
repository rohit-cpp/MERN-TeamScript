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
import DocumentEditor from "./pages/documentPage/DocumentEditor";
import TeamPage from "./pages/teamPage/team";
import TeamDetails from "./pages/teamPage/AllTeamDetails";
import CreateTeam from "./pages/teamPage/CreateTeamFormSection";
import MyTeams from "./pages/teamPage/AllTeamDetails";
import AddMemberToTeam from "./pages/teamPage/AddMember";
import SingleTeamDetails from "./pages/teamPage/SingleTeamDetails";

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
    path: "/teams",
    children: [
      {
        index: true,
        element: <TeamPage />,
      },
      {
        path: "create",
        element: <CreateTeam />,
      },
      {
        path: "my-teams",
        element: <MyTeams />,
      },
      {
        path: ":id",
        element: <SingleTeamDetails />,
      },
      {
        path: "add-member",
        element: <AddMemberToTeam />,
      },
    ],
  },
  {
    path: "/editor",
    element: <DocumentEditor />,
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
