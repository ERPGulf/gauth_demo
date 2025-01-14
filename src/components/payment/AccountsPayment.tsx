import { useSelector } from "react-redux";
import PaymentForm from "./Paymentform";
import { selectAmount } from "@/redux/slices/AddamountSlice";

const AccountsPayment = () => {
  const amount = useSelector(selectAmount);
  const initialFormData = {
    merchant_id: "3582509",
    ORDER_ID: "1244",
    WEBSITE: "hiba.claudion.com",
    TXN_AMOUNT: amount,
    EMAIL: "azim@htsqatar.com",
    MOBILE_NO: "77235274",
    VERSION: "1.1",
    CALLBACK_URL:
      "https://io.claudion.com/api/method/claudion_io.portal.subscription.sadad",
    SADAD_WEBCHECKOUT_PAGE_LANGUAGE: "ENG",
    txnDate: "2024-04-19 12:10:00",
    productdetail: [
      {
        order_id: "123422",
        amount: amount,
        quantity: "1",
        item_code: "1244",
      },
    ],
  };

  return <PaymentForm formData={initialFormData} buttonText="Continue" />;
};

export default AccountsPayment;
