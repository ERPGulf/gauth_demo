import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";
import axios from "axios";
import { useToast } from '../ui/use-toast';
import API_URL from "@/components/APIs/API-URL";
interface UserData {
    data: {
        token: {
            access_token: string;
        };
    };
}


const UpdatePasswordUserTokenAuth: React.FC = () => {
    const { toast } = useToast();
    const title = "Update Password Using User Token";
    const description = "This API endpoint updates a user's password using an authorization token.";
    const api = `${API_URL.BASE_URL}${API_URL.UPDATE_PASSWORD_USING_USERTOKEN}`;
    const [parameters, setParameters] = useState({
        username: '',
        password: '',
    });
    const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
    const [loading, setLoading] = useState<string | boolean | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [newPassword, setNewPassword] = useState<string>("");
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
            toast({
                title: "Success",
                description: "Password updated successfully!",
            });
        } catch (error: unknown) {
            // Check if error is an AxiosError
            if (axios.isAxiosError(error)) {
                console.error("Error updating password:", error);
                toast({
                    title: "Update Failed",
                    description:
                        error.response?.data?.message ||
                        "An error occurred while updating the password.",
                });
            } else {
                console.error("Unexpected error:", error);
                toast({
                    title: "Update Failed",
                    description: "An unexpected error occurred.",
                });
            }
        } finally {
            setLoading(null);
        }
    };
    return (
        <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
            <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
                <div className="mb-6 sm:mb-8">
                    <label htmlFor="Title" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
                    <input
                        type="text"
                        value={title}
                        readOnly
                        className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
                        <div className="mb-4">
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
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
