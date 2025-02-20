import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Add toast styles
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import { getMasterDataPayload } from "@/components/APIs/utils/payload";
import API_URL from "@/components/APIs/API-URL";

const LogDetailsAuth: React.FC = () => {
    const { toast } = useToast();

    const title = 'User Login Time API';
    const description = 'This API fetches or logs the user login time.';
    const api = `${API_URL.BASE_URL}${API_URL.LOG_DETAILS}`;
    const [parameters, setParameters] = useState<Record<string, string>>({
        username: '',
        password: '',
    });
    const [masterData, setMasterData] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<string | boolean | null>(null);
    const [loginTimeData, setLoginTimeData] = useState<any>(null); // State for login time data

    const appKey = import.meta.env.VITE_APP_APP_KEY; // Only used in API calls, not UI

    const handleFetchMasterDetails = async () => {
        setLoading(true);
        try {
            const payload = getMasterDataPayload();
            const data = await fetchMasterDetails(payload);
            setMasterData(data);
        } catch (error) {
            console.error("Error fetching master details:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchUserDetails = async () => {
        setLoading('Fetching User Details...');
        try {
            if (!masterData?.access_token) {
                throw new Error('Fetch master API first');
            }
            const accessToken = masterData.access_token;
            const { username, password } = parameters;
            if (!username || !password) {
                throw new Error('Missing required parameters: username or password.');
            }
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('app_key', appKey); // Use appKey securely here
            formData.append('client_secret', import.meta.env.VITE_APP_CLIENT_SECRET);

            const response = await axios.post(
                `${API_URL.BASE_URL}${API_URL.USER_TOKEN}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.data);
            setUserData(response.data);
        } catch (error: any) {
            console.error('Error fetching user details:', {
                message: error.message,
                response: error.response?.data || null,
            });
            const errorMessage = error.response?.data?.message || 'An error occurred while fetching user details.';
            toast({ title: 'Error', description: errorMessage });
        } finally {
            setLoading(null);
        }
    };

    const fetchLoginTimeData = async () => {
        setLoading('Fetching Login Time Data...');
        try {
            // Ensure userData is available
            if (!userData || !userData.data || !userData.data.token || !userData.data.token.access_token) {
                console.error('Error: User data or access token is missing.', userData);
                toast({ title: 'Error', description: 'Fetch user details first' });
                return;
            }
            const userAccessToken = userData.data.token.access_token;
            console.log('Fetching login time data with user access token:', userAccessToken);
    
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('Login Time Data Response:', response.data);
            setLoginTimeData(response.data);
        } catch (error: any) {
            console.error('Error fetching login time data:', error);
    
            let errorMessage = 'An error occurred while fetching login time data.';
            if (error.response) {
                console.log('Full Response:', error.response.data);
    
                if (error.response.status === 500) {
                    errorMessage = 'Server error: Please check with the backend team.';
                } else {
                    errorMessage = error.response.data?.message || errorMessage;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            toast({ title: 'Error', description: errorMessage });
        } finally {
            setLoading(null);
        }
    };
    return (
        <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
            <ToastContainer />
            <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
                {/* Title Input */}
                <div className="mb-6 sm:mb-8">
                    <label htmlFor="Title" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
                    <input
                        type="text"
                        value={title}
                        readOnly
                        className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description Input */}
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

                {/* Parameters Section */}
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
                <div className="flex flex-col gap-4">
                    {/* Fetch Master Details Button */}
                    <Button
                        onClick={handleFetchMasterDetails}
                        className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                        disabled={!!loading}
                    >
                        {loading ? 'Fetching...' : 'Fetch Master Data'}
                    </Button>

                    {/* Master Data Display */}
                    {masterData && (
                        <>
                            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
                                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                                    {JSON.stringify(masterData, null, 2)}
                                </pre>
                            </div>


                            {/* Fetch User Details Button */}
                            <Button
                                onClick={fetchUserDetails}
                                className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                                disabled={!masterData || !!loading}
                            >
                                {userData ? 'Checking...' : 'fetch User Data'}
                            </Button>

                            {/* User Data Display */}
                            {userData && (
                                <>
                                    <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                                        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">User Data:</h2>
                                        <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                                            {JSON.stringify(userData, null, 2)}
                                        </pre>
                                    </div>

                                    <Button
                                        onClick={fetchLoginTimeData}
                                        className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                                        disabled={!userData || !!loading}
                                    >
                                        Fetch Login Time Data
                                    </Button>
                                </>

                            )}

                            {/* Fetch Login Time Data Button */}

                            {/* Login Time Data Display */}
                            {loginTimeData && (
                                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                                    <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Login Time Data:</h2>
                                    <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                                        {JSON.stringify(loginTimeData, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default LogDetailsAuth;