import axios from "axios";
import { AxiosError } from "axios";

export const fetchMasterDetails = async (parameters: {
  api_key: string;
  api_secret: string;
  app_key: string;
  client_secret: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("api_key", parameters.api_key);
    formData.append("api_secret", parameters.api_secret);
    formData.append("app_key", parameters.app_key);
    formData.append("client_secret", parameters.client_secret);

    const { data } = await axios.post(
      "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Master details fetched successfully:", data);
    return Promise.resolve(data);
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "Error fetching master details:",
      err.response?.data || err.message
    );
    return Promise.reject(err);
  }
};

export const fetchUserDetails = async (
    masterData: any,
    parameters: { username: string; password: string; app_key: string }
  ) => {
    try {
      if (!masterData || !masterData?.data?.access_token) {
        throw new Error("Fetch master API first");
      }
  
      const accessToken = masterData.data.access_token;
  
      if (!parameters.username || !parameters.password || !parameters.app_key) {
        throw new Error(
          "Missing required parameters: username, password, or app_key."
        );
      }
  
      const formData = new FormData();
      formData.append("username", parameters.username);
      formData.append("password", parameters.password);
      formData.append("app_key", parameters.app_key);
      formData.append("client_secret", "cfd619c909");
  
      const { data } = await axios.post(
       'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure_for_users' ,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Fetched User Data:", data);
      return Promise.resolve(data);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Error fetching user details:", {
        message: err.response?.data?.message || err.message || "Unknown error",
        response: err.response?.data || null,
      });
  
      return Promise.reject(
        err.response?.data?.message || "An error occurred while fetching user details."
      );
    }
  };