import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { account_balance } from "@/utils/api/account/API-balance";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AccruedCharges = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["AccountBalance"],
    queryFn: account_balance,
  });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 py-4">
        <CardTitle>Accrued Charges</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-sm">Since last invoice</p>
          {isError && (
            <div>
              <span className="text-red-600">Something went wrong!</span>
            </div>
          )}
          {isLoading && <Skeleton className="h-4 w-24 rounded" />}
          {data && <p className="text-sm">{data.Accrued_Charges}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccruedCharges;
