import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import LogoDark from "@/assets/LOGODARK.png";
import LogoLight from "@/assets/LOGOLIGHT.png";
import ThemeToggle from "../ThemeToggle";
import { useSelector } from "react-redux";
import { selectLogin } from "@/redux/slices/LoginSlice";
import LogoutConfrim from "../LogoutConfrim";
const Header = () => {
  const isLoggedin = useSelector(selectLogin);
  const { theme } = useTheme();
  const _logo = theme === "dark" ? LogoDark : LogoLight;
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-20 ">
      <img
        src={_logo}
        alt="logo"
        className="absolute left-6 top-1/2 w-28 -translate-y-8 object-contain"
      />
      <nav className="ml-16 hidden w-full gap-6 text-lg font-bold md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to={"/"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          to={"/"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Docs
        </Link>
        <Link
          to={"/pricing"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Pricing
        </Link>
        <Link
          to={"/"}
          className="text-nowrap text-muted-foreground transition-colors hover:text-foreground"
        >
          About us
        </Link>
        <Link
          to={"/"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Blog
        </Link>
      </nav>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
      </div>
      <div>
        <ThemeToggle />
      </div>
      <Link
        to={"/console"}
        className="ml-auto text-nowrap text-sm font-bold text-blue-600"
      >
        Go to console
      </Link>
      /
      {isLoggedin ? (
        <LogoutConfrim type="link" />
      ) : (
        <Link
          to={"/login"}
          className="text-nowrap text-sm font-bold text-blue-600"
        >
          Sign in
        </Link>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5 text-foreground" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to={"/"}
              className="text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              to={"/pricing"}
              className="text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              to={"/"}
              className="text-muted-foreground hover:text-foreground"
            >
              About us
            </Link>
            <Link
              to={"/"}
              className="text-muted-foreground hover:text-foreground"
            >
              Blog
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
