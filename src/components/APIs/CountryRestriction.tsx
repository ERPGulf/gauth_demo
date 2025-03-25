import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import ParameterList from "./utils/ParameterList";
import FetchButton from './utils/FetchButton';

const CountryRestriction: React.FC = () => {
  const title = "Check Country Restriction";
  const description = "This API checks country restrictions.";
  const api = `${API_URL.BASE_URL}${API_URL.COUNTRY_RESTRICTION}`;
  const parameters = ["api_key", "api_secret", "app_key", "client_secret"];
  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [countryRestrictionData, setCountryRestrictionData] = useState<string | null>(null);
  const [countryRestrictionLoading, setCountryRestrictionLoading] = useState<boolean>(false);
  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };
  // Check Country Restriction
  const checkCountryRestriction = async () => {
    if (!masterData?.access_token) {
      throw new Error("Master data or access token is missing.");
    }
    const accessToken = masterData.access_token;
    setCountryRestrictionLoading(true);
    try {
      const response = await axios.post(api, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Country Restriction Response:", response.data);
      setCountryRestrictionData(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error(
        "Error checking country restriction:",
        axiosError.response?.data ?? axiosError.message
      );
    } finally {
      setCountryRestrictionLoading(false);
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
        {/* Render master data only if it is available */}
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>
            <FetchButton onClick={checkCountryRestriction} label="Check Country Restriction" loading={countryRestrictionLoading} />
            {/* Render country restriction data only if it is available */}
            {countryRestrictionData && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Country Restriction Data:</h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(countryRestrictionData, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div >
  );
};

export default CountryRestriction;