import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import ChangingProgressProvider from "@/components/progressbar/ChangingProgressProvider";
import { Check, Minus } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { InstanceStatus } from "@/utils/api/instance/API-instanceStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectHostname } from "@/redux/slices/HostnameSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { selectCloudPlatform } from "@/redux/slices/CloudPlatformSlice";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Task {
  id: string;
  name: string;
  status: "pending" | "processing" | "completed";
}

const Progress = () => {
  const navigate = useNavigate();
  const hostname = useSelector(selectHostname);
  const cloudPlatform = useSelector(selectCloudPlatform);

  // Query for instance status
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["Status", hostname, cloudPlatform],
    queryFn: () =>
      hostname && cloudPlatform
        ? InstanceStatus(hostname, cloudPlatform)
        : Promise.resolve([]),
    refetchInterval: 10000,
    enabled: !!hostname,
  });

  const responseData = data?.data.message || {};
  const tasks = responseData.data || [];
  const percentageCompleted = responseData.percentage || 0;

  useEffect(() => {
    if (isSuccess && data?.status === 200) {
      navigate("/console/instance-details");
    }
    if (isError && data?.status === 500) {
      toast.error("Error creating Instance Please try again");
    } else if (isError) {
      toast.error("Error creating Instance");
    }
  }, [isSuccess, isError, percentageCompleted]);

  const handleClick = () => {
    navigate("/console/claudions");
  };

  const renderTaskStatus = (status: string) => {
    switch (status) {
      case "success":
        return <Check className="text-primary" />;
      case "running":
        return <Spinner size="small" />;
      default:
        return <Minus className="text-primary" />;
    }
  };

  return (
    <main className="no_scrollbar flex min-h-screen flex-1 flex-col items-center justify-center gap-y-2 overflow-x-scroll overflow-y-scroll bg-muted/40">
      {isError ? (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-lg font-bold">
          <div>
            <h1>
              There was an error while creating instance. Please try again.
            </h1>
          </div>
          <div>
            <Button onClick={handleClick} variant={"outline"}>
              Go to Claudion
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="py-10 text-2xl font-bold text-secondary">
              We are building your server now. Please be patient, this may take
              up to 5 minutes.
            </h1>
          </div>
          <div className="flex justify-center gap-10">
            <ScrollArea className="h-96">
              <div className="space-y-2 ">
                {tasks.map((task: Task) => (
                  <div key={task.id} className="flex gap-5">
                    <div>{renderTaskStatus(task.status)}</div>
                    <div className="ml-3">
                      <h1 className="text-lg font-bold">{task.name}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="h-96">
              {percentageCompleted >= 0 && (
                <ChangingProgressProvider values={[percentageCompleted]}>
                  {(percentage) => (
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      className="w-56"
                    />
                  )}
                </ChangingProgressProvider>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Progress;
