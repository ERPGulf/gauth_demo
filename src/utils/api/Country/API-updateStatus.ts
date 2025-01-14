import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Get update status
export const UpdateCountryStatus = async (hostname: any): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("hostname", hostname);
    const response = await API.post(API_URL.UPDATECOUNTRYSTATUS, formData, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve(response.data.data.status_code);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
