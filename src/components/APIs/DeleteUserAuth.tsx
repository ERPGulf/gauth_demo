import React, { useState } from "react";
import axios from "axios";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import FetchButton from './utils/FetchButton';

const DeleteUserComponent: React.FC = () => {
  const title = "Delete User API";
  const description = "Delete a user account by providing email and mobile number.";
  const api = `${API_URL.BASE_URL}${API_URL.DELETE_USER}`;
  const [parameters, setParameters] = useState({ email: "", mobile_no: "" });
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState<{ message: string } | null>(null);

  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };
  /// Delete User
  const handleDeleteUser = async () => {
    const { email, mobile_no } = parameters;
    if (!email || !mobile_no) {
      alert("Please provide email and mobile number.");
      return;
    }
    const accessToken = masterData?.access_token;
    if (!accessToken) {
      alert("Access token is missing. Please fetch master data first.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.delete(api, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: { email, mobile_no },
      });

      setDeleteResponse(response.data);
      alert("User deleted successfully.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting user:", error.response?.data ?? error.message);
      } else if (error instanceof Error) {
        console.error("Error deleting user:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">

        <InputField label="Title" value={title} readOnly />
        <InputField label="Description" value={description} readOnly />
        <InputField label="API URL" value={api} readOnly />

        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Parameters</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(parameters).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label htmlFor="Parameters" className="font-bold text-gray-700 mb-1">{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setParameters((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="p-3 border border-gray-300 rounded-lg text-gray-800"
                />
              </div>
            ))}
          </div>
        </div>
        <FetchButton onClick={handleFetchMasterDetails} label="Fetch Master Data" loading={loading} />
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 rounded-lg text-gray-800">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>
            <FetchButton onClick={handleDeleteUser} label="Delete User" loading={loading} />
            {deleteResponse && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-2 text-gray-800">Response:</h2>
                <pre className="text-sm bg-gray-100 p-3 rounded-lg text-gray-800">
                  {JSON.stringify(deleteResponse, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default DeleteUserComponent;
