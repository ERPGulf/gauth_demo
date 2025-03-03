import React, { useState } from 'react';
import axios from 'axios';
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import FetchButton from './utils/FetchButton';
import ParameterList from "./utils/ParameterList";

const ResetPasswordKeyAuth: React.FC = () => {
  const title = 'Update Password Using Reset Key API';
  const description = 'This API updates the password for a user using a reset key. It requires a valid access token for authentication, along with the new password, reset key, and username as input parameters.';
  const api = `${API_URL.BASE_URL}${API_URL.UPDATE_PASSWORD_USING_RESETKEY}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null); const [loading, setLoading] = useState<string | boolean | null>(null);
  const [resetKeyData, setResetKeyData] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [resetKey, setResetKey] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [mobile, setMobile] = useState('');

  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };

  // Reset Password Key
  const generateResetPasswordKey = async () => {
    if (!username || !mobile) {
      alert("Please enter a valid username and mobile number.");
      return;
    }
    if (!masterData?.access_token) {
      alert("Fetch master API first");
      return;
    }
    const fetchResetPasswordKey = async () => {
      const accessToken = masterData.access_token;

      // Use URLSearchParams to match application/x-www-form-urlencoded format
      const requestData = new URLSearchParams();
      requestData.append("recipient", username); // Assuming username is the email
      requestData.append("mobile", mobile);

      const response = await axios.post(
        `${API_URL.BASE_URL}${API_URL.GENERATE_RESET_PASSWORD_KEY}`,
        requestData.toString(), // Ensure correct format
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Change to match the API
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    };
    const resetKey = await handleApiCall(
      fetchResetPasswordKey,
      setLoading,
      `Reset key has been sent to ${username}`
    );
    if (resetKey) setResetKeyData(resetKey);
  };

  // Update Password
  const updatePassword = async () => {
    if (!newPassword || !resetKey || !username) {
      alert('All fields are required.');
      return;
    }

    if (!masterData?.access_token) {
      alert('Fetch master API first to get the access token.');
      return;
    }
    const fetchUpdatePassword = async () => {
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
      return response.data;
    };

    await handleApiCall(fetchUpdatePassword, setLoading, 'Password updated successfully.');
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <InputField label="Title" value={title} readOnly />
        <InputField label="Description" value={description} readOnly />
        <InputField label="API URL" value={api} readOnly />
        <ParameterList parameters={parameters} />
        <FetchButton onClick={handleFetchMasterDetails} label="Proceed" loading={loading} />
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
            <FetchButton onClick={generateResetPasswordKey} label="generate Reset Password Key" loading={loading} />
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
            <FetchButton onClick={updatePassword} label="Update Password" loading={loading} />
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordKeyAuth;
