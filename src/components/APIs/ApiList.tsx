import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ApiList: React.FC = () => {
  const navigate = useNavigate();



  // API Definitions
  const apis = {
    masterApi: {
      title: 'Master',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.backend_server.generate_token_secure',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/MasterAuth',
    },

    userApi: {
      title: 'User',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.backend_server.generate_user_token',
      parameters: {
        user_id: '',
        user_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/UserAuth',
    },
    masterEncryptionApi: {
      title: 'Master Encryption',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.backend_server.test_generate_token_encrypt?',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/MasterEncryptionAuth',
    },
    userEncryptionApi: {
      title: 'User Encryption',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.backend_server.generate_token_encrypt',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/UserEncryptionAuth',
    },

    isUserAvaialableApi: {
      title: 'is user available',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.is_user_available',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'GET',
      targetPage: '/api/IsUserAvailableAuth',
    },

    createuserApi: {
      title: 'create user ',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_create_user',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/CreateUserAuth',
    },
    updatepasswordApi: {
      title: 'update password ',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/UpdatePasswordAuth',
    },
    deleteuserApi: {
      title: 'delete user',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_delete_user',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'DELETE',
      targetPage: '/api/DeleteUserAuth',
    },
    enableuserApi: {
      title: 'enable user ',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_user_enable',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/EnableUserAuth',
    },
    updatepasswordusingusertokenApi: {
      title: 'update password using user token ',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_usertoken',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/UpdatePasswordUserTokenAuth',
    },
    generateresetpasswordkeyApi: {
      title: 'Generate reset password key',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_generate_reset_password_key',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/ResetPasswordKeyAuth',
    },

    updatepasswordusingresetkeyApi: {
      title: 'Update password using reset key',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_reset_key',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/ResetPasswordKeyAuth',
    },
    logdetailsofuserusingusertokenApi: {
      title: 'log details of user using user token ',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.login_time',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'GET',
      targetPage: '/api/LogDetailsAuth',
    },
    checkcountryrestrictionApi: {
      title: 'check country restriction ',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.check_country_restriction',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'GET',
      targetPage: '/api/CountryRestriction',
    },
    checkaccountbalanceApi: {
      title: 'Check Account Balance',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.get_account_balance',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'GET',
      targetPage: '/api/AccountBalanceAuth',
    },

    checkcustomerdetailsApi: {
      title: 'Check Customer Details',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.get_customer_details',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'GET',
      targetPage: '/api/CustomerDetailsAuth',
    },

    RandomPasswordApi: {
      title: 'generate a random password',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.generate_random_password',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'GET',
      targetPage: '/api/RandomPasswordAuth',
    },

    uploadfilesApi: {
      title: 'upload files',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.upload_file',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/UploadFilesAuth',
    },
    TestRediectApi: {
      title: 'test redirecting',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.test_redirect_url',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'POST',
      targetPage: '/api/TestRedirectAuth',
    },
    IsApiRequestApi: {
      title: 'Check API Request',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.backend_server.is_api_request',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'GET',
      targetPage: '/api/IsApiRequestAuth',
    },

    LoginApi: {
      title: 'Login',
      api: 'https://gauth.erpgulf.com:4083/api/method/gauth_erpgulf.gauth_erpgulf.2fa.generate_token_encrypt_for_user_2fa',
      parameters: {
        api_key: '',
        api_secret: '',
        app_key: '',
      },
      method: 'GET',
      targetPage: '/api/LoginAuth',
    },




  };


  const handleApiClick = (selectedApiKey: keyof typeof apis) => {
    const selectedApi = apis[selectedApiKey];
    if (!selectedApi) {
      console.error(`API with key ${selectedApiKey} not found`);
      return;
    }
    navigate(selectedApi.targetPage, { state: { apiData: selectedApi } });
  };

  return (

    <div className="relative z-20 p-4 min-h-screen flex flex-col items-center bg-gray-300  rounded-lg  ">
      <h1 className="text-3xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-6">APIs</h1>
      <div className="w-full md:max-w-3xl max-w-[300px] min-h-[500px] sm:min-h-[700px]  p-6 sm:p-10 shadow-2xl max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6  bg-gray-300  rounded-lg">
        {Object.entries(apis).map(([key, api]) => (
          <div
            key={key}
            className=" bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">{api.title}</h2>
              <span
                className={`text-xs font-semibold text-white px-2 py-1 rounded-md ml-2 ${api.method === "POST"
                    ? "bg-blue-500"
                    : api.method === "GET"
                      ? "bg-green-500"
                      : api.method === "PUT"
                        ? "bg-violet-500"
                        : "bg-red-500"
                  }`}
              >
                {api.method}
              </span>
            </div>

            <Button
              type="submit"
              onClick={() => handleApiClick(key as keyof typeof apis)}
              className="mt-4 px-4 py-2  bg-primary/90  text-white font-semibold rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Submit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiList;
