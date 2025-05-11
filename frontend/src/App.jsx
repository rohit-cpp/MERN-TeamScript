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
import FullPageEditor from "./components/shared/FullPageEditor";
import VersionLayout from "./pages/versionPage/VersionLayout";
import CreateVersion from "./pages/versionPage/VersionCreate";
import VersionList from "./pages/versionPage/VersionList";
import ViewVersion from "./pages/versionPage/VersionView";
import EditVersion from "./pages/versionPage/VersionEdit";
import Explore from "./pages/explore/Explore";
import ExploreDocumentDetail from "./pages/explore/DocumentDetail";
import UserSuggestionList from "./pages/suggestionPage/UserSuggestion";
import CollaborativeEditor from "./pages/collaborativeEditor/CollaborativeEditor";
import ProtectedRoute from "./components/shared/ProtectedRoutes";
import AdminSuggestionManager from "./pages/suggestionPage/AdminSuggestion";

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
    path: "/document/explore",
    element: <Explore />,
  },
  {
    path: "/document/:id",
    element: <ExploreDocumentDetail />,
  },
  {
    path: "/user-suggestion",
    element: <UserSuggestionList />,
  },
  {
    path: "/admin/suggestions/:documentId",
    element: <AdminSuggestionManager />,
  },
  {
    path: "/document",
    element: <ProtectedRoute />,
    children: [
      {
        path: "collab",
        element: <CollaborativeEditor />,
      },
    ],
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
        path: "edit-content", // Default content for /document
        element: <FullPageEditor />,
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
    path: "/versions/:documentId",
    element: <VersionLayout />,
    children: [
      // {
      //   path: "",
      //   element: <CreateVersion />,
      // },
      {
        path: "create",
        element: <CreateVersion />,
      },
      {
        path: "versionlist",
        element: <VersionList />,
      },
      {
        path: "view/:versionId",
        element: <ViewVersion />,
      },
      {
        path: "edit/:versionId",
        element: <EditVersion />,
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
