// OrderPayment.tsx
import { useState } from "react";
//import { getSubscription_or_invoice } from "@/utils/api/product/API-productInvoice";
//import { useSelector } from "react-redux";
//import { selectProduct } from "@/redux/slices/ProductSlice";
//import { selectTotal } from "@/redux/slices/TotalSlice";
import PaymentForm from "./Paymentform";

const OrderPayment = () => {
  //const { amount, amountType, product } = useSelector(selectProduct);
  //const total = useSelector(selectTotal);
  const [initialFormData] = useState<{
    merchant_id: string;
    ORDER_ID: string;
    WEBSITE: string;
    TXN_AMOUNT: number;
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
    }>;
  } | null>(null);

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        let Id: string = "";
        if (amountType === "Perpetual") {
          const invoiceorsubscription = await getSubscription_or_invoice(
            amount,
            // true,
          );
          Id = invoiceorsubscription.data.data.invoice_details.id;
        } else {
          const invoiceorsubscription = await getSubscription_or_invoice(
            amount,
            // false,
          );
          Id = invoiceorsubscription.data.data.Subscription_details.id;
        }

        setInitialFormData({
          merchant_id: "3582509",
          ORDER_ID: Id,
          WEBSITE: "hiba.claudion.com",
          TXN_AMOUNT: total,
          EMAIL: "azim@htsqatar.com",
          MOBILE_NO: "77235274",
          VERSION: "1.1",
          CALLBACK_URL:
            "https://io.claudion.com/api/method/claudion_io.portal.subscription.sadad",
          SADAD_WEBCHECKOUT_PAGE_LANGUAGE: "ENG",
          txnDate: "2024-04-19 12:10:00",
          productdetail: [
            {
              order_id: Id,
              amount: total,
              quantity: "1",
              item_code: product,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [amount, amountType, total, product]);*/

  return initialFormData ? (
    <PaymentForm formData={initialFormData} buttonText="Place Order" />
  ) : null;
};

export default OrderPayment;
