import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "@/redux/slices/AddamountSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { selectBalance } from "@/redux/slices/BalanceSlice";
import { Separator } from "../ui/separator";
import PaymentConfirmation from "./PaymentConfirmation";

const AddAmount = () => {
  const [amount, setAmountState] = useState("");
  const dispatch = useDispatch();
  const balance = useSelector(selectBalance);

  const handleSubmit = () => {
    setAmountState(amount);
    dispatch(setAmount(amount));
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger className="h-8 rounded-lg bg-secondary px-2.5 py-1 font-normal text-white  shadow-sm ">
          Make a Payment
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Make a Payment</SheetTitle>
            <h4>Current Balance : {balance}</h4>
            <SheetDescription>
              <div className="space-y-5">
                <Label htmlFor="amount">Payment Amount</Label>
                <Input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmountState(e.target.value)}
                  required
                />
                <Separator />

                <h4 className="text-lg">Payment Methods</h4>
                <div className="border p-2">test card</div>
                <div className="mt-4 flex justify-end">
                  <Button variant={"secondary"} className="justify-end">
                    Pay Now
                  </Button>
                </div>

                <Separator />
                <h4>Or pay via:</h4>
                <div onClick={handleSubmit}>
                  <PaymentConfirmation />
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddAmount;
