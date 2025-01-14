import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

// Accept countries as a parameter
export const UpdateCountryList = async (
  hostname: any,
  updatedCountries: any[],
): Promise<any> => {
  try {
    const requestData = {
      hostname: hostname,
      countries: updatedCountries,
    };

    const response = await API.post(API_URL.UPDATECOUNTRYlIST, requestData, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve(response.data.message);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
