import axios from "axios";
import API_URL from "./API-URL";
import { userRefreshToken } from "./token/API-app";
import { store } from "@/redux/store";
import { setLoggedIn } from "@/redux/slices/LoginSlice";
const API = axios.create({
  baseURL: API_URL.BASE_URL,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { access_token } = await userRefreshToken();
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return API(originalRequest);
      } catch (error) {
        console.error("Error refreshing token:", error);
        store.dispatch(setLoggedIn(false));
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userRefreshToken");
        // TODO: Redirect to login page and handle redux and local storage
        return Promise.reject(`Failed to refresh token: ${error}`);
      }
    }

    // Handle other errors (not 401)
    return Promise.reject(
      response?.data?.error ||
        response?.data?.message ||
        error.message ||
        "An unknown error occurred",
    );
  },
);

export default API;
