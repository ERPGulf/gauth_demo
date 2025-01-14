import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { BackupItem } from "@/types/backups-types";
import { setUserTokenHeader } from "../token/API-app";

//Get Backup List
export const getBackup = async (hostName: string): Promise<BackupItem[]> => {
  try {
    const formData = new FormData();
    formData.append("hostname", hostName);

    const response = await API.post(API_URL.GETBACKUP, formData, {
      headers: await setUserTokenHeader(),
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
