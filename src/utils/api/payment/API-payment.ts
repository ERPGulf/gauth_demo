import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setAppTokenHeader } from "@/utils/api/token/API-app";

export const createPayment = async (
  amount: number,
  //status: string,
  orderId: string,
): Promise<any> => {
  try {
    const response = await API.post(
      API_URL.PAYMENT,
      {
        user_id: "72763671@erpgulf.com0011",
        amount: amount,
        status: "TXN_SUCCESS",
        reference_id: orderId,
      },
      {
        headers: await setAppTokenHeader(),
      },
    );

    console.log("Payment creation response:", response.data);
    //return Promise.resolve(response.data.data);
    if (!response) {
      return null;
    } else {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};
