import React, { useState } from "react";
import axios from "axios";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import InputField from "./utils/InputField";
import ParameterList from "./utils/ParameterList";
import FetchButton from './utils/FetchButton';

const AccountBalanceAuth: React.FC = () => {
  const title = "Check Account Balance";
  const description = "Fetches the account balance:";
  const api = `${API_URL.BASE_URL}${API_URL.ACCOUNT_BALANCE}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [accountBalanceData, setAccountBalanceData] = useState<string | null>(null);
  const [loadingAccountBalance, setLoadingAccountBalance] = useState<boolean>(false);
  // Fetch Master Token
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
  // Check Account Balance
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
    } catch (error) {
      console.error("Error fetching account balance:", error);
      alert("Failed to fetch account balance. Please try again.");
    } finally {
      setLoadingAccountBalance(false);
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <InputField label="Title" value={title} readOnly />
        <InputField label="Description" value={description} readOnly />
        <InputField label="API URL" value={api} readOnly />
        <ParameterList parameters={parameters} />

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
            <FetchButton onClick={handleCheckAccountBalance} label="Check Account Balance" loading={loadingAccountBalance} />

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

