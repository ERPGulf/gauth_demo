import { getBackup } from "@/utils/api/backup/API-getBackup";
import { useQuery } from "@tanstack/react-query";
import ManualSnapshot from "./ManualSnapshot";
import { ScrollArea } from "../ui/scroll-area";
import BackupSkeleton from "./BackupSkelton";
import BackupTable from "./BackupTable";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { selectedHostname } from "@/redux/slices/CloudserverSlice";

const Backup = () => {
  const hostname = useSelector(selectedHostname);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getBackup"],
    queryFn: () => {
      if (hostname) {
        return getBackup(hostname);
      }
      return Promise.resolve([]);
    },
    refetchInterval: 5000,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-red-200 bg-red-50 p-6 shadow">
        <AlertTriangle className="h-12 w-12 text-red-600" />
        <h2 className="text-xl font-semibold text-red-600">
          Oops, something went wrong!
        </h2>
        <p className="text-sm text-gray-700">
          An error occurred while fetching the data. Please try again later.
        </p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <ScrollArea className="h-auto px-2">
        {isLoading ? <BackupSkeleton /> : <BackupTable data={data || []} />}
      </ScrollArea>
      <ManualSnapshot />
    </div>
  );
};
export default Backup;
