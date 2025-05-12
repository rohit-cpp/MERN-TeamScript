import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoadUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/store/api/authApi";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const { refetch: refetchUser } = useLoadUserQuery();
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleAuth = async (type) => {
    const input = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;

    try {
      const res = await action(input).unwrap();
      toast.success(res?.message || `${type} successful`);
      await refetchUser();

      if (res?.user?.email === "adminDashboard@gmail.com") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || `${type} failed`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-extrabold text-cyan-700 tracking-tight">
          TeamScript
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Empowering teams to collaborate smarter
        </p>
      </div>

      <Tabs defaultValue="signup" className="w-full max-w-md">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        {/* Sign Up Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-orange-600 font-bold">
                Create Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                name="name"
                placeholder="Name"
                value={signupInput.name}
                onChange={(e) => changeInputHandler(e, "signup")}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={signupInput.email}
                onChange={(e) => changeInputHandler(e, "signup")}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={signupInput.password}
                onChange={(e) => changeInputHandler(e, "signup")}
              />
              <Select
                value={signupInput.role}
                onValueChange={(val) =>
                  setSignupInput((prev) => ({ ...prev, role: val }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isRegistering}
                onClick={() => handleAuth("signup")}
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Please wait...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-orange-600 font-bold">
                Welcome Back
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={loginInput.email}
                onChange={(e) => changeInputHandler(e, "login")}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={loginInput.password}
                onChange={(e) => changeInputHandler(e, "login")}
              />
              <Select
                value={loginInput.role}
                onValueChange={(val) =>
                  setLoginInput((prev) => ({ ...prev, role: val }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isLoggingIn}
                onClick={() => handleAuth("login")}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
