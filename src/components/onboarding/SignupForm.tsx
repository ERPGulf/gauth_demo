import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { userSignup, validateEmail } from "@/utils/api/auth/API-auth";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { signupSchema } from "@/utils/validation";
import { SignFormValues, ValidateEmailResponse } from "@/types/signup-types";
import { useState } from "react";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from;

  const [emailError, setEmailError] = useState("");

  const { mutateAsync: signupMutation, isPending } = useMutation({
    mutationFn: (data: SignFormValues) => userSignup(data),
    onError: (error) => {
      console.log(error);
      const errorMsg = error.toString();
      toast.error("Error signing up", {
        description: errorMsg,
      });
    },
    onSuccess: async (data, variables) => {
      toast.success("Signed up successfully");
      console.log(variables);
      const user = {
        id: variables.id,
        name: variables.fullname,
        qid: variables.id,
        company_name: variables.customer_company,
        email: variables.email,
        mobile: variables.mobile,
      };
      dispatch(setUser(user));
      navigate("/otp-verify", {
        state: {
          reset_key: data.reset_key,
          email: variables.email,
          password: variables.password,
          from: from,
        },
      });
    },
  });

  const { mutateAsync: validateEmailMutation } = useMutation({
    mutationFn: (data: SignFormValues) => validateEmail(data.email),
    onError: (error) => {
      console.error("Error", error);
      toast.error("Error", {
        description: `${error}`,
      });
    },
    onSuccess: async (
      data: ValidateEmailResponse,
      variables: SignFormValues,
    ) => {
      if (data?.blocked) {
        setEmailError(data.reason);
        return;
      }
      try {
        await signupMutation(variables);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<SignFormValues> = async (
    data: SignFormValues,
  ) => {
    try {
      await validateEmailMutation(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-md bg-muted/40 shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname" type="text" {...register("fullname")} />
              <p className="px-1 text-xs text-red-500">
                {errors?.fullname?.message}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="customer_company">Company Name</Label>
              <Input
                id="customer_company"
                type="text"
                {...register("customer_company")}
              />
              <p className="px-1 text-xs text-red-500">
                {errors?.customer_company?.message}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="id">CR Number</Label>
              <Input id="id" type="text" {...register("id")} />
              <p className="px-1 text-xs text-red-500">{errors?.id?.message}</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              <p className="px-1 text-xs text-red-500">
                {emailError || errors?.email?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile</Label>
              <div className="flex">
                <span className="flex items-center justify-center rounded-l-lg border-y border-l bg-background px-2 text-sm">
                  +966
                </span>
                <Input
                  id="mobile"
                  type="text"
                  {...register("mobile")}
                  className="rounded-l-none border-y border-r"
                />
              </div>
              <p className="px-1 text-xs text-red-500">
                {errors?.mobile?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              <p className="px-1 text-xs text-red-500">
                {errors?.password?.message}
              </p>
            </div>
            {isPending ? (
              <Button>
                <Loader className="animate-spin" />
              </Button>
            ) : (
              <Button disabled={isPending} type="submit" className="w-full">
                Create an account
              </Button>
            )}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" state={{ from }} className="underline">
            login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
