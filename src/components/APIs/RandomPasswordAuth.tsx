import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction"; // Import fetchMasterDetails function

const RandomPasswordAuth: React.FC = () => {
  const [title, setTitle] = useState<string>("Generate Random Password");
  const [description, setDescription] = useState<string>(
    "Generates a secure random password"
  );
  const [api, setApi] = useState<string>(
    "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_random_password"
  );
  const [parameters, setParameters] = useState({
    api_key: "Administrator",
    api_secret: "Friday2000@T",
    app_key:
      "MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ==",
    client_secret: "cfd619c909",
  });

  const [masterData, setMasterData] = useState<any>(null);
  const [randomPasswordData, setRandomPasswordData] = useState<any>(null);
  const [loadingMasterData, setLoadingMasterData] = useState<boolean>(false);
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);

  const handleFetchMasterDetails = async () => {
    setLoadingMasterData(true);
    try {
      const data = await fetchMasterDetails(parameters);
      setMasterData(data); // Store the entire master data
    } catch (error: any) {
      console.error(
        "Error fetching master details:",
        error.response?.data || error.message
      );
      alert("Failed to fetch master details. Please try again.");
    } finally {
      setLoadingMasterData(false);
    }
  };

  const generateRandomPassword = async () => {
    if (!masterData?.data?.access_token) {
      alert("Please fetch the master data first.");
      return;
    }

    setLoadingPassword(true);
    try {
      const response = await axios.post(api, null, {
        headers: {
          Authorization: `Bearer ${masterData.data.access_token}`,
        },
      });
      setRandomPasswordData(response.data);
    } catch (error: any) {
      console.error(
        "Error generating random password:",
        error.response?.data || error.message
      );
      alert("Failed to generate random password. Please try again.");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">API URL</label>
          <input
            type="text"
            value={api}
            onChange={(e) => setApi(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Parameters</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(parameters).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="font-bold text-gray-700 mb-1 sm:mb-2">{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setParameters((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleFetchMasterDetails}
          className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
          disabled={loadingMasterData}
        >
          {loadingMasterData ? "Fetching Master Data..." : "Fetch Master Data"}
        </Button>

        {masterData && (
          <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
              {JSON.stringify(masterData, null, 2)}
            </pre>
          </div>
        )}

        {masterData?.data?.access_token && (
          <>
            <Button
              onClick={generateRandomPassword}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={loadingPassword}
            >
              {loadingPassword ? "Generating Password..." : "Generate Random Password"}
            </Button>

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
