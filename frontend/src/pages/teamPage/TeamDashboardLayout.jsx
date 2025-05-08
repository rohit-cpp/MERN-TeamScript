import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Home, PlusCircle, Users, UserPlus, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/shared/Navbar";

const links = [
  { name: "Overview", to: "/teams", icon: Home },
  { name: "Create Team", to: "/teams/create", icon: PlusCircle },
  { name: "My Teams", to: "/teams/my-teams", icon: Users },
  //   { name: "Single Teams", to: "/teams/my-teams", icon: Users },
  { name: "Add Member", to: "/teams/add-member", icon: UserPlus },
];

export default function TeamDashboardLayout() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex min-h-screen mt-19">
        <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 border-r">
          <h2 className="text-2xl font-bold text-center mb-6">
            Team Dashboard
          </h2>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <nav className="space-y-2">
              {links.map(({ name, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-800"
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </NavLink>
              ))}
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 p-6 bg-white dark:bg-gray-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
