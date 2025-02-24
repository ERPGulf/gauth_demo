import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/API-URL";

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
  const handleFetchMasterDetails = async () => {
    setLoading(true);
    try {
      const data = await fetchMasterDetails();
      setMasterData(data);
    } catch (error) {
      console.error("Error fetching master details:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateUserPassword = async () => {
    if (!masterData?.access_token) {
      alert("Please fetch the master data first.");
      return;
    }

    if (!updatePasswordParams.username || !updatePasswordParams.password) {
      alert("Please fill out all the fields.");
      return;
    }

    setLoadingUpdatePassword(true);
    try {
      const formData = new FormData();
      Object.entries(updatePasswordParams).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const response = await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${masterData.access_token}`,
        },
      });
      try {
        setUpdatePasswordData(response.data);
      } catch (error: unknown) {
        let errorMessage = "An unknown error occurred.";
        let responseData: unknown = "No response data";

        if (error instanceof AxiosError) {
          errorMessage = error.message;
          responseData = error.response?.data || responseData;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        console.error("Error updating user password:", responseData || errorMessage);
        alert("Failed to update user password. Please try again.");
      }

    } finally {
      setLoadingUpdatePassword(false);
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
          <label htmlFor="Description" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</label>
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

        <Button
          onClick={handleFetchMasterDetails}
          className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/70"
          disabled={loading}
        >
          {loading ? "Fetching Master Data..." : "Fetch Master Data"}
        </Button>

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
            <Button
              onClick={updateUserPassword}
              className="mt-4 w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/70"
              disabled={loadingUpdatePassword}
            >
              {loadingUpdatePassword
                ? "Updating Password..."
                : "Update User Password"}
            </Button>

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
