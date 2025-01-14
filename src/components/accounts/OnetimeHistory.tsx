import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getOneTimePurchaseHistory } from "@/utils/api/account/API-billingInfo";
import { OneTimePurchaseItem } from "@/types/purchasehistory-types";

const OneTimeHistory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["OnetimepurchaseHistory"],
    queryFn: getOneTimePurchaseHistory,
  });

  return (
    <div className="flex w-full flex-col space-y-3 self-center">
      <span className="text-lg font-medium">One-Time Purchase History</span>
      {isError || !data ? (
        <div>
          <span className="text-red-600">Something went wrong!</span>
        </div>
      ) : (
        <Table className="relative overflow-hidden rounded-lg">
          <TableCaption className="py-3">Purchase History</TableCaption>
          <TableHeader className="bg-primary/10 dark:bg-muted/60">
            <TableRow className="justify-between">
              <TableHead>ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Item Price</TableHead>
              <TableHead className="text-right">Purchase Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-background">
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[120px]">
                    <Skeleton className="h-4 w-[120px] rounded-sm" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              data &&
              data.map((item: OneTimePurchaseItem, index: number) => (
                <TableRow key={index} className="justify-between">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.item_price}</TableCell>
                  <TableCell className="text-right">
                    {item.purchase_date}
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No purchase history available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <div className="absolute h-4 w-full rounded-b-lg bg-background" />
        </Table>
      )}
    </div>
  );
};

export default OneTimeHistory;
