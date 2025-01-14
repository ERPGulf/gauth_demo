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
import { getSubscriptionPurchaseHistory } from "@/utils/api/account/API-billingInfo";
import { SubscriptionPurchaseItem } from "@/types/purchasehistory-types";

const Subcriptionhistory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subcriptionpurchaseHistory"],
    queryFn: getSubscriptionPurchaseHistory,
  });
  return (
    <div className="flex w-full flex-col space-y-3">
      <span className="text-lg font-medium">Subscription Purchase History</span>
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
              <TableHead>Plan</TableHead>
              <TableHead>Quantity</TableHead>
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
              data?.map((item: SubscriptionPurchaseItem, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.plan}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
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

export default Subcriptionhistory;
