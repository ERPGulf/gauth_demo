import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { account_balance } from "@/utils/api/account/API-balance";
import { useDispatch } from "react-redux";
import { setBalance } from "@/redux/slices/BalanceSlice";
import { useEffect } from "react";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AccountBalance = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["AccountBalance"],
    queryFn: account_balance,
  });

  console.log("data", data);

  useEffect(() => {
    if (data) {
      dispatch(setBalance(data.Account_Balance));
    }
  }, [data, dispatch]);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 py-4">
        <CardTitle>Account Balance</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-sm">Your Balance</p>
          {isError && (
            <div>
              <span className="text-red-600">Something went wrong!</span>
            </div>
          )}
          {isLoading && <Skeleton className="h-4 w-24 rounded" />}
          {data && <p className="text-sm">{data.Account_Balance}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
