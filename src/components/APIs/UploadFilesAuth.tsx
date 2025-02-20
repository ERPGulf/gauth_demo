import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { fetchMasterDetails } from "@/components/APIs/ApiFunction";
import { getMasterDataPayload } from "@/components/APIs/utils/payload";
import API_URL from "@/components/APIs/API-URL";

const UploadFilesAuth: React.FC = () => {

  const title = 'Upload File';
  const description = 'Uploads a file to the server';
  const api = `${API_URL.BASE_URL}${API_URL.UPLOAD_FILES}`;
  const [parameters, setParameters] = useState<Record<string, string>>({
    doctype: 'Backend Server Settings',
    docname: 'Backend Server Settings',
    folder: 'Home',
    is_private: '1',
  });

  const [masterData, setMasterData] = useState<any>(null);
  const [loading, setLoading] = useState<string | boolean | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState<string | null>(null);
  const [uploadResponse, setUploadResponse] = useState<any>(null);

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

  const uploadFile = async () => {
    if (!masterData?.access_token)  {
      throw new Error('Fetch master API first');
    }
    if (!file) {
      alert('Please select a file to upload');
      return;
    }
    const accessToken = masterData.data.access_token;
    setUploadLoading('Uploading file...');
    try {
      const formData = new FormData();
      formData.append('file', file);
      Object.entries(parameters).forEach(([key, value]) => formData.append(key, value));

      const response = await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadResponse(response.data);
    } catch (error: any) {
      console.error('Error uploading file:', error.response?.data || error.message);
    } finally {
      setUploadLoading(null);
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
          <label htmlFor="Parametrs" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Parameters</label>
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
          {loading ? 'Fetching...' : 'Proceed'}
        </Button>

        {masterData && (
          <>
            <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Master Data:</h2>
              <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                {JSON.stringify(masterData, null, 2)}
              </pre>
            </div>

            <div className="mt-4">
              <label className="block mb-2 font-bold text-gray-700">Select File:</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <Button
              onClick={uploadFile}
              className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
              disabled={!!uploadLoading}
            >
              {uploadLoading ? 'Uploading...' : 'Upload File'}
            </Button>

            {uploadResponse && (
              <div className="bg-gray-300 p-4 sm:p-6 mt-6 sm:mt-8 rounded-lg shadow overflow-x-auto">
                <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">Upload Response:</h2>
                <pre className="text-sm bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-800 w-full overflow-x-auto break-all sm:break-normal">
                  {JSON.stringify(uploadResponse, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UploadFilesAuth;
