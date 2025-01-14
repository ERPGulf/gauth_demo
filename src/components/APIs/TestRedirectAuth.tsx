import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const TestRedirectAuth: React.FC = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>('Test Redirect URL');
  const [description, setDescription] = useState<string>('Tests the redirection functionality of a URL');
  const [api, setApi] = useState<string>(
    'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.test_redirect_url'
  );
  const [parameters, setParameters] = useState<Record<string, string>>({
    full_name: 'Guest',
    user_id: 'Guest',
  });

  const [masterData, setMasterData] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [testRedirectResponse, setTestRedirectResponse] = useState<any>(null);
  const [testRedirectLoading, setTestRedirectLoading] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.masterApiData) {
      const { title, description, parameters } = location.state.masterApiData;
      setTitle(title);
      setDescription(description);
      setParameters(parameters);
    }
  }, [location.state]);

  const fetchMasterDetails = async () => {
    setLoading('Fetching Master Details...');
    try {
      const formData = new FormData();
      formData.append('api_key', 'Administrator');
      formData.append('api_secret', 'Friday2000@T');
      formData.append(
        'app_key',
        'MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ=='
      );
      formData.append('client_secret', 'cfd619c909');

      const response = await axios.post(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMasterData(response.data);
    } catch (error: any) {
      console.error('Error fetching master details:', error.response?.data || error.message);
    } finally {
      setLoading(null);
    }
  };

  const testRedirectingUrl = async () => {
    if (!masterData || !masterData.data?.access_token) {
      throw new Error('Fetch master API first');
    }

    const accessToken = masterData.data.access_token;

    setTestRedirectLoading('Testing redirecting URL...');
    try {
      const response = await axios.get(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.test_redirect_url', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
      });
      setTestRedirectResponse(response.data);
    } catch (error: any) {
      console.error('Error testing redirecting URL:', error.response?.data || error.message);
    } finally {
      setTestRedirectLoading(null);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg">
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
          onClick={fetchMasterDetails}
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
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto sm:overflow-y-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Redirect Response:</h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(testRedirectResponse, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TestRedirectAuth;
