import Sidebar from "@/components/layout/Sidebar";
import Sidebaritem from "@/components/layout/Sidebaritem";
import { CircleHelp, Headset, Server, UserRound } from "lucide-react";
import { Outlet } from "react-router-dom";

const _consoleLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex">
        <Sidebar>
          <Sidebaritem icon={<Server />} text="Claudions" path="claudions" />
          <Sidebaritem icon={<UserRound />} text="Accounts" path="account" />
          <Sidebaritem icon={<Headset />} text="Contact us" path="contactus" />
          <Sidebaritem
            icon={<CircleHelp />}
            text="Help and Support"
            path="help"
          />
        </Sidebar>
        <Outlet />
      </div>
    </div>
  );
};

export default _consoleLayout;
