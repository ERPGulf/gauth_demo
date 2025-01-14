import API from "../API-axios";
import API_URL from "../API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Create Launch Instance
type InstanceParams = {
  hostname: string;
  username: string;
  password: string;
  cloud_platform: string;
  ssh_port: string;
  erpnext_port: string;
  plan: string;
  city: string;
  apps: string[];
};

export const RefactorCreateInstance = async (
  instanceParams: InstanceParams,
): Promise<any> => {
  try {
    const payload = {
      hostname: instanceParams.hostname,
      username: instanceParams.username,
      ssh_port: instanceParams.ssh_port,
      erpnext_port: instanceParams.erpnext_port,
      cloud_platform: instanceParams.cloud_platform,
      password: instanceParams.password,
      city: instanceParams.city,
      plan: instanceParams.plan,
      apps: instanceParams.apps,
    };
    const response = await API.post(API_URL.LAUNCHINSTANCE, payload, {
      headers: await setUserTokenHeader(),
    });

    return Promise.resolve(response.data.message.hostname);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
