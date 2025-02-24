import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Add toast styles
import { Button } from "@/components/ui/button";
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";
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
    const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
    const [userData, setUserData] = useState<{ data: { token: { access_token: string } } } | null>(null);
    const [loading, setLoading] = useState<string | boolean | null>(null);
    const [loginTimeData, setLoginTimeData] = useState<string | null>(null); // State for login time data

    const app_key = import.meta.env.VITE_APP_APP_KEY;
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
    const handleFetchUserDetails = async () => {
        setLoading(true);
        try {
            if (!masterData?.access_token) {
                toast({ title: 'Error', description: 'Fetch master API first' });
                return;
            }
    
            const { username, password } = parameters;
            if (!username || !password) {
                toast({ title: 'Error', description: 'Missing required parameters: username or password.' });
                return;
            }
            const response = await fetchUserDetails(masterData, {
                username,
                password,
                app_key: app_key,
            });
    
            setUserData(response);
            console.log('User Data:', response);
            toast({ title: 'Success', description: 'User details fetched successfully!' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error fetching user details:', error.message);
                toast({ title: 'Error', description: error.message || 'Failed to fetch user details.' });
            } else {
                console.error('Unexpected error:', error);
                toast({ title: 'Error', description: 'An unexpected error occurred.' });
            }
        } finally {
            setLoading(false);
        }
    };
    

    const fetchLoginTimeData = async () => {
        if (!userData?.data?.token?.access_token) {
            toast({ title: 'Error', description: 'Fetch user details first' });
            return;
        }
        setLoading(true);
        try {
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
            toast({ title: 'Success', description: 'Login time data fetched successfully!' });
        } catch (error) {
            let errorMessage = 'An error occurred while fetching login time data.';
    

            if (axios.isAxiosError(error)) {
                console.error('Axios Error:', error.response?.data || error.message);
                errorMessage = error.response?.data?.message || errorMessage;
                if (error.response?.status === 500) {
                    errorMessage = 'Server error: Please check with the backend team.';
                }
            } 
            
            else if (error instanceof Error) {
                console.error('Unexpected Error:', error.message);
                errorMessage = error.message;
            } 
            else {
                console.error('Unknown Error:', error);
                errorMessage = 'An unexpected error occurred.';
            }
    
            toast({ title: 'Error', description: errorMessage });
        } finally {
            setLoading(false);
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
                                onClick={handleFetchUserDetails}
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