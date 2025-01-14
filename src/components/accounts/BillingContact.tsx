import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const BillingContact = () => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 py-4">
        <div className="flex w-full items-center justify-between">
          <CardTitle>Billing contact</CardTitle>
          <h1 className="cursor-pointer text-sm font-bold text-secondary">
            Edit
          </h1>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-sm">John Doe</p>
          <p className="text-sm ">+1 123 456 7890</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">1234 Street Name, City, Country</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingContact;
