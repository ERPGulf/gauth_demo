import { time } from "@/types/accounts-types";
import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

export const getLoginHistory = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<time[]> => {
  try {
    const {
      data: { data },
    } = await API.get(API_URL.LOGIN_HISTORY, {
      headers: await setUserTokenHeader(),
      params: {
        offset,
        limit,
      },
    });
    console.log("Login History:", data);
    return Promise.resolve(data);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      (error as Error) || new Error("An unknown error occurred"),
    );
  }
};
