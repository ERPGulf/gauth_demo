import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import { getMasterDataPayload } from "@/components/APIs/utils/payload";
import API_URL from "@/components/APIs/API-URL";

const TestRedirectAuth: React.FC = () => {
  const title = 'Test Redirect URL';
  const description = 'Tests the redirection functionality of a URL';
  const api = `${API_URL.BASE_URL}${API_URL.TEST_REDIRECT}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [testRedirectResponse, setTestRedirectResponse] = useState<any>(null);
  const [testRedirectLoading, setTestRedirectLoading] = useState<boolean>(false);
  const handleFetchMasterDetails = async () => {
    setLoading(true);
    try {
      const payload = getMasterDataPayload();
      const data = await fetchMasterDetails(payload);
      setMasterData(data);
    } catch (error) {
      console.error("Error fetching master details:", error);
    } finally {
      setLoading(false);
    }
  };
  const testRedirectingUrl = async () => {
    if (!masterData?.access_token) {
      console.error("Fetch master API first");
      return;
    }

    const accessToken = masterData.access_token;
    setTestRedirectLoading(true);

    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        validateStatus: (status) => status < 400, // Prevents throwing an error for 303
      });

      if (response.status === 303 && response.data?.redirect_url) {
        setTestRedirectResponse({
          message: "Redirect detected",
          redirect_url: response.data.redirect_url, // Save the redirect URL to UI
          status: 303,
        });
      } else {
        setTestRedirectResponse(response.data);
      }
    } catch (error: any) {
      setTestRedirectResponse({
        message: error.message,
        response: error.response?.data || "No response data",
        status: error.response?.status || "Unknown",
      });
      console.error("Error testing redirecting URL:", error);
    } finally {
      setTestRedirectLoading(false);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <div className="mb-6 sm:mb-8">
          <label htmlFor="title" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
          <input
            type="text"
            value={title}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <label htmlFor="description"  className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</label>
          <input
            type="text"
            value={description}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <label htmlFor="API URL" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">API URL</label>
          <input
            type="text"
            value={api}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 sm:mb-8">
          <label htmlFor="Parametrs"  className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
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
        <Button
          onClick={handleFetchMasterDetails}
          className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
          disabled={!!loading}
        >
          {loading ? 'Fetching...' : 'Proceed'}
        </Button>
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto ">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>
            <Button
              onClick={testRedirectingUrl}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={!!testRedirectLoading}
            >
              {testRedirectLoading ? 'Testing...' : 'Test Redirecting URL'}
            </Button>
            {testRedirectResponse && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">
                  Redirect Response:
                </h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(testRedirectResponse, null, 2)}
                </pre>

                {testRedirectResponse.redirect_url && (
                  <div className="mt-4">
                    <p className="text-gray-700 font-semibold">Redirect URL:</p>
                    <a
                      href={testRedirectResponse.redirect_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {testRedirectResponse.redirect_url}
                    </a>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TestRedirectAuth;
