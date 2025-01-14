const API_URL = {
  BASE_URL: "https://io.claudion.com/api/method/",
  APP_ENRYPT: "gauth.gauth.gauth.generate_token_encrypt",
  APP_TOKEN: "gauth.gauth.gauth.generate_token_secure",
  REFRESH_TOKEN: "frappe.integrations.oauth2.get_token",
  PRODUCTS: "claudion_io.portal.subscription.get_product_items",
  SERVICE: "claudion_io.portal.subscription.get_service_items",
  GROUP: "claudion_io.portal.subscription.get_group",
  ONE_TIME_PURCHASE:
    "claudion_io.portal.subscription.one_time_purchase_history",
  SUBSCRIPTION_PURCHASE:
    "claudion_io.portal.subscription.subscription_purchase_history",
  LOGIN_HISTORY: "claudion_io.portal.subscription.login_time",
  USERLOGIN: "claudion_io.portal.subscription.generate_token_secure_for_users",
  USERSIGNUP: "gauth.gauth.gauth.g_create_user",
  USERPASSWORDUPDATE: "gauth.gauth.gauth.g_update_password_using_reset_key",
  COUPONGET: "claudion_io.portal.subscription.Coupon_Code",
  PRODUCTINVOICE:
    "claudion_io.portal.subscription.create_subscription_or_invoice",
  ACCOUNTBALANCE: "claudion_io.portal.subscription.get_account_balance",
  ACCOUNTAMOUNTS: "claudion_io.portal.subscription.Account_balance",
  ONBOARDINGPAGES: "claudion_io.portal.pages.get_portal_pages_details",
  ONBOARDINGPRICING: "claudion_io.portal.subscription.get_prices",
  CLOUDSERVER: "claudion_io.claudion_io.terraform.oci.get_cloud_servers",
  CPU_METRICS:
    "claudion_io.claudion_io.terraform.oci.get_cpu_utilization_metrics",
  DISKREADBYTES:
    "claudion_io.claudion_io.terraform.oci.get_disk_read_bytes_metrics",
  DISKWRITEBYTES:
    "claudion_io.claudion_io.terraform.oci.get_disk_write_bytes_metrics",
  LOADAVERAGE: "claudion_io.claudion_io.terraform.oci.get_load_average_metrics",
  MEMORYUTILIZATION:
    "claudion_io.claudion_io.terraform.oci.get_memory_utilization_metrics",
  NETWORKRECEIVEBYTES:
    "claudion_io.claudion_io.terraform.oci.get_network_receive_bytes_metrics",
  NETWORKTRANSMITBYTES:
    "claudion_io.claudion_io.terraform.oci.get_network_transmit_bytes_metrics",
  GETMETRICS: "claudion_io.claudion_io.terraform.oci.get_metrics",
  SUBSCRIPTIONSTATUS: "claudion_io.portal.subscription.get_status",
  GETSECURITYLIST: "claudion_io.claudion_io.terraform.oci.get_security_list",
  UPDATESECURITYLIST:
    "claudion_io.claudion_io.terraform.oci.update_security_list",
  GETBACKUP: "claudion_io.claudion_io.terraform.oci.get_boot_volume_backups",
  CREATEBACKUP:
    "claudion_io.claudion_io.terraform.oci.create_boot_volume_backup",
  PAYMENT: "claudion_io.portal.subscription.create_payment",
  FEEDBACK: "claudion_io.portal.subscription.feedback",
  LAUNCHINSTANCE:
    "claudion_io.claudion_io.terraform.oci.launch_compute_instance",
  INSTANCESTATUS:
    "claudion_io.claudion_io.terraform.oci.get_instance_setup_status",
  GETINSTANCE: "claudion_io.claudion_io.terraform.oci.get_instance",
  VALIDATE_SERVER_PARAMS:
    "claudion_io.claudion_io.terraform.oci.validate_parameters",
  COUNTRYLIST: "claudion_io.claudion_io.terraform.oci.get_country_list",
  GETSELECTEDCOUNTRY: "claudion_io.claudion_io.terraform.oci.get_countries",
  UPDATECOUNTRYlIST: "claudion_io.claudion_io.terraform.oci.update_countries",
  UPDATECOUNTRYSTATUS:
    "claudion_io.claudion_io.terraform.oci.get_country_list_update_status",
  BILLING_AND_PAYMENT_HISTORY:
    "claudion_io.portal.subscription.Billing_and_payment_History",
  PDF_DOWNLOAD: "claudion_io.portal.pdf.get_private_file_url",
  NOTIFICATION: "claudion_io.portal.subscription.fcm_message",
  SENDOTP: "gauth.gauth.gauth.g_generate_reset_password_key",
  VALIDATE_EMAIL: "gauth.gauth.gauth.validate_email",
  GETDETAILS: "claudion_io.portal.subscription.item_code",
};

export default API_URL;
