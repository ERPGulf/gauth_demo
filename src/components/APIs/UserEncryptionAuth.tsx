
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import { fetchMasterDetails, fetchUserDetails } from "@/components/APIs/ApiFunction";
import axios from "axios";
const UserEncryptionAuth: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();

  const [title, setTitle] = useState("Generate User Token API");
  const [description, setDescription] = useState("Fetches the user-specific token");
  const [apiUrl, setApiUrl] = useState(
    `${import.meta.env.VITE_BASE_URL}gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure_for_users`
  );

  const [parameters, setParameters] = useState({
    username: "",
    password: "",
  });

  const [masterData, setMasterData] = useState<{ access_token?: string } | null>(null);
  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  const [encryptedKey, setEncryptedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [encryptedTokenData, setEncryptedTokenData] = useState<any>(null);



  useEffect(() => {
    if (location.state?.userApiData) {
      const { title, description, api, parameters } = location.state.userApiData;
      setTitle(title);
      setDescription(description);
      setApiUrl(api);
      setParameters({ username: parameters.username || "", password: parameters.password || "" });
    }
  }, [location.state]);


  const handleMouseEnter = () => {
    if (!masterData?.access_token) {
      toast({ title: "Warning", description: "Please fetch master data first" });
    }
  };


  const handleFetchMasterDetails = async () => {
    setLoading(true);
    setLoadingText("Fetching Master Data...");
    try {
      const payload = {
        api_key: import.meta.env.VITE_APP_gAUTH_API_KEY,
        api_secret: import.meta.env.VITE_APP_API_SECRET,
        app_key: import.meta.env.VITE_APP_APP_KEY,
        client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
      };

      const data = await fetchMasterDetails(payload);
      setMasterData(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch master data." });
      console.error("Error fetching master details:", error);
    } finally {
      setLoading(false);
      setLoadingText(null);
    }
  };

  const handleFetchUserDetails = async () => {
    setLoading(true);
    setLoadingText("Fetching User Data...");
    try {
      if (!masterData?.access_token) throw new Error("Fetch master API first.");

      const { username, password } = parameters;
      const app_key = import.meta.env.VITE_APP_APP_KEY;

      if (!username || !password) throw new Error("Missing username or password.");

      const data = await fetchUserDetails(masterData, { username, password, app_key });

      setUserData(data);

      toast({ title: "Success", description: "User details fetched successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while fetching user data." });
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
      setLoadingText(null);
    }
  };


  const handleFetchEncryptedKey = async () => {
    setLoading(true);
    setLoadingText("Fetching Encrypted Key...");

    try {
      if (!masterData?.access_token) throw new Error("Fetch master API first.");

      const formData = new URLSearchParams();
      formData.append("text_for_encryption", import.meta.env.VITE_APP_TEXT_FOR_ENCRYPTION);

      const response = await axios.post(
        "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.test_generate_token_encrypt_for_user",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${masterData?.access_token}`,
          },
        }
      );

      console.log("API Response:", response);

      const { data } = response;
      console.log("Response Data:", data);

      // Extracting the encrypted key correctly
      const encryptedKey = data?.data || "No encrypted key returned";
      console.log("Extracted Encrypted Key:", encryptedKey);

      setEncryptedKey(encryptedKey);

      toast({ title: "Success", description: "Encrypted key fetched successfully!" });
    } catch (error) {
      console.error("Error fetching encrypted key:", error);

      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }

      toast({ title: "Error", description: "Failed to fetch encrypted key." });
    } finally {
      setLoading(false);
      setLoadingText(null);
    }
  };

  const handleFetchEncryptedToken = async () => {
    setLoading(true);
    setLoadingText("Fetching Encrypted Token...");
  
    try {
      if (!masterData?.access_token) throw new Error("Fetch master API first.");
      if (!encryptedKey) throw new Error("Fetch encrypted key first.");
  
      // Preparing form data
      const formData = new URLSearchParams();
      formData.append("encrypted_key", encryptedKey); // Using the previously fetched encrypted key
  
      // Making API call (Removing unsafe Cookie header)
      const response = await axios.post(
        "https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_encrypt_for_user",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${masterData?.access_token}`,
          },
          responseType: "json", // Ensuring JSON response
        }
      );
  
      console.log("Encrypted Token API Response:", response);
  
      const { data } = response;
      console.log("Response Data:", data);
  
      // Extracting the actual access_token from the response
      if (data?.data?.token?.access_token) {
        setEncryptedTokenData(data.data.token.access_token);
        console.log("Extracted Encrypted Token:", data.data.token.access_token);
      } else {
        console.warn("Warning: No access token found in response!", data);
        setEncryptedTokenData("No access token returned");
      }
  
      toast({ title: "Success", description: "Encrypted token fetched successfully!" });
    } catch (error) {
      console.error("Error fetching encrypted token:", error);
  
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
  
      toast({ title: "Error", description: "Failed to fetch encrypted token." });
    } finally {
      setLoading(false);
      setLoadingText(null);
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
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
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
              <>
                <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                  <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">User Data:</h2>
                  <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                    {JSON.stringify(userData, null, 2)}
                  </pre>
                </div>

                <Button
                  onClick={handleFetchEncryptedKey}
                  onMouseEnter={handleMouseEnter}
                  className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                  disabled={!!loading}
                >
                  Fetch Encrypted Key
                </Button>
                {loading && <p>{loadingText}</p>}


                {encryptedKey && (
                  <>
                    <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                      <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Key:</h2>
                      <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                      {JSON.stringify(encryptedKey, null, 2)} 
                      </pre>
                    </div>

                    
                      <Button
                        onClick={handleFetchEncryptedToken}
                        className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
                        disabled={loading || !encryptedKey}
                      >
                        {loading ? "Fetching Encrypted Token..." : "Fetch Encrypted Token"}
                      </Button>
                    

                    {encryptedTokenData && (
                      <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Encrypted Token Data:</h2>
                        <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                        {JSON.stringify(encryptedTokenData, null, 2)} 
                        </pre>
                      </div>
                    )}


                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserEncryptionAuth;