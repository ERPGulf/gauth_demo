import OnboardingSignUpForm from "@/components/onboarding/OnboardingSignUpForm";
import { setProgress } from "@/redux/slices/ProgressSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const OnboardingSignUp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProgress(75));
  }, [dispatch]);

  return <OnboardingSignUpForm />;
};

export default OnboardingSignUp;
