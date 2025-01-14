import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { Button } from "@/components/ui/button";

import 'react-toastify/dist/ReactToastify.css';

const UserEncryptionAuth: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();

  const [title, setTitle] = useState('Generate User Encrypted Token');
  const [description, setDescription] = useState('This API generates an encrypted token for the user using the provided encrypted key.');
  const [apiUrl, setApiUrl] = useState('https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_encrypt_for_user');
  const [parameters, setParameters] = useState({
    encrypted_key: 'WU1LXF1yWUBKRFJGUEYXVlxfCw5/R1pWUE0LBQMCcWADD35IfAVjX1dZfFlsT35IVkx3X34Df2NzXH1lYENgT3YBaF5gBmpYfE1jcWYHfwZ8Bnx2Y1xjWHYHf15sBX0AY110YmVYa3N8BWlYdAB2cn4DfFl0BH5jDAk=',
    username: 'hyrin@htsqatar.com',
    password: 'Friday2000@T',
    app_key: 'MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ==',
  });
  const [masterData, setMasterData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [encryptedTokenData, setEncryptedTokenData] = useState<any>(null);
  const [encryptedKey, setEncryptedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.userApiData) {
      const { title, description, api, parameters } = location.state.userApiData;
      setTitle(title);
      setDescription(description);
      setApiUrl(api);
      setParameters(parameters);
    }
  }, [location.state]);

  const fetchMasterDetails = async () => {
    setLoading('Fetching Master Details...');
    try {
      const formData = new FormData();
      formData.append('api_key', 'Administrator');
      formData.append('api_secret', 'Friday2000@T');
      formData.append('app_key', parameters.app_key);
      formData.append('client_secret', 'cfd619c909');

      const response = await axios.post(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMasterData(response.data);
    } catch (error: any) {
      console.error('Error fetching master details:', error.response?.data || error.message);
      toast({ title: 'Error', description: 'Failed to fetch master data.' });
    } finally {
      setLoading(null);
    }
  };

  const fetchUserDetails = async () => {
    try {
      if (!masterData || !masterData?.data?.access_token) {
        throw new Error("Fetch master API first");
      }
      const accessToken = masterData.data.access_token;

      const { username, password, app_key } = parameters;

      if (!username || !password || !app_key) {
        throw new Error("Missing required parameters: username, password, or app_key.");
      }

      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('app_key', app_key);
      formData.append('client_secret', 'cfd619c909');

      const response = await axios.post(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure_for_users',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUserData(response.data);
    } catch (error: any) {
      console.error('Error fetching user details:', error.response?.data || error.message);
      toast({ title: 'Error', description: 'Failed to fetch user data.' });
    } finally {
      setLoading(null);
    }
  };

  const fetchUserEncryptedKey = async () => {
    if (!masterData || !masterData.data?.access_token) {
      throw new Error("Fetch master API first");
    }

    const accessToken = masterData.data.access_token;

    setLoading('Fetching Encrypted Key...');
    try {
      const response = await axios.post(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.test_generate_token_encrypt_for_user',
        new URLSearchParams({
          text_for_encryption: 'hyrin@htsqatar.com::Friday2000@T::MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ==',
        }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setEncryptedKey(response.data.message);
    } catch (error: any) {
      console.error('Error fetching user encryption key:', error.response?.data || error.message);
      toast({ title: 'Error', description: 'Failed to fetch user encryption key.' });
    } finally {
      setLoading(null);
    }
  };

  const fetchUserEncryptedToken = async () => {
    if (!masterData || !masterData.data?.access_token) {
      throw new Error("Fetch master API first");
    }

    if (!encryptedKey) {
      throw new Error("Fetch master encryption key first");
    }

    const accessToken = masterData.data.access_token;

    setLoading('Encrypting Data...');
    try {
      const response = await axios.post(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_encrypt_for_user',
        new URLSearchParams({
          encrypted_key: encryptedKey,
        }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setEncryptedTokenData(response.data);
    } catch (error: any) {
      console.error('Error fetching encrypted token data:', error.response?.data || error.message);
      toast({ title: 'Error', description: 'Failed to fetch encrypted token data.' });
    } finally {
      setLoading(null);
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
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
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
          {loading === 'Fetching Master Details...' ? 'Loading...' : 'Proceed'}
        </Button>

        {masterData && (
          <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
              {JSON.stringify(masterData, null, 2)}
            </pre>
          </div>
        )}

        {masterData && (
          <Button
            onClick={fetchUserDetails}
            className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
            disabled={!!loading}
          >
            {loading === 'Fetching User Details...' ? 'Loading...' : 'Fetch User Data'}
          </Button>
        )}

        {userData && (
          <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">User Data:</h2>
            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        )}

        {userData && (
          <Button
            onClick={fetchUserEncryptedKey}
            className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
            disabled={!!loading}
          >
            {loading === 'Fetching Encrypted Key...' ? 'Loading...' : 'Fetch User Encrypted Key'}
          </Button>
        )}

        {encryptedKey && (
          <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Key:</h2>
            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
              {encryptedKey}
            </pre>
          </div>
        )}

        {encryptedKey && (
          <Button
            onClick={fetchUserEncryptedToken}
            className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
            disabled={!!loading}
          >
            {loading === 'Fetching Encrypted Token...' ? 'Loading...' : 'Fetch Encrypted Token'}
          </Button>
        )}

        {encryptedTokenData && (
          <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Token Data:</h2>
            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
              {JSON.stringify(encryptedTokenData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEncryptionAuth;
