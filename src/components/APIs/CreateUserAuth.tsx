import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import API_URL from "@/components/APIs/API-URL";

const CreateUserAuth: React.FC = () => {
  const title = "Create User";
  const description = "Create a new user by providing user details.";
  const api = `${API_URL.BASE_URL}${API_URL.CREATE_USER}`;
  const [parameters, setParameters] = useState<Record<string, string>>({
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

  // Create User
  const createUser = async () => {
    setLoading("Creating User...");
    try {
      // Check for masterData and access token
      if (!masterData?.access_token) {
        throw new Error("Fetch master API first");
      }
      console.log("Access Token:", masterData.access_token);
      const accessToken = masterData.access_token;

      // Validate user inputs
      const { fullname, mobile_no, email, password } = parameters;
      if (!fullname || !mobile_no || !email || !password) {
        throw new Error("All fields are required: Full Name, Mobile No, Email, and Password");
      }

      // Prepare form data after validation
      const formData = new FormData();
      formData.append("full_name", fullname);
      formData.append("mobile_no", mobile_no);
      formData.append("email", email);
      formData.append("password", password);

      // Make API request
      const response = await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update state on success
      setCreateUserData(response.data);
      console.log("User created successfully:", response.data);
      setOtpSent(true);
    }catch (error: unknown) {
      let errorMessage = "Failed to create user.";
    
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
    
      console.error("Error creating user:", error);
      alert(errorMessage);
    } finally {
      setLoading(null);
    }
  }    

  // Update Password using Reset Key
  const updatePasswordWithResetKey = async () => {
    setLoadingPasswordUpdate(true);
    try {
      if (!masterData?.access_token) {
        throw new Error("Fetch master API first");
      }
      if (!username || !resetKey || !newPassword) {
        throw new Error("All fields are required: Username, Reset Key, and New Password");
      }
      const accessToken = masterData.access_token;
      const formData = new URLSearchParams();
      formData.append("new_password", newPassword);
      formData.append("reset_key", resetKey);
      formData.append("username", username);

      const response = await axios.post(
        `${API_URL.BASE_URL}${API_URL.UPDATE_PASSWORD_USING_RESETKEY}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setPasswordUpdateResponse(response.data);
      console.log("Password updated successfully:", response.data);
      alert("Password updated successfully!");
    } catch (error: unknown) {
      let errorMessage = "Failed to create user.";
    
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
    
      console.error("Error creating user:", error);
      alert(errorMessage);
    } finally {
      setLoading(null);
    }
  }    

  const handleResendOTP = async () => {
    setError(null);
    setSuccessMessage(null); // Reset messages before the request

    try {
      if (!parameters.email) {
        setError("Email is required to resend OTP.");
        return;
      }

      const response = await axios.get(
        `${API_URL.BASE_URL}${API_URL.RESEND_SIGNUP_OTP}`,
        {
          params: { user: parameters.email },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${masterData?.access_token}`, // Ensure a valid access token
          },
        }
      );
      setShowOtpInput(true);
      setResendOtpResponse(response.data);
      setSuccessMessage("OTP has been resent to your email.");
    } catch (err) {
      console.error("Error resending OTP:", err);
      setError("Failed to resend OTP. Please try again.");
    }
  };
  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        {/* Title Input */}
        <div className="mb-6 sm:mb-8">
          <label htmlFor="Title" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            Title
          </label>
          <input
            type="text"
            value={title}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 sm:mb-8">
          <label htmlFor="Description" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            Description
          </label>
          <input
            type="text"
            value={description}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 sm:mb-8">
          <label htmlFor="API URL" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
            API URL
          </label>
          <input
            type="text"
            value={api}
            readOnly
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-blue-500 mb-4">Enter User Data</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block font-bold text-gray-700 mb-2">Full Name:</label>
              <input
                type="text"
                value={parameters.fullname || ""}
                onChange={(e) => setParameters((prev) => ({ ...prev, fullname: e.target.value }))}
                placeholder="Enter full name"
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Mobile Number */}
            <div>
              <label className="block font-bold text-gray-700 mb-2">Mobile No:</label>
              <input
                type="text"
                value={parameters.mobile_no || ""}
                onChange={(e) => setParameters((prev) => ({ ...prev, mobile_no: e.target.value }))}
                placeholder="Enter mobile number"
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
        {/* Fetch Master Details Button */}
        <Button
          onClick={handleFetchMasterDetails}
          className="w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
          disabled={!!loading}
        >
          {loading === "Fetching Master Details..." ? "Fetching..." : "Proceed"}
        </Button>
        {/* Display Master Data */}
        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
              {/* Create User Button */}
            </div>
            <>
              <Button
                onClick={createUser}
                disabled={!!loading}
                className="mt-4 w-full py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              >
                {loading === "Creating User..." ? "Creating..." : "Create User"}
              </Button>

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

              <Button onClick={handleResendOTP} disabled={!!loading} className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70">
                {loading ? loading : "Resend OTP"}
              </Button>
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
              <Button
                onClick={updatePasswordWithResetKey}
                disabled={loadingPasswordUpdate}
                className="mt-4 w-full py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              >
                {loadingPasswordUpdate ? "Updating..." : "Submit"}
              </Button>

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