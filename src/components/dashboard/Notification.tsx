import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/utils/api/dashboard/API-notification";
import { NotificationType } from "@/types/notification-types";

const Notification = () => {
  // Use query to fetch the notifications
  const { data = [], isLoading } = useQuery<NotificationType[]>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    initialData: [],
  });

  // Filter unread notifications
  const unreadNotifications = data.filter((item) => !item.readstatus);

  // Handle loading state
  if (isLoading) {
    return (
      <Sheet>
        <SheetTrigger>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Bell className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Notifications</SheetTitle>
            <SheetDescription>
              Notification sent to this inbox can be viewed for up to 30 days
            </SheetDescription>
          </SheetHeader>
          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="w-full">
              <TabsTrigger
                value="all"
                className="w-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                All Notifications
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="w-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Unread Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid space-y-2">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            </TabsContent>
            <TabsContent value="unread">
              <div className="grid space-y-2">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bell className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Notifications</SheetTitle>
          <SheetDescription>
            Notification sent to this inbox can be viewed for up to 30 days
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="all" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger
              value="all"
              className="w-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              All Notifications
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="w-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Unread Notifications
            </TabsTrigger>
          </TabsList>

          {/* All Notifications Tab */}
          <TabsContent value="all">
            {data.length === 0 ? (
              <div className="rounded-md border py-10 text-center">
                <h3 className="font-medium">No notification yet</h3>
                <p className="text-xs">
                  You'll see notifications here when there's activity.
                </p>
              </div>
            ) : (
              <div className="grid space-y-2">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className={`my-2 rounded-lg border px-2 py-3 shadow-md ${!item.readstatus && "bg-blue-200 text-black"}`}
                  >
                    <div>
                      <h3 className="text-md font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.datetime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Unread Notifications Tab */}
          <TabsContent value="unread">
            {unreadNotifications.length === 0 ? (
              <div className="rounded-md border py-10 text-center">
                <h3 className="font-medium">No unread notifications</h3>
                <p className="text-xs">
                  You'll see notifications here when there's activity.
                </p>
              </div>
            ) : (
              <div className="grid space-y-2">
                {unreadNotifications.map((item) => (
                  <div
                    key={item.id}
                    className="my-2 rounded-lg border px-2 py-3 shadow-md"
                  >
                    <h3 className="text-md font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.datetime}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default Notification;
