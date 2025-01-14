import React, { useState } from 'react';
import axios from 'axios';

const ApiButtons: React.FC = () => {
  const [masterData, setMasterData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [whoamiData, setWhoamiData] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null); // Track which operation is loading

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
      formData.append('', ''); // Empty form field

      const response = await axios.post(
        'https://io.claudion.com/api/method/claudion_io.portal.subscription.generate_token_secure',
        formData,
        {
          headers: {
            Cookie: 'full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=;',
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

  const fetchUserDetails = async () => {
    if (!masterData?.data?.access_token) {
      console.error('No access token found. Fetch master details first.');
      return;
    }

    setLoading('Fetching User Details...');
    try {
      const formData = new FormData();
      formData.append('username', '72763671@erpgulf.com0011');
      formData.append('password', '72763671@123');
      formData.append(
        'app_key',
        'MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ=='
      );
      formData.append('client_secret', 'cfd619c909');

      const response = await axios.post(
        'https://io.claudion.com/api/method/claudion_io.portal.subscription.generate_token_secure_for_users',
        formData,
        {
          headers: {
            Cookie: 'full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=;',
            Authorization: `Bearer ${masterData.data.access_token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUserData(response.data);
    } catch (error: any) {
      console.error('Error fetching user details:', error.response?.data || error.message);
    } finally {
      setLoading(null);
    }
  };

  const fetchWhoamiDetails = async () => {
    if (!userData?.data?.token?.access_token) {
      console.error('No user access token found. Fetch user details first.');
      return;
    }

    setLoading('Fetching Whoami Details...');
    try {
      const response = await axios.get(
        'https://io.claudion.com/api/method/gauth.gauth.gauth.whoami',
        {
          headers: {
            Authorization: `Bearer ${userData.data.token.access_token}`,
            Cookie: 'full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=;',
          },
        }
      );
      setWhoamiData(response.data);
    } catch (error: any) {
      console.error('Error fetching whoami details:', error.response?.data || error.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-1 min-h-screen flex flex-col items-center gap-6">
      <div className="w-full flex justify-center">
        <h1 className="text-2xl font-bold text-gray-800">API Data Fetcher</h1>
      </div>

      {loading && (
        <div className="text-lg text-blue-500 font-semibold animate-pulse">{loading}</div>
      )}

      <div className="p-2 mb-8 min-h-screen flex gap-6 items-center">
        <div>
          <button
            onClick={fetchMasterDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!!loading}
          >
            Fetch Master Details
          </button>
          <div className="w-full max-w-3xl bg-white p-4 rounded shadow mt-2">
            <h2 className="text-xl font-bold mb-2 text-black">Master Data:</h2>
            <pre className="text-sm bg-gray-200 p-2 rounded overflow-x-auto text-black">
              {masterData ? JSON.stringify(masterData, null, 2) : 'No data fetched yet.'}
            </pre>
          </div>
        </div>

        <div>
          <button
            onClick={fetchUserDetails}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={!masterData || !!loading}
          >
            Fetch User Details
          </button>
          <div className="w-full max-w-3xl bg-white p-4 rounded shadow mt-2">
            <h2 className="text-xl font-bold mb-2 text-black">User Data:</h2>
            <pre className="text-sm bg-gray-200 p-2 rounded overflow-x-auto text-black">
              {userData ? JSON.stringify(userData, null, 2) : 'No data fetched yet.'}
            </pre>
          </div>
        </div>

        <div>
          <button
            onClick={fetchWhoamiDetails}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            disabled={!userData || !!loading}
          >
            Fetch Whoami Details
          </button>
          <div className="w-full max-w-3xl bg-white p-4 rounded shadow mt-2">
            <h2 className="text-xl font-bold mb-2 text-black">Whoami Data:</h2>
            <pre className="text-sm bg-gray-200 p-2 rounded overflow-x-auto text-black">
              {whoamiData ? JSON.stringify(whoamiData, null, 2) : 'No data fetched yet.'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiButtons;
