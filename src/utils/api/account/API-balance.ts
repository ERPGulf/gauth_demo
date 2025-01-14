import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Account Balance
export const account_balance = async (): Promise<any> => {
  try {
    const response = await API.get(API_URL.ACCOUNTAMOUNTS, {
      headers: await setUserTokenHeader(),
    });

    console.log("account_balance:", response.data.message);
    return Promise.resolve(response.data.message);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      (error as Error) || new Error("An unknown error occurred"),
    );
  }
};
