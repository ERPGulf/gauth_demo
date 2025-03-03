import React, { useState } from "react";
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";
import axios from "axios";
import { useToast } from '../ui/use-toast';
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import FetchButton from './utils/FetchButton';
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
    //Update Password
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

            // Define API function
            const apiFunction = async () => {
                return await axios.post(
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
            };

            // Use handleApiCall for API call
            const response = await handleApiCall(apiFunction, setLoading, "Password updated successfully!");

            if (response) {
                console.log("Password update response:", response.data);
                toast({
                    title: "Success",
                    description: "Password updated successfully!",
                });
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            toast({
                title: "Update Failed",
                description: "An unexpected error occurred.",
            });
        }
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
                <FetchButton onClick={handleFetchMasterDetails} label="Fetch Master Data" loading={loading} />

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
                        <FetchButton onClick={handleUpdatePassword} label="Update Password" loading={loading} />
                    </div>
                )}
            </div>
        </div>
    );
};
export default UpdatePasswordUserTokenAuth;
