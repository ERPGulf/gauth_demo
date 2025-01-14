import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { selectLogin } from "@/redux/slices/LoginSlice";
import { toast } from "sonner";

const LoginOnboarding = () => {
  const navigate = useNavigate();
  const { email } = useSelector(selectUser);
  const isLoggedIn = useSelector(selectLogin);
  const handleSignin = () => {
    if (isLoggedIn) {
      toast.info("You are already logged in", {
        description: "You are logged in with this email:" + email,
      });
      return;
    }
    navigate("/login", {
      state: {
        from: "/onboarding",
      },
    });
  };
  return (
    <div className="mt-auto flex w-full flex-col items-center space-y-3">
      <Link className="text-base font-bold text-gray-500" to={"/policy-view"}>
        Policy wording
      </Link>
      <Separator className="h-[1px] w-full bg-gray-300" />
      <Button
        onClick={handleSignin}
        variant={"secondary"}
        className="h-14 w-full text-lg font-bold"
      >
        Sign In
      </Button>
      <Button
        onClick={() => navigate("/pricing")}
        className="h-14 w-full bg-gray-500 text-lg font-bold hover:bg-gray-600"
      >
        Learn More
      </Button>
    </div>
  );
};

export default LoginOnboarding;
