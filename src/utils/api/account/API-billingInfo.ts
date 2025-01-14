import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

import {
  OneTimePurchaseItem,
  SubscriptionPurchaseItem,
  PaymentHistory,
} from "@/types/purchasehistory-types";

// Billing and Payment History
export const getBillingAndPaymentHistory = async (
  date_range: string,
): Promise<PaymentHistory[]> => {
  try {
    const formData = new FormData();
    formData.append("order_by", "desc");
    formData.append("transaction_date_range", date_range);
    const { data } = await API.post(
      API_URL.BILLING_AND_PAYMENT_HISTORY,
      formData,
      {
        headers: await setUserTokenHeader(),
      },
    );

    return Promise.resolve(data.message);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      (error as Error) || new Error("An unknown error occurred"),
    );
  }
};

// get invoice PDF
export const getInvoicePDF = async (invoice_id: string): Promise<Blob> => {
  try {
    const formData = new FormData();
    formData.append("invoice_id", invoice_id);
    const { data } = await API.post(API_URL.PDF_DOWNLOAD, formData, {
      headers: await setUserTokenHeader(),
      responseType: "blob",
    });

    return Promise.resolve(data);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      (error as Error) || new Error("An unknown error occurred"),
    );
  }
};

//one time purchase history
export const getOneTimePurchaseHistory = async (): Promise<
  OneTimePurchaseItem[]
> => {
  try {
    const { data } = await API.get(API_URL.ONE_TIME_PURCHASE, {
      headers: await setUserTokenHeader(),
    });

    return Promise.resolve(data.purchaseHistory);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};

//Subscription purchase history
export const getSubscriptionPurchaseHistory = async (): Promise<
  SubscriptionPurchaseItem[]
> => {
  try {
    const { data } = await API.get(API_URL.SUBSCRIPTION_PURCHASE, {
      headers: await setUserTokenHeader(),
    });

    return Promise.resolve(data.purchaseHistory);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
