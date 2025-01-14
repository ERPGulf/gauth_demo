import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Add toast styles
import { Button } from "@/components/ui/button";

const LogDetailsAuth: React.FC = () => {
    const location = useLocation();
    const { toast } = useToast();

    const [title, setTitle] = useState<string>('User Login Time API');
    const [description, setDescription] = useState<string>('This API fetches or logs the user login time.');
    const [apiUrl, setApiUrl] = useState<string>(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.login_time'
    );
    const [parameters, setParameters] = useState<Record<string, string>>({
        username: '',
        password: '',
        app_key: 'MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ==',
    });
    const [masterData, setMasterData] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const [loginTimeData, setLoginTimeData] = useState<any>(null); // State for login time data

    useEffect(() => {
        if (location.state && location.state.userApiData) {
            const { title, description, api, parameters } = location.state.userApiData;
            setTitle(title);
            setDescription(description);
            setApiUrl(api);
            setParameters(parameters);
        }
    }, [location.state]);



    const fetchMasterDetails = async () => {
        setLoading("Fetching Master Details...");
        try {
            const formData = new FormData();
            formData.append("api_key", "Administrator");
            formData.append("api_secret", "Friday2000@T");
            formData.append("app_key", parameters.app_key);
            formData.append("client_secret", "cfd619c909");

            const response = await axios.post(
                'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure',
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log("Fetched Master Data:", response.data);
            setMasterData(response.data);
        } catch (error: any) {
            console.error("Error fetching master details:", error.response?.data || error.message);
            toast({ title: "Error", description: "Failed to fetch master data." });
        } finally {
            setLoading(null);
        }
    };

    const fetchUserDetails = async () => {
        setLoading("Fetching User Details...");
        try {
            if (!masterData || !masterData?.data?.access_token) {
                throw new Error("Fetch master API first");
            }
            const accessToken = masterData.data.access_token;

            const { username, password, app_key } = parameters;

            if (!username || !password || !app_key) {
                throw new Error("Missing required parameters: username, password, or app_key.");
            }

            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("app_key", app_key);
            formData.append("client_secret", "cfd619c909");

            const response = await axios.post(
                'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure_for_users', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Fetched User Data:", response.data);
            setUserData(response.data);
        } catch (error: any) {
            console.error("Error fetching user details:", {
                message: error.message,
                response: error.response?.data || null,

            });
            const errorMessage = error.response?.data?.message || "An error occurred while fetching user details.";
            toast({ title: "Error", description: errorMessage });
        } finally {
            setLoading(null);
        }
    };

    const fetchLoginTimeData = async () => {
        setLoading("Fetching Login Time Data...");
        try {
            if (!masterData || !masterData?.data?.access_token) {
                throw new Error("Fetch master API first");
            }

            const accessToken = masterData.data.access_token;

            const response = await axios.get(
                "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.login_time",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log("Fetched Login Time Data:", response.data);
            setLoginTimeData(response.data);
        } catch (error: any) {
            console.error("Error fetching login time data:", {
                message: error.message,
                response: error.response?.data || null,
            });
            const errorMessage = error.response?.data?.message || "An error occurred while fetching login time data.";
            toast({ title: "Error", description: errorMessage });
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
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description Input */}
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
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
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
                        onClick={fetchMasterDetails}
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