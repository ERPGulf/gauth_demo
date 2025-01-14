// utils/validationSchemas.ts
import * as yup from "yup";

const RESTRICTED_HOSTNAMES = [
  "localhost",
  "server",
  "server1",
  "default-server",
  "test",
  "dev",
  "demo",
  "staging",
  "backup",
  "primary",
  "secondary",
  "guest",
  "admin",
  "root",
  "user",
  "dns",
  "ftp",
  "web",
  "mail",
  "api",
  "master",
  "slave",
  "public",
  "private",
  "ssh",
  "vpn",
  "firewall",
  "oracle",
];

const RESTRICTED_USERNAMES = [
  "admin",
  "administrator",
  "root",
  "frappe",
  "erpnext",
  "useruser",
  "guest",
  "test",
  "user",
  "ubuntu",
  "windows",
  "user1",
  "user2",
  "testuser",
  "test1",
  "temp",
  "system",
  "sysadmin",
  "operator",
];

const RESTRICTED_SSH_PORTS = [
  "8574",
  "2222",
  "2022",
  "2202",
  "8000",
  "13000",
  "11000",
  "9000",
];

export const commonValidationSchema = {
  hostName: yup
    .string()
    .required("Host Name is required")
    .min(3, "Minimum 3 characters")
    .max(9, "Maximum 9 characters")
    .matches(
      /^[a-z0-9]+$/,
      "This field only accepts small letters and alphanumeric characters, no special characters or spaces",
    )
    .notOneOf(
      RESTRICTED_HOSTNAMES,
      "Invalid Host Name, Please enter a valid hostname",
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .max(20, "Maximum 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
    ),
  confirmPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Passwords must match"),

  cloudPlatform: yup.string().required("Cloud Platform is required"),
};

export const sharedValidationSchema = yup.object().shape({
  ...commonValidationSchema,
  ErpNextPort: yup
    .string()
    .required("ERPNext Port is required")
    .matches(/^\d{4}$/, "Invalid ERPNext Port, must be 4 digits")
    .test(
      "port-range",
      "Invalid ERPNext Port. It must not lie between 8000 and 14000",
      (value) => {
        const port = parseInt(value, 10);
        return isNaN(port) || port < 8000 || port > 14000;
      },
    ),
});

export const onboardingValidationSchema = yup.object().shape({
  ...commonValidationSchema,
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Minimum 5 characters")
    .max(15, "Maximum 15 characters")
    .matches(
      /^[a-z0-9_]+$/,
      "This field only accepts small letters, alphanumeric characters, and underscores",
    )
    .notOneOf(
      RESTRICTED_USERNAMES,
      "These are common username, try with a different one.",
    ),
  sshPort: yup
    .string()
    .required("SSH Port is required")
    .matches(/^\d{4}$/, "Invalid SSH Port, must be 4 digits")
    .notOneOf(
      RESTRICTED_SSH_PORTS,
      "Invalid SSH Port, try with a different one.",
    ),

  ErpNextPort: yup
    .string()
    .required("ERPNext Port is required")
    .matches(/^\d{4}$/, "Invalid ERPNext Port, must be 4 digits")
    .test(
      "ssh-port",
      "ERPNext Port must not be same as SSH Port",
      function (value) {
        return value !== this.parent.sshPort;
      },
    ),
});

export const frappeValidationSchema = yup.object().shape({
  ...commonValidationSchema,
});
