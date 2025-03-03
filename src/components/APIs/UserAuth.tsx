import React, { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import FetchButton from './utils/FetchButton';
const UserAuth: React.FC = () => {
    const { toast } = useToast();
    const title = 'Generate User Token API';
    const description = 'Fetches the user-specific token';
    const api = `${API_URL.BASE_URL}${API_URL.USER_TOKEN}`;
    const [parameters, setParameters] = useState({
        username: '',
        password: '',
    });
    const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
    const [userData, setUserData] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch Master Token
    const handleFetchMasterDetails = async () => {
        const data = await handleApiCall(fetchMasterDetails, setLoading);
        if (data) setMasterData(data);
    };
    // Fetch User Token
    const handleFetchUserDetails = async () => {
        if (!masterData?.access_token) return;
        const { username, password } = parameters;
        const app_key = import.meta.env.VITE_APP_APP_KEY;
        if (!username || !password) {
            toast({ title: "Error", description: "Missing username or password." });
            return;
        }
        const data = await handleApiCall(
            () => fetchUserDetails(masterData, { username, password, app_key }),
            setLoading,
            "User details fetched successfully!"
        );
        if (data) setUserData(data);
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

                <FetchButton onClick={handleFetchMasterDetails} label="Proceed" loading={loading} />
                {masterData && (
                    <>
                        <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
                            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                                {JSON.stringify(masterData, null, 2)}
                            </pre>
                        </div>

                        <FetchButton onClick={handleFetchUserDetails} label="Fetch User Data" loading={loading} />

                        {userData && (
                            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">User Data:</h2>
                                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                                    {JSON.stringify(userData, null, 2)}
                                </pre>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};
export default UserAuth;