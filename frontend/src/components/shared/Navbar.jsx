import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // const navigate = useNavigate();
  const user = true;
  return (
    <div>
      <nav className="flex justify-between items-center px-18 shadow-lg shadow-gray-300 fixed top-0 w-full z-20">
        <div className="flex items-center justify-center mr-4 p-4">
          <img src="/public/logonew.png" alt="logo" className="w-10" />
          <h1 className="text-3xl font-bold text-orange-600">TeamScript</h1>
        </div>
        <div className="hidden md:flex gap-6 items-center ">
          <Link to="/" className="cursor-pointer hover:underline">
            Home
          </Link>
          <Link className="cursor-pointer hover:underline">Features</Link>
          <Link className="cursor-pointer hover:underline">Team</Link>
          {/* <a href="#login" className="hover:underline">
          Login
        </a> */}
          <div>
            {" "}
            {user ? (
              <DropdownMenu>
                {/* <DropdownMenuTrigger>Open</DropdownMenuTrigger> */}
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Editor</DropdownMenuItem>
                  <DropdownMenuItem>Verions</DropdownMenuItem>
                  <DropdownMenuItem>Suggestion</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {" "}
                <div className="flex flex-row gap-6">
                  <Link className="hover:underline">SignUp</Link>
                  <Link className="hover:underline">Login</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="fixed right-0 top-7 px-7 z-20">
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-10 px-5">
              <Link className="hover:underline">Features</Link>
              <Link to={"/team"} className="hover:underline">
                Team
              </Link>
              {/* <a href="#login">Login</a> */}
              <div>
                {" "}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    {" "}
                    <div className="flex flex-col gap-4 ">
                      <Link className="hover:underline">SignUp</Link>
                      <Link className="hover:underline">Login</Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Navbar;
