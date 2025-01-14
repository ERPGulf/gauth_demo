import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";
import { FirewallResponse } from "@/types/firewall-types";

//Get Security List

export const getSecurityList = async (
  hostname: string,
): Promise<FirewallResponse> => {
  try {
    const formData = new FormData();
    formData.append("hostname", hostname);

    const response = await API.post(API_URL.GETSECURITYLIST, formData, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve(response.data.data);
  } catch (error) {
    console.error("Security List:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
