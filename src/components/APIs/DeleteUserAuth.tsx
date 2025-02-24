import React, { useState } from "react";
import axios,{ AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/API-URL";

const DeleteUserComponent: React.FC = () => {
  const title = "Delete User API";
  const description = "Delete a user account by providing email and mobile number.";
  const api = `${API_URL.BASE_URL}${API_URL.DELETE_USER}`;
  const [parameters, setParameters] = useState({ email: "", mobile_no: "" });
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState<{ message: string } | null>(null);

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
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        console.error("Error deleting user:", error.response?.data || error.message);
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

        <div className="mb-6 sm:mb-8">
          <label htmlFor="title" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
          <input type="text" value={title} readOnly className="w-full p-3 border border-gray-300 rounded-lg text-gray-800" />
        </div>

        <div className="mb-6 sm:mb-8">
          <label htmlFor="description" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</label>
          <input type="text" value={description} readOnly className="w-full p-3 border border-gray-300 rounded-lg text-gray-800" />
        </div>

        <div className="mb-6 sm:mb-8">
          <label htmlFor="API URL" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">API URL</label>
          <input type="text" value={api} readOnly className="w-full p-3 border border-gray-300 rounded-lg text-gray-800" />
        </div>

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
        <Button onClick={handleFetchMasterDetails} className="w-full py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70" disabled={loading}>
          {loading ? "Fetching Data..." : "Fetch Master Data"}
        </Button>
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 rounded-lg text-gray-800">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>
            <Button onClick={handleDeleteUser} className="mt-4 w-full py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70" disabled={loading}>
              {loading ? "Deleting..." : "Delete User"}
            </Button>
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
