import React, { useState } from "react";
import axios from "axios";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import ParameterList from "./utils/ParameterList";
import FetchButton from './utils/FetchButton';

const MasterEncryptionAuth: React.FC = () => {
  const title = "Generate Encrypted Token";
  const description = "This API generates an encrypted token using the provided encrypted key.";
  const api = `${API_URL.BASE_URL}${API_URL.APP_ENCRYPT_TOKEN}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [encryptedKey, setEncryptedKey] = useState<string | null>(null);
  const [encryptedData, setEncryptedData] = useState<unknown>(null);
  const [loading, setLoading] = useState<string | boolean | null>(null);
  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };
  // Fetch Encrypted Key
  const fetchEncryptedKey = async () => {
    if (!masterData?.access_token) {
      console.error("Error: Fetch master API first");
      return;
    }
    const accessToken = masterData.access_token;
    setLoading("Fetching Encrypted Key...");
    try {
      // Define API function
      const apiFunction = async () => {
        return await axios.post(
          `${API_URL.BASE_URL}${API_URL.APP_ENCRYPT_KEY}`,
          new URLSearchParams({
            text_for_encryption: import.meta.env.VITE_APP_TEXT_FOR_ENCRYPTION,
          }),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      };

      // Use handleApiCall for API execution
      const response = await handleApiCall(apiFunction, setLoading);
      if (response?.data?.data) {
        setEncryptedKey(response.data.data);
        console.log("Encrypted Key Set:", response.data.data);
      } else {
        console.error("Unexpected Response Format:", response?.data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Fetch Encrypted Data
  const fetchEncryptedData = async () => {
    if (!masterData?.access_token) {
      throw new Error("Fetch master API first");
    }
    if (!encryptedKey) {
      throw new Error("Fetch master encryption key first");
    }

    const accessToken = masterData.access_token;
    setLoading("Encrypting Data...");

    try {
      // Define API function
      const apiFunction = async () => {
        return await axios.post(
          `${API_URL.BASE_URL}${API_URL.APP_ENCRYPT_TOKEN}`,
          new URLSearchParams({
            encrypted_key: encryptedKey,
          }),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      };
      // Use handleApiCall for API execution
      const response = await handleApiCall(apiFunction, setLoading);

      if (response?.data) {
        setEncryptedData(response.data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <InputField label="Title" value={title} readOnly />
        <InputField label="Description" value={description} readOnly />
        <InputField label="API URL" value={api} readOnly />
        <ParameterList parameters={parameters} />
        <FetchButton onClick={handleFetchMasterDetails} label="Fetch Master Data" loading={loading} />
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>

            <FetchButton onClick={fetchEncryptedKey} label="Fetch Encrypted Key" loading={loading} />
            {encryptedKey && (
              <>
                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                  <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Key:</h2>
                  <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                    {encryptedKey}
                  </pre>
                </div>

                <FetchButton onClick={fetchEncryptedData} label="Fetch Encrypted Data" loading={loading} />
              </>
            )}

            {encryptedData && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Token:</h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(encryptedData, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MasterEncryptionAuth;