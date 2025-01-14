import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setStatusFilter } from "@/redux/slices/StatusSlice";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

const StatusFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (status: string | null) => {
    dispatch(setStatusFilter(status));
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFilterChange(null)}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange("Running")}>
            Running
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange("Stopped")}>
            Stopped
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange("Terminated")}>
            Terminated
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange("Processing")}>
            Processing
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StatusFilter;
