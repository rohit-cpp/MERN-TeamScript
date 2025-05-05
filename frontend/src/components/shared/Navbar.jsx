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

const Navbar = () => {
  const user = false;
  return (
    <div>
      <nav className="flex justify-between items-center px-18">
        <div className="flex items-center">
          <img src="logo.png" alt="logo" className="w-18" />
          <h1 className="text-3xl font-bold text-orange-600">TeamScript</h1>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <a href="#features" className="hover:underline">
            Features
          </a>
          <a href="#team" className="hover:underline">
            Team
          </a>
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
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {" "}
                <div className="flex flex-row gap-6 ">
                  <a href="#signup" className="hover:underline">
                    SignUp
                  </a>
                  <a href="#login" className="hover:underline">
                    Login
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="fixed right-0 top-7 px-7">
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-10 px-5">
              <a href="#features" className="hover:underline">
                Features
              </a>
              <a href="#team" className="hover:underline">
                Team
              </a>
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
                      <a href="#signup" className="hover:underline">
                        SignUp
                      </a>
                      <a href="#login" className="hover:underline">
                        Login
                      </a>
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
