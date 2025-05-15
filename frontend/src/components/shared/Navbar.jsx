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
  const { data, isLoading, refetch } = useLoadUserQuery();
  const user = data?.user;
  const role = user?.role;

  const [logoutUser, { isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User is logged out");
      refetch(); // ensure latest user data is fetched
      navigate("/login");
    }
  }, [isSuccess]);

  const memberLinks = [
    { name: "Home", to: "/" },
    { name: "Explore", to: "/document/explore" },
    { name: "Collab", to: "/document/collab" },
    { name: "Feedback", to: "/document/user-feedback" },
  ];

  const allLinks = [
    ...memberLinks,
    { name: "Team", to: "/teams" },
    { name: "Document", to: "/document" },
    // { name: "Feedback", to: "user-feedback" },
  ];

  const displayLinks = role === "member" ? memberLinks : allLinks;

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="flex justify-between items-center px-11 shadow-lg shadow-gray-300 fixed top-0 w-full z-20 bg-white">
        <div className="flex items-center justify-center mr-4 p-4">
          <img src="/logonew.png" alt="logo" className="w-10" />
          <h1 className="text-3xl font-bold text-orange-600">TeamScript</h1>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          {user &&
            displayLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="cursor-pointer hover:underline"
              >
                {link.name}
              </Link>
            ))}

          {!user ? (
            <div className="flex flex-row gap-6">
              <Link to="/login" className="hover:underline">
                SignUp
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.email === "adminDashboard@gmail.com" && (
                  <>
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/user-suggestion">Suggestions</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>

      {/* Mobile Navbar Sheet */}
      <nav className="fixed right-0 top-7 px-7 z-20">
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <div>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer mt-20 ml-4">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.email === "adminDashboard@gmail.com" && (
                      <DropdownMenuItem>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/user-suggestion">Suggestions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex flex-col gap-4 mt-20 ml-4">
                  <Link to="/login" className="hover:underline">
                    SignUp
                  </Link>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                </div>
              )}
            </div>

            {user && (
              <div className="flex flex-col gap-4 px-5 mt-6">
                {displayLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="cursor-pointer hover:underline"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Navbar;
