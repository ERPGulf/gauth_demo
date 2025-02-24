import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/API-URL";

const RandomPasswordAuth: React.FC = () => {
  const title = "Generate Random Password";
  const description = "Generates a secure random password";
  const api = `${API_URL.BASE_URL}${API_URL.RANDOM_PASSWORD}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [randomPasswordData, setRandomPasswordData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
  // Fetch master details
  const handleFetchMasterDetails = async () => {
    setLoading(true);
    try {
      const data = await fetchMasterDetails();
      setMasterData(data);
    } catch (error) {
      console.error("Error fetching master details:", error);
    } finally {
      setLoading(false);
    }
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
        {/* Title */}
        <div className="mb-6 sm:mb-8">
          <label htmlFor="title" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
          <input
            type="text"
            value={title}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Description */}
        <div className="mb-6 sm:mb-8">
          <label htmlFor="Description" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</label>
          <input
            type="text"
            value={description}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* API URL */}
        <div className="mb-6 sm:mb-8">
          <label htmlFor="API URL" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">API URL</label>
          <input
            type="text"
            value={api}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Parameters */}
        <div className="mb-6 sm:mb-8">
          <label htmlFor="Parametrs" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            Parameters
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parameters.map((param) => (
              <div key={param}>
                <input
                  type="text"
                  value={param}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-gray-100 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Fetch Master Data Button */}
        <Button
          onClick={handleFetchMasterDetails}
          className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
          disabled={loading}
        >
          {loading ? "Fetching Master Data..." : "Fetch Master Data"}
        </Button>
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
            <Button
              onClick={generateRandomPassword}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={loadingPassword}
            >
              {loadingPassword ? "Generating Password..." : "Generate Random Password"}
            </Button>
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
