import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { Button } from "@/components/ui/button";
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";

const UserAuth: React.FC = () => {
    const location = useLocation();
    const { toast } = useToast();

    const [title, setTitle] = useState('Generate User Token API');
    const [description, setDescription] = useState('Fetches the user-specific token');
    const [apiUrl, setApiUrl] = useState(`${import.meta.env.VITE_BASE_URL}gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure_for_users`);
    
    const [parameters, setParameters] = useState({
        username: '',
        password: '',
    });

    const [masterData, setMasterData] = useState<{ access_token?: string } | null>(null);
    const [userData, setUserData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.userApiData) {
            const { title, description, api, parameters } = location.state.userApiData;
            setTitle(title);
            setDescription(description);
            setApiUrl(api);
            setParameters({ username: parameters.username || '', password: parameters.password || '' });
        }
    }, [location.state]);

    const handleMouseEnter = () => {
        if (!masterData?.access_token) {
            toast({ title: 'Warning', description: 'Please fetch master data first' });
        }
    };

    const handleFetchMasterDetails = async () => {
        setLoading(true);
        try {
            const payload = {
                api_key: import.meta.env.VITE_APP_gAUTH_API_KEY,
                api_secret: import.meta.env.VITE_APP_API_SECRET,
                app_key: import.meta.env.VITE_APP_APP_KEY,  // Used internally, not displayed
                client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
            };
    
            const data = await fetchMasterDetails(payload);
            setMasterData(data);
        } catch (error) {
            toast({ title: "Error", description: "Failed to fetch master data." });
            console.error("Error fetching master details:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleFetchUserDetails = async () => {
        setLoading(true);
        try {
            if (!masterData?.access_token) throw new Error("Fetch master API first.");
    
            const { username, password } = parameters;
            const app_key = import.meta.env.VITE_APP_APP_KEY; // Used but not shown in UI
    
            if (!username || !password) throw new Error("Missing username or password.");
    
            const data = await fetchUserDetails(masterData, { username, password, app_key });
    
            setUserData(data);
            toast({ title: "Success", description: "User details fetched successfully!" });
        } catch (error) {
            toast({ title: "Error", description: "An error occurred." });
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
         
            {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{title}</h1> */}
            <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
                <div className="mb-6 sm:mb-8">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

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
                    disabled={!!loading}
                >
                    proceed
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
                            onClick={handleFetchUserDetails}
                            onMouseEnter={handleMouseEnter}
                            className=" mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                            disabled={!!loading}
                        >
                            Fetch User Data
                        </Button>
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