const API_URL = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  APP_TOKEN: "gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure",
  USER_TOKEN:
    "gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_secure_for_users",
  USER_ENCRYPT_KEY:
    "gauth_erpgulf.gauth_erpgulf.backend_server.test_generate_token_encrypt_for_user",
  USER_ENCRYPT_TOKEN:
    "gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_encrypt_for_user",
  APP_ENCRYPT_TOKEN:
    "gauth_erpgulf.gauth_erpgulf.backend_server.generate_token_encrypt",
  APP_ENCRYPT_KEY:
    "gauth_erpgulf.gauth_erpgulf.backend_server.test_generate_token_encrypt",
  COUNTRY_RESTRICTION:
    "gauth_erpgulf.gauth_erpgulf.backend_server.check_country_restriction",
  CREATE_USER: "gauth_erpgulf.gauth_erpgulf.backend_server.g_create_user",
  UPDATE_PASSWORD_USING_RESETKEY:
    "gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_reset_key",
  RESEND_OTP_FOR_RESETKEY:
    "gauth_erpgulf.gauth_erpgulf.backend_server.resend_otp_for_reset_key",
  CUSTOMER_DETAILS:
    "gauth_erpgulf.gauth_erpgulf.firebase_sms.get_customer_details",
  DELETE_USER: "gauth_erpgulf.gauth_erpgulf.backend_server.g_delete_user",
  ENABLE_USER: "gauth_erpgulf.gauth_erpgulf.backend_server.g_user_enable",
  IS_API_REQUEST: "gauth_erpgulf.gauth_erpgulf.backend_server.is_api_request",
  IS_USER_AVAILABLE:
    "gauth_erpgulf.gauth_erpgulf.backend_server.is_user_available",
  LOG_DETAILS: "gauth_erpgulf.gauth_erpgulf.backend_server.login_time",
  GENERATE_2FA_TOKEN:
    "gauth_erpgulf.gauth_erpgulf.2fa.generate_encrypted_token",
  VERIFY_2FA_TOKEN:
    "gauth_erpgulf.gauth_erpgulf.2fa.generate_token_encrypt_for_user_2fa",
  VERIFY_2FA_OTP:
    "gauth_erpgulf.gauth_erpgulf.2fa.validate_otp_to_generate_user_token",
  RESEND_LOGIN_OTP: "gauth_erpgulf.gauth_erpgulf.2fa.resend_otp",
  RESEND_SIGNUP_OTP:
    "gauth_erpgulf.gauth_erpgulf.backend_server.resend_otp_for_reset_key",
  RANDOM_PASSWORD:
    "gauth_erpgulf.gauth_erpgulf.backend_server.generate_random_password",
  GENERATE_RESET_PASSWORD_KEY:
    "gauth_erpgulf.gauth_erpgulf.backend_server.g_generate_reset_password_key",
  TEST_REDIRECT: "gauth_erpgulf.gauth_erpgulf.firebase_sms.test_redirect_url",
  UPDATE_PASSWORD:
    "gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password",
  UPDATE_PASSWORD_USING_USERTOKEN:
    "gauth_erpgulf.gauth_erpgulf.backend_server.g_update_password_using_usertoken",
  UPLOAD_FILES: "gauth_erpgulf.gauth_erpgulf.backend_server.upload_file",
  ACCOUNT_BALANCE:
    "gauth_erpgulf.gauth_erpgulf.firebase_sms.get_account_balance",
};

export default API_URL;
