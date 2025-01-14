// import SignupForm from "@/components/onboarding/SignupForm";
import { usePageTitle } from "@/hooks/usePageTitle";
import ThemeToggle from "@/components/ThemeToggle";
import OnboardingSignupForm from "@/components/onboarding/OnboardingSignUpForm";

const Signup = () => {
  usePageTitle("Signup");
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center dark:bg-primary">
      <div className="absolute right-10 top-10">
        <ThemeToggle />
      </div>
      <div className="m-3 flex flex-col justify-center rounded-2xl border bg-muted p-8">
        <OnboardingSignupForm />
      </div>
    </div>
  );
};

export default Signup;
