import { CloudServerItem } from "@/types/cloudserver-types";
import { getStatusColor } from "@/utils/helper/statuscolor-helper";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface ConsoleActionProps {
  selectedServer: CloudServerItem;
}
const ConsoleAction: React.FC<ConsoleActionProps> = ({ selectedServer }) => {
  const statusColor = getStatusColor(selectedServer.status);

  return (
    <div className="w-full space-y-10 px-3 md:px-8">
      <div className="flex w-full flex-col rounded-md border bg-background shadow-sm">
        <div className="flex h-12 w-full border-b px-3">
          <div className="flex flex-[0.6] items-center gap-x-3">
            <div className={`${statusColor} h-4 w-4 rounded-full`} />
            <span className="text-foreground sm:text-base md:text-base">
              {selectedServer.status}
            </span>
          </div>
          <div className="hidden flex-[0.4] items-center justify-end  md:flex ">
            <Button variant={"link"} className="font-medium text-primary">
              Power off
            </Button>
            <Button variant={"link"} className="font-medium text-primary">
              Reboot
            </Button>
            <Button variant={"link"} className="font-medium text-primary">
              Launch LISH Console
            </Button>
            <Button variant={"ghost"}></Button>
          </div>
        </div>
        <div className="flex min-h-24 w-full flex-col bg-muted p-3 sm:space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
          <div className="flex flex-1 space-x-2 lg:flex-[0.6]">
            <div className="flex flex-[0.5] flex-col space-y-2">
              <span className="text-base font-medium text-secondary">
                Summary
              </span>
              <div className="flex h-12 flex-row items-center text-nowrap rounded-sm bg-background px-3">
                <div className="w-full text-xs text-foreground/70 md:text-sm">
                  <span>1 CPU Core</span>
                </div>
                <div className="w-full text-xs text-foreground/70 md:text-sm">
                  <span>50 GB Storage</span>
                </div>
              </div>
              <div className="flex h-12 flex-row items-center text-nowrap rounded-sm bg-background px-3">
                <span className="w-full text-xs text-foreground/70 md:text-sm">
                  1 CPU Core
                </span>
                <span className="w-full text-xs text-foreground/70 md:text-sm">
                  50 GB Storage
                </span>
              </div>
            </div>
            <div className="flex flex-[0.5] flex-col space-y-2">
              <span className="text-base font-medium text-secondary">
                Public IP Address
              </span>
              <div className="flex h-12 flex-row items-center rounded-sm bg-background px-3">
                <span className="text-xs text-foreground/70 md:text-sm">
                  {selectedServer.public_ip}
                </span>
              </div>
              <div className="flex h-12 flex-row items-center rounded-sm bg-background px-3">
                <span className="truncate text-xs text-foreground/70 hover:overflow-visible md:text-sm">
                  {selectedServer.public_ip}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col space-y-2 lg:flex-[0.4]">
            <span className="text-base font-medium text-secondary">Access</span>
            <div className="flex h-12 flex-row items-center rounded-sm bg-background px-3">
              <span className="w-1/2 px-1 text-xs text-foreground/70 md:text-sm">
                XX.XX.XX.XX
              </span>
            </div>
            <div className="flex h-12 flex-row items-center rounded-sm bg-background px-3">
              <span className="w-full truncate px-1 text-xs text-foreground/70 hover:overflow-visible md:text-sm">
                XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-16 w-full flex-row items-center border-t px-1 lg:px-3 ">
          <div className="flex-1 border-r px-1 lg:px-3">
            <span className="text-base font-medium text-foreground">plan</span>
            <span className="px-1 text-sm text-foreground/70">
              {selectedServer.plan}
            </span>
          </div>
          <div className="flex-1 border-r px-1 lg:px-3">
            <span className="text-base font-medium text-foreground">plan</span>
            <span className="px-1 text-sm text-foreground/70">
              {selectedServer.plan}
            </span>
          </div>
          <div className="flex-1 border-r px-1 lg:px-3">
            <span className="text-base font-medium text-foreground">plan</span>
            <span className="px-1 text-sm text-foreground/70">
              {selectedServer.plan}
            </span>
          </div>
          <div className="flex-1 px-1 lg:px-3">
            <span className="text-base font-medium text-foreground">plan</span>
            <span className="px-1 text-sm text-foreground/70">
              {selectedServer.plan}
            </span>
          </div>
          <Button className="mx-1 bg-primary" size={"sm"}>
            ADD A Tag <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsoleAction;
