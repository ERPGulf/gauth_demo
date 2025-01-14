import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebar, toggleSidebar } from "@/redux/slices/SidebarSlice";
import ThemeToggle from "../ThemeToggle";
import LogoutConfrim from "../LogoutConfrim";
import LogoDark from "@/assets/Claudion Reverse Logo-DARK.png";
import LogoLight from "@/assets/Claudion Main Logo-LIGHT.png";
import { useTheme } from "../theme-provider";

interface Props {
  children: React.ReactNode;
}
const Sidebar = ({ children }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSidebar);
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  const { theme } = useTheme();
  const _logo = theme === "dark" ? LogoDark : LogoLight;
  return (
    <aside className="hidden min-h-screen dark:bg-primary/90 md:flex">
      <nav className="relative flex h-full flex-col border-r shadow-sm ">
        {/* logo */}
        <img
          src={_logo}
          alt="logo"
          className={`mb-10 object-contain transition-all ${isOpen ? "w-64" : " mx-auto mt-10 w-16"}`}
        />
        <div className="group relative flex flex-row items-center justify-between p-3 ">
          <span
            className={`overflow-hidden text-nowrap text-base font-bold transition-all   ${isOpen ? "mr-3 w-[150px]" : "w-0"
              }`}
          >
            Console menu
          </span>
          <Button
            onClick={handleToggleSidebar}
            variant={"ghost"}
            size={"icon"}
          >
            <Menu />
          </Button>
        </div>
        {/* sidebar item */}
        <ul className="flex w-full flex-col items-center justify-center space-y-2 px-3">
          {children}
        </ul>
        <div className="group absolute bottom-16 flex w-full items-center p-3">
          <div className="flex-1">
            <ThemeToggle />
          </div>

          <p
            className={`ml-2 ${isOpen ? "flex-[3]" : "hidden"} ${isOpen ? "opacity-100" : "opacity-0"} text-nowrap text-sm font-normal transition-all duration-75`}
          >
            Change theme
          </p>
          {!isOpen && (
            <div
              className={`
        invisible
      absolute left-full z-50 ml-4 -translate-x-3 text-nowrap
       rounded-md bg-background px-2
      py-1 text-sm opacity-20 transition-all
      group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
  `}
            >
              Change theme
            </div>
          )}
        </div>
        <div className="group absolute bottom-0 flex w-full space-x-3 border-t p-3">
          <LogoutConfrim isOpen={isOpen} />

          {!isOpen && (
            <div
              className={`
        invisible
      absolute left-full z-50 ml-4 -translate-x-3 text-nowrap
       rounded-md bg-background px-2
      py-2 text-sm opacity-20 transition-all
      group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
  `}
            >
              Logout
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
