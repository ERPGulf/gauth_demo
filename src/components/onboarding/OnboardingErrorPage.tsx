import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const OnboardingErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-fit w-11/12 flex-col items-center justify-center space-y-8 md:w-[525px] ">
      <div className="flex min-h-[650px] w-full flex-col items-center space-y-4 rounded-3xl  bg-transparent px-6 py-7 shadow-sm md:px-14">
        <h2 className="mt-48 text-2xl font-medium text-primary">
          Something went wrong
        </h2>
        <p className="text-sm text-primary/90">
          Sorry, something went wrong. Please try again later.
        </p>
        <Button onClick={() => navigate("/")} size={"lg"} variant={"secondary"}>
          Go back to home
        </Button>
      </div>
    </div>
  );
};

export default OnboardingErrorPage;
