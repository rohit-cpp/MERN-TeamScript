import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/store/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData?.message || "Signup successful");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup failed");
    }
  }, [registerIsSuccess, registerData, registerError]);

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "Login successful");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login failed");
    }
  }, [loginIsSuccess, loginData, loginError]);

  return (
    <div>
      <div className="text-center text-4xl text-yellow-700 py-8">
        <span className="text-8xl text-cyan-700 font-bold">TeamScript</span>
      </div>
      <div className="flex items-center w-full justify-center">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">SignUp</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-5xl text-center font-bold text-orange-600">
                  SignUp
                </CardTitle>
                <CardDescription>
                  {/* Create your new Account. Click SignUp when your done. */}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {/* <Label htmlFor="name">Name</Label> */}
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Enter your name"
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  {/* <Label htmlFor="username">Email</Label> */}
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Enter your email"
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  {/* <Label htmlFor="password">Password</Label> */}
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Enter your password"
                    required="true"
                  />
                </div>
                <div>
                  <Select
                    value={signupInput.role}
                    onValueChange={(value) =>
                      setSignupInput((prev) => ({ ...prev, role: value }))
                    }
                    required="true"
                  >
                    {/* <Label htmlFor="role">Select Your role</Label> */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="member">member</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                  className="w-full bg-orange-600 cursor-pointer"
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                      Please wait
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-5xl font-bold text-center text-orange-600">
                  Login
                </CardTitle>
                <CardDescription>
                  {/* Login your password here. After SignUp you will be LoggedIn */}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {/* <Label htmlFor="current">Email</Label> */}
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="Enter your email"
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  {/* <Label htmlFor="new">Password</Label> */}
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="Enter your password"
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  <Select
                    value={loginInput.role}
                    onValueChange={(value) =>
                      setLoginInput((prev) => ({ ...prev, role: value }))
                    }
                  >
                    {/* <Label htmlFor="role">Select Your role</Label> */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="member">member</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                  className="bg-orange-600 w-full cursor-pointer"
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
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
    </div>
  );
};
export default Login;
