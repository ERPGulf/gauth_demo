import axios, { AxiosError } from "axios";

// Fetch master details
export const fetchMasterDetails = async (payload: any) => {
  try {
    const response = await fetch(
      "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Master details fetched successfully:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching master details:", error);
    throw error;
  }
};

// Fetch user details
export const fetchUserDetails = async (
  masterData: any,
  parameters: { username: string; password: string }
) => {
  try {
    if (!masterData || !masterData.data?.access_token) {
      throw new Error("Fetch master API first to get access token.");
    }

    const accessToken = masterData.data.access_token;

    if (!parameters.username || !parameters.password) {
      throw new Error("Missing required parameters: username or password.");
    }

    const formData = new FormData();
    formData.append("username", parameters.username);
    formData.append("password", parameters.password);
    formData.append("app_key", btoa(import.meta.env.VITE_APP_KEY));
    formData.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);

    const response = await axios.post(
      "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure_for_users",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Fetched user data successfully:", response.data);
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("Error fetching user details:", {
      message: err.response?.data?.message || err.message || "Unknown error",
      response: err.response?.data || null,
    });

    throw new Error(
      err.response?.data?.message || "Failed to fetch user details."
    );
  }
};

// Fetch encrypted key
export const fetchEncryptedKey = async (
  masterData: any
): Promise<string | null> => {
  try {
    if (!masterData || !masterData.access_token) {
      throw new Error("Fetch master API first to get access token.");
    }

    const accessToken = masterData.access_token;

    // Replace `btoa` usage for encoding `text_for_encryption`
    const textForEncryption = import.meta.env.VITE_APP_TEXT_FOR_ENCRYPTION

    const response = await axios.post(
      "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.2fa.generate_encrypted_token",
      new URLSearchParams({
        text_for_encryption: textForEncryption,
      }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Encrypted key fetched successfully:", response.data.message);
    return response.data.message;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    console.error(
      "Error fetching encrypted key:",
      err.response?.data?.message || err.message || "Unknown error"
    );

    return null; // Returning null to allow the caller to handle missing keys
  }
};
