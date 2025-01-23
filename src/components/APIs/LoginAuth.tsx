import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails, fetchEncryptedKey } from "@/components/APIs/ApiFunction";
import axios from "axios";

interface MasterData {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
}

const LoginAuth: React.FC = () => {
    const location = useLocation();

    const [title, setTitle] = useState("Generate Encrypted 2FA Token for User");
    const [description, setDescription] = useState(
        "This API endpoint generates an encrypted token for a user to enable or validate two-factor authentication (2FA). It requires authentication through a Bearer token and session cookies, as well as an encrypted key that contains user-specific or session-specific information."
    );
    const [api, setApi] = useState(
        "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.2fa.generate_token_encrypt_for_user_2fa"
    );
    const [parameters] = useState(["api_key", "api_secret", "app_key", "client_secret"]);
    const [masterData, setMasterData] = useState<MasterData | null>(null);
    const [encryptedKey, setEncryptedKey] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loadingMasterDetails, setLoadingMasterDetails] = useState(false);
    const [loadingEncryptedKey, setLoadingEncryptedKey] = useState(false);
    const [loading2FA, setLoading2FA] = useState(false);
    const [fetchEncryptedTokenWith2FAData, setFetchEncryptedTokenWith2FAData] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [userOtp, setUserOtp] = useState("");

    useEffect(() => {
        if (location.state?.masterApiData) {
            const { title, description, api } = location.state.masterApiData;
            setTitle(title);
            setDescription(description);
            setApi(api);
        }
    }, [location.state]);

    const handleFetchMasterDetails = async () => {
        setLoadingMasterDetails(true);
        setError(null);

        try {
            const payload = {
                api_key: import.meta.env.VITE_APP_gAUTH_API_KEY,
                api_secret: import.meta.env.VITE_APP_API_SECRET,
                app_key: import.meta.env.VITE_APP_APP_KEY,
                client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
            };

            const data = await fetchMasterDetails(payload);
            console.log("Fetched Master Details:", data);
            setMasterData(data);
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error fetching master details:", err.message);
                setError("Failed to fetch master details. Please try again.");
            } else {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoadingMasterDetails(false);
        }
    };

    const handleFetchEncryptedKey = async () => {
        if (!masterData) {
            setError("Master data is required to fetch the encrypted key.");
            return;
        }
        console.log(masterData)

        setLoadingEncryptedKey(true);
        setError(null);

        try {
            const key = await fetchEncryptedKey(masterData);

            console.log("Fetched Encrypted Key:", key);

            setEncryptedKey(key || "");
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error fetching encrypted key:", err.message);
                setError("Failed to fetch encrypted key. Please try again.");
            } else {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoadingEncryptedKey(false);
        }
    };
    const handleGenerate2FAToken = async () => {

        // Check if masterData and encryptedKey are available
        if (!masterData || !encryptedKey) {
            setError("Both master data and encrypted key are required to generate the 2FA token.");
            return;
        }

        const accessToken = masterData.access_token;
        console.log("Access Token:", accessToken);
        if (!accessToken) {
            setError("Access token is missing or invalid. Unable to proceed.");
            return;
        }

        console.log("Access Token:", accessToken);

        setLoading2FA(true);
        setError(null);

        try {
            const response = await axios.post(
                api,
                new URLSearchParams({ encrypted_key: encryptedKey }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );

            console.log("2FA Token Generated:", response.data);
            setFetchEncryptedTokenWith2FAData(response.data);
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error generating 2FA token:", err.message);
                setError("Failed to generate 2FA token. Please check your inputs and try again.");
            } else {
                console.error("Unexpected error during 2FA token generation:", err);
                setError("An unexpected error occurred while generating the 2FA token.");
            }
        } finally {
            setLoading2FA(false);
        }
        console.log(accessToken)
    };
    const handleValidateOtp = async (user: string, userOtp: string) => {
        setLoading2FA(true); // You can use a separate loader state if needed
        setError(null);

        try {
            const response = await axios.get(
                "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.2fa.validate_otp_to_generate_user_token",
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",

                    },
                    params: new URLSearchParams({
                        user,
                        user_otp: userOtp,
                    }),
                    withCredentials: true,
                }
            );

            console.log("OTP Validation Response:", response.data);
            // Handle the response appropriately
            if (response.data) {
                alert("OTP validated successfully!");
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error validating OTP:", err.message);
                setError("Failed to validate OTP. Please check your inputs and try again.");
            } else {
                console.error("Unexpected error during OTP validation:", err);
                setError("An unexpected error occurred while validating the OTP.");
            }
        } finally {
            setLoading2FA(false); // Adjust the loading state
        }
    };

    const handleResendOtp = async (user: string) => {
        setLoading2FA(true); // Reusing the 2FA loading state
        setError(null);

        try {
            const accessToken = masterData?.access_token;
            if (!accessToken) {
                setError("Access token is missing or invalid. Unable to resend OTP.");
                return;
            }

            const response = await axios.post(
                "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.2fa.resend_otp",
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: new URLSearchParams({ user }),
                    withCredentials: true,
                }
            );

            console.log("Resend OTP Response:", response.data);
            if (response.data) {
                alert("OTP has been resent successfully!");
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error resending OTP:", err.message);
                setError("Failed to resend OTP. Please check your inputs and try again.");
            } else {
                console.error("Unexpected error during OTP resend:", err);
                setError("An unexpected error occurred while resending the OTP.");
            }
        } finally {
            setLoading2FA(false);
        }
    };




    return (
        <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg">
            <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
                {[{ label: "Title", value: title, onChange: setTitle },
                { label: "Description", value: description, onChange: setDescription },
                { label: "API URL", value: api, onChange: setApi }].map(({ label, value, onChange }, idx) => (
                    <div key={idx} className="mb-6 sm:mb-8">
                        <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                            {label}
                        </label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                <div className="mb-6 sm:mb-8">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                        Parameters
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {parameters.map((param, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={param}
                                    readOnly
                                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleFetchMasterDetails}
                    className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                    disabled={loadingMasterDetails}
                    aria-busy={loadingMasterDetails}
                >
                    {loadingMasterDetails ? "Loading..." : "Fetch Master Details"}
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
                            onClick={handleFetchEncryptedKey}
                            className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                            disabled={loadingEncryptedKey}
                            aria-busy={loadingEncryptedKey}
                        >
                            {loadingEncryptedKey ? "Fetching..." : "Fetch Encrypted Key"}
                        </Button>

                        {encryptedKey && (
                            <>
                                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                                    <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Key:</h2>
                                    <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                                        {JSON.stringify(encryptedKey, null, 2)}
                                    </pre>
                                </div>
                                <Button onClick={handleGenerate2FAToken}
                                    className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                                    disabled={loading2FA || !encryptedKey}>
                                    {loading2FA ? "Generating 2FA Token..." : "Generate 2FA Token"}
                                </Button>

                                {error && <p style={{ color: "red" }}>{error}</p>}

                                {fetchEncryptedTokenWith2FAData && (
                                    <>
                                        <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                                            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">2FA Token Data:</h2>
                                            <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">{JSON.stringify(fetchEncryptedTokenWith2FAData, null, 2)}</pre>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold mb-3">Validate OTP</h3>
                                            <input
                                                type="email"
                                                placeholder="Enter user email"
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Enter OTP"
                                                value={userOtp}
                                                onChange={(e) => setUserOtp(e.target.value)}
                                                className="mt-4 w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <Button
                                                onClick={() => handleValidateOtp(userEmail, userOtp)}
                                                disabled={loading2FA}
                                                className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                                            >
                                                {loading2FA ? "Validating..." : "Validate OTP"}
                                            </Button>
                                        </div>

                                        <Button
                                            onClick={() => handleResendOtp(userEmail)}
                                            disabled={!userEmail || loading2FA}
                                            className="mt-4"
                                        >
                                            {loading2FA ? "Resending OTP..." : "Resend OTP"}
                                        </Button>

                                    </>
                                )}

                               
                            </>

                        )}
                    </>
                )}
            </div>

        </div>
    );
}
export default LoginAuth;