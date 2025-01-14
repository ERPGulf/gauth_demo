import { useSelector } from "react-redux";
import { selectHostname } from "../redux/slices/HostnameSlice";
import { getInstance } from "@/utils/api/instance/API-getInstance";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { selectCloudPlatform } from "@/redux/slices/CloudPlatformSlice";

const InstanceDetails = () => {
  const navigate = useNavigate();
  const hostname = useSelector(selectHostname);
  const cloudPlatform = useSelector(selectCloudPlatform);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["instanceDetails", hostname, cloudPlatform],
    queryFn: () =>
      hostname && cloudPlatform
        ? getInstance(hostname, cloudPlatform)
        : Promise.resolve([]),
    enabled: !!hostname,
  });

  console.log("test instance data", data);
  const handleClick = () => {
    navigate("/console/claudions");
  };

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-lg font-bold">
        <h1>Error fetching instance details. Please try again.</h1>
        <Button onClick={handleClick} variant="outline">
          Go to Claudion
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-20 w-full px-3 md:px-8">
      <div className="w-full space-y-5">
        <div className="my-2">
          <Button className="bg-secondary" onClick={handleClick}>
            Go to Claudion
          </Button>
        </div>
        <div className="flex w-full flex-col rounded-md border bg-background shadow-sm">
          <div className="flex h-12 w-full border-b px-3">
            <div className="flex flex-[0.6] items-center gap-x-3">
              <span className="text-foreground sm:text-base md:text-base">
                <h1 className="font-bold">Instance Details</h1>
              </span>
            </div>
          </div>
          <div className="flex min-h-24 w-full flex-col rounded-b bg-secondary px-5 py-10 sm:space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
            <div className="flex flex-1 space-x-2 lg:flex-[0.6]">
              <div className="flex flex-[0.5] flex-col space-y-2">
                <div className="flex h-20 flex-row items-center text-nowrap rounded-sm bg-background p-3">
                  <div className="w-full text-xs text-foreground/70 md:text-sm">
                    <span className="font-bold">Domain</span>
                  </div>
                  <div className="w-full rounded-sm border bg-secondary p-3 text-xs text-white md:text-sm">
                    {isLoading ? (
                      <Skeleton className="h-4 w-[120px] rounded-sm" />
                    ) : (
                      <span>{data?.domain || "N/A"}</span>
                    )}
                  </div>
                </div>
                <div className="flex h-20 flex-row items-center gap-1 text-nowrap rounded-sm bg-background p-3">
                  <span className="w-full text-xs font-bold text-foreground/70 md:text-sm">
                    Erpnext Url
                  </span>
                  <span className="w-full rounded-sm border bg-secondary p-3 text-xs text-white md:text-sm">
                    {isLoading ? (
                      <Skeleton className="h-4 w-[150px] rounded-sm" />
                    ) : (
                      <a
                        href={data?.erpnext_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {data?.erpnext_url || "N/A"}
                      </a>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-[0.5] flex-col space-y-2">
                <div className="flex h-20 flex-row items-center text-nowrap rounded-sm bg-background p-3">
                  <span className="w-full text-xs font-bold text-foreground/70 md:text-sm">
                    Hostname
                  </span>
                  <span className="w-full rounded-sm border bg-secondary p-3 text-xs text-white md:text-sm">
                    {isLoading ? (
                      <Skeleton className="h-4 w-[120px] rounded-sm" />
                    ) : (
                      <span>{data?.hostname || "N/A"}</span>
                    )}
                  </span>
                </div>
                <div className="flex h-20 flex-row items-center text-nowrap rounded-sm bg-background p-3">
                  <span className="w-full text-xs font-bold text-foreground/70 md:text-sm">
                    IP address
                  </span>
                  <span className="w-full rounded-sm border bg-secondary p-3 text-xs text-white md:text-sm">
                    {isLoading ? (
                      <Skeleton className="h-4 w-[120px] rounded-sm" />
                    ) : (
                      <span>{data?.ip_address || "N/A"}</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col space-y-2 lg:flex-[0.4]">
              <div className="flex h-20 flex-row items-center text-nowrap rounded-sm bg-background p-3">
                <span className="w-full text-xs font-bold text-foreground/70 md:text-sm">
                  SSH Port
                </span>
                <span className="w-full rounded-sm border bg-secondary p-3 text-xs text-white md:text-sm">
                  {isLoading ? (
                    <Skeleton className="h-4 w-[80px] rounded-sm" />
                  ) : (
                    <span>{data?.ssh_port || "N/A"}</span>
                  )}
                </span>
              </div>
              <div className="flex h-20 flex-row items-center text-nowrap rounded-sm bg-background p-3">
                <span className="w-full text-xs font-bold text-foreground/70 md:text-sm">
                  Username
                </span>
                <span className="w-full rounded-sm border bg-secondary p-3 text-xs text-white md:text-sm">
                  {isLoading ? (
                    <Skeleton className="h-4 w-[100px] rounded-sm" />
                  ) : (
                    <span>{data?.username || "N/A"}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstanceDetails;
