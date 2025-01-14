// PaymentForm.tsx
import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { Button } from "../ui/button";

interface PaymentFormProps {
  formData: {
    merchant_id: string;
    ORDER_ID: string;
    WEBSITE: string;
    TXN_AMOUNT: number;
    CUST_ID?: string;
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
  };
  buttonText: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ formData, buttonText }) => {
  const [signature, setSignature] = useState("");
  const secretKey = import.meta.env.VITE_SECRETKEY;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // clear all vales from sessionStorage
    sessionStorage.clear();

    const sortedKeys = Object.keys(formData).sort();
    const sortedParams = sortedKeys
      .filter((key) => key !== "productdetail")
      .map((key) => (formData as { [key: string]: any })[key])
      .join("");

    const signatureString = `${secretKey}${sortedParams}`;
    const hashedSignature = CryptoJS.SHA256(signatureString).toString();
    setSignature(hashedSignature);

    await new Promise((resolve) => setTimeout(resolve, 0));
    const formElement = document.getElementById(
      "sadad_payment_form",
    ) as HTMLFormElement | null;
    if (formElement) {
      formElement.submit();
    }
  };

  return (
    <div>
      <form
        action="https://sadadqa.com/webpurchase"
        method="post"
        name="gosadad"
        id="sadad_payment_form"
        onSubmit={handleSubmit}
      >
        {Object.keys(formData).map((key) => {
          if (key === "productdetail") {
            return formData.productdetail.map((item, index) => (
              <div key={index}>
                <input
                  type="hidden"
                  name={`productdetail[${index}][quantity]`}
                  value={item.quantity}
                />
                <input
                  type="hidden"
                  name={`productdetail[${index}][amount]`}
                  value={item.amount}
                />
                <input
                  type="hidden"
                  name={`productdetail[${index}][order_id]`}
                  value={item.order_id}
                />
                <input
                  type="hidden"
                  name={`productdetail[${index}][item_code]`}
                  value={item.item_code}
                />
              </div>
            ));
          }
          return (
            <input
              key={key}
              type="hidden"
              name={key}
              value={(formData as { [key: string]: any })[key]}
            />
          );
        })}
        <input type="hidden" name="signature" value={signature} />
        <Button className="w-full">{buttonText}</Button>
      </form>
    </div>
  );
};

export default PaymentForm;
