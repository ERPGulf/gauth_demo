import OTPInput from "@/components/onboarding/OTPInput";
import { usePageTitle } from "@/hooks/usePageTitle";
import ThemeToggle from "@/components/ThemeToggle";

const OTPverify = () => {
  usePageTitle("OTP Verify");
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center ">
      <div className="absolute right-10 top-10">
        <ThemeToggle />
      </div>
      <div>
        <OTPInput />
      </div>
    </div>
  );
};

export default OTPverify;
