import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { useState } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { toast } from "sonner";
import { userLogin } from "@/utils/api/auth/API-auth";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "@/redux/slices/LoginSlice";
import { useNavigate } from "react-router-dom";

interface OTPInputForSignupProps {
  signupData: {
    reset_key: string;
    email: string;
    password: string;
  };
  from: string;
}

const OnboardingOTPInput: React.FC<OTPInputForSignupProps> = ({
  signupData,
  from,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reset_key, email, password } = signupData || {};
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      if (value.length !== 6) {
        return setIsError(true);
      }
      if (reset_key === value) {
        const { access_token, refresh_token } = await userLogin(
          email,
          password,
        );
        localStorage.setItem("userAccessToken", access_token);
        localStorage.setItem("userRefreshToken", refresh_token);
        dispatch(setLoggedIn(true));
        toast.success("OTP Verified");
        setSuccess(true);
        navigate(from);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error submitting OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!signupData) {
    return null;
  }

  return (
    <>
      <Card className="mx-auto w-full bg-muted/40  py-3 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Verify OTP</CardTitle>
          <CardDescription>
            Enter the OTP number sent to your mobile number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP
            value={value}
            maxLength={6}
            onChange={(val) => {
              if (isError) setIsError(false);
              setValue(val);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {isError && (
            <p className="mt-3 px-1 text-sm text-red-500">
              Please enter correct OTP.
            </p>
          )}
        </CardContent>
        <CardFooter className="px-4">
          {isLoading ? (
            <Button className="w-[100px]">
              <Loader className="animate-spin" />
            </Button>
          ) : (
            !success && (
              <Button className="w-[100px]" onClick={handleVerify}>
                Verify OTP
              </Button>
            )
          )}
        </CardFooter>
      </Card>
      {success && (
        <Button className="w-full md:py-4 lg:py-6">
          Proceed <ArrowRight />
        </Button>
      )}
    </>
  );
};

export default OnboardingOTPInput;
