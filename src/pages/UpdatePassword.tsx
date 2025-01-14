import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateUserPassword } from "@/utils/api/auth/API-auth";
import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  resetKey: yup.string().required("Please enter your reset key"),
  password: yup.string().required("Please enter your password"),
  confirmPassword: yup
    .string()
    .required("Please enter your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const UpdatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>("");

  const { email } = location?.state

  const { mutateAsync: updatePassword, isPending: validatePending } =
    useMutation({
      mutationFn: ({
        resetKey,
        password,
      }: {
        resetKey: string;
        password: string;
        email: string;
      }) => updateUserPassword(resetKey, password, email),
      onSuccess: () => {
        navigate("/login");
        toast.success("Password updated successfully");
      },
      onError: () => {
        setError("Reset key not valid or expired");
      },
      retry: 0,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ resetKey: string; password: string }> = (
    data,
  ) => {
    updatePassword({
      resetKey: data.resetKey,
      password: data.password,
      email: email,
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full md:w-1/3">
        <CardHeader>
          <CardTitle className="text-2xl">Enter your new password</CardTitle>
          <CardDescription>
            Enter the reset key sent to your email and your new password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="resetKey">Reset Key</Label>
              <Input
                type="text"
                id="resetKey"
                placeholder="Enter your reset key"
                {...register("resetKey")}
                className={`mt-1 ${errors.resetKey ? "border-red-500" : "mb-3"}`}
              />
              <p className="mb-2 text-sm text-red-500">
                {errors.resetKey?.message}
              </p>

              <Label htmlFor="password">New Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your new password"
                {...register("password")}
                className={`mt-1 ${errors.password ? "border-red-500" : "mb-3"}`}
              />
              <p className="mb-4 text-sm text-red-500">
                {errors.password?.message}
              </p>

              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={`mt-1 ${errors.confirmPassword ? "border-red-500" : "mb-4"}`}
              />
              <p className="text-sm text-red-500">
                {errors.confirmPassword?.message}
              </p>

              {error && (
                <p className="mt-5 border-l-4 border-red-500 pl-3 text-left text-sm font-semibold text-red-500">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={validatePending}
              >
                {validatePending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
              <div className="mt-4">
                <Link to="/login" className="text-blue-500">
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePassword;
