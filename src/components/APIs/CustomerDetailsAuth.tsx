import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/API-URL";

const CustomerDetailsAuth: React.FC = () => {
  const title = 'Customer Details API';
  const description = 'Fetches the customer details';
  const api = `${API_URL.BASE_URL}${API_URL.CUSTOMER_DETAILS}`;

  const [parameters, setParameters] = useState<Record<string, string>>({
    mobile_phone: '',
    user_email: '',
  });

  const [bearerToken] = useState<string>('');
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [customerData, setCustomerData] = useState(null);
  const [customerLoading, setCustomerLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      const fetchCustomerDetails = async () => {
        try {
          const response = await axios.get(api, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${bearerToken}`,
            },
            params: parameters,
          });
          setCustomerData(response.data);
        } catch (error: unknown) { // Use 'unknown' instead of 'any'
          if (axios.isAxiosError(error)) { // Check if it's an Axios error
            console.error('Error fetching customer details:', error.response?.data || error.message);
          } else {
            console.error('Unexpected error:', error);
          }
        } finally {
          setCustomerLoading(false);
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
          onClick={handleFetchMasterDetails}
          className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
          disabled={loading} // Use correct state
        >
          {loading ? 'Fetching...' : 'Proceed'}
        </Button>
        {/* Render master data only if it is available */}
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>

            <Button
              onClick={fetchCustomerDetails}
              className="mt-4 w-full py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={!!customerLoading}
            >
              {customerLoading ? 'Fetching...' : 'Fetch Customer Data'}
            </Button>

            {/* Render customer data only if it is available */}
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