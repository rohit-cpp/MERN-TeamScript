import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Documents", path: "/admin/dashboard/documents" },
  { name: "Users", path: "/admin/dashboard/users" },
  // { name: "Suggestions", path: "/admin/dashboard/all" },
  // { name: "AI", path: "/admin/dashboard/ai" },
  { name: "Recent Activities", path: "/admin/dashboard/recent" },
  // { name: "Comments", path: "/admin/dashboard/comments" },
];

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-[220px] bg-white border-r shadow-sm h-screen sticky top-0 p-6 mt-18">
          <h2 className="text-2xl font-bold text-cyan-700 mb-6">Admin Panel</h2>
          <div className="flex flex-col gap-3">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium transition",
                  location.pathname === link.path
                    ? "bg-cyan-100 text-cyan-700"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </aside>
        {/* Mobile Sheet Menu */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[220px] bg-white">
              <div className="mt-10">
                <h2 className="text-lg font-bold text-cyan-700 mb-4">
                  Admin Menu
                </h2>
                <div className="flex flex-col gap-3">
                  {navLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.path}
                      className={cn(
                        "block px-4 py-2 rounded-md text-sm font-medium transition",
                        location.pathname === link.path
                          ? "bg-cyan-100 text-cyan-700"
                          : "hover:bg-gray-100 text-gray-700"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* {/* Main Content */}
        <main className="flex-1 p-6 mt-16 md:mt-20 ">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
