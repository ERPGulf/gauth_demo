import Dashboardmenu from "@/components/dashboard/Dashboardmenu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Menu, Tags } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  setSelectedServer,
  setSelectedServerHostname,
  setServerCloudPlatform,
} from "@/redux/slices/CloudserverSlice";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import StatusFilter from "./StatusFilter";
import { getCloudServers } from "@/utils/api/dashboard/API-cloudserver";
import { getStatusColor } from "@/utils/helper/statuscolor-helper";
import { selectStatusFilter } from "@/redux/slices/StatusSlice";
import { CloudServerItem } from "@/types/cloudserver-types";
import { selectCloudPlatform } from "@/redux/slices/CloudPlatformSlice";

const ROWS_PER_PAGE = 5;

const CloudServerTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const statusFilter = useSelector(selectStatusFilter);
  const cloudPlatform = useSelector(selectCloudPlatform);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["CloudServer"],
    queryFn: () => (cloudPlatform ? getCloudServers() : Promise.resolve([])),
  });

  const handleServer = (server: CloudServerItem, id: string) => {
    try {
      dispatch(setSelectedServer(server));
      dispatch(setSelectedServerHostname(server.cloud_name));
      dispatch(setServerCloudPlatform(server.cloud_platform));
      navigate(`${id}`);
    } catch (error) {
      console.error(` error`, error);
    }
  };

  const filteredData = data?.filter((item) =>
    statusFilter ? item.status === statusFilter : true,
  );

  const startIndex = currentPage * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const currentData = filteredData
    ? filteredData.slice(startIndex, endIndex)
    : [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {isError ? (
        <div className="flex flex-col h-[300px] w-full items-center justify-center space-x-1">
          <span className="text-red-600 mb-2">
            You do not have any Instances created.Create a new one now!
          </span>
          <Button onClick={() => navigate("/onboarding")} variant={"outline"} size={"sm"}>
            Create a Claudion
          </Button>
        </div>
      ) : (
        <Table className="rounded-3xl border border-gray-300 shadow-sm">
          <TableCaption className="text-sm md:text-base">
            Monthly Network Transfer Pool{" "}
            <span className="font-semibold text-secondary">Usage</span>
          </TableCaption>
          <TableHeader className="rounded-3xl bg-background   ">
            <TableRow className="sticky">
              <TableHead className="sticky md:w-[100px]">Label</TableHead>
              <TableHead>
                <div className="flex items-center">
                  <span>Status</span>
                  <StatusFilter />
                </div>
              </TableHead>
              <TableHead className="sticky hidden md:table-cell">
                Plan
              </TableHead>
              <TableHead className="sticky hidden md:table-cell">
                Public IP Address
              </TableHead>
              <TableHead className="sticky hidden md:table-cell">
                City
              </TableHead>
              <TableHead className="sticky hidden md:table-cell">
                Access Url
              </TableHead>
              <TableHead className="sticky hidden md:table-cell">
                Date of Creation
              </TableHead>
              <TableHead className="sticky hidden md:table-cell">
                Cloud Platform
              </TableHead>
              <TableHead className="sticky text-nowrap">Last Backup</TableHead>

              <TableHead className=" sticky flex items-center justify-center gap-2">
                <Menu />
                <Tags />
              </TableHead>
              <TableHead className="sticky"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  <TableHead className="w-[120px]">
                    <Skeleton className="h-4 w-[120px] rounded-sm" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableHead>
                </TableRow>
              ))}
            {currentData.map((item: CloudServerItem, index: number) => {
              const statusColor = getStatusColor(item.status);
              return (
                <TableRow key={index} className="border-b border-black/10 ">
                  <TableCell
                    className="sticky cursor-pointer text-nowrap font-bold text-secondary "
                    onClick={() => {
                      handleServer(item, item.cloud_name);
                    }}
                  >
                    {item.cloud_name}
                  </TableCell>
                  <TableCell className="sticky flex items-center gap-2">
                    <div className={`${statusColor} size-3.5 rounded-full`} />
                    <span>
                      <span className="hidden md:inline">{item.status}</span>
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.plan}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.public_ip}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.city}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <a
                      href={item.access_url}
                      className="text-blue-500 hover:underline"
                    >
                      {item.access_url}
                    </a>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.date_of_creation}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.cloud_platform}
                  </TableCell>
                  <TableCell>{item.last_backup}</TableCell>
                  <TableCell className="text-center">Credit Card</TableCell>
                  <TableCell className="text-center">
                    <Dashboardmenu status={item.status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                endIndex >= (filteredData?.length ?? 0)
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CloudServerTable;
