import React, { useState } from "react";
import axios from "axios";
import { useToast } from '../ui/use-toast';
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/API-URL";

const AccountBalanceAuth: React.FC = () => {
  const title = "Check Account Balance";
  const description = "Fetches the account balance:";
  const api = `${API_URL.BASE_URL}${API_URL.ACCOUNT_BALANCE}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [accountBalanceData, setAccountBalanceData] = useState<any>(null);
  const [loadingAccountBalance, setLoadingAccountBalance] = useState<boolean>(false);
  const { toast } = useToast();
  const handleMouseEnter = () => {
    if (!masterData?.access_token) {
      toast({ title: 'Warning', description: 'Please fetch master data first' });
    }
  };
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

  const handleCheckAccountBalance = async () => {
    if (!masterData?.access_token) {
      alert("Please fetch the master data first.");
      return;
    }
    setLoadingAccountBalance(true);
    try {
      const response = await axios.post(api, parameters, {
        headers: {
          Authorization: `Bearer ${masterData.access_token}`,
        },
      });
      setAccountBalanceData(response.data);
      alert("Account balance fetched successfully.");
    } catch (error: any) {
      console.error("Error fetching account balance:", error.response?.data || error.message);
      alert("Failed to fetch account balance. Please try again.");
    } finally {
      setLoadingAccountBalance(false);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {parameters.map((param) => (
                <div key={param}>
                  <input
                    type="text"
                    value={param}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-gray-100 focus:outline-none"
                  />
                </div>
              ))}
            </div>
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
              onClick={handleCheckAccountBalance}
              onMouseEnter={handleMouseEnter}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={loadingAccountBalance}
            >
              {loadingAccountBalance ? "Fetching Account Balance..." : "Check Account Balance"}
            </Button>

            {accountBalanceData && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Account Balance Data:</h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(accountBalanceData, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AccountBalanceAuth

