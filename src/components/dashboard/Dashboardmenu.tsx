import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectSelectedServer } from "@/redux/slices/CloudserverSlice";
import { Ellipsis } from "lucide-react";
import { useSelector } from "react-redux";

interface DashboardmenuProps {
  status: string;
}

const Dashboardmenu: React.FC<DashboardmenuProps> = ({ status }) => {
  const selectedServer = useSelector(selectSelectedServer);

  const isRunning =
    status === "Running" || selectedServer?.status === "Running";
  const isStopped =
    status === "Stopped" || selectedServer?.status === "Stopped";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={isStopped}>Restart</DropdownMenuItem>
        <DropdownMenuItem disabled={isRunning}>Start</DropdownMenuItem>
        <DropdownMenuItem disabled={isStopped}>Stop</DropdownMenuItem>
        <DropdownMenuItem>Allow SSH</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dashboardmenu;
