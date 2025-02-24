import React, { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Button } from "@/components/ui/button";
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/API-URL";
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
                        readOnly
                        className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6 sm:mb-8">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</label>
                    <input
                        type="text"
                        value={description}
                        readOnly
                        className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6 sm:mb-8">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">API URL</label>
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