import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import ParameterList from "./utils/ParameterList";
import FetchButton from './utils/FetchButton';

const RandomPasswordAuth: React.FC = () => {
  const title = "Generate Random Password";
  const description = "Generates a secure random password";
  const api = `${API_URL.BASE_URL}${API_URL.RANDOM_PASSWORD}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [randomPasswordData, setRandomPasswordData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };
  // Generate random password
  const generateRandomPassword = async () => {
    if (!masterData?.access_token) {
      alert("Please fetch the master data first.");
      return;
    }
    setLoadingPassword(true);
    try {
      const response = await axios.post(api, null, {
        headers: {
          Authorization: `Bearer ${masterData.access_token}`,
        },
      });
      setRandomPasswordData(response.data);
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred.";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Error generating random password:", errorMessage);
    } finally {
      setLoadingPassword(false);
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
        {/* Display Master Data */}
        {masterData && (
          <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
              {JSON.stringify(masterData, null, 2)}
            </pre>
          </div>
        )}
        {/* Generate Random Password Button */}
        {masterData?.access_token && (
          <>
            <FetchButton onClick={generateRandomPassword} label="Generate Random Password" loading={loadingPassword} />
            {/* Display Generated Password */}
            {randomPasswordData && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Random Password:</h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(randomPasswordData, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RandomPasswordAuth;
