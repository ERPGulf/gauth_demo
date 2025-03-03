import React, { useState } from 'react';
import axios from 'axios';
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import FetchButton from './utils/FetchButton';

const CustomerDetailsAuth: React.FC = () => {
  const title = 'Customer Details API';
  const description = 'Fetches the customer details';
  const api = `${API_URL.BASE_URL}${API_URL.CUSTOMER_DETAILS}`;
  const [parameters, setParameters] = useState<Record<string, string>>({
    mobile_phone: '',
    user_email: '',
  });
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [customerData, setCustomerData] = useState(null);
  const [customerLoading, setCustomerLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };
  // Fetch Customer Details
  const fetchCustomerDetails = async () => {
    const accessToken = masterData?.access_token;
    console.log("Bearer Token before API call:", accessToken);
    if (!accessToken) {
      console.warn("Authorization token is missing. Fetching customer details aborted.");
      return;
    }
    const apiFunction = async () => {
      return await axios.get(api, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
        params: parameters,
      });
    };
    const response = await handleApiCall(apiFunction, setCustomerLoading, "Customer details fetched successfully!");
    if (response) {
      setCustomerData(response.data);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <InputField label="Title" value={title} readOnly />
        <InputField label="Description" value={description} readOnly />
        <InputField label="API URL" value={api} readOnly />
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

        <FetchButton onClick={handleFetchMasterDetails} label="Fetch Master Data" loading={loading} />

        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>

            <FetchButton onClick={fetchCustomerDetails} label="Fetch Customer Details" loading={customerLoading} />

            {customerData && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Customer Data:</h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(customerData, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailsAuth;