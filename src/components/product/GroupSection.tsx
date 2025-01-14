import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/api/product/API-products";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
const GroupSection = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["group"],
    queryFn: () => getProducts("group"),
  });
  const navigate = useNavigate();
  const handleBuy = (item_code: string) => {
    try {
      navigate(`/item-detail/annual/${item_code}/group`);
    } catch (error) {
      console.error(`buy error`, error);
    }
  };
  return (
    <section className="flex w-[80vw] flex-col space-y-3 self-center px-2">
      <span className="text-2xl font-medium">Group</span>
      {isError ? (
        <div className="flex h-[300px] w-full items-center justify-center space-x-1">
          <CircleX className="h-5 w-5 text-red-600" />
          <span className="text-red-600">Something went wrong!</span>
          <Button onClick={() => refetch()} variant={"link"} size={"sm"}>
            Retry
          </Button>
        </div>
      ) : (
        <Table className=" overflow-hidden rounded-lg">
          <TableHeader className="bg-primary/10 dark:bg-black/40">
            <TableRow className="justify-between">
              <TableHead className="w-[120px]">Plan</TableHead>
              <TableHead>QAR/Mo</TableHead>
              <TableHead>QAR/Hr</TableHead>
              <TableHead>RAM</TableHead>
              <TableHead>CPUs</TableHead>
              <TableHead>Storage</TableHead>
              <TableHead>Transfer</TableHead>
              <TableHead>Network In/Out</TableHead>
              <TableHead></TableHead>
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
            {!isLoading &&
              data?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.item_name}
                  </TableCell>
                  <TableCell>{item.annual_amount}</TableCell>
                  <TableCell>{item.perpetual_amount}</TableCell>
                  <TableCell className="">{item.item_name}</TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell className="">{item.item_name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleBuy(item.item_code)}
                      size={"icon"}
                    >
                      <ArrowRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default GroupSection;
