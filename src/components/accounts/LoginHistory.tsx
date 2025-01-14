import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLoginHistory } from "@/utils/api/account/API-loginhistory";
import { time } from "@/types/accounts-types";
import { dateFormater } from "@/utils/helper/loginhistory-helper";
import React, { useEffect } from "react";
import TableSkeltons from "../Skeltons/TableSkeltons";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
const LoginHistory = () => {
  const { isLoading, isError, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["LoginHistory"],
      queryFn: ({ pageParam = 0 }) =>
        getLoginHistory({ offset: pageParam, limit: 20 }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined;
        return allPages.length; //
      },
      initialPageParam: 0,
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <ScrollArea className="min-h-75vh space-y-6 px-4">
      {isError ? (
        <div>
          <span className="text-red-600">Something went wrong!</span>
        </div>
      ) : (
        <Table id="login-table" className="overflow-hidden rounded-lg">
          <TableHeader className="bg-primary/10 dark:bg-muted/60">
            <TableRow className="w-full">
              <TableHead className="w-full">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-background">
            {isLoading && <TableSkeltons />}
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.map((item: time, index: number) => (
                  <TableRow key={index} className="justify-between">
                    <TableCell className="font-medium">
                      {dateFormater(item.time)}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}

            {!isLoading && data?.pages.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No Login history available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {isFetchingNextPage && (
        <div className="flex w-full justify-center">
          <Loader className="size-8 animate-spin text-primary/60" />
        </div>
      )}
      <div ref={ref} className="h-16"></div>
    </ScrollArea>
  );
};

export default LoginHistory;
