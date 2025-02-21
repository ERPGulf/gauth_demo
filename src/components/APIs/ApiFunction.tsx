import axios, { AxiosError } from "axios";
import { getMasterDataPayload } from "@/components/APIs/utils/payload";
import API_URL from "@/components/APIs/API-URL";

export const fetchMasterDetails = async () => {
  try {
    const response = await axios.post(
      `${API_URL.BASE_URL}${API_URL.APP_TOKEN}`,
      getMasterDataPayload(),
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Master details fetched successfully:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching master details:", error);
    throw error;
  }
};


// Fetch user details
export const fetchUserDetails = async (
  masterData: any,
  params: { username: string; password: string; app_key: string }
) => {
  if (!params.app_key) throw new Error("App key is required.");
  const response = await fetch(`${API_URL.BASE_URL}${API_URL.USER_TOKEN}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${masterData.access_token}`,
      },
      body: JSON.stringify(params),
  });

  if (!response.ok) {
      throw new Error("Failed to fetch user details.");
  }

  return await response.json();
};

// Fetch encrypted key
export const fetchEncryptedKey = async (
  masterData: any,
  
) => {
  try {
    if (!masterData || !masterData.access_token) {
      throw new Error('Fetch master API first to get access token.');
    }

    const accessToken = masterData.access_token;
    const textForEncryption = import.meta.env.VITE_APP_TEXT_FOR_ENCRYPTION;

    const response = await axios.post(
      'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.2fa.generate_encrypted_token',
      new URLSearchParams({ text_for_encryption: textForEncryption }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Encrypted key fetched successfully:', response.data.message);
    return response.data.message;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    console.error('Error fetching encrypted key:', err.response?.data?.message || err.message || 'Unknown error');
    return null;
  }
};
