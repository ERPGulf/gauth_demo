import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";

const IsApiRequestAuth: React.FC = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>('Check API Request"');
  const [description, setDescription] = useState<string>('Checks the status of an API request ');
  const [api, setApi] = useState<string>(
    'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.is_api_request'
  );
  const [parameters, setParameters] = useState<Record<string, string>>({
    full_name: '',
    user_id: '',
  });

  const [masterData, setMasterData] = useState<any>(null);
  const [loading, setLoading] =  useState(false);
  const [isApiRequestResponse, setIsApiRequestResponse] = useState<any>(null);
  const [isApiRequestLoading, setIsApiRequestLoading] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.masterApiData) {
      const { title, description, parameters } = location.state.masterApiData;
      setTitle(title);
      setDescription(description);
      setParameters(parameters);
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
    
        // Pass the payload to the fetchMasterDetails function
        const data = await fetchMasterDetails(payload); // Updated to pass parameters
        setMasterData(data);
      } catch (error: any) {
        console.error("Error fetching master details:", error.message);
      } finally {
        setLoading(false);
      }
    };
    
  const isApiRequest = async () => {
    if (!masterData || !masterData?.access_token) {
      throw new Error('Fetch master API first');
    }

    const accessToken = masterData.access_token;

    setIsApiRequestLoading('Checking API Request...');
    try {
      const response = await axios.get(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.is_api_request', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
      });
      setIsApiRequestResponse(response.data);
    } catch (error: any) {
      console.error('Error checking API request:', error.response?.data || error.message);
    } finally {
      setIsApiRequestLoading(null);
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
          disabled={!!loading}
        >
          {loading ? 'Fetching...' : 'Proceed'}
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
              onClick={isApiRequest}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={!!isApiRequestLoading}
            >
              {isApiRequestLoading ? 'Checking...' : 'Is API Request'}
            </Button>

            {isApiRequestResponse && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">API Request Response:</h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(isApiRequestResponse, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IsApiRequestAuth;