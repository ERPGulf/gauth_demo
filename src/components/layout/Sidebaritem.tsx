import { selectSidebar } from "@/redux/slices/SidebarSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface Props {
  text: string;
  path: string;
  icon: React.ReactNode;
}
const Sidebaritem = ({ text, path, icon }: Props) => {
  const isOpen = useSelector(selectSidebar);
  const navigate = useNavigate();
  const active = window.location.pathname.includes(path);
  // path === "/"
  //   ? window.location.pathname === path
  //   : window.location.pathname.startsWith(path) ||
  //     window.location.pathname.startsWith("/claudions");
  return (
    <Button
      onClick={() => {
        navigate(path);
      }}
      variant={"outline"}
      className={`group relative flex w-full cursor-pointer items-center rounded-sm p-2 font-medium transition-colors duration-75 ${active
        ? "border border-white bg-muted dark:bg-primary dark:hover:bg-secondary dark:hover:text-white"
        : ""
        }`}
    >
      <div
        className={`flex items-center ${isOpen ? "w-full justify-start" : "w-full justify-center"
          }`}
      >
        {icon}
        <span
          className={`text-sm font-medium transition-all duration-75 ${isOpen ? "ml-2 w-fit opacity-100" : "ml-0 w-0 opacity-0"
            }`}
        >
          {text}
        </span>
      </div>
      {!isOpen && (
        <div
          className={`
        invisible
        absolute left-full
      z-50 ml-6 -translate-x-3 text-nowrap rounded-md bg-secondary
       px-2 py-1 text-sm
      text-white opacity-20 transition-all group-hover:visible
      group-hover:translate-x-0 group-hover:opacity-100 
  `}
        >
          {text}
        </div>
      )}
    </Button>
  );
};

export default Sidebaritem;
