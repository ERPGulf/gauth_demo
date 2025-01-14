import { CloudServerItem } from "@/types/cloudserver-types";
import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Cloud Server
export const getCloudServers = async (): Promise<CloudServerItem[]> => {
  try {
    const formData = new FormData();
    const { data } = await API.post(API_URL.CLOUDSERVER, formData, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve(data.cloudServers);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
