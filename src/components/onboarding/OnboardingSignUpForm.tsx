import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { OnboardingUserSignup } from "@/utils/api/onboarding/API-onboardingAuth";
import { toast } from "sonner";
import { Loader } from "lucide-react";
// import OnboardingOTPInput from "./OnboardingOTPInput";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { signupSchema } from "@/utils/validation";
import { SignFormValues, ValidateEmailResponse } from "@/types/signup-types";
import { validateEmail } from "@/utils/api/auth/API-auth";
import { FloatingLabelInput } from "../ui/floating-input-label";

const OnboardingSignupForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { from } = location?.state || { from: { pathname: "login" } };
  const navigate = useNavigate();
  console.log(from, "from");
  // const [signupData, setSignupData] = useState<{
  //   reset_key: string;
  //   email: string;
  //   password: string;
  // }>({
  //   reset_key: "",
  //   email: "",
  //   password: "",
  // });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignFormValues>({
    resolver: yupResolver(signupSchema),
  });

  const { mutateAsync: signupMutation, isPending } = useMutation({
    mutationFn: (data: SignFormValues) => OnboardingUserSignup(data),
    onError: (error: string | { password: string }) => {
      if (typeof error === "object") {
        setPasswordError(error.password);
        setEmailError("");
        setSignUpError(error.password);
        return;
      }

      setSignUpError(`${error}`);
      setPasswordError("");
      setEmailError("");

      toast.error("Error signing up", {
        description: `${error || "An error occurred"}`,
      });
    },
    onSuccess: (data, variables) => {
      // Set user data in redux
      const user = {
        id: variables.id,
        name: variables.fullname,
        company_name: variables.customer_company,
        qid: variables.id,
        email: variables.email,
        mobile: variables.mobile,
      };
      dispatch(setUser(user));
      toast.success("Signed up successfully");
      // setSignupData({
      //   reset_key: data.reset_key,
      //   email: variables.email,
      //   password: variables.password,
      // });
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
        setEmailError(data?.reason);
        return;
      }
      try {
        await signupMutation(variables);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    },
  });

  const onSubmit: SubmitHandler<SignFormValues> = useCallback(
    async (data: SignFormValues) => {
      try {
        await validateEmailMutation(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [validateEmailMutation],
  );

  const signupForm = useMemo(
    () => (
      <>
        <h2 className="mb-4 w-full text-left text-3xl font-semibold">
          Sign Up
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
          autoComplete="off"
        >
          <div className="grid gap-3">
            <FloatingLabelInput
              id="fullname"
              type="text"
              {...register("fullname")}
              label="Full Name"
            />
            <p className="px-1 text-xs text-red-500">
              {errors?.fullname?.message}
            </p>

            <FloatingLabelInput
              id="customer_company"
              type="text"
              {...register("customer_company")}
              label="Company Name"
            />
            <p className="px-1 text-xs text-red-500">
              {errors?.customer_company?.message}
            </p>

            <FloatingLabelInput
              id="email"
              type="email"
              label="Email Id"
              {...register("email")}
            />
            <p className="px-1 text-xs text-red-500">
              {emailError || errors?.email?.message}
            </p>

            <FloatingLabelInput
              id="id"
              type="number"
              {...register("id")}
              label="CR Number"
            />
            <p className="px-1 text-xs text-red-500">{errors?.id?.message}</p>

            <div className="flex w-full ">
              <span className="flex items-center justify-center rounded-l-lg border-y border-l bg-background px-2 text-sm">
                +966
              </span>
              <div className="flex-grow">
                <FloatingLabelInput
                  id="mobile"
                  type="number"
                  {...register("mobile")}
                  label="Phone Number"
                  className="w-full rounded-l-none border-y border-r"
                />
              </div>
            </div>
            <p className="px-1 text-xs text-red-500">
              {errors?.mobile?.message}
            </p>

            <FloatingLabelInput
              id="password"
              type="password"
              {...register("password")}
              label="Password"
            />
            <p className="px-1 text-xs text-red-500">
              {passwordError || errors?.password?.message}
            </p>

            <FloatingLabelInput
              id="confirm_password"
              type="password"
              {...register("confirm_password")}
              label="Confirm Password"
            />
            <p className="px-1 text-xs text-red-500">
              {errors?.confirm_password?.message}
            </p>

            <div className="flex items-center space-x-2">
              <FloatingLabelInput
                type="checkbox"
                id="terms"
                {...register("terms")}
                className="size-4 border-white bg-gray-900"
              />
              <label
                htmlFor="terms"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to receive information and updates about new products,
                services, promotions, benefits and rewards
              </label>
            </div>
            <p className="px-1 text-xs text-red-500">
              {errors?.terms?.message}
            </p>

            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90"
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Create an account"
              )}
            </Button>

            {signUpError && (
              <div className="border-l-4 border-red-500 pl-3 text-left text-sm font-semibold text-red-500  ">
                {signUpError}
              </div>
            )}
          </div>
        </form>
        <div className="mt-4 text-center font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ from }}
            className="underline"
            replace={true}
          >
            Login
          </Link>
        </div>
      </>
    ),
    [handleSubmit, onSubmit, register, errors, isPending, from, signUpError, emailError, passwordError],
  );

  return <>{signupForm}</>;
};

export default OnboardingSignupForm;
