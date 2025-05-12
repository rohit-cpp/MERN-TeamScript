import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Home, PlusCircle, Users, UserPlus, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";

const links = [
  { name: "Overview", to: "/teams/teams", icon: Home },
  { name: "Create Team", to: "/teams/create", icon: PlusCircle },
  { name: "My Teams", to: "/teams/my-teams", icon: Users },
  { name: "Add Member", to: "/teams/add-member", icon: UserPlus },
];

export default function TeamDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-background text-foreground mt-20">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-lg font-semibold">Team Dashboard</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <aside
            className={cn(
              "w-full md:w-64 bg-muted/40 border-r p-4 md:block",
              sidebarOpen ? "block" : "hidden md:block"
            )}
          >
            <Card className="h-full p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-center mb-4">
                Team Dashboard
              </h2>
              <Separator className="mb-4" />
              <ScrollArea className="h-full">
                <nav className="space-y-1">
                  {links.map(({ name, to, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium",
                          isActive ? "bg-cyan-800 text-white" : "hover:bg-muted"
                        )
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span>{name}</span>
                    </NavLink>
                  ))}
                </nav>
              </ScrollArea>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
