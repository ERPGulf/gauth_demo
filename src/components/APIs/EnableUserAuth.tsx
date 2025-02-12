import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";

interface EnableUserParams {
  username: string;
  email: string;
  mobile_no: string;
}

const EnableUserAuth: React.FC = () => {
  const [title, setTitle] = useState<string>("Enable User Account");
  const [description, setDescription] = useState<string>(
    "Enables a user account by providing username, email, and mobile number."
  );
  const [api, setApi] = useState<string>(
    "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_user_enable"
  );

  // Parameters for enabling user (entered by user)
  const [enableUserParams, setEnableUserParams] = useState<EnableUserParams>({
    username: "",
    email: "",
    mobile_no: "",
  });

  const [masterData, setMasterData] = useState<any>(null);
  const [enableUserData, setEnableUserData] = useState<any>(null);
  const [loadingMasterData, setLoadingMasterData] = useState<boolean>(false);
  const [loadingEnableUser, setLoadingEnableUser] = useState<boolean>(false);

  // Handle input changes for enabling user
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnableUserParams((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch master details
  const handleFetchMasterDetails = async () => {
    setLoadingMasterData(true); // Corrected loading state
    try {
      const payload = {
        api_key: import.meta.env.VITE_APP_gAUTH_API_KEY,
        api_secret: import.meta.env.VITE_APP_API_SECRET,
        app_key: import.meta.env.VITE_APP_APP_KEY,
        client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
      };

      // Pass the payload to the fetchMasterDetails function
      const data = await fetchMasterDetails(payload); // Updated to pass parameters
      setMasterData(data);
    } catch (error: any) {
      console.error("Error fetching master details:", error.message);
    } finally {
      setLoadingMasterData(false); // Corrected loading state
    }
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

  setLoadingEnableUser(true);

  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mobile_no", mobile_no);

    console.log("Sending data to API:", { username, email, mobile_no });

    const response = await axios.post(api, formData, {
      headers: {
        Authorization: `Bearer ${masterData.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Log the response for debugging
    console.log("API Response:", response);

    // Handle the API response
    if (response.data && typeof response.data === "object") {
      const { message, user_count } = response.data;

      if (message && typeof user_count === "number") {
        setEnableUserData(response.data); // Store the response data
        alert(message); // Display the success message
      } else {
        alert("Unexpected response format. Please check the API response structure.");
        console.error("Unexpected response:", response.data);
      }
    } else {
      alert("Unexpected response format. Response is not an object.");
      console.error("Unexpected response format:", response);
    }
  } catch (error: any) {
    // Handle server and network errors
    if (error.response) {
      console.error("Error response from server:", error.response);
      const errorMessage = error.response.data?.message || "An unknown error occurred.";
      alert(`Failed to enable user account: ${errorMessage}`);
    } else {
      console.error("Network or other error:", error);
      alert("Failed to enable user account. Please check your network connection.");
    }
  } finally {
    setLoadingEnableUser(false);
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

        <Button
          onClick={handleFetchMasterDetails}
          className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
          disabled={loadingMasterData}
        >
          {loadingMasterData ? "Fetching Master Data..." : "proceed"}
        </Button>

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
            <Button
              onClick={enableUserAccount}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={loadingEnableUser}
            >
              {loadingEnableUser
                ? "Enabling User Account..."
                : "Enable User Account"}
            </Button>

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


