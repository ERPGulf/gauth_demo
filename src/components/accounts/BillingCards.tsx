import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const BillingCards = () => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 py-4">
        <div className="flex w-full items-center justify-between">
          <CardTitle>Billing cards</CardTitle>
          <h1 className="cursor-pointer text-sm font-bold text-secondary">
            Edit
          </h1>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-sm">Card details</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingCards;
