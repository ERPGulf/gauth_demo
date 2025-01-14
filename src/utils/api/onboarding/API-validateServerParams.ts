import API_URL from "@/utils/api/API-URL";
import API from "@/utils/api/API-axios";
import { serverParams } from "@/types/serverParams-types";
import { setAppTokenHeader } from "../token/API-app";

export const validateServerParams = async (
  serverData: serverParams,
  cloudPlatform: string,
) => {
  try {
    const formData = new FormData();
    formData.append("hostname", serverData.hostName);
    formData.append("password", serverData.password);
    if (serverData.username) {
      formData.append("username", serverData.username);
    }
    if (serverData.sshPort) {
      formData.append("ssh_port", serverData.sshPort);
    }
    if (serverData.ErpNextPort) {
      formData.append("erpnext_port", serverData.ErpNextPort);
    }

    formData.append("cloud_platform", cloudPlatform);
    const { data, status } = await API.post(
      API_URL.VALIDATE_SERVER_PARAMS,
      formData,
      {
        headers: await setAppTokenHeader(),
      },
    );
    if (status == 400) {
      return Promise.reject(new Error(data));
    }
    return Promise.resolve(data);
  } catch (error) {
    console.error("Error validating server params:", error);
    return Promise.reject(
      (error as Error) || new Error("An unknown error occurred"),
    );
  }
};
