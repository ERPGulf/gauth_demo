import { createBackup } from "@/utils/api/backup/API-createBackup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { selectedHostname } from "@/redux/slices/CloudserverSlice";

const ManualSnapshot = () => {
  const hostname = useSelector(selectedHostname);

  const {
    mutateAsync: snapshotMutateFn,
    data,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: () => {
      if (!hostname) {
        return Promise.reject(new Error("Hostname is null"));
      }
      return createBackup(hostname);
    },
    onSuccess: () => {
      console.log("Snapshot taken successfully");
    },
  });

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-base font-bold">Manual Snapshot</h1>
        <p className="text-sm text-gray-500">
          You can make a manual backup by taking a snapshot. Creating the manual
          snapshot can take several minutes, depending on the size of your
          Linode and the amount of data you have stored on it. The manual
          snapshot will not be overwritten by automatic backups.
        </p>
      </div>
      <div className="flex space-x-2">
        <Input className="w-[350px]" id="amount" type="text" required />
        <Button variant={"secondary"} onClick={() => snapshotMutateFn()}>
          Take Snapshot
        </Button>
      </div>
      {isSuccess && data && (
        <p>
          Snapshot state: {data.lifecycle_state} at {data.time_created}
        </p>
      )}
      {isError && (
        <h1 className="text-red-500">Something went wrong: {error.message}</h1>
      )}
    </div>
  );
};

export default ManualSnapshot;
