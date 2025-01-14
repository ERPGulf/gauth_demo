import { Button } from "@/components/ui/button";
import { createPayment } from "@/utils/api/payment/API-payment";
import { getSubscription_or_invoice } from "@/utils/api/product/API-productInvoice";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, CircleCheckBig } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getInvoicePDF } from "@/utils/api/account/API-billingInfo";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import {
  clearSelections,
  selectUserPlanSelection,
} from "@/redux/slices/PlanSelectionSlice";

type SubscriptionProps = {
  userId: string;
  itemCode: string;
  additionalPlans?: string[];
  couponCode?: string;
};

const Html = () => {
  const [amount, setAmount] = useState<number | undefined>();
  const [invoiceId, setInvoiceId] = useState<string | undefined>(
    sessionStorage.getItem("invoiceId") || undefined,
  );
  const [date, setDate] = useState<string | undefined>(
    sessionStorage.getItem("date") || undefined,
  );
  const [method, setMethod] = useState<string | undefined>(
    sessionStorage.getItem("method") || undefined,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const additionalPlan = useSelector(selectUserPlanSelection);

  const itemCode = localStorage.getItem("item_code");
  const couponCode = localStorage.getItem("coupon");
  const storedSubscriptionId = sessionStorage.getItem("subscriptionId");

  // Extract URL parameters for amount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const txnAmount = Number(searchParams.get("txnamount"));
    setAmount(txnAmount);
  }, []);

  // Fetch subscription or invoice details
  const getSubscriptionMutation = useMutation({
    mutationFn: ({
      userId,
      itemCode,
      additionalPlans,
      couponCode,
    }: SubscriptionProps) =>
      getSubscription_or_invoice(userId, itemCode, additionalPlans, couponCode),
    onSuccess: (data) => {
      const subscriptionId = data.Subscription_details.id;
      const subscriptionInvoiceId = data.Subscription_details.invoice_id;
      setInvoiceId(subscriptionInvoiceId);

      // save invoice id to session storage
      sessionStorage.setItem("invoiceId", subscriptionInvoiceId);

      console.log("Subscription retrieved successfully:", subscriptionId);
      toast.success("Subscription details fetched successfully");

      // Save subscription ID to sessionStorage
      sessionStorage.setItem("subscriptionId", subscriptionId);

      // Automatically create payment if amount is available
      if (amount) {
        createPaymentMutation.mutate({ amount, id: subscriptionId });
      }

      dispatch(clearSelections());
    },
    onError: (error) => {
      console.error("Error fetching subscription details:", error);
      toast.error("Failed to fetch subscription details");
    },
  });

  // Create payment
  const createPaymentMutation = useMutation({
    mutationFn: ({ amount, id }: { amount: number; id: string }) =>
      createPayment(amount, id),
    onSuccess: (data) => {
      setDate(data.reference_date);
      setMethod(data.payment_type);

      // Save to sessionStorage
      sessionStorage.setItem("date", data.reference_date);
      sessionStorage.setItem("method", data.payment_type);

      console.log("Payment created successfully:", data);
      toast.success("Payment created successfully");
    },
    onError: (error) => {
      console.error("Error creating payment:", error);
      toast.error("Payment creation failed");
    },
  });

  // Download invoice as PDF
  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      const blob = await getInvoicePDF(invoiceId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Failed to download invoice");
    }
  };

  // Trigger subscription mutation
  useEffect(() => {
    if (
      !storedSubscriptionId && // Check if subscription ID is not saved
      user?.email &&
      itemCode &&
      !getSubscriptionMutation.isPending
    ) {
      getSubscriptionMutation.mutate({
        userId: user.email,
        itemCode,
        additionalPlans: additionalPlan,
        couponCode: couponCode || "",
      });
    }
  }, [storedSubscriptionId, user, itemCode]);

  const handleCreateInstance = () => {
    navigate("/onboarding/server-settings");
  };

  const handleAccount = () => {
    navigate("/console/account");
  };

  return (
    <main className="no_scrollbar flex min-h-screen flex-1 flex-col items-center gap-y-2 overflow-x-scroll overflow-y-scroll bg-muted/40 py-10">
      <CircleCheckBig size={200} strokeWidth="0.5px" color="#46a932" />
      <h1 className="text-xl font-bold text-gray-500">Invoice Paid</h1>
      <p className="text-5xl font-bold">QAR{amount}</p>
      <div className="flex">
        <p className="text-xl text-gray-500">
          View invoice and payment details
        </p>
        <ChevronRight size={28} strokeWidth={1.25} color="gray" />
      </div>
      <div className="flex gap-20 py-4">
        <div>
          <h1 className="text-xl text-gray-500">Invoice number</h1>
          <h1 className="text-xl text-gray-500">Payment date</h1>
          <h1 className="text-xl text-gray-500">Payment method</h1>
        </div>
        <div className="text-right">
          <h1 className="text-xl">{invoiceId}</h1>
          <h1 className="text-xl">{date}</h1>
          <h1 className="text-xl">{method}</h1>
        </div>
      </div>
      <div className="flex space-x-5">
        <Button
          size="lg"
          className="w-[510px]"
          onClick={() => handleDownloadInvoice(invoiceId!)}
        >
          Download invoice
        </Button>
      </div>
      <Button size="lg" className="w-[510px]" onClick={handleCreateInstance}>
        Create Instance
      </Button>
      <Button size="lg" className="w-[510px]" onClick={handleAccount}>
        Go to Account
      </Button>
    </main>
  );
};

export default Html;
