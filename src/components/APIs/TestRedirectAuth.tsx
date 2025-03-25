import React, { useState } from 'react';
import axios from 'axios';
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import ParameterList from "./utils/ParameterList";
import FetchButton from './utils/FetchButton';

interface RedirectResponse {
  status: string | number;
  url?: string;
  redirect_url?: string;
  message: string;
  response?: string;

}
const TestRedirectAuth: React.FC = () => {
  const title = 'Test Redirect URL';
  const description = 'Tests the redirection functionality of a URL';
  const api = `${API_URL.BASE_URL}${API_URL.TEST_REDIRECT}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [testRedirectResponse, setTestRedirectResponse] = useState<RedirectResponse | null>(null);
  const [testRedirectLoading, setTestRedirectLoading] = useState<boolean>(false);
  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };
  //test redirecting URL
  const testRedirectingUrl = async () => {
    if (!masterData?.access_token) {
      console.error("Fetch master API first");
      return;
    }
    const accessToken = masterData.access_token;
    const apiFunction = async () => {
      const response = await axios.get(api, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: (status) => status < 400,
      });
      return response.status === 303 && response.data?.redirect_url
        ? { message: "Redirect detected", redirect_url: response.data.redirect_url, status: 303 }
        : response.data;
    };
    const data = await handleApiCall(apiFunction, setTestRedirectLoading);
    if (data) {
      setTestRedirectResponse(data);
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
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto ">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>
            <FetchButton onClick={testRedirectingUrl} label="fetch redirecting URL" loading={testRedirectLoading} />
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
