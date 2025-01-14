import { Outlet, useNavigate } from "react-router-dom";
import LogoDark from "@/assets/Claudion Reverse Logo-DARK.png";
import LogoLight from "@/assets/Claudion Main Logo-LIGHT.png";
import swirl from "@/assets/Swerl.svg";
import { Progress } from "@/components/ui/progress";
import { getOnboardingPages } from "@/utils/api/onboarding/API-onboarding";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardPages } from "@/redux/slices/OnboardPagesSlice";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import ThemeToggle from "@/components/ThemeToggle";
import OnboardingSkeleton from "@/components/Skeltons/OnboardingSkeleton";
import OnboardingErrorPage from "@/components/onboarding/OnboardingErrorPage";
import { useEffect } from "react";
import { selectProgress } from "@/redux/slices/ProgressSlice";
import { useTheme } from "@/components/theme-provider";
import { MoveLeft } from "lucide-react";
const _onboardingLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  usePageTitle("Onboarding");
  const progress = useSelector(selectProgress);

  const { theme } = useTheme();
  const _logo = theme === "dark" ? LogoDark : LogoLight;

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["onboardingPages"],
    queryFn: getOnboardingPages,
  });
  useEffect(() => {
    if (isSuccess && !isLoading) {
      dispatch(setOnboardPages(data));
    }
  }, [isSuccess, isLoading, data, dispatch]);

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <main className="no_scrollbar flex h-screen w-screen flex-1 flex-col items-center gap-4 overflow-y-scroll bg-white py-10 dark:bg-primary">
      <div className="absolute right-10 top-10 z-20 hidden md:block">
        <ThemeToggle />
      </div>
      <div className="relative flex min-h-28 w-11/12 items-center justify-center md:w-[525px]">
        {/* swirl */}
        <img
          src={swirl}
          alt="logo"
          className="absolute left-36 -z-0 min-w-[900px] -translate-x-1/2"
        />
        {/* logo */}
        <img
          src={_logo}
          alt="logo"
          className="absolute left-1/2 size-44 -translate-x-1/2 object-contain md:left-32"
        />
        <Button
          onClick={handleGoBack}
          variant={"ghost"}
          className="absolute -left-5 top-1/2 -translate-y-1/2"
          size={"icon"}
        >
          <MoveLeft
            className="text-black dark:text-primary-foreground"
            style={{
              width: "32px",
              height: "32px",
            }}
          />
        </Button>
        <div className="absolute right-0 md:hidden">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex h-fit w-11/12 flex-col items-center justify-center space-y-8 md:w-[600px] ">
        <div className="z-30 flex min-h-[650px] w-full flex-col items-center space-y-6 rounded-3xl bg-gray-100 px-6 py-12 shadow-sm dark:bg-gray-200 md:px-8">
          {isError && <OnboardingErrorPage />}
          {isLoading && <OnboardingSkeleton />}
          {isSuccess && (
            <>
              <Progress
                value={progress}
                className="h-2 w-full rounded-sm bg-white/40 "
              />
              <Outlet />
            </>
          )}
          <footer className="mt-auto">
            <p className="text-base font-semibold text-gray-400">
              Need Help?{" "}
              <Link className="font-semibold text-secondary" to={"/contact-us"}>
                Contact Us
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default _onboardingLayout;
