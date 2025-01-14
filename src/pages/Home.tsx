import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";

const Home = () => {
  usePageTitle("Home");
  return (
    <main className="no_scrollbar relative flex h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-y-4 overflow-y-scroll bg-muted/40">
      <div className="absolute left-1/2 top-12 flex w-full -translate-x-1/2 flex-col items-center justify-center space-y-6">
        <h1 className="relative text-pretty text-center text-2xl font-medium md:text-4xl">
          Welcome&nbsp;{" "}
          <span className="font-bold text-primary">to Claudion</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute right-20 top-5 -z-20 h-5 w-40 fill-primary/30 md:right-60 md:top-6 md:w-56"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
          </svg>
          <br /> Your Gateway to{" "}
          <span className="font-bold text-primary">Effortless</span> Cloud
          Server <span className="font-bold text-primary">Deployment</span>
        </h1>
        <p className="w-[80%] text-center text-base font-light text-gray-500">
          Claudion simplifies cloud server deployment for everyone, from
          developers to enterprises. Experience seamless integration and robust
          security, all with an intuitive platform that lets you focus on what
          matters most—growing your business.
        </p>
        <section className="flex w-[90%] pt-8">
          <div className="relative flex h-[180px] flex-1 flex-col items-end justify-between space-y-9 px-6">
            <div className="space-y-3 text-right">
              <h3 className="text-xl font-medium">
                Let Us Guide You to the Perfect Server
              </h3>
              <p className="text-right text-sm text-gray-500">
                Let Claudion guide you through a personalized process to find
                the ideal cloud server. <br /> Whether you're a developer or an
                enterprise.
              </p>
            </div>
            <Link to={"/onboarding"}>
              <Button
                size={"lg"}
                className="absolute bottom-0 right-6 rounded-2xl font-semibold"
              >
                Get Started
              </Button>
            </Link>
          </div>
          <Separator
            orientation="vertical"
            className="h-[200px] w-[0.5px] bg-gray-800 dark:bg-white/50"
          />
          <div className="relative flex h-[180px] flex-1 flex-col items-start justify-between space-y-9 px-6">
            <div className="space-y-3">
              <h3 className="text-xl font-medium">
                Choose Your Server, Your Way
              </h3>
              <p className="text-left text-sm text-gray-500">
                Explore and choose from a range of pricing plans to find the
                perfect cloud server for your needs.
              </p>
            </div>
            <Link to={"/pricing"}>
              <Button
                size={"lg"}
                variant={"ghost"}
                className="absolute bottom-0 left-6 rounded-2xl border font-semibold"
              >
                Visit Pricing
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
