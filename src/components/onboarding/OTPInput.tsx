import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  // InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { updateUserPassword, userLogin } from "@/utils/api/auth/API-auth";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "@/redux/slices/LoginSlice";

const OTPInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password, from } = location?.state || {
    email: "",
    password: "",
  };

  const [resetKey, setResetKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleVerify = async () => {
    // Start loading and reset error state before verification begins
    setIsLoading(true);
    setIsError(false);
    console.log(resetKey);
    try {
      // Check if OTP length is valid
      if (resetKey.length !== 6) {
        toast.error("OTP must be 6 digits.");
        return setIsError(true); // Trigger error if OTP is incomplete
      }

      // Await login and handle tokens
      await updateUserPassword(resetKey, password, email);
      // console.log(email, password, "email, password");

      const {
        token: { access_token, refresh_token },
      } = await userLogin(email, password);

      localStorage.setItem("userAccessToken", access_token);
      localStorage.setItem("userRefreshToken", refresh_token);
      dispatch(setLoggedIn(true));

      toast.success("OTP Verified");
      navigate(from || "/");
    } catch (error) {
      console.error("Error submitting OTP:", error);
      setIsError(true);
      toast.error("There was an error verifying the OTP. Please try again.");
    } finally {
      // Always stop loading after operation
      setIsLoading(false);
    }
  };

  // Redirect user if location state is not present
  if (!location.state) {
    return <Navigate to={"/signup"} />;
  }

  return (
    <Card className="mx-auto flex flex-col items-center justify-center space-y-4 bg-muted/40 py-3 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-xl">Verify OTP</CardTitle>
        <CardDescription className=" text-center">
          OTP sent to your email{" "}
          <span className="font-bold">
            {email[0]}
            {email[1]}
            {email[2]}***@{email.slice(-10)}
          </span>
          . <br />
          Please enter your OTP in the space provided below.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex w-[500px] items-center justify-center ">
        <InputOTP
          value={resetKey}
          maxLength={6}
          onChange={(val) => {
            if (isError) setIsError(false); // Clear error on new input
            setResetKey(val);
          }}
        >
          <InputOTPGroup className="flex gap-x-4">
            <InputOTPSlot
              index={0}
              className="size-12 rounded first:rounded-l"
            />
            <InputOTPSlot index={1} className="size-12 rounded border" />

            <InputOTPSlot index={2} className="size-12 rounded border" />
            <InputOTPSlot index={3} className="size-12 rounded border" />

            <InputOTPSlot index={4} className="size-12 rounded border" />
            <InputOTPSlot
              index={5}
              className="size-12 rounded  border last:rounded-r"
            />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>

      {/* Display error message when OTP is incorrect */}
      {isError && (
        <p className="mt-3 px-1 text-sm text-red-500">
          OTP is incorrect or have expired. Please try again.
        </p>
      )}

      <CardFooter className="px-4">
        <Button
          className="w-[100px]"
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? <Loader className="animate-spin" /> : "Verify"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OTPInput;
