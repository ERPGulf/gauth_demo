// OnboardingPayment.tsx
import { useState, useEffect } from "react";
import PaymentForm from "@/components/payment/Paymentform";
import { selectUser } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";

interface OnboardingPaymentProps {
  itemCode: string;
  totalAmount: number;
  // selectedOptions: string[];
}

const OnboardingPayment = ({
  itemCode,
  totalAmount,
  // selectedOptions,
}: OnboardingPaymentProps) => {
  // Fetching user data from redux
  const user = useSelector(selectUser);
  const customer_id = user?.id || user?.email;
  const customer_email = user?.email;
  const customer_mobile = user?.mobile;

  const [initialFormData, setInitialFormData] = useState<{
    merchant_id: string;
    ORDER_ID: string;
    WEBSITE: string;
    TXN_AMOUNT: number;
    CUST_ID: string;
    EMAIL: string;
    MOBILE_NO: string;
    VERSION: string;
    CALLBACK_URL: string;
    SADAD_WEBCHECKOUT_PAGE_LANGUAGE: string;
    txnDate: string;
    productdetail: Array<{
      order_id: string;
      amount: number;
      quantity: string;
      item_code: string;
      // selectedOptions: string[];
    }>;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Id: string = "abc";

        setInitialFormData({
          merchant_id: "3582509",
          ORDER_ID: Id,
          WEBSITE: "hiba.claudion.com",
          TXN_AMOUNT: totalAmount,
          CUST_ID: customer_id,
          EMAIL: customer_email,
          MOBILE_NO: customer_mobile,
          VERSION: "1.1",
          CALLBACK_URL:
            "https://io.claudion.com/api/method/claudion_io.portal.subscription.sadad",
          SADAD_WEBCHECKOUT_PAGE_LANGUAGE: "ENG",
          txnDate: new Date().toISOString(),
          productdetail: [
            {
              order_id: Id,
              amount: totalAmount,
              quantity: "1",
              item_code: itemCode,
              // selectedOptions: selectedOptions,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [
    itemCode,
    totalAmount,
    customer_id,
    customer_email,
    customer_mobile,
    // selectedOptions
  ]);

  return initialFormData ? (
    <PaymentForm formData={initialFormData} buttonText="Accept and Continue" />
  ) : null;
};

export default OnboardingPayment;
