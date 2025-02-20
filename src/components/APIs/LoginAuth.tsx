import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import axios from "axios";
import { getMasterDataPayload } from "@/components/APIs/utils/payload";
import API_URL from "@/components/APIs/API-URL";
interface MasterData {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
}

const LoginAuth: React.FC = () => {
    const title = "Generate Encrypted 2FA Token for User";
    const description = "This API endpoint generates an encrypted token for a user to enable or validate two-factor authentication (2FA). It requires authentication through a Bearer token and session cookies, as well as an encrypted key that contains user-specific or session-specific information.";
    const api = `${API_URL.BASE_URL}${API_URL.GENERATE_2FA_TOKEN}`;
    const [parameters, setParameters] = useState({ email: "", password: "" });
    const [masterData, setMasterData] = useState<MasterData | null>(null);
    const [encryptedKey, setEncryptedKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingEncryptedKey, setLoadingEncryptedKey] = useState(false);
    const [otp, setOtp] = useState(""); // State to store the OTP input
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
    const handleGenerateEncryptedKey = async () => {
        setLoadingEncryptedKey(true);
        setError(null);
        try {
            const { email, password } = parameters;
            const appKey = import.meta.env.VITE_APP_APP_KEY; // Fetch app key from env

            if (!email || !password) {
                setError("Email and password are required.");
                setLoadingEncryptedKey(false);
                return;
            }

            // Construct the text_for_encryption string
            const textForEncryption = `${email}::${password}::${appKey}`;

            const response = await axios.post(
                `${API_URL.BASE_URL}${API_URL.GENERATE_2FA_TOKEN}`,
                new URLSearchParams({ text_for_encryption: textForEncryption }), // URL-encoded data
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${masterData?.access_token}`, // Ensure you have a valid access token

                    }
                }
            );
            console.log("Encrypted Key Response:", response.data);

            // Extract `data` properly
            if (response.data && response.data.data) {
                setEncryptedKey(response.data.data);
            } else {
                setError("Unexpected response format.");
            }
        } catch (err) {
            console.error("Error generating encrypted key:", err);
            setError("Failed to generate encrypted key. Please try again.");
        } finally {
            setLoadingEncryptedKey(false);
        }
    };

    const handleGetOTP = async () => {
        setLoadingEncryptedKey(true);
        setError(null);

        try {
            if (!encryptedKey) {
                setError("Encrypted key is missing. Please generate the encrypted key first.");
                setLoadingEncryptedKey(false);
                return;
            }

            const response = await axios.post(
                `${API_URL.BASE_URL}${API_URL.VERIFY_2FA_TOKEN}`,
                new URLSearchParams({ encrypted_key: encryptedKey }), // URL-encoded data
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${masterData?.access_token}`,

                    }
                }
            );

            console.log("OTP Response:", response.data);
            alert("OTP sent to your email successfully!");
        } catch (err) {
            console.error("Error fetching OTP:", err);
            setError("Failed to fetch OTP. Please try again.");
        } finally {
            setLoadingEncryptedKey(false);
        }
    };
    const handleResendOTP = async () => {
        setError(null);
        setSuccessMessage(null); // Reset messages before the request

        try {
            if (!parameters.email) {
                setError("Email is required to resend OTP.");
                return;
            }

            const response = await axios.get(
                `${API_URL.BASE_URL}${API_URL.RESEND_LOGIN_OTP}`,
                {
                    params: { user: parameters.email },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${masterData?.access_token}`, // Ensure a valid access token
                    },
                }
            );

            console.log("Resend OTP Response:", response.data);
            setSuccessMessage("OTP has been resent to your email.");
        } catch (err) {
            console.error("Error resending OTP:", err);
            setError("Failed to resend OTP. Please try again.");
        }
    };

    const handleValidateOTP = async () => {
        setError(null);
        setSuccessMessage(null); // Reset messages before the request
        try {
            const response = await axios.post(
                `${API_URL.BASE_URL}${API_URL.VERIFY_2FA_OTP}`,
                new URLSearchParams({
                    user: parameters.email,
                    user_otp: otp,
                })
            );

            console.log("OTP Validation Response:", response.data);

            if (response.data) {

                setSuccessMessage("OTP validation successful! You can now proceed.");
            }
        } catch (err) {
            console.error("Error validating OTP:", err);
            setError("OTP validation failed. Please check your OTP and try again.");
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

                {/* User Data Input Fields */}
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg font-semibold text-blue-500 mb-4">Enter User Data</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                        {/* Email */}
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Email:</label>
                            <input
                                type="email"
                                value={parameters.email || ""}
                                onChange={(e) => setParameters((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="Enter email"
                                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Password:</label>
                            <input
                                type="password"
                                value={parameters.password || ""}
                                onChange={(e) => setParameters((prev) => ({ ...prev, password: e.target.value }))}
                                placeholder="Enter password"
                                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <Button
                    onClick={handleFetchMasterDetails}
                    className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                    disabled={loading}
                    aria-busy={loading}
                >
                    {loading ? "Loading..." : "Fetch Master Details"}
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
                            onClick={handleGenerateEncryptedKey}
                            className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                            disabled={loadingEncryptedKey}
                            aria-busy={loadingEncryptedKey}
                        >
                            {loadingEncryptedKey ? "Fetching..." : "proceed"}
                        </Button>

                        {encryptedKey && (
                            <>
                                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                                    <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Key:</h2>
                                    <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                                        {JSON.stringify(encryptedKey, null, 2)}
                                    </pre>
                                </div>

                                <Button
                                    onClick={handleGetOTP}
                                    className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                                    disabled={!encryptedKey || loadingEncryptedKey}
                                >
                                    {loadingEncryptedKey ? "Sending OTP..." : "Get OTP"}
                                </Button>


                                <div className="mt-6">
                                    <label className="block text-gray-700 font-medium mb-2">Enter OTP:</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter OTP received in email"
                                    />
                                    <Button
                                        onClick={handleResendOTP}
                                        className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                                        disabled={!parameters.email}
                                    >
                                        Resend OTP
                                    </Button>

                                    <Button
                                        onClick={handleValidateOTP}
                                        className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                                        disabled={!otp || loadingEncryptedKey}
                                    >
                                        {loadingEncryptedKey ? "Validating OTP..." : "Validate OTP"}
                                    </Button>
                                </div>
                            </>
                        )}
                        {successMessage && (
                            <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-4">
                                {successMessage}
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4">
                                {error}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginAuth;