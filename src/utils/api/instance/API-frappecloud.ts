import API from "../API-axios";
import API_URL from "../API-URL";
import { setUserTokenHeader } from "../token/API-app";

type InstanceParams = {
  hostname: string;
  cloud_platform: string;
  password: string;
  plan: string;
  city: string;
  apps: string[];
};

export const LaunchFrappeInstance = async (
  instanceParams: InstanceParams,
): Promise<any> => {
  try {
    const payload = {
      hostname: instanceParams.hostname,
      password: instanceParams.password,
      city: instanceParams.city,
      plan: instanceParams.plan,
      apps: instanceParams.apps,
      cloud_platform: instanceParams.cloud_platform,
    };

    const response = await API.post(API_URL.LAUNCHINSTANCE, payload, {
      headers: await setUserTokenHeader(),
    });

    if (response?.data?.message?.hostname) {
      return Promise.resolve(response.data.message.hostname);
    } else {
      throw new Error("Invalid API response structure");
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
