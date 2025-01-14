import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/utils/api/auth/API-auth";
import { LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "@/redux/slices/LoginSlice";
import { setUser } from "@/redux/slices/userSlice";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Get the previous route from window history
  const from = location.state?.from || "/";
  console.log(from, "from");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      userLogin(email, password),
    onSuccess: (result, variables) => {
      // Save the token in local storage
      localStorage.setItem("userAccessToken", result.token.access_token);
      localStorage.setItem("userRefreshToken", result.token.refresh_token);
      dispatch(setLoggedIn(true));

      // Save user data in redux store
      const userData = result.user;
      dispatch(
        setUser({
          id: userData.id,
          name: userData.name,
          company_name: userData.company,
          qid: userData.qid,
          email: variables.email,
          mobile: userData.mobile,
        }),
      );
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    },
    onError: () => {
      setError("Email or password incorrect.");
    },
    retry: 0,
  });
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      await login({ email, password });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Card className="z-50 mx-auto w-[550px] max-w-sm rounded-3xl bg-muted shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl ">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          <div className="grid gap-3">
            <Label htmlFor="email" className="font-bold ">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password" className="font-bold">
                Password
              </Label>
              <a
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="border-l-4 border-red-500 pl-3 text-left text-sm font-semibold text-red-500  ">
              {error}
            </div>
          )}

          {isPending ? (
            <Button className="w-full">
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              className="w-full bg-secondary hover:bg-secondary/90"
            >
              Login
            </Button>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            state={{
              from,
            }}
            className="underline"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
