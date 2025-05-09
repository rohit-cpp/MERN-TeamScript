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
import { useLoadUserQuery, useLogoutUserMutation } from "@/store/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const { data, isLoading } = useLoadUserQuery();

  // const user = data;
  const user = data && data?.user;
  const [logoutUser, { data: logoutData, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User is logged out");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div>
      <nav className="flex justify-between items-center px-11 shadow-lg shadow-gray-300 fixed top-0 w-full z-20">
        <div className="flex items-center justify-center mr-4 p-4">
          <img src="/public/logonew.png" alt="logo" className="w-10" />
          <h1 className="text-3xl font-bold text-orange-600">TeamScript</h1>
        </div>
        <div className="hidden md:flex gap-6 items-center ">
          <Link to="/" className="cursor-pointer hover:underline">
            Home
          </Link>

          <Link to="/teams" className="cursor-pointer hover:underline">
            Team
          </Link>
          <Link to="/document" className="cursor-pointer hover:underline">
            Document
          </Link>
          <Link to="/document/explore" className="hover:underline ">
            Explore
          </Link>
          {/* <Link
            to={`/versions/${documentId}`}
            className="cursor-pointer hover:underline"
          >
            Version
          </Link> */}
          {/* <a href="#login" className="hover:underline">
          Login
        </a> */}
          <div>
            {" "}
            {user ? (
              <DropdownMenu>
                {/* <DropdownMenuTrigger>Open</DropdownMenuTrigger> */}
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="/teams">Team</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Editor</DropdownMenuItem>
                  <DropdownMenuItem>Verions</DropdownMenuItem>
                  <DropdownMenuItem>Suggestion</DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {" "}
                <div className="flex flex-row gap-6">
                  <Link to="/login" className="hover:underline">
                    SignUp
                  </Link>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
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
