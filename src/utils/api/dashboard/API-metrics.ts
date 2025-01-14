import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Metric graph
export const getMetrics = async (
  hostname: string,
  cloud_platform: string,
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("hostname", hostname);
    formData.append("cloud_platform", cloud_platform);
    const response = await API.post(API_URL.GETMETRICS, formData, {
      headers: await setUserTokenHeader(),
    });

    console.log("metrics:", response.data.data);
    return Promise.resolve(response.data.data);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
