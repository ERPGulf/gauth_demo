import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";


const ResetPasswordKeyAuth: React.FC = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>('Update Password Using Reset Key API');
  const [description, setDescription] = useState<string>('This API updates the password for a user using a reset key. It requires a valid access token for authentication, along with the new password, reset key, and username as input parameters.');
  const [api, setApi] = useState<string>(
    "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_reset_key",
  );
  const [parameters, setParameters] = useState<Record<string, string>>({
    api_key: 'Administrator',
    api_secret: 'Friday2000@T',
    app_key:
      'MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ==',
  });

  const [masterData, setMasterData] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [resetKeyData, setResetKeyData] = useState<any>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [resetKey, setResetKey] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [mobile, setMobile] = useState('');

  useEffect(() => {
    if (location.state && location.state.masterApiData) {
      const { title, description, api, parameters } = location.state.masterApiData;
      setTitle(title);
      setDescription(description);
      setApi(api);
      setParameters(parameters);
    }
  }, [location.state]);

  const fetchMasterDetails = async () => {
    setLoading('Fetching Master Details...');
    try {
      const formData = new FormData();
      formData.append('api_key', parameters.api_key);
      formData.append('api_secret', parameters.api_secret);
      formData.append('app_key', parameters.app_key);
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



  const generateResetPasswordKey = async () => {
    setLoading('Generating Reset Password Key...');
    try {
      // Validate username and mobile
      if (!username || !mobile) {
        throw new Error('Please enter a valid username and mobile number.');
      }

      // Check for access_token
      if (!masterData || !masterData?.data?.access_token) {
        throw new Error('Fetch master API first');
      }

      const accessToken = masterData.data.access_token;

      // Create FormData instance and append fields
      const formData = new FormData();
      formData.append('user', username); // Use username instead of email
      formData.append('mobile', mobile); // Use the correct mobile number input

      // Make the API request
      const response = await axios.post(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_generate_reset_password_key',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Display a success message or log the response
      console.log('Reset password key generated successfully:', response.data);

      // Set reset key data (response contains confirmation or key info)
      setResetKeyData(response.data);
      alert(`Reset key has been sent for username ${username}`);
    } catch (error: any) {
      // Improved error handling
      console.error(
        'Error generating reset password key:',
        error.response?.data || error.message
      );
      alert(`Failed to generate reset password key: ${error.message}`);
    } finally {
      setLoading(null); // Reset loading state
    }
  };


  const updatePassword = async () => {
    setLoading('Updating Password...');
    try {
      // Validate required inputs
      if (!newPassword) {
        throw new Error('Please enter a new password.');
      }
      if (!resetKey) {
        throw new Error('Please enter the reset key.');
      }
      if (!username) {
        throw new Error('Please enter the username.');
      }

      // Check for access_token
      if (!masterData || !masterData?.data?.access_token) {
        throw new Error('Fetch master API first to get the access token.');
      }

      const accessToken = masterData.data.access_token;

      // Prepare data using URLSearchParams
      const requestData = new URLSearchParams();
      requestData.append('new_password', newPassword);
      requestData.append('reset_key', resetKey);
      requestData.append('username', username);

      // Make the API request
      const response = await axios.post(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_reset_key',
        requestData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Correct content type for URLSearchParams
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Success response handling
      console.log('Password updated successfully:', response.data);
      alert('Password updated successfully.');
    } catch (error: any) {
      // Improved error handling
      console.error(
        'Error updating password:',
        error.response?.data || error.message
      );
      alert(`Failed to update password: ${error.message}`);
    } finally {
      setLoading(null); // Reset loading state
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
          onClick={fetchMasterDetails}
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
