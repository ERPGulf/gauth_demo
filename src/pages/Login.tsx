import LoginForm from "@/components/LoginForm";
import { usePageTitle } from "@/hooks/usePageTitle";
import ThemeToggle from "@/components/ThemeToggle";
// import Swirl01 from "@/assets/Swril01.svg";
import LogoDark from "@/assets/Claudion Reverse Logo-DARK.png";
import LogoLight from "@/assets/Claudion Main Logo-LIGHT.png";
import swirl from "@/assets/Swerl.svg";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  usePageTitle("Login");
  const { theme } = useTheme();
  const _logo = theme === "light" ? LogoLight : LogoDark;
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center dark:bg-primary">
      <div className="absolute right-10 top-10">
        <ThemeToggle />
      </div>
      <div className="absolute top-1/2 -translate-y-2/3">
        <div className="relative flex min-h-40 w-11/12 items-center justify-center md:w-[525px]">
          {/* <img
            src={Swirl01}
            alt="swirl"
            className="absolute top-0 h-[180px] min-w-[900px] object-cover"
          /> */}
          <img
            src={swirl}
            alt="logo"
            className="absolute left-36 -z-10 min-w-[900px] -translate-x-1/2"
          />
          {/* <img
            src={_logo}
            alt="logo"
            className="absolute left-10 size-40 object-contain"
          /> */}
          <img
            src={_logo}
            alt="logo"
            className="absolute left-1/2 size-44 -translate-x-1/2 object-contain md:left-32"
          />
          <Button
            onClick={handleGoBack}
            variant={"ghost"}
            className="absolute -left-5 top-16"
            size={"icon"}
          >
            <ArrowLeft className="text-primary-foreground" />
          </Button>
          <div className="absolute right-0 md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
