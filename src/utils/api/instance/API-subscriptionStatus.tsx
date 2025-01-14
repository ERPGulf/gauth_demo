import API from "../API-axios";
import API_URL from "../API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Subscription Status
export const subscriptionStatus = async (): Promise<any> => {
  try {
    const response = await API.get(API_URL.SUBSCRIPTIONSTATUS, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve(response.data.message);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
