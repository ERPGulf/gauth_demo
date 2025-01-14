import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import {
  encryptMessage,
  generateTOTP,
} from "@/utils/helper/authentication.helper";

// APP encrypt Token
export const getEncrytToken = async (): Promise<any> => {
  try {
    const api_key = import.meta.env.VITE_API_KEY;
    const api_secret = import.meta.env.VITE_SECRET_KEY;
    const app_key = btoa(import.meta.env.VITE_APP_KEY);
    const token = generateTOTP();
    const message = `${api_key}::${api_secret}::${app_key}`;
    const encryptedToken = encryptMessage(message, token);
    if (!encryptedToken) {
      return Promise.reject("No encrypted token found");
    }
    const formData = new FormData();
    formData.append("encrypted_key", encryptedToken);
    const response = await API.post(API_URL.APP_ENRYPT, formData);
    return Promise.resolve(response.data.data.access_token);
  } catch (error) {
    console.error("Error generating app token:", error);
    return Promise.reject(error);
  }
};

// refresh user token
export const userRefreshToken = async () => {
  try {
    const userRefreshToken = localStorage.getItem("userRefreshToken");
    if (!userRefreshToken) {
      return Promise.reject("No user refresh token found");
    }
    const formData = new FormData();
    formData.append("grant_type", "refresh_token");
    formData.append("refresh_token", userRefreshToken);
    const { data } = await API.post(API_URL.REFRESH_TOKEN, formData);
    localStorage.setItem("userAccessToken", data.access_token);
    localStorage.setItem("userRefreshToken", data.refresh_token);
    return Promise.resolve(data);
  } catch (refreshError) {
    console.error("Error refreshing token:", refreshError);
    return Promise.reject(refreshError);
  }
};

interface Headers {
  [key: string]: string;
}

export const setAppTokenHeader = async (
  headers: Headers = {},
): Promise<Headers> => {
  try {
    const APP_TOKEN = await getEncrytToken();
    headers["Authorization"] = `Bearer ${APP_TOKEN}`;
  } catch (error) {
    console.error("Error setting admin access token:", error);
  }
  return headers;
};

export const setUserTokenHeader = async (): Promise<Headers> => {
  try {
    const userAccessToken = localStorage.getItem("userAccessToken");
    return {
      Authorization: `Bearer ${userAccessToken}`,
    };
  } catch (error) {
    console.error("Error setting user access token:", error);
    return {};
  }
};
