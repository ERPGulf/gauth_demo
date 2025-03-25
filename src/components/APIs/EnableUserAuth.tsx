import React, { useState } from "react";
import axios from "axios";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import FetchButton from './utils/FetchButton';

interface EnableUserParams {
  username: string;
  email: string;
  mobile_no: string;
}
const EnableUserAuth: React.FC = () => {
  const title = "Enable User Account";
  const description = "Enables a user account by providing username, email, and mobile number.";
  const api = `${API_URL.BASE_URL}${API_URL.ENABLE_USER}`;

  // Parameters for enabling user (entered by user)
  const [enableUserParams, setEnableUserParams] = useState<EnableUserParams>({
    username: "",
    email: "",
    mobile_no: "",
  });
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [enableUserData, setEnableUserData] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEnableUser, setLoadingEnableUser] = useState<boolean>(false);
  // Handle input changes for enabling user
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnableUserParams((prev) => ({ ...prev, [name]: value }));
  };
  // Fetch master details
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };

  // Enable user account
  const enableUserAccount = async () => {
    if (!masterData?.access_token) {
      alert("Please fetch the master data first.");
      return;
    }
    const { username, email, mobile_no } = enableUserParams;
    if (!username || !email || !mobile_no) {
      alert("Please fill out all required fields.");
      return;
    }
    const apiFunction = async () => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("mobile_no", mobile_no);

      return await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${masterData.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    };

    const response = await handleApiCall(apiFunction, setLoadingEnableUser, "User account enabled successfully!");

    if (response) {
      setEnableUserData(response.data);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <InputField label="Title" value={title} readOnly />
        <InputField label="Description" value={description} readOnly />
        <InputField label="API URL" value={api} readOnly />

        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            User Details
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(enableUserParams).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="font-bold text-gray-700 mb-1 sm:mb-2">
                  {key}:
                </label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <FetchButton onClick={handleFetchMasterDetails} label="Fetch Master Data" loading={loading} />
        {masterData && (
          <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">
              Master Data:
            </h2>
            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
              {JSON.stringify(masterData, null, 2)}
            </pre>
          </div>
        )}
        {masterData?.access_token && (
          <>
            <FetchButton onClick={enableUserAccount} label="Enable User" loading={loadingEnableUser} />
            {enableUserData && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">
                  Enable User Response:
                </h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(enableUserData, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default EnableUserAuth;


