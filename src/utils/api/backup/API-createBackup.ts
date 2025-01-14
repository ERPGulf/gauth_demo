import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Create Backup
export const createBackup = async (hostname: string): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("hostname", hostname);
    const response = await API.post(API_URL.CREATEBACKUP, formData, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve(response.data);
  } catch (error) {
    console.error("Create Backup:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
