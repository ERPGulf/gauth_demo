import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
const CreateUserAuth: React.FC = () => {
  const location = useLocation();


  const [title, setTitle] = useState<string>("Create User");
  const [description, setDescription] = useState<string>("Create a new user by providing user details.");
  const [api, setApi] = useState<string>(
    "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_create_user"
  );
  const [parameters, setParameters] = useState<Record<string, string>>({
    fullname: "",
    email: "",
    password: "",
  });

  const [masterData, setMasterData] = useState<any>(null);
  const [createUserData, setCreateUserData] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [loadingMasterData, setLoadingMasterData] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [passwordUpdateResponse, setPasswordUpdateResponse] = useState<any>(null);
  const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState<boolean>(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [resendOtpResponse, setResendOtpResponse] = useState<any>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false); // Track if OTP was sent

  useEffect(() => {
    if (location.state && location.state.userApiData) {
      const { title, description, api, parameters } = location.state.userApiData;
      setTitle(title);
      setDescription(description);
      setApi(api);
      setParameters(parameters);
    }
  }, [location.state]);


  // Fetch Master Token
  const handleFetchMasterDetails = async () => {
    setLoadingMasterData(true);
    try {
      const payload = {
        api_key: import.meta.env.VITE_APP_gAUTH_API_KEY,
        api_secret: import.meta.env.VITE_APP_API_SECRET,
        app_key: import.meta.env.VITE_APP_APP_KEY,
        client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
      };

      // Pass the payload to the fetchMasterDetails function
      const data = await fetchMasterDetails(payload);
      setMasterData(data); // Correctly update masterData

    } catch (error: any) {
      console.error("Error fetching master details:", error.message);
    } finally {
      setLoadingMasterData(false);
    }
  };

  // Create User
  const createUser = async () => {
    setLoading("Creating User...");


    try {
      // Check for masterData and access token
      if (!masterData || !masterData.access_token) {
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
    } catch (error: any) {
      console.error("Error creating user:", error.response?.data || error.message);
      alert(error.response?.data?.message || error.message || "Failed to create user.");
    } finally {
      setLoading(null);
    }
  };


  // Update Password using Reset Key
  const updatePasswordWithResetKey = async () => {
    setLoadingPasswordUpdate(true);
    try {
      if (!masterData || !masterData.access_token) {
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
        "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_reset_key",
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
    } catch (error: any) {
      console.error("Error updating password:", error.response?.data || error.message);
      alert(error.response?.data?.message || error.message || "Failed to update password.");
    } finally {
      setLoadingPasswordUpdate(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading("Resending OTP...");
    try {
      if (!parameters.email) {
        throw new Error("Email is required to resend OTP.");
      }

      const payload = {
        email: parameters.email,  // Ensure email is passed
        user: parameters.email,   // Add user parameter if required
      };

      const response = await axios.post(
        "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.resend_otp_for_reset_key",
        payload,
        {
          headers: {
            Authorization: `Bearer ${masterData.access_token}`,
          },
        }
      );

      setResendOtpResponse(response.data);
      setShowOtpInput(true); // Show OTP message UI
      console.log("OTP resent successfully:", response.data);
      alert("OTP resent successfully! Please check your email.");
    } catch (error: any) {
      console.error("Error resending OTP:", error.response?.data || error.message);
      alert(error.response?.data?.message || error.message || "Failed to resend OTP.");
    } finally {
      setLoading(null);
    }
  };




  return (
    <div className="relative z-20 p-4 sm:p-6 min-h-screen flex flex-col items-center bg-gray-300 rounded-lg ">

      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px] bg-gray-100 p-6 sm:p-10 rounded-lg shadow-2xl">
        {/* Title Input */}
        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* API URL Input */}
        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">API URL</label>
          <input
            type="text"
            value={api}
            onChange={(e) => setApi(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User Data Input Fields */}
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

              {showOtpInput && (
                <p className="mt-4 text-center text-blue-600 font-semibold">
                  OTP sent to your mail, please update password using the OTP.
                </p>
              )}

              {showOtpInput && (
                <Button
                  onClick={handleResendOtp}
                  disabled={!!loading}
                  className="mt-4"
                >
                  {loading ? loading : "Resend OTP"}
                </Button>
              )}
            </>



            
            {/* OTP Notification */}
            {showOtpInput && <p className="mt-4 text-center text-blue-600 font-semibold">ResetKey sent to mail</p>}

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
              <Button onClick={updatePasswordWithResetKey} disabled={loadingPasswordUpdate}
                className="mt-4 w-full py-3 bg-primary/90 text-white rounded-lg hover:bg-primary/70">
                {loadingPasswordUpdate ? "Updating..." : "Submit"}
              </Button>
            </div>


          </>

        )}




      </div>
    </div>

  );
};

export default CreateUserAuth;