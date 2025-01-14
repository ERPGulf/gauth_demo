import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { AxiosError } from "axios";
import { setAppTokenHeader } from "@/utils/api/token/API-app";
import generatePassword from "@/utils/helper/signup-passwordgen";

export const userLogin = async (email: string, password: string) => {
  try {
    const formData = new FormData();
    formData.append("app_key", btoa(import.meta.env.VITE_APP_KEY));
    formData.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
    formData.append("username", email);
    formData.append("password", password);
    const { data } = await API.post(API_URL.USERLOGIN, formData, {
      headers: await setAppTokenHeader(),
    });
    return Promise.resolve(data.data);
  } catch (error) {
    console.error("Error logging in:", error);
    return Promise.reject(error);
  }
};
type UserInputs = {
  fullname: string;
  id: number;
  email: string;
  mobile: number;
  password: string;
  customer_company: string;
};

export const userSignup = async (userInputs: UserInputs) => {
  try {
    const password = generatePassword(10);
    const formData = new FormData();
    formData.append("email", userInputs.email);
    formData.append("full_name", userInputs.fullname);
    formData.append("qid", userInputs.id.toString());
    formData.append("mobile_no", userInputs.mobile.toString());
    formData.append("company_name", userInputs.customer_company);
    formData.append("password", password);
    formData.append("role", "Accounts User");
    const { data, status } = await API.post(API_URL.USERSIGNUP, formData, {
      headers: await setAppTokenHeader(),
    });
    if (status !== 200 || !data) {
      console.log("Error signing up:", data);
      throw new Error(`Error signing up: status ${status}`);
    }
    return Promise.resolve(data);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    return Promise.reject(err);
  }
};

export const sendUserOtp = async (email: string, mobile: string) => {
  try {
    const formData = new FormData();
    formData.append("recipient", email);
    formData.append("mobile", mobile);
    const { data } = await API.post(API_URL.SENDOTP, formData, {
      headers: await setAppTokenHeader(),
    });
    console.log("OTP sent:", data);
    return Promise.resolve(data);
  } catch (error) {
    console.error("Error sending OTP:", error);
    return Promise.reject(error);
  }
};

export const updateUserPassword = async (
  reset_key: string,
  password: string,
  username: string,
) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("reset_key", reset_key);
    formData.append("new_password", password);
    const { data } = await API.post(API_URL.USERPASSWORDUPDATE, formData, {
      headers: await setAppTokenHeader(),
    });
    console.log("Password updated:", data);
    return Promise.resolve(data);
  } catch (error) {
    console.error("Error updating password:", error);
    return Promise.reject(error);
  }
};

export const validateEmail = async (email: string) => {
  try {
    const formData = new FormData();
    formData.append("email_to_validate", email);
    const { data } = await API.post(API_URL.VALIDATE_EMAIL, formData, {
      headers: await setAppTokenHeader(),
    });
    console.log("Email validated:", data);
    return Promise.resolve(data);
  } catch (error) {
    console.error("Error validating email:", error);
    return Promise.reject(error);
  }
};
