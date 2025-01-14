import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";
import axios from "axios";
import { useToast } from '../ui/use-toast';
interface Parameters {
    api_key: string;
    api_secret: string;
    app_key: string;
    client_secret: string;
}

const UpdatePasswordUserTokenAuth: React.FC = () => {
    const location = useLocation();
    const [title, setTitle] = useState<string>(" Update User Password Using Token");
    const [description, setDescription] = useState<string>("This API endpoint updates a user's password using an authorization token. It is typically used in systems where password updates are facilitated by sending tokens to authenticated users.");
    const [api, setApi] = useState<string>(
        'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_usertoken'
    );
    const [parameters, setParameters] = useState<Parameters>({
        api_key: "Administrator",
        api_secret: "Friday2000@T",
        app_key:
            "MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ==",
        client_secret: "cfd619c909",
    });

    const [masterData, setMasterData] = useState<any>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const [userParameters, setUserParameters] = useState({
        username: "",
        password: "",
        app_key:
            "MzM1ZjdkMmUzMzgxNjM1NWJiNWQwYzE3YjY3YjMyZDU5N2E3ODRhZmE5NjU0N2RiMWVjZGE0ZjE4OGM1MmM1MQ==",
    });
    const [userData, setUserData] = useState<any>(null);
    const [newPassword, setNewPassword] = useState<string>(""); // Add state


    const { toast } = useToast();
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
        setLoading("Fetching Master Details...");
        try {
            const data = await fetchMasterDetails(parameters);
            setMasterData(data);
        } catch (error: any) {
            console.error("Error fetching master details:", error.message);
        } finally {
            setLoading(null);
        }
    };

    const handleFetchUserDetails = async () => {
        setLoading("Fetching User Details...");
        try {
            const data = await fetchUserDetails(masterData, userParameters);
            setUserData(data);
        } catch (error: any) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(null);
        }
    };

    const handleUpdatePassword = async () => {
        setLoading("Updating Password...");
        try {
            // Ensure user token is available
            const userToken = userData?.data?.token?.access_token;
            if (!userToken) {
                throw new Error("User token not found. Please fetch user details first.");
            }

            // Validate new password
            if (!newPassword.trim()) {
                throw new Error("New password cannot be empty.");
            }

            // Make API call to update the password
            const response = await axios.post(
                'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_usertoken',
                new URLSearchParams({ password: newPassword }), // Payload
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    withCredentials: true,
                }
            );

            // Log and display success notification
            console.log("Password updated successfully:", response.data);
            toast({
                title: "Password Updated",
                description: "Your password has been updated successfully.",
            });
        } catch (error: any) {
            // Handle and log errors
            console.error("Error updating password:", {
                message: error.message,
                response: error.response?.data || null,
            });

            const errorMessage =
                error.response?.data?.message || "An error occurred while updating the password.";
            toast({
                title: "Update Failed",
                description: errorMessage,
            });
        } finally {
            setLoading(null); // Reset loading state
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
                    <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
                        <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                            {JSON.stringify(masterData, null, 2)}
                        </pre>
                    </div>
                )}

                {masterData && (
                    <div className="mt-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Fetch User Details</h2>

                        {/* Username Input */}
                        <div className="mb-4">
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                value={userParameters.username}
                                onChange={(e) =>
                                    setUserParameters((prev) => ({ ...prev, username: e.target.value }))
                                }
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={userParameters.password}
                                onChange={(e) =>
                                    setUserParameters((prev) => ({ ...prev, password: e.target.value }))
                                }
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Fetch User Data Button */}
                        <Button
                            onClick={handleFetchUserDetails}
                            className="mt-4 w-full py-2 sm:py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                            disabled={!!loading}
                        >
                            {loading === "Fetching User Details..." ? "Loading..." : "Fetch User Data"}
                        </Button>

                        {userData && (
                            <div className="bg-slate-300 p-3 sm:p-4 mt-6 rounded-lg shadow overflow-x-auto">
                                <h2 className="text-base sm:text-lg font-bold mb-2 text-gray-800">User Data:</h2>
                                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                                    {JSON.stringify(userData, null, 2)}
                                </pre>
                            </div>
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
                )}

            </div>

        </div>
    );


};

export default UpdatePasswordUserTokenAuth;
