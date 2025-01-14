import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Get Country List
export const GetCountryList = async (): Promise<any> => {
  try {
    const response = await API.get(API_URL.COUNTRYLIST, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve(response.data.data);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
