import ConsoleAction from "@/components/benchview/ConsoleAction";
import HomeNav from "@/components/dashboard/HomeNav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectSelectedServer } from "@/redux/slices/CloudserverSlice";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

const BenchView = () => {
  const location = useLocation();
  const selectedServer = useSelector(selectSelectedServer);
  if (!selectedServer) {
    return <div>No server details available.</div>;
  }
  const currTab = location.pathname.split("/")[4];

  return (
    <main className=" flex h-screen flex-1 flex-col gap-6 overflow-y-scroll bg-muted/40">
      <ScrollArea className="h-screen ">
        <HomeNav />
        <div className="flex w-full flex-row items-center justify-between px-3 md:px-8">
          <div className="text-base text-foreground/30">
            Claudion /{" "}
            <span className="font-medium text-foreground">
              {selectedServer.cloud_name}
            </span>
          </div>
          <div className="text-base">
            <Button variant={"link"} className="gap-2 text-secondary">
              <FileText /> Docs
            </Button>
          </div>
        </div>
        <ConsoleAction selectedServer={selectedServer} />

        <div className="w-full p-6 md:px-8 ">
          <Tabs value={currTab}>
            <TabsList className="flex w-full justify-evenly bg-primary text-white">
              <Link className="w-full" to="cpu">
                <TabsTrigger className="w-full font-normal" value="cpu">
                  CPU
                </TabsTrigger>
              </Link>
              <Link className="w-full" to="network">
                <TabsTrigger className="w-full font-normal" value="network">
                  Network
                </TabsTrigger>
              </Link>
              <Link className="w-full" to="storage">
                <TabsTrigger className="w-full font-normal" value="storage">
                  Storage
                </TabsTrigger>
              </Link>
              <Link className="w-full" to="memory">
                <TabsTrigger className="w-full font-normal" value="memory">
                  Memory
                </TabsTrigger>
              </Link>
              <Link className="w-full" to="firewall">
                <TabsTrigger className="w-full font-normal" value="firewall">
                  Firewall
                </TabsTrigger>
              </Link>
              <Link className="w-full" to="country">
                <TabsTrigger className="w-full font-normal" value="country">
                  Country
                </TabsTrigger>
              </Link>
              <Link className="w-full" to="backup">
                <TabsTrigger className="w-full font-normal" value="backup">
                  Backup
                </TabsTrigger>
              </Link>
            </TabsList>
            <div className="my-6">
              <Outlet />
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </main>
  );
};

export default BenchView;
