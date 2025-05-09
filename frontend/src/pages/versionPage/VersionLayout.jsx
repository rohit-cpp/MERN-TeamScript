import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useParams } from "react-router-dom";

export default function VersionLayout() {
  const { documentId } = useParams();

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-18">
        <h1 className="text-3xl font-bold mb-4">Version Manager</h1>
        <nav className="flex gap-4 border-b pb-2 mb-6">
          <Button asChild variant="link">
            <Link to="create">Create Version</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="versionlist">All Versions</Link>
          </Button>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
