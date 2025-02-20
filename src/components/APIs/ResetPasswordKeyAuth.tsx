import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import { getMasterDataPayload } from "@/components/APIs/utils/payload";
import API_URL from "@/components/APIs/API-URL";

const ResetPasswordKeyAuth: React.FC = () => {
  const title = 'Update Password Using Reset Key API';
  const description = 'This API updates the password for a user using a reset key. It requires a valid access token for authentication, along with the new password, reset key, and username as input parameters.';
  const api = `${API_URL.BASE_URL}${API_URL.UPDATE_PASSWORD_USING_RESETKEY}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<any>(null);
  const [loading, setLoading] = useState<string | boolean | null>(null);
  const [resetKeyData, setResetKeyData] = useState<any>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [resetKey, setResetKey] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [mobile, setMobile] = useState('');
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

  const generateResetPasswordKey = async () => {
    setLoading('Generating Reset Password Key...');
    try {
      if (!username || !mobile) {
        throw new Error('Please enter a valid username and mobile number.');
      }
      if (!masterData?.access_token) {
        throw new Error('Fetch master API first');
      }
      const accessToken = masterData.access_token;
      const formData = new FormData();
      formData.append('user', username);
      formData.append('mobile', mobile);
      const response = await axios.post(
        `${API_URL.BASE_URL}${API_URL.GENERATE_RESET_PASSWORD_KEY}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setResetKeyData(response.data);
      alert(`Reset key has been sent for username ${username}`);
    } catch (error: any) {
      console.error('Error generating reset password key:', error.response?.data || error.message);
      alert(`Failed to generate reset password key: ${error.message}`);
    } finally {
      setLoading(null);
    }
  };

  const updatePassword = async () => {
    setLoading('Updating Password...');
    try {
      if (!newPassword || !resetKey || !username) {
        throw new Error('All fields are required.');
      }

      if (!masterData?.access_token) {
        throw new Error('Fetch master API first to get the access token.');
      }

      const accessToken = masterData.access_token;
      const requestData = new URLSearchParams();
      requestData.append('new_password', newPassword);
      requestData.append('reset_key', resetKey);
      requestData.append('username', username);
      const response = await axios.post(
        api,
        requestData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('Response:', response.data);

      alert('Password updated successfully.');
    } catch (error: any) {
      console.error('Error updating password:', error.response?.data || error.message);
      alert(`Failed to update password: ${error.message}`);
    } finally {
      setLoading(null);
    }
  };
  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <div className="mb-6 sm:mb-8">
          <label htmlFor="Title" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
          <input
            type="text"
            value={title}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <label htmlFor="Description"className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</label>
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
          <label htmlFor="Parameters" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
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
          {loading ? 'Loading...' : 'Proceed'}
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
          <>
            <div className="mt-6">
              <label className="block font-bold text-gray-700 mb-2">Username</label>
              <input
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <label className="block font-bold text-gray-700 mb-2">mobile:</label>
              <input
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <Button
              onClick={generateResetPasswordKey}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={!!loading}
            >
              {loading ? 'Loading...' : 'Generate Reset Password Key'}
            </Button>
          </>
        )}
        {resetKeyData && (
          <>
            <div className="mt-6">
              <label className="block font-bold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-6">
              <label className="block font-bold text-gray-700 mb-2">Reset Key</label>
              <input
                type="text"
                value={resetKey}
                onChange={(e) => setResetKey(e.target.value)}
                placeholder="Enter the reset key received via email"
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-6">
              <label className="block font-bold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={updatePassword}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={!!loading}
            >
              {loading ? 'Loading...' : 'Update Password'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordKeyAuth;
