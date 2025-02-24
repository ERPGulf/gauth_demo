import axios from "axios";
import { getMasterDataPayload } from "@/components/APIs/utils/payload";
import API_URL from "@/components/APIs/API-URL";

export const fetchMasterDetails = async (): Promise<{
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}> => {
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

export const fetchUserDetails = async (
  masterData: { access_token: string }, 
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


