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

import TeamPage from "./pages/teamPage/team";
import TeamDetails from "./pages/teamPage/AllTeamDetails";
import CreateTeam from "./pages/teamPage/CreateTeamFormSection";
import MyTeams from "./pages/teamPage/AllTeamDetails";
import AddMemberToTeam from "./pages/teamPage/AddMember";
import SingleTeamDetails from "./pages/teamPage/SingleTeamDetails";
import TeamDashboardLayout from "./pages/teamPage/TeamDashboardLayout";
import DocumentEditor from "./pages/documentPage/DocumentEditor";
import DocumentDetail from "./pages/documentPage/DocumentDetail";
import DocumentLayout from "./pages/documentPage/DocumentLayout";
import DocumentListWrapper from "./pages/documentPage/DocumentListWrapper";
import DocumentManager from "./pages/documentPage/DocumentManager";
import DocumentForm from "./pages/documentPage/DocumentForm";
import DocumentFormPage from "./pages/documentPage/DocumentFormPage";

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
    path: "/document",
    element: <DocumentLayout />, // This is the wrapper with <Outlet />
    children: [
      {
        path: "", // Default content for /document
        element: <DocumentFormPage />,
      },
      {
        path: "detail/:id", // View single document
        element: <DocumentDetail />,
      },
      {
        path: "manage/:teamId",
        element: <DocumentManager />,
      },
    ],
  },
  {
    path: "/teams",
    element: <TeamDashboardLayout />,
    children: [
      {
        path: "",
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
