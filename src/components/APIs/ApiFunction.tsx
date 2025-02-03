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
  params: { username: string; password: string; app_key: string }
) => {
  // Ensure app_key exists before making the request
  if (!params.app_key) throw new Error("App key is required.");

  // Perform API call (replace this with actual API logic)
  const response = await fetch("https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure_for_users", {
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
