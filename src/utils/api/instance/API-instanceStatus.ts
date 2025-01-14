import API from "../API-axios";
import API_URL from "../API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Instance Status
export const InstanceStatus = async (
  hostname: string,
  cloud_platform: string,
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("hostname", hostname);
    formData.append("cloud_platform", cloud_platform);
    const response = await API.post(API_URL.INSTANCESTATUS, formData, {
      headers: await setUserTokenHeader(),
    });

    // Check response status code
    const statusCode = response.status;

    if (statusCode === 200 || statusCode === 202) {
      return Promise.resolve(response);
    }
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
