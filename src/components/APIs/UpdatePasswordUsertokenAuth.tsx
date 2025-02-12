import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";
import axios from "axios";
import { useToast } from '../ui/use-toast';



const UpdatePasswordUserTokenAuth: React.FC = () => {
    const location = useLocation();
    const { toast } = useToast();

    const [title, setTitle] = useState<string>("Update Password Using User Token");
    const [description, setDescription] = useState<string>(
        "This API endpoint updates a user's password using an authorization token."
    );
    const [api, setApi] = useState<string>(`${import.meta.env.VITE_BASE_URL}gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_usertoken`);

    const [parameters, setParameters] = useState({
        username: '',
        password: '',
    });


    const [masterData, setMasterData] = useState<any>(null);
    const [loading, setLoading] = useState<string | boolean | null>(null);
    
    const [userData, setUserData] = useState<any>(null);
    const [newPassword, setNewPassword] = useState<string>("");

    useEffect(() => {
        if (location.state && location.state.masterApiData) {
            const { title, description, api, parameters } = location.state.masterApiData;
            setTitle(title);
            setDescription(description);
            setApi(api);
            setParameters(parameters);
        }
    }, [location.state]);

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
            console.log("User Details:", data);
            toast({ title: "Success", description: "User details fetched successfully!" });
        } catch (error) {
            toast({ title: "Error", description: "An error occurred." });
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        setLoading("Updating Password...");
        try {
            const userToken = userData?.data?.token?.access_token;
            if (!userToken) {
                throw new Error("User token not found. Please fetch user details first.");
            }
    
            if (!newPassword.trim()) {
                throw new Error("New password cannot be empty.");
            }
            console.log("API Endpoint:", api);
    
            const response = await axios.post(
                api,
                new URLSearchParams({ password: newPassword }),
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    withCredentials: true,
                }
            );
    
            console.log("Password update response:", response.data);
    
            // ✅ Display success message in UI
            toast({
                title: "Success",
                description: "Password updated successfully!",
            });
    
        } catch (error: any) {
            console.error("Error updating password:", error);
    
            toast({
                title: "Update Failed",
                description: error.response?.data?.message || "An error occurred while updating the password.",
            });
        } finally {
            setLoading(null);
        }
    };
    

    return (
        <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
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
                        value={api}
                        onChange={(e) => setApi(e.target.value)}
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
                    {loading === "Fetching Master Details..." ? "Loading..." : "Proceed"}
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



                {userData && (
                    <div className="mt-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Update Password</h2>

                        {/* New Password Input */}
                        <div className="mb-4">
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Update Password Button */}
                        <Button
                            onClick={handleUpdatePassword}
                            className="mt-4 w-full py-2 sm:py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                            disabled={!!loading}
                        >
                            {loading === "Updating Password..." ? "Loading..." : "Update Password"}
                        </Button>
                    </div>
                )}
            </div>
        </div>





    );


};

export default UpdatePasswordUserTokenAuth;
