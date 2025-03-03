import React, { useState } from "react";
import axios from "axios";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import FetchButton from './utils/FetchButton';
const UpdatePasswordAuth: React.FC = () => {
  const title = "Update User Password";
  const description = "Updates a user's password by providing username and new password.";
  const api = `${API_URL.BASE_URL}${API_URL.UPDATE_PASSWORD}`;
  const [updatePasswordParams, setUpdatePasswordParams] = useState({
    username: "",
    password: "",
  });
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [updatePasswordData, setUpdatePasswordData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState<boolean>(false);

  // Fetch master token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };
  // Update User Password
  const updateUserPassword = async () => {
    if (!masterData?.access_token) {
      alert("Please fetch the master data first.");
      return;
    }
    if (!updatePasswordParams.username || !updatePasswordParams.password) {
      alert("Please fill out all the fields.");
      return;
    }
    const apiFunction = async () => {
      const formData = new FormData();
      Object.entries(updatePasswordParams).forEach(([key, value]) =>
        formData.append(key, value)
      );
      return await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${masterData.access_token}`,
        },
      });
    };
    const response = await handleApiCall(apiFunction, setLoadingUpdatePassword, "User password updated successfully!");
    if (response) {
      setUpdatePasswordData(response.data);
    }
  };


  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <InputField label="Title" value={title} readOnly />
        <InputField label="Description" value={description} readOnly />
        <InputField label="API URL" value={api} readOnly />
        <div className=" mb-6 sm:mb-8">
          <label htmlFor="Parameters" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Update Password Parameters</label>
          <h5 className="text-gray-500">(please enter valid user details)</h5>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(updatePasswordParams).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4 mb-2">
                <label htmlFor="Parametrs" className=" font-bold text-gray-700 mb-1 sm:mb-2">{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setUpdatePasswordParams((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <FetchButton onClick={handleFetchMasterDetails} label="Fetch Master Data" loading={loading} />
        {masterData && (
          <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
              {JSON.stringify(masterData, null, 2)}
            </pre>
          </div>
        )}

        {masterData?.access_token && (
          <>
            <FetchButton onClick={updateUserPassword} label="Update Password" loading={loadingUpdatePassword} />
            {updatePasswordData && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">
                  Update Password Response:
                </h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(updatePasswordData, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UpdatePasswordAuth;
