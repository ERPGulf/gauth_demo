import API from "../API-axios";
import API_URL from "../API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Get Instance Details
export const getInstance = async (
  hostname: string,
  cloud_platform: string,
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("hostname", hostname);
    formData.append("cloud_platform", cloud_platform);
    const response = await API.post(API_URL.GETINSTANCE, formData, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve(response.data.data);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
