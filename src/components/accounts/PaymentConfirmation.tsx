import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AccountsPayment from "../payment/AccountsPayment";
import { useSelector } from "react-redux";
import { selectAmount } from "@/redux/slices/AddamountSlice";
import { Button } from "../ui/button";

const PaymentConfirmation = () => {
  const amount = useSelector(selectAmount);
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="w-full ">
          <Button variant={"secondary"} className="w-full ">
            SADAD
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              <h4>Confirm payment of ${amount} via Sadad?</h4>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <AccountsPayment />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentConfirmation;
