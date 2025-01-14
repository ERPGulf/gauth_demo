import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  HelpCircle,
  Search,
  User,
  UsersRound,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification";
const HomeNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex h-16 w-full items-center gap-4 border-b p-4">
      <Button
        variant={"secondary"}
        size={"sm"}
        className="text-base font-semibold"
      >
        <Link to={"/onboarding"} className="flex items-center gap-2">
          create
        </Link>
      </Button>

      <div className="flex w-full flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="w-full flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for Claudions, Volumes, Domains ..."
              className="pl-8 placeholder:text-xs md:placeholder:text-sm"
            />
          </div>
        </form>
      </div>
      <div className="flex md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="group"
          // onClick={() => setOpen(!open)}
        >
          <ChevronDown className="h-6 w-6 scale-90 text-muted-foreground transition-all duration-300 group-hover:scale-100 group-hover:text-foreground" />
        </Button>
      </div>
      <div className="hidden items-center gap-4 md:flex">
        <Button
          onClick={() => navigate("/")}
          size={"icon"}
          variant={"ghost"}
          className=" text-muted-foreground transition-colors hover:text-foreground"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
        <Notification />
        <Button
          size={"icon"}
          variant={"ghost"}
          className=" text-muted-foreground transition-colors hover:text-foreground"
        >
          <UsersRound className="h-6 w-6" />
        </Button>

        <Button size={"icon"} variant={"outline"} className="w-fit gap-2 px-4">
          <User className="h-6 w-6" /> Name <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default HomeNav;
