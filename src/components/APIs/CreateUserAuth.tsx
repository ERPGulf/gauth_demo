import React, { useState } from "react";
import axios from "axios";
import { fetchMasterDetails, createUserAPI } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/utils/API-URL";
import handleApiCall from "./utils/api_auth";
import InputField from "./utils/InputField";
import FetchButton from './utils/FetchButton';

const CreateUserAuth: React.FC = () => {
  interface UserDetails {
    fullname: string;
    mobile_no: string;
    email: string;
    password: string;
  }
  const title = "Create User";
  const description = "Create a new user by providing user details.";
  const api = `${API_URL.BASE_URL}${API_URL.CREATE_USER}`;
  const [parameters, setParameters] = useState<UserDetails>({
    fullname: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  const [masterData, setMasterData] = useState<Awaited<ReturnType<typeof fetchMasterDetails>> | null>(null);
  const [createUserData, setCreateUserData] = useState(null);
  const [loading, setLoading] = useState<string | boolean | null>(null);
  const [resetKey, setResetKey] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [passwordUpdateResponse, setPasswordUpdateResponse] = useState(null);
  const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState<boolean>(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [resendOtpResponse, setResendOtpResponse] = useState(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    const data = await handleApiCall(fetchMasterDetails, setLoading);
    if (data) setMasterData(data);
  };
  // Create User
  const createUser = async () => {
    const response = await handleApiCall(
      () => createUserAPI(masterData!, parameters),
      setLoading,
      "User created successfully!"
    );
    if (response) {
      setCreateUserData(response);
      setOtpSent(true);
    }
  };

  // Update Password using Reset Key
  const updatePasswordWithResetKey = async () => {
    if (!masterData?.access_token) {
      alert("Fetch master API first");
      return;
    }
    if (!username || !resetKey || !newPassword) {
      alert("All fields are required: Username, Reset Key, and New Password");
      return;
    }

    console.log("Updating password with:", { username, resetKey, newPassword });

    const formData = new URLSearchParams();
    formData.append("new_password", newPassword);
    formData.append("reset_key", resetKey);
    formData.append("username", username);

    const apiFunction = async () => {
      return axios.post(
        `${API_URL.BASE_URL}${API_URL.UPDATE_PASSWORD_USING_RESETKEY}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${masterData.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    };

    const response = await handleApiCall(apiFunction, setLoadingPasswordUpdate, "Password updated successfully!");

    if (response) {
      console.log("Password update response:", response.data);
      setPasswordUpdateResponse(response.data);
    } else {
      console.warn("Failed to update password. Possible expired or invalid reset key.");
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!parameters.email) {
      setError("Email is required to resend OTP.");
      return;
    }
    const apiFunction = () =>
      axios.get(`${API_URL.BASE_URL}${API_URL.RESEND_SIGNUP_OTP}`, {
        params: { user: parameters.email },
        headers: {
          Authorization: `Bearer ${masterData?.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    const response = await handleApiCall(apiFunction, setLoading, "OTP has been resent to your email.");
    if (response) {
      setShowOtpInput(true);
      setResendOtpResponse(response.data);
      setSuccessMessage("OTP has been resent to your email.");
    }
  };

  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        <InputField label="Title" value={title} readOnly />
        <InputField label="Description" value={description} readOnly />
        <InputField label="API URL" value={api} readOnly />
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-blue-500 mb-4">Enter User Data</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <InputField
              label="Full Name"
              type="text"
              value={parameters.fullname || ""}
              placeholder="Enter full name"
              readOnly={false}
              onChange={(value) => setParameters((prev) => ({ ...prev, fullname: value }))}
            />
            {/* Mobile Number */}
            <InputField
              label="Mobile Number"
              type="number"
              value={parameters.mobile_no || ""}
              placeholder="Enter mobile number"
              readOnly={false}
              onChange={(value) => setParameters((prev) => ({ ...prev, mobile_no: value }))}
            />
            {/* Email */}
            <InputField
              label="Email"
              type="email"
              value={parameters.email || ""}
              placeholder="Enter email"
              readOnly={false}
              onChange={(value) => setParameters((prev) => ({ ...prev, email: value }))}
            />

            {/* Password */}
            <InputField
              label="Password"
              type="password"
              value={parameters.password || ""}
              placeholder="Enter password"
              readOnly={false}
              onChange={(value) => setParameters((prev) => ({ ...prev, password: value }))}
            />
          </div>
        </div>
        {/* Fetch Master Details Button */}
        <FetchButton onClick={handleFetchMasterDetails} label="Fetch Master Data" loading={loading} />
        {/* Display Master Data */}
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>
            <>
              <FetchButton onClick={createUser} label="Create User" loading={loading} />

              {/* Display Create User Data */}
              {createUserData && (
                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                  <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Create User Data:</h2>
                  <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                    {JSON.stringify(createUserData, null, 2)}
                  </pre>
                </div>
              )}

              {showOtpInput && (
                <p className="mt-4 text-center text-blue-600 font-semibold">
                  OTP sent to your mail, please update password using the OTP.
                </p>
              )}

              <FetchButton onClick={handleResendOTP} label="Resend OTP" loading={loading} />
              {successMessage && <p className="text-green-600">{successMessage}</p>}
              {error && <p className="text-red-600">{error}</p>}

              {/* Display Resend OTP Response */}
              {resendOtpResponse && (
                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                  <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Resend OTP Response:</h2>
                  <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                    {JSON.stringify(resendOtpResponse, null, 2)}
                  </pre>
                </div>
              )}
            </>
            {/* OTP Notification */}
            {otpSent && <p className="mt-4 text-center text-blue-600 font-semibold">ResetKey sent to mail</p>}

            {/* Update Password Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Update Password</h3>
              <input
                type="email"
                placeholder="Username"
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Reset Key"
                className="mt-4 w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={resetKey}
                onChange={(e) => setResetKey(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                className="mt-4 w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <FetchButton onClick={updatePasswordWithResetKey} label="Update Password" loading={loadingPasswordUpdate} />

              {/* Display Password Update Response */}
              {passwordUpdateResponse && (
                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                  <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Password Update Response:</h2>
                  <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                    {JSON.stringify(passwordUpdateResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateUserAuth;