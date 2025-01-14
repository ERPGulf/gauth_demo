import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setAppTokenHeader } from "@/utils/api/token/API-app";

type UserInputs = {
  fullname: string;
  id: number;
  email: string;
  mobile: number;
  password: string;
  customer_company: string;
};

export const OnboardingUserSignup = async (userInputs: UserInputs) => {
  try {
    const formData = new FormData();
    formData.append("full_name", userInputs.fullname);
    // formData.append("password", userInputs.password);
    formData.append("mobile_no", userInputs.mobile.toString());
    formData.append("email", userInputs.email);
    formData.append("qid", userInputs.id.toString());
    formData.append("role", "Accounts User");
    formData.append("company_name", userInputs.customer_company);
    const { data } = await API.post(API_URL.USERSIGNUP, formData, {
      headers: await setAppTokenHeader(),
    });
    return Promise.resolve(data);
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(
      (error as Error) || new Error("An unknown error occurred"),
    );
  }
};
