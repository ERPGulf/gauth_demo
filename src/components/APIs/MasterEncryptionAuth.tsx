import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";

const MasterEncryptionAuth: React.FC = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>("Generate Encrypted Token");
  const [description, setDescription] = useState<string>(
    "This API generates an encrypted token using the provided encrypted key."
  );
  const [api, setApi] = useState<string>(
    `${import.meta.env.VITE_BASE_URL}gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_encrypt`
  );
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];

  const [masterData, setMasterData] = useState<any>(null);
  const [encryptedKey, setEncryptedKey] = useState<string | null>(null);
  const [encryptedData, setEncryptedData] = useState<any>(null);
  const [loading, setLoading] = useState<string | boolean | null>(null);

  useEffect(() => {
    if (location.state && location.state.masterApiData) {
      const { title, description, api } = location.state.masterApiData;
      setTitle(title);
      setDescription(description);
      setApi(api);

    }
  }, [location.state]);

  const handleFetchMasterDetails = async () => {
    setLoading(true);
    try {
      const payload = {
        api_key: import.meta.env.VITE_APP_gAUTH_API_KEY,
        api_secret: import.meta.env.VITE_APP_API_SECRET,
        app_key: import.meta.env.VITE_APP_APP_KEY,
        client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
      };

      const data = await fetchMasterDetails(payload);
      setMasterData(data);
    } catch (error: any) {
      console.error("Error fetching master details:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchEncryptedKey = async () => {
    if (!masterData || !masterData?.access_token) {
      console.error("Error: Fetch master API first");
      return;
    }
  
    const accessToken = masterData.access_token;
  
    setLoading("Fetching Encrypted Key...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}gauth_erpgulf.gauth_erpgulf.2fa.generate_encrypted_token`,
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
  
      console.log("🔍 Raw API Response:", response);  
      console.log("📌 Extracted Data:", response.data); 
  
      // Extract encrypted key correctly
      if (response?.data?.data) {
        setEncryptedKey(response.data.data);
        console.log("✅ Encrypted Key Set:", response.data.data);
      } else {
        console.error("❌ Unexpected Response Format:", response.data);
      }
    } catch (error: any) {
      console.error(
        "⚠️ Error fetching encrypted key:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(null);
    }
  };
  
  
  
  
  const fetchEncryptedData = async () => {
    if (!masterData || !masterData?.access_token) {
      throw new Error("Fetch master API first");
    }

    if (!encryptedKey) {
      throw new Error("Fetch master encryption key first");
    }

    const accessToken = masterData.access_token;

    setLoading("Encrypting Data...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_encrypt`,
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

      setEncryptedData(response.data);
    } catch (error: any) {
      console.error(
        "Error fetching encrypted token:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg">

      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            API URL
          </label>
          <input
            type="text"
            value={api}
            onChange={(e) => setApi(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            Parameters
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parameters.map((param, index) => (
              <div key={index}>
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


        <Button
          onClick={handleFetchMasterDetails}
          className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
          disabled={!!loading}
        >
          {loading === 'Fetching Master Details...' ? 'Loading...' : 'Proceed'}
        </Button>
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>

            <Button
              onClick={fetchEncryptedKey}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={!!loading}
            >
              {loading === 'Fetching Encrypted Key...' ? 'Loading...' : 'Fetch Encrypted Key'}
            </Button>

            {encryptedKey && (
              <>
                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                  <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Key:</h2>
                  <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                    {encryptedKey}
                  </pre>
                </div>

                <Button
                  onClick={fetchEncryptedData}
                  className=" mt-4 w-full py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                  disabled={!!loading}
                >
                  {loading === 'Encrypting Data...' ? 'Loading...' : 'Encrypt Data'}
                </Button>
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