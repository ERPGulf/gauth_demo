import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/API-URL";

const IsUserAvailableAuth: React.FC = () => {
  const title = "Check if User is Available";
  const description = "Checks if a user is available based on mobile phone and email.";
  const api = `${API_URL.BASE_URL}${API_URL.IS_USER_AVAILABLE}`;
  // Parameters for checking user availability (entered by user)
  const [isUserAvailableParams, setIsUserAvailableParams] = useState({
    mobile_phone: "",
    user_email: "",
  });

  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [userAvailabilityData, setUserAvailabilityData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUserAvailability, setLoadingUserAvailability] = useState<boolean>(false);

  // Fetch master details
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

  // Check if user is available
  const checkUserAvailability = async () => {
    if (!masterData?.access_token) {
      alert("Please fetch the master data first.");
      return;
    }
    if (!isUserAvailableParams.mobile_phone || !isUserAvailableParams.user_email) {
      alert("Please fill out all the fields.");
      return;
    }

    setLoadingUserAvailability(true);
    try {
      const formData = new FormData();
      Object.entries(isUserAvailableParams).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${masterData.access_token}`,
        },
        params: {
          mobile_phone: isUserAvailableParams.mobile_phone,
          user_email: isUserAvailableParams.user_email,
        },
      });
      setUserAvailabilityData(response);
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred.";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Error checking user availability:", errorMessage);
    }
    setLoadingUserAvailability(false);
  }


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

        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Is User Available Parameters</label>
          <h4 className="text-gray-500">(please enter valid user details)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(isUserAvailableParams).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="font-bold text-gray-700 mb-1 sm:mb-2">{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setIsUserAvailableParams((prev) => ({
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
          onClick={handleFetchMasterDetails}
          className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
          disabled={loading}
        >
          {loading ? "Fetching Master Data..." : "Fetch Master Data"}
        </Button>

        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>

            <Button
              onClick={checkUserAvailability}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={loadingUserAvailability}
            >
              {loadingUserAvailability
                ? "Checking User Availability..."
                : "Check User Availability"}
            </Button>

            {userAvailabilityData && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">
                  User Availability Response:
                </h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(userAvailabilityData, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IsUserAvailableAuth;
