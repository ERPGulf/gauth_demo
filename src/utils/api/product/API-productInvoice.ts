import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "@/utils/api/token/API-app";

export const getSubscription_or_invoice = async (
  customer_id: string,
  item_code: string,
  additional_plans?: string[],
  coupon_code?: string,
) => {
  try {
    const response = await API.post(
      API_URL.PRODUCTINVOICE,
      {
        party_type: "Customer",
        company: "Claudion",
        is_invoice: false,
        customer_id: customer_id,
        item_code: item_code,
        plan: additional_plans,
        // optional fields
        coupon_code: coupon_code,
      },
      {
        headers: await setUserTokenHeader(),
      },
    );

    console.log("Subscription or inovice:", response.data.data);
    return Promise.resolve(response.data.data);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
