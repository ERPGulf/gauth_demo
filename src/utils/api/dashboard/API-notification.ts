import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";
import { NotificationType } from "@/types/notification-types";

export const getNotifications = async (): Promise<NotificationType[]> => {
  try {
    const formData = new FormData();
    const userAccessToken = JSON.stringify(
      localStorage.getItem("userAccessToken"),
    );
    formData.append("client_token", userAccessToken);
    const { data } = await API.post(API_URL.NOTIFICATION, formData, {
      headers: await setUserTokenHeader(),
    });

    return Promise.resolve(data.message);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
